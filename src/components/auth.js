
// // ******************************
// import { useState, useEffect } from "react";
// import "./auth.css";
// import {
//   auth,
//   googleProvider,
//   db
// } from "../config/firebase";
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signInWithPopup,
//   signOut
// } from "firebase/auth";
// import { collection, addDoc, getDocs ,setDoc,doc} from 'firebase/firestore';

// const Auth = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(null);
//   const [isAuthenticated, setAuthenticated] = useState(false);
//   const [monthlyData, setMonthlyData] = useState({});
//   const [newMonth, setNewMonth] = useState("");
//   const [newAmount, setNewAmount] = useState(0);
//   const [newStatus, setNewStatus] = useState("");

//   useEffect(() => {
//     // Fetch and set monthly data when the user is authenticated
//     if (isAuthenticated) {
//       const fetchData = async () => {
//         const user = auth.currentUser;
//         const userEntriesCollection = collection(db, 'entries', user.uid, 'monthlyData');
//         const querySnapshot = await getDocs(userEntriesCollection);
//         const data = querySnapshot.docs.map(doc => doc.data().data);
//         setMonthlyData(data[0] || {}); // Use the first document's data or an empty object if no document exists
//       };

//       fetchData();
//     }
//   }, [isAuthenticated]);

//   const handleSignIn = async () => {
//     try {
//       setError(null);
//       await signInWithEmailAndPassword(auth, email, password);
//       setAuthenticated(true);
//     } catch (err) {
//       setError(err.message);
//       console.error(err);
//     }
//   };

//   const handleSignInWithGoogle = async () => {
//     try {
//       setError(null);
//       await signInWithPopup(auth, googleProvider);
//       setAuthenticated(true);
//     } catch (err) {
//       setError(err.message);
//       console.error(err);
//     }
//   };

//   const register = async () => {
//     try {
//       // Create a new user in Firebase Authentication
//       await createUserWithEmailAndPassword(auth, email, password);

//       // Get the current user
//       const user = auth.currentUser;

//       // Create a new document in the "entries" collection with the user's UID
//       const userEntriesCollection = collection(db, 'entries', user.uid, 'monthlyData');

//       // Create an empty object for monthlyData
//       const monthlyData = {};

//       // Add the empty object to Firestore
//       await addDoc(userEntriesCollection, { data: monthlyData });

//       setAuthenticated(true);
//     } catch (err) {
//       setError(err.message);
//       console.error(err);
//     }
//   };

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
//       // Get the current user
//       const user = auth.currentUser;
  
//       // Create a reference to the document in the "entries" collection with the user's UID
//       const userEntriesCollection = collection(db, 'entries', user.uid, 'monthlyData');
  
//       // Get the current document data
//       const docSnapshot = await getDocs(userEntriesCollection);
//       const existingData = docSnapshot.empty ? {} : docSnapshot.docs[0].data().data;
  
//       // Update the monthlyData object with the new month's data
//       const updatedMonthlyData = { ...existingData, [newMonth]: { value: newAmount, status: newStatus } };
  
//       // Get a reference to the document in Firestore
//       const userDocumentRef = doc(db, 'entries', user.uid, 'monthlyData', docSnapshot.docs[0].id);
  
//       // Update the document in Firestore
//       await setDoc(userDocumentRef, { data: updatedMonthlyData });
  
//       // Update the local state with the new monthlyData
//       setMonthlyData(updatedMonthlyData);
  
//       // Clear the input fields
//       setNewMonth("");
//       setNewAmount(0);
//       setNewStatus("");
//     } catch (err) {
//       setError(err.message);
//       console.error(err);
//     }
//   };
  
//   return (
//     <div>
//       {isAuthenticated ? (
//         <div>
//           <div>
//             <label>New Month:</label>
//             <input type="text" value={newMonth} onChange={(e) => setNewMonth(e.target.value)} />
//           </div>
//           <div>
//             <label>New Amount:</label>
//             <input type="number" value={newAmount} onChange={(e) => setNewAmount(e.target.value)} />
//           </div>
//           <div>
//             <label>New Status:</label>
//             <input type="text" value={newStatus} onChange={(e) => setNewStatus(e.target.value)} />
//           </div>
//           <button onClick={addNewMonth}>Add New Month</button>
//           <button onClick={handleSignOut}>Sign Out</button>
//         </div>
//       ) : (
//         <div>
//           <input placeholder="Email.." onChange={(e) => setEmail(e.target.value)} />
//           <input
//             type="password"
//             placeholder="Password.."
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <button onClick={handleSignIn}>Sign In</button>
//           <button onClick={register}>Register</button>
//           <button onClick={handleSignInWithGoogle}>Sign In with Google</button>
//           {error && <p style={{ color: "red" }}>{error}</p>}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Auth;
// import React, { useState, useEffect } from "react";
// import { Form, Alert, InputGroup, Button, ButtonGroup } from "react-bootstrap";
// import { auth, googleProvider, db } from "../config/firebase";
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
// import { collection, addDoc, getDocs, setDoc, doc } from 'firebase/firestore';

