// import React, { useState, useEffect } from "react";
// import { Button, Form, Table , ButtonGroup} from "react-bootstrap";
// import { collection, addDoc, getDocs, Timestamp, doc, deleteDoc } from 'firebase/firestore';
// import { db, auth } from "../config/firebase";

// const WaterBillsEntry = () => {
//   const [month, setMonth] = useState("");
//   const [amount, setAmount] = useState("");
//   const [status, setStatus] = useState("");
//   const [error, setError] = useState(null);
//   const [waterData, setWaterData] = useState([]);
//   const [refreshing, setRefreshing] = useState(false);
//   const [selectedEntry, setSelectedEntry] = useState(null);
//   const [waterEntriesCollection, setWaterEntriesCollection] = useState(null);
//   const [newStatus, setnewStatus] = useState("Paid");

//   useEffect(() => {
//     // Fetch and set water data when the component mounts
//     const fetchWaterData = async () => {
//       try {
//         if (auth.currentUser) {
//           const user = auth.currentUser;
//           const collectionRef = collection(db, 'entries', user.uid, 'waterData');
//           setWaterEntriesCollection(collectionRef);

//           const querySnapshot = await getDocs(collectionRef);
//           const data = querySnapshot.docs.map(doc => doc.data());
//           setWaterData(data);
//         }
//       } catch (err) {
//         setError(err.message);
//         console.error(err);
//       }
//     };

//     fetchWaterData();
//     setRefreshing(false); // Reset refreshing state after fetching data
//   }, [refreshing]);

//   const handleRefresh = () => {
//     setRefreshing(true);
//   };

//   const handleAddWaterBill = async () => {
//     try {
//       if (auth.currentUser) {
//         const user = auth.currentUser;

//         // Ensure that waterEntriesCollection is defined
//         if (!waterEntriesCollection) {
//           setError("Water entries collection is not defined.");
//           return;
//         }

//         // Convert the current date to a Firestore Timestamp
//         const currentDate = new Date();
//         const timestamp = Timestamp.fromDate(currentDate);

//         // Add the water bill entry to Firestore
//         await addDoc(waterEntriesCollection, {
//           month,
//           amount: parseFloat(amount), // Assuming amount is stored as a number
//           status,
//           timestamp,
//         });

//         // Fetch and update the water data after adding a new entry
//         const updatedWaterData = await getDocs(waterEntriesCollection);
//         const newData = updatedWaterData.docs.map(doc => doc.data());
//         setWaterData(newData);

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
//       if (!waterEntriesCollection) {
//         setError("Water entries collection is not defined.");
//         return;
//       }
  
//       const entryRef = doc(db, 'entries', auth.currentUser.uid, 'waterData', id);
//       await deleteDoc(entryRef);
  
//       // Fetch and update the water data after deleting an entry
//       const updatedWaterData = await getDocs(waterEntriesCollection);
//       const newData = updatedWaterData.docs.map(doc => ({ ...doc.data(), id: doc.id }));
  
//       // Ensure that entry.id is defined before trying to find its index
//       const index = newData.findIndex(entry => entry.id === id);
//       if (index !== -1) {
//         newData.splice(index, 1);
//         setWaterData(newData);
//       }
  
//       console.log(`Successfully deleted entry with ID: ${id}`);
//     } catch (error) {
//       setError(error.message);
//       console.error('Error deleting entry:', error);
//     }
//   };
  
//   const setNewStatus = (newStatus) => {
//     setStatus(newStatus); // Update the status state
//   };

//   // if (!auth.currentUser) {
//   //   // If user is not authenticated, you can redirect to the login page or handle it accordingly
//   //   return <p>Please log in to access this feature.</p>;
//   // }

//   return (
//     <div>
//       <h2>Water Bills Entry</h2>
//       <Form>
//         <Form.Group className="mb-3">
//           <Form.Label>Month</Form.Label>
//           <Form.Control type="text" value={month} onChange={(e) => setMonth(e.target.value)} />
//         </Form.Group>
//         <Form.Group className="mb-3">
//           <Form.Label>Amount</Form.Label>
//           <Form.Control type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
//         </Form.Group>
//         <ButtonGroup aria-label="Status" className="mb-3">
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
//         <Button variant="primary" onClick={handleAddWaterBill}>Add Water Bill</Button>
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
//           {waterData.map((entry, index) => (
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

// export default WaterBillsEntry;

import React, { useState, useEffect } from "react";
import { Button, Form, Table, ButtonGroup,InputGroup } from "react-bootstrap";
import { collection, addDoc, getDocs, Timestamp, doc, deleteDoc , updateDoc} from 'firebase/firestore';
import { db, auth } from "../config/firebase";
import "./auth.css"

