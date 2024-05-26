// import React, { useEffect, useState } from 'react';
// import { auth, db } from "../config/firebase";
// import { collection, getDocs } from 'firebase/firestore';
// import { auth, googleProvider, db } from "../config/firebase";
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
// import { collection, addDoc, getDocs, setDoc, doc } from 'firebase/firestore';

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(null);

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


//   return (
//     <div className="col-md-6">
//       <div className="d-flex flex-column align-items-center">
//           <input
//             className="form-control mb-2"
//             placeholder="Email.."
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <input
//             className="form-control mb-2"
//             type="password"
//             placeholder="Password.."
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <button
//             className="btn btn-primary mb-2"
//             onClick={handleSignIn}
//           >
//             Sign In
//           </button>
//           <button
//             className="btn btn-secondary mb-2"
//             onClick={register}
//           >
//             Register
//           </button>
//           <button
//             className="btn btn-danger"
//             onClick={handleSignInWithGoogle}
//           >
//             Sign In with Google
//           </button>
//           {error && <p className="text-danger mt-2">{error}</p>}
//         </div>
//     </div>
//   );
// };

// export default Login;
