// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBadROdjpLmaG8ITQ_5IyM7IxERXZgzFYw",
    authDomain: "trail-22e44.firebaseapp.com",
    projectId: "trail-22e44",
    storageBucket: "trail-22e44.appspot.com",
    messagingSenderId: "1039374222225",
    appId: "1:1039374222225:web:167250c0cf1fa888eb5030"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
//   console.log("Auth initialized");
  const auth = firebase.auth();
  const firestore = firebase.firestore();
  
  // Auth state change listener
  auth.onAuthStateChanged(user => {
    if (user) {
      // User is signed in
      document.getElementById('auth-container').style.display = 'none';
      document.getElementById('data-container').style.display = 'block';
      displayData();
    } else {
      // User is signed out
      document.getElementById('auth-container').style.display = 'block';
      document.getElementById('data-container').style.display = 'none';
    }
  });
  
  // User registration
  function register() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    auth.createUserWithEmailAndPassword(email, password)
      .catch(error => console.error(error));
  }
  
  // User sign in
  function signIn() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    auth.signInWithEmailAndPassword(email, password)
      .catch(error => console.error(error));
  }
  
  // User sign out
  function signOut() {
    auth.signOut();
  }
  
  // Add entry to the Firestore database
  function addEntry() {
    const month = document.getElementById('month').value;
    const amount = document.getElementById('amount').value;
  
    firestore.collection('entries').doc(auth.currentUser.uid)
      .collection('monthlyData').add({
        month: month,
        amount: amount
      })
      .then(() => displayData())
      .catch(error => console.error(error));
  }
  
  // Display user's data
  function displayData() {
    const dataTable = document.getElementById('data-table');
    const userId = auth.currentUser.uid;
  
    // Clear previous data
    while (dataTable.firstChild) {
      dataTable.removeChild(dataTable.firstChild);
    }
  
    // Fetch and display data
    firestore.collection('entries').doc(userId)
      .collection('monthlyData').get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          const data = doc.data();
          const row = document.createElement('tr');
          row.innerHTML = `<td>${data.month}</td><td>${data.amount}</td>`;
          dataTable.appendChild(row);
        });
      })
      .catch(error => console.error(error));
  }
  