// const Auth = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(null);
//   const [isAuthenticated, setAuthenticated] = useState(false);
//   const [monthlyData, setMonthlyData] = useState({});
//   const [newMonth, setNewMonth] = useState("");
//   const [newAmount, setNewAmount] = useState(0);
//   const [newStatus, setNewStatus] = useState("");

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

//       fetchData();
//     }
//   }, [isAuthenticated]);

//   const handleSignIn = async () => {
//     try {
//       setError(null);
//       await signInWithEmailAndPassword(auth, email, password);
//       setAuthenticated(true);
//     } catch (err) {
//       setError(err.message);
//       console.error(err);
//     }
//   };

//   const handleSignInWithGoogle = async () => {
//     try {
//       setError(null);
//       await signInWithPopup(auth, googleProvider);
//       setAuthenticated(true);
//     } catch (err) {
//       setError(err.message);
//       console.error(err);
//     }
//   };

//   const register = async () => {
//     try {
//       await createUserWithEmailAndPassword(auth, email, password);

//       const user = auth.currentUser;
//       const userEntriesCollection = collection(db, 'entries', user.uid, 'monthlyData');
//       const monthlyData = {};
//       await addDoc(userEntriesCollection, { data: monthlyData });

//       setAuthenticated(true);
//     } catch (err) {
//       setError(err.message);
//       console.error(err);
//     }
//   };

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
//       const existingData = docSnapshot.empty ? {} : docSnapshot.docs[0].data().data;
//       const updatedMonthlyData = { ...existingData, [newMonth]: { value: newAmount, status: newStatus } };
//       const userDocumentRef = doc(db, 'entries', user.uid, 'monthlyData', docSnapshot.docs[0].id);
//       await setDoc(userDocumentRef, { data: updatedMonthlyData });
//       setMonthlyData(updatedMonthlyData);
//       setNewMonth("");
//       setNewAmount(0);
//       setNewStatus("");
//     } catch (err) {
//       setError(err.message);
//       console.error(err);
//     }
//   };

//   return (
//     <div className="container mt-5">
//       {isAuthenticated ? (
//         <div className="row justify-content-center">
//           <div className="col-md-6">
//             {/* <p className="fs-4 mb-4">Hello, World!</p> */}
//             <Form className="mb-3">
//               <Form.Group className="mb-3" controlId="formNewMonth">
//                 <InputGroup>
//                   <InputGroup.Text id="formNewMonth">New Month</InputGroup.Text>
//                   <Form.Control
//                     type="text"
//                     value={newMonth}
//                     onChange={(e) => setNewMonth(e.target.value)}
//                   />
//                 </InputGroup>
//               </Form.Group>
//               <Form.Group className="mb-3" controlId="formNewAmount">
//                 <InputGroup>
//                   <InputGroup.Text id="formNewAmount">New Amount</InputGroup.Text>
//                   <Form.Control
//                     type="number"
//                     value={newAmount}
//                     onChange={(e) => setNewAmount(e.target.value)}
//                   />
//                 </InputGroup>
//               </Form.Group>
//               <Form.Group className="mb-3" controlId="formNewStatus">
//                 <InputGroup>
//                   <InputGroup.Text id="formNewStatus">New Status</InputGroup.Text>
//                   <Form.Control
//                     type="text"
//                     value={newStatus}
//                     onChange={(e) => setNewStatus(e.target.value)}
//                   />
//                 </InputGroup>
//               </Form.Group>
//               <Button variant="primary" onClick={addNewMonth} className="me-2">
//                 Add New Month
//               </Button>
//               <Button variant="danger" onClick={handleSignOut}>
//                 Sign Out
//               </Button>
//             </Form>
//           </div>
//         </div>
//       ) : (
//         <div className="row justify-content-center">
//           <div className="col-md-4">
//             <input
//               className="form-control mb-2"
//               placeholder="Email.."
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <input
//               className="form-control mb-2"
//               type="password"
//               placeholder="Password.."
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             <button
//               className="btn btn-primary mb-2"
//               onClick={handleSignIn}
//             >
//               Sign In
//             </button>
//             <button
//               className="btn btn-secondary mb-2"
//               onClick={register}
//             >
//               Register
//             </button>
//             <button
//               className="btn btn-danger"
//               onClick={handleSignInWithGoogle}
//             >
//               Sign In with Google
//             </button>
//             {error && <p className="text-danger mt-2">{error}</p>}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Auth;
// 
import React, { useState, useEffect } from "react";
import { Form, Alert, InputGroup, Button, ButtonGroup } from "react-bootstrap";
import { auth, googleProvider, db } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { collection, addDoc, getDocs, setDoc, doc } from 'firebase/firestore';
import "./auth.css"
import MonthlyDataTable from "./DataList";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import WaterBillsEntry from "./waterBills";
import ElectricityBillsEntry from "./electricityBills";
import DashB from "./Dashboard";
import RewardPointsDisplay from "./Rewards";

