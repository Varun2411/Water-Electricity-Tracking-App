// import React from "react";
// import { Table, Button } from "react-bootstrap";

// const MonthlyDataTable = ({ monthlyData }) => {
//   const renderTableRows = () => {
//     return Object.entries(monthlyData).map(([month, data], index) => (
//       <tr key={index + 1}>
//         <td>{index + 1}</td>
//         <td>{month}</td>
//         <td>{data.value}</td>
//         <td>{data.status}</td>
//         <td>
//           {/* You can add your custom actions or buttons here */}
//         </td>
//       </tr>
//     ));
//   };

//   return (
//     <div>
//       <h2>Monthly Data</h2>
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
//         <tbody>{renderTableRows()}</tbody>
//       </Table>
//     </div>
//   );
// };

// export default MonthlyDataTable;


// import React, { useState } from "react";
// import { Table, Button } from "react-bootstrap";
// import { doc, setDoc,getDoc,updateDoc,arrayRemove ,deleteDoc ,getDocs,collection } from "firebase/firestore";
// import {  db } from "../config/firebase";

// const MonthlyDataTable = ({ monthlyData,auth }) => {
//   const [editData, setEditData] = useState(null);

//   const handleEdit = async (month, data) => {
//     try {
//       // Implement your edit functionality here
//       // For demonstration purposes, let's update the status to 'Updated'
//       const updatedData = { ...data, status: 'Updated' };

//       // Get a reference to the document in Firestore
//       const userDocumentRef = doc(db, 'entries', auth.currentUser.uid, 'monthlyData');

//       // Clone the existing monthlyData to avoid directly modifying state
//       const updatedMonthlyData = { ...monthlyData, [month]: updatedData };

//       // Update the document in Firestore
//       await setDoc(userDocumentRef, updatedMonthlyData);

//       console.log(`Successfully updated data for ${month}`);
//     } catch (error) {
//       console.error('Error updating data:', error);
//     }
//   };

//   const handleDelete = async (month) => {
//     try {
//       // Get a reference to the specific document containing monthlyData in Firestore
//       const userCollectionRef = collection(db, 'entries', auth.currentUser.uid, 'monthlyData');
//       const querySnapshot = await getDocs(userCollectionRef);
      
//       // Check if any documents exist
//       if (querySnapshot.empty) {
//         console.error('No documents found');
//         return;
//       }
      
//       // Assuming there's only one document in the collection, you can use .docs[0]
//       const document = querySnapshot.docs[0];
  
//       // Fetch the actual document ID
//       const documentId = document.id;
  
//       // Get a reference to the document using the fetched document ID
//       const userDocumentRef = doc(db, 'entries', auth.currentUser.uid, 'monthlyData', documentId);
  
//       // Fetch the current document data
//       const docSnapshot = await getDoc(userDocumentRef);
      
//       if (!docSnapshot.exists()) {
//         console.error('Document does not exist');
//         return;
//       }
  
//       const currentData = docSnapshot.data();
  
//       console.log("Current data:", currentData); // Log currentData to inspect its structure
  
//       // Check if 'monthlyData' property exists before proceeding
//       if (currentData && currentData.data) {
//         // Clone the existing monthlyData to avoid directly modifying state
//         const updatedMonthlyData = { ...currentData.data };
  
//         // Remove the specific month from the data
//         delete updatedMonthlyData[month];
  
//         // Update only the 'monthlyData' field in Firestore
//         await setDoc(userDocumentRef, { data: updatedMonthlyData });
  
//         console.log(`Successfully deleted data for ${month}`);
//       } else {
//         console.error('Monthly data property not found in document');
//       }
//     } catch (error) {
//       console.error('Error deleting data:', error);
//     }
//   };
  
  
  
  
  
  

//   const renderTableRows = () => {
//     return Object.entries(monthlyData).map(([month, data], index) => (
//       <tr key={index + 1}>
//         <td>{index + 1}</td>
//         <td>{month}</td>
//         <td>{data.value}</td>
//         <td>{data.status}</td>
//         <td>
//           <Button
//             variant="secondary"
//             className="edit"
//             onClick={() => handleEdit(month, data)}
//           >
//             Edit
//           </Button>
//           <Button
//             variant="danger"
//             className="delete"
//             onClick={() => handleDelete(month)}
//           >
//             Delete
//           </Button>
//         </td>
//       </tr>
//     ));
//   };

//   return (
//     <div>
//       <h2>Monthly Data Table</h2>
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
//         <tbody>{renderTableRows()}</tbody>
//       </Table>
//     </div>
//   );
// };

// export default MonthlyDataTable;


import React, { useState } from "react";
import { Table , Form , Button} from "react-bootstrap";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button as MTButton,
} from "@material-tailwind/react"; // Importing Material Tailwind components
import { doc, setDoc,getDoc,getDocs,collection } from "firebase/firestore";
import { db } from "../config/firebase";

