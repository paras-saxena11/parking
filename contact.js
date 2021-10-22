// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHMybJ_Waa34sxqptKkcXYt_a1rMq6dYE",
  authDomain: "parking-8ca41.firebaseapp.com",
  projectId: "parking-8ca41",
  storageBucket: "parking-8ca41.appspot.com",
  messagingSenderId: "754001301900",
  appId: "1:754001301900:web:cfc7799533c6303299c6a9",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var firestore = firebase.firestore();
//Variable to access database collection
const db = firestore.collection("contactData");

//Get Submit Form
let submitButton = document.getElementById("smbt");

//Create Event Listener To Allow Form Submission
submitButton.addEventListener("click", (e) => {
  //Prevent Default Form Submission Behavior
  e.preventDefault();

  //Get Form Values
  let firstName = document.getElementById("first").value;
  let email = document.getElementById("email").value;
  let message = document.getElementById("Query").value;

  //Save Form Data To Firebase
  db.doc()
    .set({
      fname: firstName,
      email: email,
      message: message,
    })
    .then(() => {
      console.log("Data saved");
    })
    .catch((error) => {
      console.log(error);
    });

  //alert
  alert("Your Form Has Been Submitted Successfully");
});