const Auth = () => {
  console.log('Auth component rendering...');

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [monthlyData, setMonthlyData] = useState({});
  const [waterData,setWaterData] = useState({});
  const [newMonth, setNewMonth] = useState("");
  const [newAmount, setNewAmount] = useState(0);
  const [newStatus, setNewStatus] = useState("Paid");
  const [activeTab, setActiveTab] = useState('electricity');
  const [waterEntriesCollection, setWaterEntriesCollection] = useState(null);

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

      fetchData();
    } 
  }, [isAuthenticated]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    // Fetch and set water data when the component mounts
    const fetchWaterData = async () => {
      try {
        if (auth.currentUser) {
          const user = auth.currentUser;
          const collectionRef = collection(db, 'entries', user.uid, 'waterData');
          setWaterEntriesCollection(collectionRef);

          const querySnapshot = await getDocs(collectionRef);
          const data = querySnapshot.docs.map(doc => doc.data());
          setWaterData(data);
        }
      } catch (err) {
        setError(err.message);
        console.error(err);
      }
    };
    fetchWaterData();
  }, [setWaterData]);


  const handleSignIn = async () => {
    try {
      setError(null);
      await signInWithEmailAndPassword(auth, email, password);
      setAuthenticated(true);
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  const handleSignInWithGoogle = async () => {
    try {
      setError(null);
      await signInWithPopup(auth, googleProvider);
      setAuthenticated(true);
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  const register = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      const user = auth.currentUser;
      const userEntriesCollection = collection(db, 'entries', user.uid, 'monthlyData');
      const monthlyData = {};
      await addDoc(userEntriesCollection, { data: monthlyData });

      setAuthenticated(true);
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
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

  const addNewMonth = async () => {
    try {
      const user = auth.currentUser;
      const userEntriesCollection = collection(db, 'entries', user.uid, 'monthlyData');
      const docSnapshot = await getDocs(userEntriesCollection);
      const existingData = docSnapshot.empty ? {} : docSnapshot.docs[0].data().data;
      const updatedMonthlyData = { ...existingData, [newMonth]: { value: newAmount, status: newStatus } };
      const userDocumentRef = doc(db, 'entries', user.uid, 'monthlyData', docSnapshot.docs[0].id);
      
      await setDoc(userDocumentRef, { data: updatedMonthlyData });
      setMonthlyData(updatedMonthlyData);
      setNewMonth("");
      setNewAmount(0);
      setNewStatus("Paid"); // Reset status to "Paid" after adding a new month
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };
  
  return (
    
    // <Router>
    <div className={`auth-container ${isAuthenticated ? 'authenticated' : ''}`}>
      {isAuthenticated ? (
        // <Router>
        <div className="d-flex flex-column align-items-center">
          <Navbar bg="light" expand="lg" className="fixed-top justify-content-center">
  <Container>
    <Navbar.Brand href="#home">App Name</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link onClick={() => handleTabChange('electricity')} active={activeTab === 'electricity'}>
          Electricity
        </Nav.Link>
        <Nav.Link onClick={() => handleTabChange('water')} active={activeTab === 'water'}>
          Water
        </Nav.Link>
        <Nav.Link onClick={() => handleTabChange('reward')} active={activeTab === 'reward'}>
          Rewards
        </Nav.Link>
        <NavDropdown title="Dashboard" id="basic-nav-dropdown" onClick={() => handleTabChange('Dash')} active={activeTab === 'Dash'}>
          <NavDropdown.Item href="#dashboard">Overview</NavDropdown.Item>
          <NavDropdown.Item href="#monthly-reports">Monthly Reports</NavDropdown.Item>
          {/* Add more dashboard-related links as needed */}
        </NavDropdown>
      </Nav>
      <Nav className="ml-auto">
        <Nav.Link onClick={handleSignOut}>Sign Out</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>


        {activeTab === 'electricity' && <ElectricityBillsEntry />}
        {activeTab === 'water' && <WaterBillsEntry />}
        {activeTab === 'reward' && <RewardPointsDisplay />}
        {activeTab === 'Dash' && <DashB monthlyData={monthlyData} setMonthlyData={setMonthlyData} waterData = {waterData} />}
        {/* {activeTab === 'Dash' && <DashB monthlyData={monthlyData}/>} */}

          {/* <ElectricityBillsEntry/> */}
          {/* <WaterBillsEntry/> */}
          {/* DISPLAY TABLE */}
          {/* <MonthlyDataTable monthlyData={monthlyData} auth={auth} /> */}

        </div>
      ) : (
        <div className="d-flex flex-column align-items-center">
          <input
            className="form-control mb-2"
            placeholder="Email.."
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="form-control mb-2"
            type="password"
            placeholder="Password.."
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="btn btn-primary mb-2"
            onClick={handleSignIn}
          >
            Sign In
          </button>
          <button
            className="btn btn-secondary mb-2"
            onClick={register}
          >
            Register
          </button>
          <button
            className="btn btn-danger"
            onClick={handleSignInWithGoogle}
          >
            Sign In with Google
          </button>
          {error && <p className="text-danger mt-2">{error}</p>}
        </div>
      )}
      </div>
    // </Router>
  );
};

export default Auth;


// ***************************************************************