const MonthlyDataTable = ({ monthlyData, auth ,rewardedEntries}) => {
  const [editData, setEditData] = useState(null);
  const [editMonth, setEditMonth] = useState("");
  const [editAmount, setEditAmount] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleEdit = async (month, data) => {
    setEditMonth(month);
    setEditAmount(data.value);
    setEditData(data);
    setDialogOpen(true); // Open the dialog box
  };

  const handleSaveEdit = async () => {
    try {
      const updatedData = { status: editData.status, value: editAmount };
  
      // Construct the correct collection reference
      const userCollectionRef = collection(db, 'entries', auth.currentUser.uid, 'monthlyData');
  
      // Fetch the document containing the monthlyData
      const querySnapshot = await getDocs(userCollectionRef);
  
      // Check if any documents exist
      if (!querySnapshot.empty) {
        // Assuming there's only one document in the collection
        const document = querySnapshot.docs[0];
        const documentId = document.id;
  
        // Construct the correct document reference using the fetched document ID
        const userDocumentRef = doc(db, 'entries', auth.currentUser.uid, 'monthlyData', documentId);
  
        // Fetch the current document snapshot
        const docSnapshot = await getDoc(userDocumentRef);
  
        // Check if the document exists
        if (docSnapshot.exists()) {
          // Get the existing data from the document
          const currentData = docSnapshot.data();
  
          // Check if 'data' property exists before proceeding
          if (currentData && currentData.data) {
            // Clone the existing data to avoid directly modifying state
            const updatedMonthlyData = { ...currentData.data };
  
            // Update the specific month's data
            updatedMonthlyData[editMonth] = updatedData;
  
            // Update only the 'data' field in Firestore
            await setDoc(userDocumentRef, { data: updatedMonthlyData });
  
            console.log(`Successfully updated data for ${editMonth}`);
          } else {
            console.error('Monthly data property not found in document');
          }
        } else {
          console.error('Document does not exist');
        }
      } else {
        console.error('No documents found');
      }
  
      setEditMonth("");
      setEditAmount("");
      setEditData(null);
      setDialogOpen(false); // Close the dialog box after saving
    } catch (error) {
      console.error('Error saving edit:', error);
    }
  };
  
    const handleDelete = async (month) => {
    try {
      if (rewardedEntries.includes(month)) {
        // Reduce 10 points if the entry earned rewards
        // Implement the logic to reduce 10 points here
        // For example:
        // setRewardPoints(prevPoints => prevPoints - 10);
        console.log(`Reduced 10 points for the deleted entry in ${month}`);
      }
      // Get a reference to the specific document containing monthlyData in Firestore
      const userCollectionRef = collection(db, 'entries', auth.currentUser.uid, 'monthlyData');
      const querySnapshot = await getDocs(userCollectionRef);
      
      // Check if any documents exist
      if (querySnapshot.empty) {
        console.error('No documents found');
        return;
      }
      
      // Assuming there's only one document in the collection, you can use .docs[0]
      const document = querySnapshot.docs[0];
  
      // Fetch the actual document ID
      const documentId = document.id;
  
      // Get a reference to the document using the fetched document ID
      const userDocumentRef = doc(db, 'entries', auth.currentUser.uid, 'monthlyData', documentId);
  
      // Fetch the current document data
      const docSnapshot = await getDoc(userDocumentRef);
      
      if (!docSnapshot.exists()) {
        console.error('Document does not exist');
        return;
      }
  
      const currentData = docSnapshot.data();
  
      console.log("Current data:", currentData); // Log currentData to inspect its structure
  
      // Check if 'monthlyData' property exists before proceeding
      if (currentData && currentData.data) {
        // Clone the existing monthlyData to avoid directly modifying state
        const updatedMonthlyData = { ...currentData.data };
  
        // Remove the specific month from the data
        delete updatedMonthlyData[month];
        let rewardPoints = 0;
        const userData = docSnapshot.data();
        rewardPoints = userData.rewardPoints || 0;
        // Update only the 'monthlyData' field in Firestore
        await setDoc(userDocumentRef, { data: updatedMonthlyData , rewardPoints:rewardPoints });
  
        console.log(`Successfully deleted data for ${month}`);
      } else {
        console.error('Monthly data property not found in document');
      }
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  }; 
  
  
  const renderTableRows = () => {
    
    return Object.entries(monthlyData).map(([month, data], index) => (
      <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-600" key={index + 1}>
        <td className="px-2 sm:px-4 py-2 sm:py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{index + 1}</td>
        <td className="px-2 sm:px-4 py-2 sm:py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{month}</td>
        <td className="px-2 sm:px-4 py-2 sm:py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{data.value}</td>
        <td className="px-2 sm:px-4 py-2 sm:py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          {data.status === 'Paid' ? (
            <span className="bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">Paid</span>
          ) : (
            <span className="bg-red-100 text-red-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">Not Paid</span>
          )}
        </td>
        <td className="px-2 sm:px-4 py-2 sm:py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          {/* Use Material Tailwind Button for edit */}
          <Button
            variant="secondary"
            className="edit"
            onClick={() => handleEdit(month, data)}
          >
            Edit
          </Button>
          <Button
            variant="danger"
            className="delete"
            onClick={() => handleDelete(month)}
          >
            Delete
          </Button>
        </td>
      </tr>
    ));
  };
  
  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto text-sm sm:text-base text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs sm:text-sm text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-2 sm:px-4 py-2 sm:py-3">S.No</th>
            <th className="px-2 sm:px-4 py-2 sm:py-3">Month</th>
            <th className="px-2 sm:px-4 py-2 sm:py-3">Amount</th>
            <th className="px-2 sm:px-4 py-2 sm:py-3">Status</th>
            <th className="px-2 sm:px-4 py-2 sm:py-3">Action</th>
          </tr>
        </thead>
        <tbody>{renderTableRows()}</tbody>
      </table>
  
      {/* Edit Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogHeader>Edit Month: {editMonth}</DialogHeader>
        <DialogBody>
          <Form>
            <Form.Group controlId="editAmount">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter amount"
                value={editAmount}
                onChange={(e) => setEditAmount(e.target.value)}
              />
            </Form.Group>
          </Form>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => setDialogOpen(false)}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleSaveEdit}>
            <span>Save</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
  
};

export default MonthlyDataTable;