const WaterBillsEntry = () => {
  const [month, setMonth] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState(null);
  const [waterData, setWaterData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [waterEntriesCollection, setWaterEntriesCollection] = useState(null);
  const [newStatus, setNewStatus] = useState("Paid"); // State to handle selected status

  useEffect(() => {
    const fetchWaterData = async () => {
      try {
        if (auth.currentUser) {
          const user = auth.currentUser;
          const collectionRef = collection(db, 'entries', user.uid, 'waterData');
          setWaterEntriesCollection(collectionRef);

          const querySnapshot = await getDocs(collectionRef);
          // const data = querySnapshot.docs.map(doc => doc.data());
          const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

          setWaterData(data);
        }
      } catch (err) {
        setError(err.message);
        console.error(err);
      }
    };

    fetchWaterData();
    setRefreshing(false);
  }, [refreshing]);

  const handleRefresh = () => {
    setRefreshing(true);
  };

  // const handleAddWaterBill = async () => {
  //   try {
  //     if (auth.currentUser) {
  //       const user = auth.currentUser;

  //       if (!waterEntriesCollection) {
  //         setError("Water entries collection is not defined.");
  //         return;
  //       }

  //       const currentDate = new Date();
  //       const timestamp = Timestamp.fromDate(currentDate);

  //       await addDoc(waterEntriesCollection, {
  //         month,
  //         amount: parseFloat(amount),
  //         status: newStatus, // Use newStatus here
  //         timestamp,
  //       });

  //       const updatedWaterData = await getDocs(waterEntriesCollection);
  //       const newData = updatedWaterData.docs.map(doc => doc.data());
  //       setWaterData(newData);

  //       setMonth("");
  //       setAmount("");
  //       setStatus("");
  //       setError(null);
  //     }
  //   } catch (err) {
  //     setError(err.message);
  //     console.error(err);
  //   }
  // };

  const handleAddWaterBill = async () => {
    try {
      if (auth.currentUser) {
        const user = auth.currentUser;
  
        if (!month || !amount || !newStatus) {
          setError("Please fill out all fields.");
          return;
        }
  
        if (!waterEntriesCollection) {
          setError("Water entries collection is not defined.");
          return;
        }
  
        const currentDate = new Date();
        const timestamp = Timestamp.fromDate(currentDate);
  
        if (selectedEntry) {
          // Editing existing entry
          const entryRef = doc(db, 'entries', user.uid, 'waterData', selectedEntry.id);
          await updateDoc(entryRef, {
            month,
            amount: parseFloat(amount),
            status: newStatus,
            timestamp,
          });
        } else {
          // Adding new entry
          await addDoc(waterEntriesCollection, {
            month,
            amount: parseFloat(amount),
            status: newStatus,
            timestamp,
          });
        }
  
        const updatedWaterData = await getDocs(waterEntriesCollection);
        const newData = updatedWaterData.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setWaterData(newData);
  
        setMonth("");
        setAmount("");
        setNewStatus("Paid"); // Reset status to "Paid" after adding/editing
        setSelectedEntry(null); // Reset selected entry after adding/editing
        setError(null);
      }
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };
  
  const handleEdit = (entry) => {
    setSelectedEntry(entry);
    setMonth(entry.month || ""); // Autofill the month field, if entry.month is falsy, set it to an empty string
    setAmount(entry.amount !== undefined ? entry.amount.toString() : ""); // Autofill the amount field, if entry.amount is not undefined, convert it to string, otherwise set it to an empty string
    setNewStatus(entry.status || ""); // Autofill the status field, if entry.status is falsy, set it to an empty string
    console.log("Edit Entry:", entry);
  };
  

  const handleDelete = async (id) => {
    try {
      if (!waterEntriesCollection) {
        setError("Water entries collection is not defined.");
        return;
      }
  
      if (!auth.currentUser) {
        setError("User is not authenticated.");
        return;
      }
  
      if (!id) {
        setError("ID of the entry to delete is missing.");
        return;
      }
  
      const user = auth.currentUser;
      const entryRef = doc(db, 'entries', user.uid, 'waterData', id);
      await deleteDoc(entryRef);
  
      // Update waterData state by filtering out the deleted entry
      setWaterData(prevWaterData => prevWaterData.filter(entry => entry.id !== id));
  
      console.log(`Successfully deleted entry with ID: ${id}`);
    } catch (error) {
      setError(error.message);
      console.error('Error deleting entry:', error);
    }
  };
  

  return (
    <div >
      <h2>Water Bills Entry</h2>
      <Form>
      <Form.Group className="mb-3" controlId="formNewMonth">
          <InputGroup>
            <InputGroup.Text id="formNewMonth">New Month</InputGroup.Text>
            <select
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="form-select"
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
        <Form.Group className="mb-3">
          <Form.Label>Amount</Form.Label>
          <Form.Control type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
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
        <Button variant="primary" onClick={handleAddWaterBill}>Add Water Bill</Button>
        <Button variant="secondary" onClick={handleRefresh}>Refresh</Button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </Form>
      <br/>
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    S.No
                </th>
                <th scope="col" class="px-6 py-3">
                    Month
                </th>
                <th scope="col" class="px-6 py-3">
                    Amount
                </th>
                <th scope="col" class="px-6 py-3">
                    status
                </th>
                <th scope="col" class="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
          {waterData.map((entry, index) => (
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-600" key={entry.id}>
              <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{index + 1}</td>
              <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{entry.month}</td>
              <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{entry.amount}</td>
              <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">      {entry.status === 'Paid' ? (
        <span className="bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">Paid</span>
      ) : (
        <span className="bg-red-100 text-red-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">Not Paid</span>
      )}</td>
              <td>
                <Button variant="secondary" className="edit" onClick={() => handleEdit(entry)}>
                  Edit
                </Button>
                <Button
                variant="danger"
                className="delete"
                onClick={() => {
                console.log("Clicked delete button. Entry:", entry);
                if (entry && entry.id) {
                  handleDelete(entry.id);
                } else {
                  console.error("ID of entry to delete is missing or undefined.");
                }
              }}>
            Delete
           </Button>
           
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WaterBillsEntry;
