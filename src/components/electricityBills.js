import React, { useState, useEffect } from "react";
import { Form, InputGroup, Button, ButtonGroup ,Card} from "react-bootstrap";
import { auth, googleProvider, db } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { collection, addDoc, getDocs, setDoc, doc } from 'firebase/firestore';
import "./auth.css";
import MonthlyDataTable from "./DataList";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import emailjs from "@emailjs/browser";
import RewardPointsDisplay from "./Rewards";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ElectricityBillsEntry = () => {
  const [error, setError] = useState(null);
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [monthlyData, setMonthlyData] = useState({});
  const [newMonth, setNewMonth] = useState("");
  const [newAmount, setNewAmount] = useState(0);
  const [newStatus, setNewStatus] = useState("Paid");
  const [eleEntriesCollection, seteleEntriesCollection] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [image, setImage] = useState(null);
  const [amt, setAmt] = useState("");
  const [rewardPoints, setRewardPoints] = useState(0); // Reward points state
  const [rewardedEntries, setRewardedEntries] = useState([]);

  const [maxBillLimit, setMaxBillLimit] = useState(() => {
    // Retrieve maximum bill limit from local storage or default to 0
    return parseInt(localStorage.getItem("maxBillLimit")) || 0;
  });

  useEffect(() => {
    // Save maximum bill limit to local storage whenever it changes
    localStorage.setItem("maxBillLimit", maxBillLimit);
  }, [maxBillLimit]);

  useEffect(() => {
    // Fetch and set monthly data when the user is authenticated
    if (isAuthenticated) {
      const fetchData = async () => {
        const user = auth.currentUser;
        const userEntriesCollection = collection(db, 'entries', user.uid, 'monthlyData');
        const querySnapshot = await getDocs(userEntriesCollection);
        const data = querySnapshot.docs.map(doc => doc.data().data);
        setMonthlyData(data[0] || {});
      };

    }
    fetchData();
    setRefreshing(false);
  }, [isAuthenticated,refreshing]);



const handleRefresh = () => {
  setRefreshing(true);
};

  const handleSignOut = async () => {
    try {
      setError(null);
      await signOut(auth);
      setAuthenticated(false);
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  const getPreviousMonth = (currentMonth) => {
    const monthsInYear = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
  
    const currentMonthIndex = monthsInYear.indexOf(currentMonth);
    if (currentMonthIndex === -1) {
      // Handle invalid month name
      return null;
    }
  
    // If current month is January, previous month is December
    if (currentMonthIndex === 0) {
      return 'December';
    }
  
    // Otherwise, return the month before the current month
    return monthsInYear[currentMonthIndex - 1];
  };
  

  const addNewMonth = async () => {
    try {
      const user = auth.currentUser;
      const userEntriesCollection = collection(db, 'entries', user.uid, 'monthlyData');
      const docSnapshot = await getDocs(userEntriesCollection);
  
      let userDocumentRef;
      let newMonthlyData;
      let updatedMonthlyData;
      let rewardPoints = 0;

      // Check if the docSnapshot is not empty and has documents
      if (!docSnapshot.empty && docSnapshot.docs[0]) {
        const existingData = docSnapshot.docs[0].data().data;
        updatedMonthlyData = { ...existingData, [newMonth]: { value: newAmount, status: newStatus } };
        const userData = docSnapshot.docs[0].data();
        rewardPoints = userData.rewardPoints || 0;
        userDocumentRef = doc(db, 'entries', user.uid, 'monthlyData', docSnapshot.docs[0].id);

      } else {
        // Create a new document if no documents are found
        newMonthlyData = { [newMonth]: { value: newAmount, status: newStatus } };
        const newDocumentRef = await addDoc(userEntriesCollection, { data: newMonthlyData });
        userDocumentRef = doc(db, 'entries', user.uid, 'monthlyData', newDocumentRef.id);
      }

      let earnedRewardPoints = 0;

    // Calculate the minimum amount from existing monthly data
    const existingAmounts = Object.values(updatedMonthlyData || newMonthlyData || {});
    const minAmount = Math.min(...existingAmounts.map(item => item.value));

    // Check if the new amount is less than the minimum amount
    if (newAmount <=   minAmount) {
      // Add reward points if the new amount is less than the minimum amount
      // earnedRewardPoints = 10;
      // console.log("Earned Reward Points:", earnedRewardPoints);
      // setRewardPoints(prevRewardPoints => prevRewardPoints + earnedRewardPoints);
      // console.log(rewardPoints) 
      earnedRewardPoints = 10;
      rewardPoints += earnedRewardPoints;
      toast.success(`You earned ${earnedRewardPoints} reward points!`);
      setRewardedEntries(prevRewardedEntries => [...prevRewardedEntries, userDocumentRef.id]);
    }

    // Update reward points state
    await setDoc(userDocumentRef, { data: updatedMonthlyData || newMonthlyData, rewardPoints });

    setRewardPoints(rewardPoints);

      
      if (newAmount > maxBillLimit) {
        const emailParams = {
          from_name: 'Water-electricty tracking app',
          to_name: 'User',
          message: `The price of the new electricity entry exceeds the maximum limit. Amount: ${newAmount}`,
          // Add any other necessary parameters
        };

        await emailjs.send(
          'service_vzwjycg', // Replace with Email.js Service ID
          'template_hftog8t', // Replace with Email.js Template ID
          emailParams,
          '2dKnfiC4RB_5iznHu' // Replace with Email.js User ID
        );

        console.log('Email sent successfully');
      }
      // Set the document data
      await setDoc(userDocumentRef, { data: updatedMonthlyData || newMonthlyData , rewardPoints: rewardPoints});
      setMonthlyData(updatedMonthlyData || newMonthlyData);
      setNewMonth("");
      setNewAmount(0);
      setNewStatus("Paid"); // Reset status to "Paid" after adding a new month
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };
  

  const fetchData = async () => {
    try {
      const user = auth.currentUser;
      const userEntriesCollection = collection(db, 'entries', user.uid, 'monthlyData');
      const querySnapshot = await getDocs(userEntriesCollection);
      const data = querySnapshot.docs.map(doc => doc.data().data);
      setMonthlyData(data[0] || {});

    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  const uploadImage = async () => {
    try {
      const formData = new FormData();
      formData.append("image", image);

      const response = await fetch('http://127.0.0.1:5000/process_image', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      // Assuming "total_cost" is the property you want to autofill
      setNewAmount(data.total_cost || "");
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleImageUpload = async () => {
    try {
      if (!image) {
        // No image selected, you can choose to skip the upload or show an error message
        console.error('No image selected');
        return;
      }

      const formData = new FormData();
      formData.append("bill_image", image);

      const response = await fetch('http://127.0.0.1:5000/process_image', {
        method: 'POST',
        body: formData,
        // Add headers if needed (e.g., 'Authorization' header)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      // Log the API response to the console
      console.log('API Response:', data);
      setNewAmount(data.total_cost || '');
      if (data.month && data.bill_amount) {
        setNewMonth(data.month);
        setNewAmount(data.bill_amount);
      } else {
        console.error('Month or bill amount not found in API response');
      }
      // Display result if needed
      // displayResult(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  


  if (!auth.currentUser) {
    // If the user is not authenticated, you can redirect to the login page or handle it accordingly
    return <p>Please log in to access this feature.</p>;
  }

  
  // console.log("Sorted Monthly Data:", sortedMonthlyData);
  let minAmount = null;
  if (monthlyData) {
    const amounts = Object.values(monthlyData).map(item => item.value);
    minAmount = Math.min(...amounts);
  }

  return (
    <div>
      {/* set limit */}
      <ToastContainer position="bottom-center"
  reverseOrder={false} />

          <div className="d-flex flex-column align-items-center">
            <p className="fs-4 mb-4">Electricity</p>
            <Form className="mb-3">
            <div>
            <Form.Group className="mb-3" controlId="formMaxBillLimit">
              <InputGroup>
                <InputGroup.Text id="formMaxBillLimit">Enter Maximum Bill Limit</InputGroup.Text>
                <Form.Control
                  type="number"
                  value={maxBillLimit}
                  onChange={(e) => setMaxBillLimit(e.target.value)}
                />
              </InputGroup>
            </Form.Group>
            <p><b>Maximum Bill Limit: {maxBillLimit}</b></p>
          </div>
          <br/>
          <Form.Group className="mb-3" controlId="formNewMonth">
            <InputGroup>
              <InputGroup.Text id="formNewMonth">New Month</InputGroup.Text>
              <select
  value={newMonth}
  onChange={(e) => setNewMonth(e.target.value)}
>
  <option value="">Select a month</option>
  <option value="January">January</option>
  <option value="February">February</option>
  <option value="March">March</option>
  <option value="April">April</option>
  <option value="May">May</option>
  <option value="June">June</option>
  <option value="July">July</option>
  <option value="August">August</option>
  <option value="September">September</option>
  <option value="October">October</option>
  <option value="November">November</option>
  <option value="December">December</option>
</select>
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formNewAmount">
            <InputGroup>
              <InputGroup.Text id="formNewAmount">New Amount</InputGroup.Text>
              <Form.Control
                type="number"
                value={newAmount}
                onChange={(e) => setNewAmount(e.target.value)}
              />
            </InputGroup>
          </Form.Group>
          <ButtonGroup aria-label="Status" className="mb-3">
            <Button
              variant={newStatus === "Paid" ? "success" : "outline-success"}
              onClick={() => setNewStatus("Paid")}
            >
              Paid
            </Button>
            <Button
              variant={newStatus === "Not Paid" ? "danger" : "outline-danger"}
              onClick={() => setNewStatus("Not Paid")}
            >
              Not Paid
            </Button>
          </ButtonGroup>
          <br></br>

           {/* Image Upload */}
           <Form.Group className="mb-3">
            <Form.Label>Upload PDF/Image</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
            <br/>
            <Button variant="secondary" onClick={handleImageUpload}>
              Upload PDF/Image
            </Button>
            
          </Form.Group>
          {/* <br></br> */}
          <Button variant="primary" onClick={addNewMonth} className="me-2">
            Add New Month
          </Button>
          <Button variant="primary" onClick={fetchData} className="ms-2">
            Refresh Data
          </Button>

        </Form>
        <MonthlyDataTable monthlyData={monthlyData} auth={auth} rewardedEntries={rewardedEntries}/>
        {/* Step 3: Display reward points */}
        {/* <Card className="mt-4">
          <Card.Body>
            <Card.Title>My Rewards</Card.Title>
            <Card.Text>
            {minAmount !== null ? `Total Reward points are: ${rewardPoints}` : 'No data available'}
            </Card.Text>
          </Card.Body>
        </Card> */}
        <div>
          {false && <RewardPointsDisplay rewardPoints={rewardPoints}/>}
        </div>
      </div>
    </div>
  );
};

export default ElectricityBillsEntry;

// import React, { useState, useEffect } from "react";
// import { Form, InputGroup, Button, ButtonGroup , Table } from "react-bootstrap";
// import { auth, googleProvider, db } from "../config/firebase";
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
// import { collection, addDoc, getDocs, setDoc, doc,deleteDoc } from 'firebase/firestore';
// import "./auth.css";
// import MonthlyDataTable from "./DataList";
// import { Navbar, Nav, NavDropdown } from "react-bootstrap";
// import emailjs from "@emailjs/browser";

// const ElectricityBillsEntry = () => {
//   const [error, setError] = useState(null);
//   const [isAuthenticated, setAuthenticated] = useState(false);
//   const [monthlyData, setMonthlyData] = useState({});
//   const [newMonth, setNewMonth] = useState("");
//   const [newAmount, setNewAmount] = useState(0);
//   const [newStatus, setNewStatus] = useState("Paid");
//   const [eleEntriesCollection, seteleEntriesCollection] = useState(null);
//   const [refreshing, setRefreshing] = useState(false);
//   const [image, setImage] = useState(null);
//   const [amt, setAmt] = useState("");

//   const [maxBillLimit, setMaxBillLimit] = useState(() => {
//     // Retrieve maximum bill limit from local storage or default to 0
//     return parseInt(localStorage.getItem("maxBillLimit")) || 0;
//   });

//   useEffect(() => {
//     // Save maximum bill limit to local storage whenever it changes
//     localStorage.setItem("maxBillLimit", maxBillLimit);
//   }, [maxBillLimit]);

//   useEffect(() => {
//     // Fetch and set monthly data when the user is authenticated
//     if (isAuthenticated) {
//       const fetchData = async () => {
//         const user = auth.currentUser;
//         const userEntriesCollection = collection(db, 'entries', user.uid, 'monthlyData');
//         const querySnapshot = await getDocs(userEntriesCollection);
//         const data = querySnapshot.docs.map(doc => doc.data().data);
//         setMonthlyData(data[0] || {});
//       };

//     }
//     fetchData();
//     setRefreshing(false);
//   }, [isAuthenticated,refreshing]);



// const handleRefresh = () => {
//   setRefreshing(true);
// };

//   const handleSignOut = async () => {
//     try {
//       setError(null);
//       await signOut(auth);
//       setAuthenticated(false);
//     } catch (err) {
//       setError(err.message);
//       console.error(err);
//     }
//   };



//   const addNewMonth = async () => {
//     try {
//       const user = auth.currentUser;
//       const userEntriesCollection = collection(db, 'entries', user.uid, 'monthlyData');
//       const docSnapshot = await getDocs(userEntriesCollection);
  
//       let userDocumentRef;
//       let newMonthlyData;
//       let updatedMonthlyData;
      
//       // Check if the docSnapshot is not empty and has documents
//       if (!docSnapshot.empty && docSnapshot.docs[0]) {
//         const existingData = docSnapshot.docs[0].data().data;
//         updatedMonthlyData = { ...existingData, [newMonth]: { value: newAmount, status: newStatus } };
//         userDocumentRef = doc(db, 'entries', user.uid, 'monthlyData', docSnapshot.docs[0].id);
//       } else {
//         // Create a new document if no documents are found
//         newMonthlyData = { [newMonth]: { value: newAmount, status: newStatus } };
//         const newDocumentRef = await addDoc(userEntriesCollection, { data: newMonthlyData });
//         userDocumentRef = doc(db, 'entries', user.uid, 'monthlyData', newDocumentRef.id);
//       }
      
//       if (newAmount > maxBillLimit) {
//         const emailParams = {
//           from_name: 'Water-electricty tracking app',
//           to_name: 'User',
//           message: `The price of the new electricity entry exceeds the maximum limit. Amount: ${newAmount}`,
//           // Add any other necessary parameters
//         };

//         await emailjs.send(
//           'service_vzwjycg', // Replace with Email.js Service ID
//           'template_hftog8t', // Replace with Email.js Template ID
//           emailParams,
//           '2dKnfiC4RB_5iznHu' // Replace with Email.js User ID
//         );

//         console.log('Email sent successfully');
//       }
//       // Set the document data
//       await setDoc(userDocumentRef, { data: updatedMonthlyData || newMonthlyData });
//       setMonthlyData(updatedMonthlyData || newMonthlyData);
//       setNewMonth("");
//       setNewAmount(0);
//       setNewStatus("Paid"); // Reset status to "Paid" after adding a new month
//     } catch (err) {
//       setError(err.message);
//       console.error(err);
//     }
//   };
  

//   const fetchData = async () => {
//     try {
//       const user = auth.currentUser;
//       const userEntriesCollection = collection(db, 'entries', user.uid, 'monthlyData');
//       const querySnapshot = await getDocs(userEntriesCollection);
//       const data = querySnapshot.docs.map(doc => doc.data().data);
//       setMonthlyData(data[0] || {});
//     } catch (err) {
//       setError(err.message);
//       console.error(err);
//     }
//   };

//   const uploadImage = async () => {
//     try {
//       const formData = new FormData();
//       formData.append("image", image);

//       const response = await fetch('http://127.0.0.1:5000/process_image', {
//         method: 'POST',
//         body: formData
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const data = await response.json();

//       // Assuming "total_cost" is the property you want to autofill
//       setNewAmount(data.total_cost || "");
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   const handleImageUpload = async () => {
//     try {
//       if (!image) {
//         // No image selected, you can choose to skip the upload or show an error message
//         console.error('No image selected');
//         return;
//       }

//       const formData = new FormData();
//       formData.append("bill_image", image);

//       const response = await fetch('http://127.0.0.1:5000/process_image', {
//         method: 'POST',
//         body: formData,
//         // Add headers if needed (e.g., 'Authorization' header)
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const data = await response.json();

//       // Log the API response to the console
//       console.log('API Response:', data);
//       setNewAmount(data.total_cost || '');
//       if (data.month && data.bill_amount) {
//         setNewMonth(data.month);
//         setNewAmount(data.bill_amount);
//       } else {
//         console.error('Month or bill amount not found in API response');
//       }
//       // Display result if needed
//       // displayResult(data);
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//     const handleEdit = (entry) => {
//     // Implement edit functionality (open modal or form with entry details)
//     // setSelectedEntry(entry);
//     // You can open a modal or navigate to another page for editing
//     // For simplicity, let's just log the selected entry for now
//     console.log("Edit Entry:", entry);
//   };

//   const handleDelete = async (id) => {
//     try {
//       if (!eleEntriesCollection) {
//         setError("Electricity entries collection is not defined.");
//         return;
//       }
  
//       const entryRef = doc(db, 'entries', auth.currentUser.uid, 'electricityData', id);
//       await deleteDoc(entryRef);
  
//       // Fetch and update the electricity data after deleting an entry
//       const updatedElectricityData = await getDocs(eleEntriesCollection);
//       const newData = updatedElectricityData.docs.map(doc => ({ ...doc.data(), id: doc.id }));
  
//       // Ensure that entry.id is defined before trying to find its index
//       const index = newData.findIndex(entry => entry.id === id);
//       if (index !== -1) {
//         newData.splice(index, 1);
//         setMonthlyData(newData);
//       }
  
//       console.log(`Successfully deleted entry with ID: ${id}`);
//     } catch (error) {
//       setError(error.message);
//       console.error('Error deleting entry:', error);
//     }
//   };

  


//   if (!auth.currentUser) {
//     // If the user is not authenticated, you can redirect to the login page or handle it accordingly
//     return <p>Please log in to access this feature.</p>;
//   }

//   return (
//     <div>
//       {/* set limit */}
//           <div className="d-flex flex-column align-items-center">
//             <p className="fs-4 mb-4">Electricity</p>
//             <Form className="mb-3">
//             <div>
//             <Form.Group className="mb-3" controlId="formMaxBillLimit">
//               <InputGroup>
//                 <InputGroup.Text id="formMaxBillLimit">Enter Maximum Bill Limit</InputGroup.Text>
//                 <Form.Control
//                   type="number"
//                   value={maxBillLimit}
//                   onChange={(e) => setMaxBillLimit(e.target.value)}
//                 />
//               </InputGroup>
//             </Form.Group>
//             <p><b>Maximum Bill Limit: {maxBillLimit}</b></p>
//           </div>
//           <br/>
//           <Form.Group className="mb-3" controlId="formNewMonth">
//             <InputGroup>
//               <InputGroup.Text id="formNewMonth">New Month</InputGroup.Text>
//               <select
//   value={newMonth}
//   onChange={(e) => setNewMonth(e.target.value)}
// >
//   <option value="">Select a month</option>
//   <option value="January">January</option>
//   <option value="February">February</option>
//   <option value="March">March</option>
//   <option value="April">April</option>
//   <option value="May">May</option>
//   <option value="June">June</option>
//   <option value="July">July</option>
//   <option value="August">August</option>
//   <option value="September">September</option>
//   <option value="October">October</option>
//   <option value="November">November</option>
//   <option value="December">December</option>
// </select>
//             </InputGroup>
//           </Form.Group>
//           <Form.Group className="mb-3" controlId="formNewAmount">
//             <InputGroup>
//               <InputGroup.Text id="formNewAmount">New Amount</InputGroup.Text>
//               <Form.Control
//                 type="number"
//                 value={newAmount}
//                 onChange={(e) => setNewAmount(e.target.value)}
//               />
//             </InputGroup>
//           </Form.Group>
//           <ButtonGroup aria-label="Status" className="mb-3">
//             <Button
//               variant={newStatus === "Paid" ? "success" : "outline-success"}
//               onClick={() => setNewStatus("Paid")}
//             >
//               Paid
//             </Button>
//             <Button
//               variant={newStatus === "Not Paid" ? "danger" : "outline-danger"}
//               onClick={() => setNewStatus("Not Paid")}
//             >
//               Not Paid
//             </Button>
//           </ButtonGroup>
//           <br></br>

//            {/* Image Upload */}
//            <Form.Group className="mb-3">
//             <Form.Label>Upload PDF/Image</Form.Label>
//             <Form.Control
//               type="file"
//               accept="image/*"
//               onChange={(e) => setImage(e.target.files[0])}
//             />
//             <br/>
//             <Button variant="secondary" onClick={handleImageUpload}>
//               Upload PDF/Image
//             </Button>
//           </Form.Group>
//           {/* <br></br> */}
//           <Button variant="primary" onClick={addNewMonth} className="me-2">
//             Add New Month
//           </Button>
//           <Button variant="primary" onClick={fetchData} className="ms-2">
//             Refresh Data
//           </Button>

//         </Form>
//         {/* <MonthlyDataTable monthlyData={monthlyData} auth={auth} /> */}
//         <Table striped bordered hover size="sm">
//          <thead>
//            <tr>
//              <th>Sr</th>
//              <th>Month</th>
//              <th>Amount</th>
//              <th>Status</th>
//              <th>Action</th>
//            </tr>
//          </thead>
//          <tbody>
//            {eleEntriesCollection.map((entry, index) => (
//             <tr key={entry.id}>
//               <td>{index + 1}</td>
//               <td>{entry.month}</td>
//               <td>{entry.amount}</td>
//               <td>{entry.status}</td>
//               <td>
//                 <Button variant="secondary" className="edit" onClick={() => handleEdit(entry)}>
//                   Edit
//                 </Button>
//                 <Button variant="danger" className="delete" onClick={() => handleDelete(entry.id)}>
//                   Delete
//                 </Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//       </div>
//     </div>
//   );
// };

// export default ElectricityBillsEntry;


// *******************************************************
// import React, { useState, useEffect } from "react";
// import { Button, Form, Table } from "react-bootstrap";
// import { collection, addDoc, getDocs, Timestamp, doc, deleteDoc } from 'firebase/firestore';
// import { db, auth } from "../config/firebase";

// const ElectricityBillsEntry = () => {
//   const [month, setMonth] = useState("");
//   const [amount, setAmount] = useState("");
//   const [status, setStatus] = useState("");
//   const [error, setError] = useState(null);
//   const [electricityData, setElectricityData] = useState([]);
//   const [refreshing, setRefreshing] = useState(false);
//   const [selectedEntry, setSelectedEntry] = useState(null);
//   const [electricityEntriesCollection, setElectricityEntriesCollection] = useState(null);

//   useEffect(() => {
//     // Fetch and set electricity data when the component mounts
//     const fetchElectricityData = async () => {
//       try {
//         if (auth.currentUser) {
//           const user = auth.currentUser;
//           const collectionRef = collection(db, 'entries', user.uid, 'electricityData');
//           setElectricityEntriesCollection(collectionRef);

//           const querySnapshot = await getDocs(collectionRef);
//           const data = querySnapshot.docs.map(doc => doc.data());
//           setElectricityData(data);
//         }
//       } catch (err) {
//         setError(err.message);
//         console.error(err);
//       }
//     };

//     fetchElectricityData();
//     setRefreshing(false); // Reset refreshing state after fetching data
//   }, [refreshing]);

//   const handleRefresh = () => {
//     setRefreshing(true);
//   };

//   const handleAddElectricityBill = async () => {
//     try {
//       if (auth.currentUser) {
//         const user = auth.currentUser;

//         // Ensure that electricityEntriesCollection is defined
//         if (!electricityEntriesCollection) {
//           setError("Electricity entries collection is not defined.");
//           return;
//         }

//         // Convert the current date to a Firestore Timestamp
//         const currentDate = new Date();
//         const timestamp = Timestamp.fromDate(currentDate);

//         // Add the electricity bill entry to Firestore
//         await addDoc(electricityEntriesCollection, {
//           month,
//           amount: parseFloat(amount), // Assuming amount is stored as a number
//           status,
//           timestamp,
//         });

//         // Fetch and update the electricity data after adding a new entry
//         const updatedElectricityData = await getDocs(electricityEntriesCollection);
//         const newData = updatedElectricityData.docs.map(doc => doc.data());
//         setElectricityData(newData);

//         // Clear input fields
//         setMonth("");
//         setAmount("");
//         setStatus("");
//         setError(null);
//       }
//     } catch (err) {
//       setError(err.message);
//       console.error(err);
//     }
//   };

//   const handleEdit = (entry) => {
//     // Implement edit functionality (open modal or form with entry details)
//     setSelectedEntry(entry);
//     // You can open a modal or navigate to another page for editing
//     // For simplicity, let's just log the selected entry for now
//     console.log("Edit Entry:", entry);
//   };

//   const handleDelete = async (id) => {
//     try {
//       if (!electricityEntriesCollection) {
//         setError("Electricity entries collection is not defined.");
//         return;
//       }
  
//       const entryRef = doc(db, 'entries', auth.currentUser.uid, 'electricityData', id);
//       await deleteDoc(entryRef);
  
//       // Fetch and update the electricity data after deleting an entry
//       const updatedElectricityData = await getDocs(electricityEntriesCollection);
//       const newData = updatedElectricityData.docs.map(doc => ({ ...doc.data(), id: doc.id }));
  
//       // Ensure that entry.id is defined before trying to find its index
//       const index = newData.findIndex(entry => entry.id === id);
//       if (index !== -1) {
//         newData.splice(index, 1);
//         setElectricityData(newData);
//       }
  
//       console.log(`Successfully deleted entry with ID: ${id}`);
//     } catch (error) {
//       setError(error.message);
//       console.error('Error deleting entry:', error);
//     }
//   };
  

//   if (!auth.currentUser) {
//     // If user is not authenticated, you can redirect to the login page or handle it accordingly
//     return <p>Please log in to access this feature.</p>;
//   }

//   return (
//     <div>
//       <h2>Electricity Bills Entry</h2>
//       <Form>
//         <Form.Group className="mb-3">
//           <Form.Label>Month</Form.Label>
//           <Form.Control type="text" value={month} onChange={(e) => setMonth(e.target.value)} />
//         </Form.Group>
//         <Form.Group className="mb-3">
//           <Form.Label>Amount</Form.Label>
//           <Form.Control type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
//         </Form.Group>
//         <Form.Group className="mb-3">
//           <Form.Label>Status</Form.Label>
//           <Form.Control type="text" value={status} onChange={(e) => setStatus(e.target.value)} />
//         </Form.Group>
//         <Button variant="primary" onClick={handleAddElectricityBill}>Add Electricity Bill</Button>
//         <Button variant="secondary" onClick={handleRefresh}>Refresh</Button>
//         {error && <p style={{ color: "red" }}>{error}</p>}
//       </Form>

//       <Table striped bordered hover size="sm">
//         <thead>
//           <tr>
//             <th>Sr</th>
//             <th>Month</th>
//             <th>Amount</th>
//             <th>Status</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {electricityData.map((entry, index) => (
//             <tr key={entry.id}>
//               <td>{index + 1}</td>
//               <td>{entry.month}</td>
//               <td>{entry.amount}</td>
//               <td>{entry.status}</td>
//               <td>
//                 <Button variant="secondary" className="edit" onClick={() => handleEdit(entry)}>
//                   Edit
//                 </Button>
//                 <Button variant="danger" className="delete" onClick={() => handleDelete(entry.id)}>
//                   Delete
//                 </Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </div>
//   );
// };

// export default ElectricityBillsEntry;
