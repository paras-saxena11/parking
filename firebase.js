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
const auth = firebase.auth();
const database = firebase.database();

// Set up our register function
function register() {
  // Get all our input fields
  email = document.getElementById("email").value;
  password = document.getElementById("password").value;
  Cpassword = document.getElementById("confirmPass").value;
  full_name = document.getElementById("Name").value;
  aadhar = document.getElementById("Aadhar").value;
  license = document.getElementById("License").value;
  phone = document.getElementById("phone").value;

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert("Email or Password is Outta Line!!");
    return;
    // Don't continue running the code
  }
  if (
    validate_field(full_name) == false ||
    validate_field(aadhar) == false ||
    validate_field(license) == false ||
    validate_field(phone) == false
  ) {
    alert("One or More Extra Fields is left!!");
    return;
  }

  // Move on with Auth
  auth
    .createUserWithEmailAndPassword(email, password)
    .then(function () {
      // Declare user variable
      var user = auth.currentUser;

      // Add this user to Firebase Database
      var database_ref = database.ref();

      // Create User data
      var user_data = {
        email: email,
        password: password,
        full_name: full_name,
        phone: phone,
        aadhar: aadhar,
        license: license,
        last_login: Date.now(),
      };

      // Push to Firebase Database
      database_ref.child("users/" + user.uid).set(user_data);

      // DOne
      alert("User Created!!");
    })
    .catch(function (error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code;
      var error_message = error.message;

      alert(error_message);
    });
}

// Set up our login function
function login() {
  // Get all our input fields
  email = document.getElementById("email").value;
  password = document.getElementById("password").value;

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert("Email or Password is not correct!!");
    return;
    // Don't continue running the code
  }

  auth
    .signInWithEmailAndPassword(email, password)
    .then(function () {
      // Declare user variable
      var user = auth.currentUser;

      // Add this user to Firebase Database
      var database_ref = database.ref();

      // Create User data
      var user_data = {
        last_login: Date.now(),
      };

      // Push to Firebase Database
      database_ref.child("users/" + user.uid).update(user_data);
      window.location.replace("Payment.html");
      // DOne
      alert("User Logged In!!");
    })
    .catch(function (error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code;
      var error_message = error.message;

      alert(error_message);
    });
}

// Validate Functions
function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/;
  if (expression.test(email) == true) {
    // Email is good
    return true;
  } else {
    // Email is not good
    return false;
  }
}

function validate_password(password) {
  // Firebase only accepts lengths greater than 6
  if (password < 6) {
    return false;
  } else {
    return true;
  }
}

function validate_field(field) {
  if (field == null) {
    return false;
  }

  if (field.length <= 0) {
    return false;
  } else {
    return true;
  }
}
//Signout
function signOut() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      // Sign-out successful.
      alert("Signout Successfuly!");
    })
    .catch((error) => {
      // An error happened.
      console.log(error);
    });
}
//Phone Verification
window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
  "recaptcha-container",
  {
    size: "visible",
    callback: (response) => {
      // reCAPTCHA solved, allow signInWithPhoneNumber.
      otp_send();
    },
  }
);
function otp_send() {
 // let phone = "+91-7753915918";
   const phone = document.getElementById("phone").value;
  firebase
    .auth()
    .signInWithPhoneNumber(phone, recaptchaVerifier)
    .then(function (confirmationResult) {
      // SMS sent. On you mobile SMS will automatically sent via Firebase
      // save with confirmationResult.confirm(code).
      window.confirmationResult = confirmationResult;
      coderesult = confirmationResult;
      alert("OTP sent!");
    })
    .catch(function (error) {
      // Error; SMS will not sent
      alert(error);
      console.log(error);
    });
}

function codeverify() {
  let otp = document.getElementById("code").value;
  coderesult
    .confirm(otp)
    .then(function (result) {
      alert("Successfully Verified!");
      var user = result.user;
      window.replace("design.html");
    })
    .catch(function (error) {
      alert(error.message);
    });
}
// QR code
var QR_CODE = new QRCode("qrcode", {
  width: 220,
  height: 220,
  colorDark: "#000000",
  colorLight: "#ffffff",
  correctLevel: QRCode.CorrectLevel.H,
});
QR_CODE.makeCode(email);
