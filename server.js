//jshint esversion:6

const express = require('express')
var bodyParser = require('body-parser')
const ejs = require('ejs')
const cookieParser = require('cookie-parser');
const multer = require("multer");
const path = require("path");
const nodemailer = require('nodemailer');
const session = require('express-session');

const http = require('http');

const app = express()
app.set('view engine', 'ejs');

// const upload = multer({ dest: "uploads/" });

app.use(express.static("uploads"));
app.use("/uploads", express.static("./uploads"));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Set the destination directory for uploaded files
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    // Set the file name for uploaded files
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });// Allow uploading up to 4 files


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(session({
  secret: '291',
  resave: false,
  saveUninitialized: true
}));

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"));
app.use(express.static("uploads"));
app.use(express.static("javascript"));


//  data base mysql connection

const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Allajpk@291407',
  database: 'doctors'
});


db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL database.');
    // Start executing your queries here
  }
});


//  get methods for digfernett pages
function requireUserLogin(req, res, next) {
  if (!req.cookies.userName) {
    // Redirect to the login page if the user is not authenticated
    res.redirect("/login");
      // res.end('<script>window.location.replace("/ambulance");</script>');
  } else {
    next();
  }
}

app.get("/", function(req, res){
  res.render("index");
});

app.get("/login", function(req, res){
  res.render("login");
});

app.get("/loading", function(req, res){
  res.render("loading");
});

app.get("/contact", requireUserLogin, function(req, res){
  res.render("contact");
});

app.get("/takeappointment", function(req, res){
  res.render("takeappointment");
});

app.get("/appointmentDetails", requireUserLogin, function(req, res){
  res.render("appointmentDetails");
});

app.get("/bookingDetails", requireUserLogin, function(req, res){
  res.render("bookingDetails");
});

app.get("/appointmentHistory", requireUserLogin, function(req, res){
  res.render("appointmentHistory");
});

app.get("/bookingHistory", requireUserLogin, function(req, res){
  res.render("bookingHistory");
});

app.get("/mainpage", requireUserLogin, function(req, res){
  res.render("mainpage");
});

app.get("/doctorslogin", requireUserLogin, function(req, res){
  res.render("doctorslogin");
});

function requireLoginToDoctor(req, res, next) {
  if (!req.cookies.doctorUserName) {
    // Redirect to the login page if the user is not authenticated
    res.redirect("/doctorslogin");
      // res.end('<script>window.location.replace("/ambulance");</script>');
  } else {
    next();
  }
}

app.get("/doctors", requireLoginToDoctor, function(req, res) {

  res.render("doctors", { user: req.cookies.doctorUserName });

});

app.get("/doctorprofile", function(req, res){
  res.render("doctorprofile");
});

app.get("/doctorprofileadd", requireLoginToDoctor, function(req, res){
  res.render("doctorprofileadd");
});

app.get("/doctorprofileUpdate", requireLoginToDoctor, function(req, res){
  res.render("doctorprofileUpdate");
});

app.get("/doctorprofileDate&Time", requireLoginToDoctor, function(req, res){
  res.render("doctorprofileDate&Time");
});

app.get("/doctorfilesUpdate", requireLoginToDoctor, function(req, res){
  res.render("doctorfilesUpdate");
});

app.get("/doctorProfilePicUpdate", requireLoginToDoctor, function(req, res){
  res.render("doctorProfilePicUpdate");
});

app.get("/doctorfilesAdd", requireLoginToDoctor, function(req, res){
  res.render("doctorfilesAdd");
});

app.get("/doctorfileupload", function(req, res){
  res.render("doctorfileupload");
});


app.get("/patientslist", requireLoginToDoctor, function(req, res){
  res.render("patientslist");
});

app.get("/errorpage", function(req, res){
  res.render("errorpage");
});

app.get("/errorD1", function(req, res){
  res.render("errorD1");
});

// app.get("/doctorslist", requireUserLogin, function(req, res){
//   res.render("doctorslist");
// });

app.get("/bookdetails", requireUserLogin, function(req, res){
  res.render("bookdetails");
});

app.get("/prescription", requireUserLogin, function(req, res){
  res.render("prescription");
});

app.get("/sendprescription", requireLoginToDoctor, function(req, res){
  res.render("sendprescription");
});

app.get("/details", requireUserLogin, function(req, res){
  res.render("details");
});

app.get("/history", requireUserLogin, function(req, res){
  res.render("history");
});

app.get("/hospitals", function(req, res){
  res.render("hospitals");
});

app.get("/hospitalslist", function(req, res){
  res.render("hospitalslist");
});

app.get("/ambulancelogin", requireUserLogin, function(req, res){
  res.render("ambulancelogin");
});

function requireLogin(req, res, next) {
  if (!req.cookies.driverUserName) {
    // Redirect to the login page if the user is not authenticated
    res.redirect("/ambulancelogin");
      // res.end('<script>window.location.replace("/ambulance");</script>');
  } else {
    next();
  }
}

app.get("/ambulance", requireLogin, function(req, res) {
  // Render the protected page
  res.render("ambulance");
  // res.render("ambulance");
});

app.get("/driverprofile", function(req, res){
  res.render("driverprofile");
});

app.get("/driverprofileAdd", requireLogin, function(req, res){
  res.render("driverprofileAdd");
});

app.get("/driverprofileUpdate", requireLogin, function(req, res){
  res.render("driverprofileUpdate");
});

app.get("/driverprofileDate&Time", requireLogin, function(req, res){
  res.render("driverprofileDate&Time");
});

app.get("/driverProfilePicUpdate", requireLogin, function(req, res){
  res.render("driverProfilePicUpdate");
});

app.get("/driverfilesAdd", requireLogin, function(req, res){
  res.render("driverfilesAdd");
});

app.get("/driverfilesupload", function(req, res){
  res.render("driverfilesupload");
});


// app.get("/ambulancelists", requireUserLogin, function(req, res){
//   res.render("ambulancelists");
// });

app.get("/bookambulance", function(req, res){
  res.render("bookambulance");
});

app.get("/adminlogin", requireUserLogin, function(req, res){
  res.render("adminlogin");
});


function requireadminLogin(req, res, next) {
  if (!req.cookies.adminName) {
    // Redirect to the login page if the user is not authenticated
    res.redirect("/adminlogin");
      // res.end('<script>window.location.replace("/ambulance");</script>');
  } else {
    next();
  }
}


app.get("/admin", requireadminLogin, function(req, res){
  res.render("admin");
});

app.get("/approvedDoctors", requireadminLogin, function(req, res){
  res.render("approvedDoctors");
});


app.get("/pendingDoctors", requireadminLogin, function(req, res){
  res.render("pendingDoctors");
});

app.get("/approvedDrivers", requireadminLogin, function(req, res){
  res.render("approvedDrivers");
});

app.get("/pendingDrivers", requireadminLogin, function(req, res){
  res.render("pendingDrivers");
});


//  post methods for differnt forms.....


//  signup for users............................................................

app.post("/signup", function(req, res){
  const name = req.body.name1;
  const password = req.body.password1;
  const email = req.body.email;

  const q = "INSERT INTO user(`userName`, `userPassword`, `userEmail`) VALUES (?)";

  const values = [
    name,
    password,
    email,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.redirect("/login");
  });
});


// login for users..............................................................


app.post("/login", function(req, res){
  const q = "SELECT * FROM user WHERE userName = ? AND userPassword = ?";
  const values = [
    req.body.name2,
    req.body.password2
  ];

  db.query(q, values, (err, data) => {
    if (err) {
      // Handle the error
      return res.send(err);
    }

    if (data.length > 0) {
       // Login successful
       const userDetails = {
         userName: req.body.name2,
         userEmail: data[0].userEmail
       };

       console.log(userDetails);

       // Set user details as cookies
       res.cookie('userName', userDetails.userName);
       res.cookie('userEmail', userDetails.userEmail);

       // to store the no of users in cookies

       const noofUser = "SELECT COUNT(*) AS users FROM user";

       db.query(noofUser, (err, results) => {
         if (err) {
           console.error(err);
           return res.render("errorU1", { errorMessage: "Failed to fetch user count." });
         }

         const users = results[0].users;

         // Set the user count as a cookie
         res.cookie('totalUsers', users);

         return res.render("loading");
       });
     } else {
       // Login failed
       return res.render("errorU1", { errorMessage: "Incorrect password/UserName." });
     }
   });
 });



// logout the use page..........................................................


app.post("/logoutUser", function(req, res) {
  // Clear the cookies
  res.clearCookie("userName");
  res.clearCookie("userEmail");
  res.clearCookie("doctorUserName");
  res.clearCookie("doctorUserEmail");
  res.clearCookie("driverUserName");
  res.clearCookie("driverUserEmail");
  res.clearCookie("adminName");
  res.clearCookie("adminPassword");
  res.clearCookie("totalUsers");
  res.clearCookie("totalDoctors");
  res.clearCookie("totalPendingDoctors");
  res.clearCookie("totalApprovedDoctors");
  res.clearCookie("totalDrivers");
  res.clearCookie("totalPendingDrivers");
  res.clearCookie("totalApprovedDrivers");

  // Set cache-control headers to prevent caching
  res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");

  res.end(`
     <script>
       window.onload = function() {
         window.location.replace("/login");
         window.history.pushState(null, null, "/mainpage");
       };
     </script>
   `);
 });


// change User password.........................................................


app.post("/changeUserPassword", function(req, res) {
  const email = req.body.email;

  // Check if the entered email exists in the 'user' table
  const selectQuery = "SELECT * FROM user WHERE userEmail = ?";
  db.query(selectQuery, [email], (err, results) => {
    if (err) {
      console.error(err);
      return res.render("errorU1", { errorMessage: "Failed to retrieve user details." });
    }

    if (results.length === 0) {
      // Email not found in the 'user' table
      return res.render("errorU1", { errorMessage: "Email ID is not found." });
    }

    // Email exists, retrieve the corresponding password
    const password = results[0].userPassword;
    const name = results[0].userName;

    // Create a nodemailer transporter to send the email
    const transporter = nodemailer.createTransport({
      // Configure the transporter with your email service provider details
      // For example, using a Gmail account:
      service: 'gmail',
      auth: {
        user: 'ahsanallajpk22@gmail.com',
        pass: 'iyiuvrdfvfrspksj'
      }
    });

    const mailOptions = {
      from: 'ahsanallajpk22@gmail.com',
      to: email,
      subject: 'Password Recovery',
      html: `<h4>Your name is: ${name}</h4>
             <h4>Your password is: ${password}</h4>
             <p style="color: #666;">Thank you for using our service</p>
             <p style="color: #666;">Doctors</p>`
    };

    // Send the email
    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.error(error);
        return res.render("errorU1", { errorMessage: "Failed to send email." });
      } else {
        console.log("Email has been sent to user's email");
        return res.render("successU1", { success: "Password has been sent to your email." });
      }
    });
  });
});



// serch doctors................................................................


app.post("/doctorslist", requireUserLogin, function(req, res) {

  let specialization = req.body.specialization;
  let city = req.body.city;
  let date = req.body.date;

  // Convert the entered date string to a Date object
  const enteredDate = new Date(date);

  // Get the current date
  const currentDate = new Date();

  // Check if the entered date is in the past
  if (enteredDate < currentDate) {
    return res.render("errorD4", { errorMessage: "Please enter a valid future date." });
  }

  const q = "SELECT d.*, f.doctorProfilePic FROM doctors.approveddoctors AS d LEFT JOIN doctorsfiles AS f ON d.doctorUsername = f.doctorUsername WHERE d.doctorSpecialization = ? AND d.doctorHospitalCity = ? AND d.doctorHospitalDates LIKE ?";
  const searchDate = `%${date}%`;


  db.query(q, [specialization, city, searchDate], (err, results) => {
    if (err) {
      // Handle the error appropriately
      console.error(err);
      return res.render("errorD4", { errorMessage: "Failed to fetch doctors list." });
    }



    if (results.length === 0) {
      // No doctors found for the specified specialization, city, and date
      return res.render("errorD4", { errorMessage: "No doctors are available" });
    }


    const userDetails = {
      specialization: req.body.specialization,
      city: req.body.city,
      date: date
    };

    console.log(userDetails);

    // Set user details as cookies
    res.cookie('specialization', userDetails.specialization);
    res.cookie('city', userDetails.city);
    res.cookie('date', userDetails.date);

    // Render the "doctorslist" page and pass the retrieved data and search date to display the list of doctors
    res.render("doctorslist", { searchDate: date, doctors: results });
  });
});




//  go back to the doctors lists...............................................



app.get("/doctorslist", requireUserLogin, function(req, res) {

  const specialization = req.cookies.specialization;
  const city = req.cookies.city;
  const date = req.cookies.date;



  const q = "SELECT d.*, f.doctorProfilePic FROM doctors.approveddoctors AS d LEFT JOIN doctorsfiles AS f ON d.doctorUsername = f.doctorUsername WHERE d.doctorSpecialization = ? AND d.doctorHospitalCity = ? AND d.doctorHospitalDates LIKE ?";
  const searchDate = `%${date}%`;

  db.query(q, [specialization, city, searchDate], (err, results) => {
    if (err) {
      // Handle the error appropriately
      console.error(err);
      return res.render("errorD4", { errorMessage: "Failed to fetch doctors list." });
    }

    if (results.length === 0) {
      // No doctors found for the specified specialization, city, and date
      return res.render("errorD4", { errorMessage: "No doctors are available" });
    }


    // Render the "doctorslist" page and pass the retrieved data and search date to display the list of doctors
    res.render("doctorslist", { searchDate: date, doctors: results });
  });
});




// to render the doctor details from the button to the page takeappointment.....


app.post("/takeappointment", function(req, res) {
  const doctorName = req.body.doctorName;
  const doctorUserName = req.body.doctorUserName;
  const specialization = req.body.specialization;
  const hospitalName = req.body.hospitalName;
  const hospitalPlace = req.body.hospitalPlace;
  const hospitalCity = req.body.hospitalCity;
  const date = req.body.date;
  const time = req.body.time;

  // Pass the data to the takeappointment view
  res.render("takeappointment", {
    doctorName: doctorName,
    doctorUserName: doctorUserName,
    specialization: specialization,
    hospitalName: hospitalName,
    hospitalPlace: hospitalPlace,
    hospitalCity: hospitalCity,
    date: date,
    time: time
  });
  console.log(doctorName);
});


// confirm the doctor appointment page..........................................


app.post("/confirm", function(req, res) {

  res.clearCookie("specialization");
  res.clearCookie("date");
  res.clearCookie("place");
  res.clearCookie("cityDriver");
  res.clearCookie("placeDriver");
  res.clearCookie("dateDriver");

  const pname = req.body.pname;
  const pgender = req.body.gender;
  const page = req.body.page;
  const pemail = req.body.pemail;
  const pphoneno = req.body.pphoneno;
  const doctorName = req.body.doctorName;
  const doctorUserName = req.body.doctorUserName;
  const specialization = req.body.specialization;
  const hospitalName = req.body.hospitalName;
  const hospitalPlace = req.body.hospitalPlace;
  const hospitalCity = req.body.hospitalCity;
  const date = req.body.date;
  const time = req.body.time;

  // Process the retrieved details as needed
  // Get the current date and time
  const currentDateTime = new Date();
  const bookingDate = currentDateTime.toDateString();
  const bookingTime = currentDateTime.toLocaleTimeString();

    // Insert the data into the database table
    const insertQuery = 'INSERT INTO patient (patientName, patientGender, patientAge, patientEmail, patientPhoneNo, doctorName, doctorUserName, doctorSpecialization, doctorHospitalName, doctorHospitalPlace, doctorHospitalCity, doctorHospitalDate, doctorHospitalTime, bookingDate, bookingTime) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(insertQuery, [pname, pgender, page, pemail, pphoneno, doctorName, doctorUserName, specialization, hospitalName, hospitalPlace, hospitalCity, date, time, bookingDate, bookingTime], (insertErr, insertResult) => {
      if (insertErr) {
        console.error(insertErr);
        // Handle the error appropriately
        return res.render("errorP1", { errorMessage: "Failed to insert patient details." });
      }

      const patientIdQuery = 'SELECT patientId FROM patient WHERE bookingTime = ?';
            db.query(patientIdQuery, [bookingTime], (patientIdErr, patientIdResult) => {
              if (patientIdErr) {
                console.error(patientIdErr);
                // Handle the error appropriately
                return res.render("errorP1", { errorMessage: "Failed to retrieve patient ID." });
              }


              const patientId = patientIdResult[0].patientId;


      // Send confirmation email
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'ahsanallajpk22@gmail.com',
          pass: 'iyiuvrdfvfrspksj'
        }
      });

      const mailOptions = {
    from: 'ahsanallajpk22@gmail.com',
    to: pemail,
    subject: 'Appointment Confirmation',
    html: `<h3 style="color: #333; font-family: Arial, sans-serif;">Dear ${pname},</h3>
      <p style="font-size: 16px;">Your Appointment has been confirmed, And your patient ID is  ${patientId}</p>
      <h4 style="color: #666;">Doctor: ${doctorName}</h4>
      <h4 style="color: #666;">Specialization: ${specialization}</h4>
      <h4 style="color: #666;">Hospital Name: ${hospitalName}</h4>
      <h4 style="color: #666;">Hospital Place: ${hospitalPlace}</h4>
      <h4 style="color: #666;">Date: ${date}</h4>
      <h4 style="color: #666;">Time: ${time}</h4>
      <br>
      <p style="font-size: 16px;">Thank you for using our service,</p>
      <p style="font-size: 16px; color: white;">Doctors</p>`
  };


      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          console.error(error);
          // Handle the email sending error
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

      // Render a success or confirmation page
      return res.render("confirmationPage", { success: "Your Appointment Has Been Confirmed." });
    });
  });
});


//  signup for doctors..........................................................


app.post("/doctorsignup", function(req, res) {
  const username = req.body.name1;
  const email = req.body.email;
  const password = req.body.password1;

  const checkQuery = "SELECT * FROM doctor WHERE doctorUserName = ?";
  db.query(checkQuery, [username], (err, data) => {
    if (err) {
      // Handle the error appropriately
      console.error(err);
      return res.render("errorpage", { errorMessage: "Failed to check username existence." });
    }

    if (data.length > 0) {
      // The username already exists
      return res.render("errorD1", { errorMessage: "Username already exists. Please choose a different username." });
    }

    const insertQuery = "INSERT INTO doctor (doctorUserName, doctorEmail, doctorPassword) VALUES (?, ?, ?)";
    const values = [username, email, password];
    db.query(insertQuery, values, (err, result) => {
      if (err) {
        // Handle the error appropriately
        console.error(err);
        return res.render("errorD1", { errorMessage: "Failed to create account." });
      }

      return res.redirect("/doctorprofile");
    });
  });
});


// login for doctors............................................................


app.post("/doctors", function(req, res) {
  const q = "SELECT * FROM doctor WHERE doctorUserName = ? AND doctorPassword = ?";
  const values = [
    req.body.uname,
    req.body.password2
  ];

  db.query(q, values, (err, data) => {
    if (err) {
      // Handle the error
      return res.send(err);
    }

    if (data.length > 0) {
        // Login successful
        const docDetails = {
          doctorUserName: req.body.uname,
          doctorEmail: data[0].doctorEmail
        };

        console.log(docDetails);

        // Set user details as cookies
        res.cookie('doctorUserName', docDetails.doctorUserName);
        res.cookie('doctorEmail', docDetails.doctorEmail);

        // to store the no of doctors in cookies

        const selectPendingCount = "SELECT COUNT(*) AS pendingCount FROM doctor";

        db.query(selectPendingCount, (pendingErr, pendingResults) => {
          if (pendingErr) {
            console.error(pendingErr);
            return res.render("errorAD2", { errorMessage: "Failed to fetch pending doctor count" });
          }

          const pendingCount = pendingResults[0].pendingCount;

          // Set the pending doctor count as a cookie
          res.cookie('totalDoctors', pendingCount);

          return res.render("loadingdoctors");
        });
      } else {
        // Login failed
        return res.render("errorD1", { errorMessage: "Incorrect Username or Password." });
      }
    });
  });



// recover Doc password.........................................................


app.post("/recoverDocPassword", function(req, res) {
  const email = req.body.email;

  // Check if the entered email exists in the 'user' table
  const selectQuery = "SELECT * FROM doctor WHERE doctorEmail = ?";
  db.query(selectQuery, [email], (err, results) => {
    if (err) {
      console.error(err);
      return res.render("errorD1", { errorMessage: "Failed to retrieve user details." });
    }

    if (results.length === 0) {
      // Email not found in the 'user' table
      return res.render("errorD1", { errorMessage: "Email ID is not found." });
    }

    // Email exists, retrieve the corresponding password
    const password = results[0].doctorPassword;
    const name = results[0].doctorUserName;

    // Create a nodemailer transporter to send the email
    const transporter = nodemailer.createTransport({
      // Configure the transporter with your email service provider details
      // For example, using a Gmail account:
      service: 'gmail',
      auth: {
        user: 'ahsanallajpk22@gmail.com',
        pass: 'iyiuvrdfvfrspksj'
      }
    });

    const mailOptions = {
      from: 'ahsanallajpk22@gmail.com',
      to: email,
      subject: 'Password Recovery',
      html: `<h4>Your name is: ${name}</h4>
             <h4>Your password is: ${password}</h4>
             <p style="color: #666;">Thank you for using our service</p>
             <p style="color: #666;">Doctors</p>`
    };

    // Send the email
    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.error(error);
        return res.render("errorD1", { errorMessage: "Failed to send email." });
      } else {
        console.log("Email has been sent to user's email");
        return res.render("successD2", { success: "Password has been sent to your email." });
      }
    });
  });
});



// create profile for doctors...................................................


app.post("/createprofile", function(req, res) {
  const uname = req.body.uname;
  const name = req.body.name;
  const gender = req.body.gender;
  const age = req.body.age;
  const qualifications = req.body.qualifications;
  const specialization = req.body.specialization;
  const yearofexp = req.body.yearofexp;
  const place = req.body.place;
  const hospitalName = req.body.hospitalName;
  const hospitalPlace = req.body.hospitalPlace;
  const hospitalCity = req.body.hospitalCity;
  const dates = Array.isArray(req.body.dates) ? req.body.dates : [req.body.dates];
  const days = Array.isArray(req.body.days) ? req.body.days : [req.body.days];
  const startTime = req.body.startTime;
  const endTime = req.body.endTime;

  // Validate input here

  const profileCheckQuery = "SELECT * FROM doctor WHERE doctorUserName = ?";
  db.query(profileCheckQuery, [uname], (err, data) => {
    if (err) {
      // Handle the error appropriately
      console.error(err);
      return res.render("errorpage", { errorMessage: "Failed to check profile existence." });
    }

    if (data.length > 0) {
      // A profile already exists for the user
      const q = "INSERT INTO pendingdoctors (`doctorUserName`, `doctorName`, `doctorGender`, `doctorAge`, `doctorQualification`, `doctorSpecialization`, `doctorYearOfExp`, `doctorPlace`, `doctorHospitalName`, `doctorHospitalPlace`, `doctorHospitalCity`, `doctorHospitalDates`, `doctorHospitalDays`, `doctorStartTime`, `doctorEndTime`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

      db.query(q, [uname, name, gender, age, qualifications, specialization, yearofexp, place, hospitalName, hospitalPlace, hospitalCity, dates.join(', '), days.join(', '), startTime, endTime], (err, data) => {
        if (err) {
          // Handle the error appropriately
          console.error(err);
          return res.render("errorD2", { errorMessage: "Failed to send request. Invalid username." });
        }

        const selectPendingCount = "SELECT COUNT(*) AS pendingCount FROM pendingdoctors";

          db.query(selectPendingCount, (pendingErr, pendingResults) => {
            if (pendingErr) {
              console.error(pendingErr);
              return res.render("errorAD2", { errorMessage: "Failed to fetch approved doctor count" });
            }


            const pendingCount = pendingResults[0].pendingCount;

            // Set the pending and approved doctor counts as cookies

            res.cookie('totalPendingDoctors', pendingCount);

          return res.render("successD3", { success: "Successfully created profile." });
      });
      });
    } else {
      return res.render("errorD2", { errorMessage: "Invalid User Name." });
    }
  });
});


// Add profile for doctors......................................................


app.post("/doctorprofileadd", function(req, res) {
  // if (!req.cookies.doctorUserName) {
  //   res.redirect("doctorslogin");
  // }
  const uname = req.cookies.doctorUserName;
  const name = req.body.name;
  const gender = req.body.gender;
  const age = req.body.age;
  const qualifications = req.body.qualifications;
  const specialization = req.body.specialization;
  const yearofexp = req.body.yearofexp;
  const place = req.body.place;
  const hospitalName = req.body.hospitalName;
  const hospitalPlace = req.body.hospitalPlace;
  const hospitalCity = req.body.hospitalCity;
  const dates = Array.isArray(req.body.dates) ? req.body.dates : [req.body.dates];
  const days = Array.isArray(req.body.days) ? req.body.days : [req.body.days];
  const startTime = req.body.startTime;
  const endTime = req.body.endTime;

  // Validate input here

  const profileCheckQuery = "SELECT * FROM doctor WHERE doctorUserName = ?";
  db.query(profileCheckQuery, [uname], (err, doctorResults) => {
    if (err) {
      // Handle the error appropriately
      console.error(err);
      return res.render("errorpage", { errorMessage: "Failed to check profile existence." });
    }

    if (doctorResults.length > 0) {
      // A profile already exists for the user in the 'doctor' table
      const approvedDoctorQuery = "SELECT * FROM approveddoctors WHERE doctorUserName = ?";
      db.query(approvedDoctorQuery, [uname], (approvedErr, approvedResults) => {
        if (approvedErr) {
          // Handle the error appropriately
          console.error(approvedErr);
          return res.render("errorP2", { errorMessage: "Failed to check profile existence in the approved list." });
        }

        if (approvedResults.length > 0) {
          // Doctor profile already exists in the 'approveddoctors' table
          return res.render("errorP2", { errorMessage: "Profile already exists." });
        }

        // Doctor profile does not exist in the 'approveddoctors' table, insert into 'pendingdoctors'


        const insertQuery = "INSERT INTO pendingdoctors (`doctorUserName`, `doctorName`, `doctorGender`, `doctorAge`, `doctorQualification`, `doctorSpecialization`, `doctorYearOfExp`, `doctorPlace`, `doctorHospitalName`, `doctorHospitalPlace`, `doctorHospitalCity`, `doctorHospitalDates`, `doctorHospitalDays`, `doctorStartTime`, `doctorEndTime`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        db.query(insertQuery, [uname, name, gender, age, qualifications, specialization, yearofexp, place, hospitalName, hospitalPlace, hospitalCity, dates.join(', '), days.join(', '), startTime, endTime], (insertErr, insertResults) => {
          if (insertErr) {
            // Handle the error appropriately
            console.error(insertErr);
            return res.render("errorP2", { errorMessage: "Profile already exists." });
          }

          const selectPendingCount = "SELECT COUNT(*) AS pendingCount FROM pendingdoctors";

            db.query(selectPendingCount, (pendingErr, pendingResults) => {
              if (pendingErr) {
                console.error(pendingErr);
                return res.render("errorAD2", { errorMessage: "Failed to fetch approved doctor count" });
              }


              const pendingCount = pendingResults[0].pendingCount;

              // Set the pending and approved doctor counts as cookies

              res.cookie('totalPendingDoctors', pendingCount);

          return res.render("successD1", { success: "Successfully sent request to add profile." });
        });
        });
      });
    } else {
      return res.render("errorP2", { errorMessage: "Invalid username." });
    }
  });
});



//  Update profile for doctors.....................................................


app.post("/doctorProfileUpdate", function(req, res) {
  // if (!req.cookies.doctorUserName) {
  //   res.redirect("doctorslogin");
  // }
  const uname = req.cookies.doctorUserName;
  const name = req.body.name;
  const gender = req.body.gender;
  const age = req.body.age;
  const qualifications = req.body.qualifications;
  const specialization = req.body.specialization;
  const yearofexp = req.body.yearofexp;
  const place = req.body.place;
  const hospitalName = req.body.hospitalName;
  const hospitalPlace = req.body.hospitalPlace;
  const hospitalCity = req.body.hospitalCity;
  const dates = Array.isArray(req.body.dates) ? req.body.dates : [req.body.dates];
  const days = Array.isArray(req.body.days) ? req.body.days : [req.body.days];
  const startTime = req.body.startTime;
  const endTime = req.body.endTime;

  // Validate input here

  const profileCheckQuery = "SELECT * FROM approveddoctors WHERE doctorUserName = ?";
  db.query(profileCheckQuery, [uname], (err, data) => {
    if (err) {
      console.error(err);
      return res.render("errorpage", { errorMessage: "Failed to check profile existence." });
    }
    if (data.length > 0) {
      // A profile already exists for the user in the 'approveddoctors' table
      const updateQuery = "UPDATE approveddoctors SET doctorName = ?, doctorGender = ?, doctorAge = ?, doctorQualification = ?, doctorSpecialization = ?, doctorYearOfExp = ?, doctorPlace = ?, doctorHospitalName = ?, doctorHospitalPlace = ?, doctorHospitalCity = ?, doctorHospitalDates = ?, doctorHospitalDays = ?, doctorStartTime = ?, doctorEndTime = ? WHERE doctorUserName = ?";

      db.query(updateQuery, [name, gender, age, qualifications, specialization, yearofexp, place, hospitalName, hospitalPlace, hospitalCity, dates.join(', '), days.join(', '), startTime, endTime, uname], (updateErr, updateResults) => {
        if (updateErr) {
          console.error(updateErr);
          return res.render("errorD6", { errorMessage: "Failed to update profile." });
        }

        return res.render("successD1", { success: "Successfully updated profile." });
      });
    } else {
      // The profile doesn't exist in the 'approveddoctors' table
      return res.render("errorD6", { errorMessage: "Failed to update profile. Your Profile didnt create/approve." });
    }
  });
});


//  to update the dates and time fot doctorSpecialization.......................


app.post("/doctorProfileUpdateDate", function(req, res) {
  const uname = req.cookies.doctorUserName;
  const dates = Array.isArray(req.body.dates) ? req.body.dates : [req.body.dates];
  const days = Array.isArray(req.body.days) ? req.body.days : [req.body.days];
  const startTime = req.body.startTime;
  const endTime = req.body.endTime;

  // Check if the doctor exists in the 'approveddoctors' table
  const selectQuery = "SELECT * FROM approveddoctors WHERE doctorUserName = ?";
  db.query(selectQuery, [uname], (err, results) => {
    if (err) {
      console.error(err);
      return res.render("errorD6", { errorMessage: "Failed to check doctor existence." });
    }

    if (results.length === 0) {
      // Doctor not found in the 'approveddoctors' table
      return res.render("errorD6", { errorMessage: "Doctor does not exist." });
    }

    // Update the dates and time for the doctor in the 'approveddoctors' table
    const updateQuery = "UPDATE approveddoctors SET doctorHospitalDates = ?, doctorHospitalDays = ?, doctorStartTime = ?, doctorEndTime = ? WHERE doctorUserName = ?";
    db.query(updateQuery, [dates.join(', '), days.join(', '), startTime, endTime, uname], (updateErr, updateResults) => {
      if (updateErr) {
        console.error(updateErr);
        return res.render("errorD6", { errorMessage: "Failed to update the dates & time." });
      }

      return res.render("successD1", { success: "Successfully updated the dates & time." });
    });
  });
});




// Upload files and all for doctors.............................................


// Route to handle the file upload and database storage
app.post("/uploaddocfile", upload.fields([
  { name: "ppic", maxCount: 1 },
  { name: "idcard", maxCount: 1 },
  { name: "mbbs", maxCount: 1 },
  { name: "md", maxCount: 1 }
]), async function(req, res) {
  const { uname } = req.body;

  // Verify if the files are properly uploaded
  if (!req.files) {
    return res.status(400).send("No files were uploaded.");
  }

  // Extract the file paths from the req.files object
  const filePaths = Object.values(req.files).map((file) => file[0].path);

  const values = [
    uname,
    filePaths[0],
    filePaths[1],
    filePaths[2],
    filePaths[3]
  ];

  console.log(values);

  const pendingDoctorQuery = "SELECT * FROM pendingdoctors WHERE doctorUserName = ?";
  db.query(pendingDoctorQuery, [uname], (pendingDoctorErr, pendingDoctorResults) => {
    if (pendingDoctorErr) {
      // Handle the error appropriately
      console.error(pendingDoctorErr);
      return res.render("errorD3", { errorMessage: "Failed to fetch pending doctor record" });
    }

    if (pendingDoctorResults.length === 0) {
      // Doctor's record not found in the pendingdoctors table
      return res.render("errorD3", { errorMessage: "Doctor's record not found in the pending list" });
    }

    // Insert the doctor's details into the 'doctorsfiles' table
    const q = "INSERT INTO doctorsfiles (doctorUserName, doctorProfilePic, doctorIdCard, doctorMbbs, doctorMd) VALUES (?, ?, ?, ?, ?)";
    db.query(q, values, (err, data) => {
      if (err) {
        // Handle the error appropriately
        console.error(err);
        return res.render("errorD3", { errorMessage: "Files already exist" });
      }

      // Successful upload and creation of doctorsfiles record
      return res.render("successD2", { success: "Successfully uploaded files" });
    });
  });
});


//  Add files for doctors.......................................................


app.post("/doctorfilesAdd", upload.fields([
  { name: "ppic", maxCount: 1 },
  { name: "idcard", maxCount: 1 },
  { name: "mbbs", maxCount: 1 },
  { name: "md", maxCount: 1 }
]), async function(req, res) {
  const uname = req.cookies.doctorUserName;

  // Verify if the files are properly uploaded
  if (!req.files) {
    return res.status(400).send("No files were uploaded.");
  }

  // Extract the file paths from the req.files object
  const filePaths = Object.values(req.files).map((file) => file[0].path);

  const values = [
    uname,
    filePaths[0],
    filePaths[1],
    filePaths[2],
    filePaths[3]
  ];

  console.log(values);

  const doctorQuery = "SELECT * FROM doctor WHERE doctorUserName = ?";
  db.query(doctorQuery, [uname], (doctorErr, doctorResults) => {
    if (doctorErr) {
      // Handle the error appropriately
      console.error(doctorErr);
      return res.render("errorD5", { errorMessage: "Failed to fetch doctor record" });
    }

    if (doctorResults.length === 0) {
      // Doctor's record not found in the doctor table
      return res.render("errorD5", { errorMessage: "Invalid UserName" });
    }

    // Check if the doctor's record already exists in the doctorsfiles table
    const filesQuery = "SELECT * FROM doctorsfiles WHERE doctorUserName = ?";
    db.query(filesQuery, [uname], (filesErr, filesResults) => {
      if (filesErr) {
        // Handle the error appropriately
        console.error(filesErr);
        return res.render("errorD5", { errorMessage: "Failed to check doctor files" });
      }

      if (filesResults.length > 0) {
        // Doctor's files already exist in the doctorsfiles table
        return res.render("errorD5", { errorMessage: "Files already exist" });
      }

      // Insert the doctor's details into the 'doctorsfiles' table
      const q = "INSERT INTO doctorsfiles (doctorUserName, doctorProfilePic, doctorIdCard, doctorMbbs, doctorMd) VALUES (?, ?, ?, ?, ?)";
      db.query(q, values, (err, data) => {
        if (err) {
          // Handle the error appropriately
          console.error(err);
          return res.render("errorD5", { errorMessage: "Failed to upload files" });
        }

        // Successful upload and creation of doctorsfiles record
        return res.render("successD1", { success: "Successfully Added files" });
      });
    });
  });
});




// Update ProfilePic for doctors........................................................


app.post("/doctorProfilePicUpdate", upload.fields([
  { name: "ppic", maxCount: 1 },
  { name: "idcard", maxCount: 1 }
]), async function(req, res) {
  const uname = req.cookies.doctorUserName;

  // Verify if the files are properly uploaded
  if (!req.files) {
    return res.status(400).send("No files were uploaded.");
  }

  // Extract the file paths from the req.files object
  const filePaths = Object.values(req.files).map((file) => file[0].path);

  // Check if the doctorUserName exists in the approveddoctors table
  const selectQuery = "SELECT * FROM doctorsfiles WHERE doctorUserName = ?";
  db.query(selectQuery, [uname], (selectErr, selectResults) => {
    if (selectErr) {
      console.error(selectErr);
      return res.render("errorD7", { errorMessage: "Failed to check doctor existence" });
    }

    if (selectResults.length === 0) {
      // Doctor's record not found in the approveddoctors table
      return res.render("errorD7", { errorMessage: "Invalid UserName" });
    }

    // Doctor exists, proceed with updating the doctor files
    const updateQuery = "UPDATE doctorsfiles SET doctorProfilePic = ?, doctorIdCard = ? WHERE doctorUserName = ?";
    const values = [
      filePaths[0],
      filePaths[1],
      uname
    ];

    db.query(updateQuery, values, (updateErr, updateResults) => {
      if (updateErr) {
        // Handle the error appropriately
        console.error(updateErr);
        return res.render("errorD7", { errorMessage: "Failed to update doctor files" });
      }

      // Successful update of doctor files
      return res.render("successD1", { success: "Successfully updated the files" });
    });
  });
});


// Remove  ProfilePic for doctors.....................................................


app.post("/RemoveDocProfilePic", function(req, res) {
  if(!req.cookies.doctorUserName)
  {
    res.redirect("doctorslogin")
  }
  const doctorUserName = req.body.doctorUser;
  console.log(doctorUserName);

  const updateQuery = "UPDATE doctorsfiles SET doctorProfilePic = 'uploads\profile.png' WHERE doctorUserName = ?";

  db.query(updateQuery, [doctorUserName], (err, data) => {
    if (err) {
      console.error(err);
      return res.render("errorP2", { errorMessage: "Failed to update doctor profile picture." });
    }

    if (data.affectedRows === 0) {
      return res.render("errorP2", { errorMessage: "Failed to update doctor profile picture. Invalid username or name." });
    }

    return res.render("successD1", { success: "Successfully removed doctor profile picture." });
  });
});





// delete profile for doctors...................................................


app.post("/deleteDoctorProfile", function(req, res){
  if(!req.cookies.doctorUserName)
  {
    res.redirect("doctorslogin")
  }
  const uname = req.body.doctorUser;
  console.log(uname);

  const q = "DELETE FROM approveddoctors WHERE doctorUserName = ?";
  db.query(q, [uname], (err, data) => {
    if (err) {
      // Handle the error appropriately
      console.error(err);
      return res.render("errorpage", { errorMessage: "Failed to delete profile." });
    }

    if (data.affectedRows === 0) {
      return res.render("errorpage", { errorMessage: "Didnt create/approved profile" });
    }

   const selectApprovedCount = "SELECT COUNT(*) AS approvedCount FROM approveddoctors";

     db.query(selectApprovedCount, (approvedErr, approvedResults) => {
       if (approvedErr) {
         console.error(approvedErr);
         return res.render("errorAD2", { errorMessage: "Failed to fetch approved doctor count" });
       }


       const approvedCount = approvedResults[0].approvedCount;

       // Set the pending and approved doctor counts as cookies

       res.cookie('totalApprovedDoctors', approvedCount);

    return res.render("successpage", { success: "Successfully deleted profile from approved list" });
  });
 });
});


// to get patients lists in the doctors page....................................


app.post("/patientslist", function(req, res) {
  // if(!req.cookies.doctorUserName)
  // {
  //   res.redirect("doctorslogin")
  // }
  const uname = req.body.doctorUserName;
  const date = req.body.date;
  console.log(uname);
  // Query to retrieve patients who booked an appointment under the doctor with the specified `uname` and `date`
  const q = "SELECT * FROM patient WHERE doctorUserName = ? AND doctorHospitalDate = ?";

  db.query(q, [uname, date], (err, results) => {
    if (err) {
      // Handle the error appropriately
      console.error(err);
      return res.render("errorP2", { errorMessage: "Failed to fetch patients list." });
    }

    if (results.length === 0) {
      // No patients found under the specified `uname` and `date`, display an appropriate error message
      return res.render("errorP2", { errorMessage: "No patients found." });
    }

    // Render the "patientslist" page and pass the retrieved patients data to display the list
    res.render("patientslist", { patients: results });
  });
});


// to send the prescription to the patients.....................................


app.post("/prescription", function(req, res){
  const pid = req.body.pid;
  const pname = req.body.pname;
  const prescription = req.body.messege;

  const q = "INSERT INTO prescription (patientId, patientName, prescription) VALUES (?, ?, ?)";
  db.query(q, [pid, pname, prescription], (err, data) => {
    if (err) {
      // Handle the error appropriately
      console.error(err);
      return res.render("errorpage", { errorMessage: "Failed to send the prescription. Invalid name" });
    }

    return res.render("successpage", { success: "Successfully sent the prescription." });
  });
});


// to logout the from the doctors page..........................................


app.post("/logoutDoctor", function(req, res) {
  // Clear the driverUserName and driverEmail cookies
  res.clearCookie('doctorUserName');
  res.clearCookie('doctorEmail');

  // Set cache-control headers to prevent caching
  res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");

  res.end(`
     <script>
       window.onload = function() {
         window.location.replace("/doctorslogin");
         window.history.pushState(null, null, "/doctor");
       };
     </script>
   `);
 });


// For Users to get the prescription............................................


app.post("/getprescription", function(req, res) {
  const patientId = req.body.pid;

  // Query to retrieve prescription and patient details based on patientId
  const q = "SELECT * FROM prescription JOIN patient ON prescription.patientId = patient.patientId WHERE patient.patientId = ?";

  db.query(q, [patientId], (err, results) => {
    if (err) {
      // Handle the error appropriately
      console.error(err);
      return res.render("errorP3", { errorMessage: "Failed to fetch prescription and patient details." });
    }

    if (results.length === 0) {
      // No matching records found
      console.error("Prescription not found for the specified patient.");
      return res.render("errorP3", { errorMessage: "Prescription not found." });
    }

    // Retrieve the prescription and patient details
    const prescription = results[0];
    const doctorName = prescription.doctorName;
    const doctorSpecialization = prescription.doctorSpecialization;
    const doctorHospitalName = prescription.doctorHospitalName;
    const doctorHospitalPlace = prescription.doctorHospitalPlace;
    const doctorHospitalCity = prescription.doctorHospitalCity;
    const doctorHospitalDate = prescription.doctorHospitalDate;
    const patientId = prescription.patientId;
    const patientName = prescription.patientName;
    const patientGender = prescription.patientGender;
    const patientAge = prescription.patientAge;
    const patientPhoneNo = prescription.patientPhoneNo;
    const patientEmail = prescription.patientEmail;
    const pres = prescription.prescription;

    // Render the "prescription" page and pass the retrieved data to display
    console.log(doctorName);

    res.render("prescription", {
      doctorName: doctorName,
      doctorSpecialization: doctorSpecialization,
      doctorHospitalName: doctorHospitalName,
      doctorHospitalPlace: doctorHospitalPlace,
      doctorHospitalCity: doctorHospitalCity,
      doctorHospitalDate: doctorHospitalDate,
      patientId: patientId,
      patientName: patientName,
      patientGender: patientGender,
      patientAge: patientAge,
      patientPhoneNo: patientPhoneNo,
      patientEmail: patientEmail,
      prescription: pres
    });
  });
});


//  to get the doctor appointment details.......................................


app.post("/getAppoinmentDetails", function(req, res){
  const name = req.body.pid;
  console.log(name);

  // Fetch data from the 'patient' table based on the 'pid'
  const query = "SELECT * FROM patient WHERE patientId = ?";
  db.query(query, [name], (err, data) => {
    if (err) {
      // Handle the error appropriately
      console.error(err);
      return res.render("errorP3", { errorMessage: "Failed to fetch appointment details." });
    }

    if (data.length === 0) {
      // Data not available, render an error view
      return res.render("errorP3", { errorMessage: "Appointment details not found." });
    } else {
      // Data available, render the 'appointmentDetails' view with the retrieved data
      const appointmentDetails = data[0];
      return res.render("appointmentDetails", { details: appointmentDetails });
    }
  });
});


//  to get the ambulance booking details........................................


app.post("/getBookingDetails", function(req, res) {
  const patientId = req.body.bid;

  // Perform a SELECT query to retrieve patient details from ambpatient table
  const query = "SELECT * FROM ambpatient WHERE patientId = ?";
  db.query(query, [patientId], (err, results) => {
    if (err) {
      // Handle the error appropriately
      console.error(err);
      return res.render("errorP3", { errorMessage: "Failed to fetch patient details." });
    }

    if (results.length === 0) {
      // No patient found with the given patientId
      return res.render("errorP3", { errorMessage: "Patient not found." });
    }

    // Render the data to the page
    res.render("bookingDetails", { patient: results[0] });
  });
});


//  to cancel the doctor appointment............................................


app.post("/cancelAppointment", function(req, res) {
  const patientId = req.body.pid;

    // Perform a DELETE query to cancel the appointment based on the patientId
    const deleteQuery = "DELETE FROM patient WHERE patientId = ?";
    db.query(deleteQuery, [patientId], (deleteErr, deleteResult) => {
      if (deleteErr) {
        // Handle the error appropriately
        console.error(deleteErr);
        return res.render("errorP3", { errorMessage: "Failed to cancel the appointment." });
      }

      if (deleteResult.affectedRows === 0) {
        // No appointment found with the given patientId
        return res.render("errorP3", { errorMessage: "Appointment not found." });
      }

      // The appointment was successfully canceled
      return res.render("successP1", { success: "Appointment cancelled successfully." });
    });
});


// to cancel the ambulance booking..............................................


app.post("/cancelBooking", function(req, res) {
  const patientId = req.body.bid;

  // Perform a DELETE query to cancel the booking based on the patientId
    const deleteQuery = "DELETE FROM ambpatient WHERE patientId = ?";
    db.query(deleteQuery, [patientId], (deleteErr, deleteResult) => {
      if (deleteErr) {
        // Handle the error appropriately
        console.error(deleteErr);
        return res.render("errorP3", { errorMessage: "Failed to cancel the booking." });
      }

      if (deleteResult.affectedRows === 0) {
        // No booking found with the given patientId
        return res.render("errorP3", { errorMessage: "Booking not found." });
      }

      // The booking was successfully canceled
      return res.render("successP1", { success: "Booking cancelled successfully." });
    });
});


//  to get the histoty of appointments..........................................


app.post("/getAppoinmentHistory", function(req, res) {
  const patientEmail = req.body.pemail;

  // Retrieve the patient details from the ambpatient table based on the patientEmail
  const selectQuery = "SELECT * FROM patient WHERE patientEmail = ?";
  db.query(selectQuery, [patientEmail], (selectErr, selectResults) => {
    if (selectErr) {
      // Handle the error appropriately
      console.error(selectErr);
      return res.render("errorP3", { errorMessage: "Failed to fetch appointment history." });
    }

    if (selectResults.length === 0) {
      // No patient found with the given patientEmail
      return res.render("errorP3", { errorMessage: "No appointment history found for the provided email." });
    }

    // Render the "appointmentHistory" page and pass the retrieved data to display the appointment history
    return res.render("appointmentHistory", { patients: selectResults });
  });
});


//  to get the ambulance booking history.........................................


app.post("/getBookingHistory", function(req, res) {
  const patientEmail = req.body.pemail;

  // Perform a SELECT query to get the booking history based on patientEmail
  const query = "SELECT * FROM ambpatient WHERE patientEmail = ?";
  db.query(query, [patientEmail], (err, results) => {
    if (err) {
      // Handle the error appropriately
      console.error(err);
      return res.render("errorP3", { errorMessage: "Failed to fetch booking history." });
    }

    if (results.length === 0) {
      // No bookings found for the given patientEmail
      return res.render("errorP3", { errorMessage: "No booking history found for the provided email." });
    }

    // Bookings found, pass the data to the view for rendering
    res.render("bookingHistory", { bookings: results });
  });
});





app.post("/hospitalslist", function(req, res){
  let city = req.body.city;
  let cat = req.body.cat;
  console.log(city);
  console.log(cat);
  res.render("hospitalslist");
});


//  search the ambulances drivers...............................................


app.post("/ambulancelists", function(req, res) {
  if (!req.cookies.userName) {
    res.redirect("/login");
  }

  const city = req.body.city;
  const place = req.body.place;
  const date = req.body.date;
  const hospital = req.body.hospital;

  // Convert the entered date string to a Date object
  const enteredDate = new Date(date);

  // Get the current date
  const currentDate = new Date();

  // Check if the entered date is in the past
  if (enteredDate < currentDate) {
    return res.render("errorD4", { errorMessage: "Please enter a valid future date." });
  }

  let query = "SELECT d.*, f.driverProfilePic FROM approveddrivers AS d LEFT JOIN driversfiles AS f ON d.driverUserName = f.driverUserName WHERE d.driverCity = ? AND d.driverDates LIKE ?";
  let queryParams = [city, `%${date}%`];

  if (place) {
    query += " AND d.driverPlace = ?";
    queryParams.push(place);
  }

  if (hospital) {
    query += " AND d.driverHospital = ?";
    queryParams.push(hospital);
  }

  db.query(query, queryParams, (err, results) => {
    if (err) {
      // Handle the error appropriately
      console.error(err);
      return res.render("errorD4", { errorMessage: "Failed to fetch driver list." });
    }

    if (results.length === 0) {
      // No drivers found for the specified city, date, and optional parameters
      return res.render("errorD4", { errorMessage: "No drivers are available" });
    }

    const userDetails = {
      drivercity: req.body.city,
      driverplace: req.body.place,
      dateDriver: date
    };

    console.log(userDetails);

    // Set user details as cookies
    res.cookie('drivercity', userDetails.drivercity);
    res.cookie('driverplace', userDetails.driverplace);
    res.cookie('dateDriver', userDetails.dateDriver);

    // Render the "ambulancelists" page and pass the retrieved data and search date to display the list of drivers
    res.render("ambulancelists", { drivers: results, searchDate: date });
  });
});




// to get the ambulance lists when g back to page..............................



app.get("/ambulancelists", function(req, res) {
  if(!req.cookies.userName){
    res.redirect("/login");
  }
  const city = req.cookies.city;
  const place = req.cookies.place;
  const date = req.cookies.date;
  const hospital = req.cookies.hospital;

  let query = "SELECT d.*, f.driverProfilePic FROM approveddrivers AS d LEFT JOIN driversfiles AS f ON d.driverUserName = f.driverUserName WHERE d.driverCity = ? AND d.driverDates LIKE ?";
  let queryParams = [city, `%${date}%`];

  if (place) {
    query += " AND d.driverPlace = ?";
    queryParams.push(place);
  }

  if (hospital) {
    query += " AND d.driverHospital = ?";
    queryParams.push(hospital);
  }

  db.query(query, queryParams, (err, results) => {
    if (err) {
      // Handle the error appropriately
      console.error(err);
      return res.render("errorD4", { errorMessage: "Failed to fetch driver list." });
    }

    if (results.length === 0) {
      // No drivers found for the specified city, date, and optional parameters
      return res.render("errorD4", { errorMessage: "No drivers are available" });
    }


    const userDetails = {
      drivercity: req.body.city,
      driverplace: req.body.place,
      dateDriver : date
    };

    console.log(userDetails);

    // Set user details as cookies
    res.cookie('drivercity', userDetails.drivercity);
    res.cookie('driverplace', userDetails.driverplace);
    res.cookie('dateDriver', userDetails.dateDriver);


    // Render the "ambulancelists" page and pass the retrieved data and search date to display the list of drivers
    res.render("ambulancelists", { drivers: results, searchDate: date });
  });
});



// to render the driver details from the buttom to the page confirmbooking......


app.post("/bookambulance", function(req, res) {
  const driverName = req.body.driverName;
  const driverUserName = req.body.driverUserName;
  const hospitalName = req.body.hospitalName;
  const hospitalPlace = req.body.hospitalPlace;
  const hospitalCity = req.body.hospitalCity;
  const date = req.body.date;
  const time = req.body.time;
  const vehicleNo = req.body.vlno;
  const phoneNo = req.body.phoneno;

  // Pass the data to the bookambulance view
  res.render("bookambulance", {
    driverName: driverName,
    driverUserName: driverUserName,
    hospitalName: hospitalName,
    hospitalPlace: hospitalPlace,
    hospitalCity: hospitalCity,
    date: date,
    time: time,
    vehicleNo: vehicleNo,
    phoneNo: phoneNo
  });
  console.log("Driver Name");
  console.log(driverName);


});


// to book the ambulance........................................................


app.post("/confirmbooking", function(req, res) {

    res.clearCookie("specialization");
    res.clearCookie("date");
    res.clearCookie("place");
    res.clearCookie("cityDriver");
    res.clearCookie("placeDriver");
    res.clearCookie("dateDriver");

  const pname = req.body.pname;
  const pgender = req.body.gender;
  const page = req.body.page;
  const pemail = req.body.pemail;
  const pphoneno = req.body.pphoneno;
  const driverName = req.body.driverName;
  const driverUserName = req.body.driverUserName;
  const hospitalName = req.body.hospital;
  const hospitalPlace = req.body.driverPlace;
  const hospitalCity = req.body.driverCity;
  const date = req.body.date;
  const time = req.body.time;
  const vehicleNo = req.body.vehicleNo;
  const phoneNo = req.body.phoneNo;

  // Process the retrieved details as needed
  // Get the current date and time
  const currentDateTime = new Date();
  const bookingDate = currentDateTime.toDateString();
  const bookingTime = currentDateTime.toLocaleTimeString();

    // Insert the data into the database table
    const insertQuery = 'INSERT INTO ambpatient (patientName, patientGender, patientAge, patientEmail, patientPhoneNo, driverName, driverUserName, driverHospital, driverPlace, driverCity, driverDate, driverTime, driverVehicleNo, driverPhoneNo, bookingDate, bookingTime) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(insertQuery, [pname, pgender, page, pemail, pphoneno, driverName, driverUserName, hospitalName, hospitalPlace, hospitalCity, date, time, vehicleNo, phoneNo, bookingDate, bookingTime], (insertErr, insertResult) => {
      if (insertErr) {
        console.error(insertErr);
        // Handle the error appropriately
        return res.render("errorP1", { errorMessage: "Failed to insert patient details." });
      }

      const patientIdQuery = 'SELECT patientId FROM ambpatient WHERE bookingTime = ?';
            db.query(patientIdQuery, [bookingTime], (patientIdErr, patientIdResult) => {
              if (patientIdErr) {
                console.error(patientIdErr);
                // Handle the error appropriately
                return res.render("errorP1", { errorMessage: "Failed to retrieve patient ID." });
              }


              const patientId = patientIdResult[0].patientId;


      // Send confirmation email
  //     const transporter = nodemailer.createTransport({
  //       service: 'gmail',
  //       auth: {
  //         user: 'ahsanallajpk22@gmail.com',
  //         pass: 'iyiuvrdfvfrspksj'
  //       }
  //     });
  //
  //     const mailOptions = {
  //   from: 'ahsanallajpk22@gmail.com',
  //   to: pemail,
  //   subject: 'Appointment Confirmation',
  //   html: `<h3 style="color: #333; font-family: Arial, sans-serif;">Dear ${pname},</h3>
  //     <p style="font-size: 16px;">Your Appointment has been confirmed, And your Booking ID is  ${patientId}</p>
  //     <h4 style="color: #666;">Driver: ${driverName}</h4>
  //     <h4 style="color: #666;">Phone No: ${phoneNo}</h4>
  //     <h4 style="color: #666;">Vehicle No: ${vehicleNo}</h4>
  //     <h4 style="color: #666;">Hospital Name: ${hospitalName}</h4>
  //     <h4 style="color: #666;">Hospital Place: ${hospitalPlace}</h4>
  //     <h4 style="color: #666;">Hospital City: ${hospitalCity}</h4>
  //     <h4 style="color: #666;">Date: ${date}</h4>
  //     <h4 style="color: #666;">Time: ${time}</h4>
  //     <br>
  //     <p style="font-size: 16px;">Thank you for using our service,</p>
  //     <p style="font-size: 16px; color: white;">Doctors</p>`
  // };
  //
  //
  //     transporter.sendMail(mailOptions, function(error, info) {
  //       if (error) {
  //         console.error(error);
  //         // Handle the email sending error
  //       } else {
  //         console.log('Email sent: ' + info.response);
  //       }
  //     });

      // Render a success or confirmation page
      return res.render("Bookingconfirmation", { success: "Successfully sent request for booking." });
    });
  });

});


//  signup for drivers..........................................................


app.post("/signupamb", function(req, res){
  const name = req.body.name1;
  const password = req.body.password1;
  const email = req.body.email;

  const q = "INSERT INTO ambulancedriver(`driverUserName`, `driverPassword`, `driverEmail`) VALUES (?)";

  const values = [
    name,
    password,
    email,
  ];

  db.query(q, [values], (err, data) => {
    if (err)
    return res.render("errorA1", { errorMessage: "Invalid user name." });
    return res.redirect("/driverprofile");
  });
});


// Login for drivers to the ambulace page.......................................


app.post("/loginAmbulance", function(req, res){
  const q = "SELECT * FROM ambulancedriver WHERE driverUserName = ? AND driverPassword = ?";
  const values = [
    req.body.name2,
    req.body.password2
  ];

  db.query(q, values, (err, data) => {
    if (err) {
      // Handle the error
      return res.send(err);
    }

    if (data.length > 0) {
        // Login successful
        const userDetails = {
          userName: req.body.name2,
          email: data[0].driverEmail
        };

        console.log(userDetails);

        // Set user details as cookies
        res.cookie('driverUserName', userDetails.userName);
        res.cookie('driverEmail', userDetails.email);

        // to store the no of drivers in cookies
        const selectPendingCount = "SELECT COUNT(*) AS pendingCount FROM ambulancedriver";
        db.query(selectPendingCount, (pendingErr, pendingResults) => {
          if (pendingErr) {
            console.error(pendingErr);
            return res.render("errorAD2", { errorMessage: "Failed to fetch approved doctor count" });
          }

          const pendingCount = pendingResults[0].pendingCount;

          // Set the pending and approved doctor counts as cookies
          res.cookie('totalDrivers', pendingCount);

          return res.render("loadingambulance");
        });
      } else {
        // Login failed
        return res.render("errorA1", { errorMessage: "Incorrect Password / UserName" });
      }
    });
  });


//  recover driver password.....................................................


app.post("/recoverAmbPassword", function(req, res) {
  const email = req.body.email;

  // Check if the entered email exists in the 'user' table
  const selectQuery = "SELECT * FROM ambulancedriver WHERE driverEmail = ?";
  db.query(selectQuery, [email], (err, results) => {
    if (err) {
      console.error(err);
      return res.render("errorA1", { errorMessage: "Failed to retrieve user details." });
    }

    if (results.length === 0) {
      // Email not found in the 'user' table
      return res.render("errorA1", { errorMessage: "Email ID is not found." });
    }

    // Email exists, retrieve the corresponding password
    const password = results[0].driverPassword;
    const name = results[0].driverUserName;

    // Create a nodemailer transporter to send the email
    const transporter = nodemailer.createTransport({
      // Configure the transporter with your email service provider details
      // For example, using a Gmail account:
      service: 'gmail',
      auth: {
        user: 'ahsanallajpk22@gmail.com',
        pass: 'iyiuvrdfvfrspksj'
      }
    });

    const mailOptions = {
      from: 'ahsanallajpk22@gmail.com',
      to: email,
      subject: 'Password Recovery',
      html: `<h4>Your name is: ${name}</h4>
             <h4>Your password is: ${password}</h4>
             <p style="color: #666;">Thank you for using our service</p>
             <p style="color: #666;">Doctors</p>`
    };

    // Send the email
    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.error(error);
        return res.render("errorA1", { errorMessage: "Failed to send email." });
      } else {
        console.log("Email has been sent to user's email");
        return res.render("successA1", { success: "Password has been sent to your email." });
      }
    });
  });
});



//  create a profile for drivers................................................


app.post("/createambprofile", function(req, res) {
  const uname = req.body.uname;
  const name = req.body.name;
  const gender = req.body.gender;
  const age = req.body.age;
  const phoneno = req.body.phoneno;
  const email = req.body.email;
  const hospital = req.body.hospital;
  const dlno = req.body.dlno;
  const vlno = req.body.vlno;
  const drivingPlace = req.body.drivingPlace;
  const drivingCity = req.body.drivingCity;
  const dates = Array.isArray(req.body.dates) ? req.body.dates : [req.body.dates];
  const days = Array.isArray(req.body.days) ? req.body.days : [req.body.days];
  const time = req.body.time;

  // Validate input here

  const profileCheckQuery = "SELECT * FROM ambulancedriver WHERE driverUserName = ?";
  db.query(profileCheckQuery, [uname], (err, data) => {
    if (err) {
      // Handle the error appropriately
      console.error(err);
      return res.render("errorA2", { errorMessage: "Failed to check profile existence." });
    }

    if (data.length > 0) {
      // A profile already exists for the user
      const q = "INSERT INTO pendingdrivers(`driverUserName`, `driverName`, `driverGender`, `driverAge`, `driverPhoneNo`, `driverEmail`, `driverDrivingLno`, `driverVehicleNo`, `driverHospital`, `driverPlace`, `driverCity`, `driverDates`, `driverDays`, `driverTime`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

      db.query(q, [uname, name, gender, age, phoneno, email, dlno, vlno, hospital, drivingPlace, drivingCity, dates.join(', '), days.join(', '), time], (err, data) => {
        if (err) {
          // Handle the error appropriately
          console.error(err);
          return res.render("errorA2", { errorMessage: "Failed to send request. Invalid username." });
        }

        const selectPendingCount = "SELECT COUNT(*) AS pendingCount FROM pendingdrivers";
        db.query(selectPendingCount, (pendingErr, pendingResults) => {
          if (pendingErr) {
            console.error(pendingErr);
            return res.render("errorAD2", { errorMessage: "Failed to fetch pending drivers count" });
          }

          const pendingCount = pendingResults[0].pendingCount;

          // Set the pending drivers count as a cookie
          res.cookie('totalPendingDrivers', pendingCount);

          return res.render("successA3", { success: "Successfully sent request to add profile" });
        });
      });
    } else {
      return res.render("errorA2", { errorMessage: "Invalid UserName." });
    }
  });
});



// Add profile for drivers......................................................


app.post("/driverprofileAdd", function(req, res) {
  // if (!req.cookies.driverUserName) {
  //   res.redirect("ambulancelogin");
  // }

  const uname = req.cookies.driverUserName;
  const name = req.body.name;
  const gender = req.body.gender;
  const age = req.body.age;
  const phoneno = req.body.phoneno;
  const email = req.body.email;
  const hospital = req.body.hospital;
  const dlno = req.body.dlno;
  const vlno = req.body.vlno;
  const drivingPlace = req.body.drivingPlace;
  const drivingCity = req.body.drivingCity;
  const dates = Array.isArray(req.body.dates) ? req.body.dates : [req.body.dates];
  const days = Array.isArray(req.body.days) ? req.body.days : [req.body.days];
  const time = req.body.time;

  // Validate input here

  const profileCheckQuery = "SELECT * FROM ambulancedriver WHERE driverUserName = ?";
  db.query(profileCheckQuery, [uname], (err, data) => {
    if (err) {
      // Handle the error appropriately
      console.error(err);
      return res.render("errorA2", { errorMessage: "Failed to check profile existence." });
    }

    if (data.length > 0) {
      // A profile already exists for the user
      const approvedQuery = "SELECT * FROM approveddrivers WHERE driverUserName = ?";
      db.query(approvedQuery, [uname], (approvedErr, approvedData) => {
        if (approvedErr) {
          // Handle the error appropriately
          console.error(approvedErr);
          return res.render("errorA3", { errorMessage: "Failed to check profile existence in approved drivers." });
        }

        if (approvedData.length > 0) {
          // A profile also exists in the 'approveddrivers' table
          return res.render("errorA3", { errorMessage: "Profile already exists." });
        } else {
          // No profile found in the 'approveddrivers' table, insert a new profile in the 'pendingdrivers' table
          const q = "INSERT INTO pendingdrivers(`driverUserName`, `driverName`, `driverGender`, `driverAge`, `driverPhoneNo`, `driverEmail`, `driverDrivingLno`, `driverVehicleNo`, `driverHospital`, `driverPlace`, `driverCity`, `driverDates`, `driverDays`, `driverTime`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

          db.query(q, [uname, name, gender, age, phoneno, email, dlno, vlno, hospital, drivingPlace, drivingCity, dates.join(', '), days.join(', '), time], (err, data) => {
            if (err) {
              // Handle the error appropriately
              console.error(err);
              return res.render("errorA3", { errorMessage: "Profile already exists." });
            }

            const selectPendingCount = "SELECT COUNT(*) AS pendingCount FROM pendingdrivers";
            db.query(selectPendingCount, (pendingErr, pendingResults) => {
              if (pendingErr) {
                console.error(pendingErr);
                return res.render("errorAD2", { errorMessage: "Failed to fetch pending drivers count" });
              }

              const pendingCount = pendingResults[0].pendingCount;

              // Set the pending drivers count as a cookie
              res.cookie('totalPendingDrivers', pendingCount);

              return res.render("successA2", { success: "Successfully sent request to add profile" });
            });
          });
        }
      });
    } else {
      return res.render("errorA3", { errorMessage: "Invalid UserName." });
    }
  });
});



//  update profile for drivrrs..................................................


app.post("/driverprofileUpdate", function(req, res) {
  // if (!req.cookies.driverUserName) {
  //   res.redirect("ambulancelogin");
  // }
  const uname = req.cookies.driverUserName;
  const name = req.body.name;
  const gender = req.body.gender;
  const age = req.body.age;
  const phoneno = req.body.phoneno;
  const email = req.body.email;
  const hospital = req.body.hospital;
  const dlno = req.body.dlno;
  const vlno = req.body.vlno;
  const drivingPlace = req.body.drivingPlace;
  const drivingCity = req.body.drivingCity;
  const dates = Array.isArray(req.body.dates) ? req.body.dates : [req.body.dates];
  const days = Array.isArray(req.body.days) ? req.body.days : [req.body.days];
  const time = req.body.time;

  // Validate input here

  const profileCheckQuery = "SELECT * FROM ambulancedriver WHERE driverUserName = ?";
  db.query(profileCheckQuery, [uname], (err, data) => {
    if (err) {
      // Handle the error appropriately
      console.error(err);
      return res.render("errorA8", { errorMessage: "Failed to check profile existence." });
    }

    if (data.length > 0) {
      // A profile already exists for the user, check if it's approved in the 'approveddrivers' table
      const approvedQuery = "SELECT * FROM approveddrivers WHERE driverUserName = ?";
      db.query(approvedQuery, [uname], (approvedErr, approvedData) => {
        if (approvedErr) {
          // Handle the error appropriately
          console.error(approvedErr);
          return res.render("errorA8", { errorMessage: "Failed to check approved profile." });
        }

        if (approvedData.length > 0) {
          // The profile is approved in the 'approveddrivers' table, update the profile
          const updateQuery = "UPDATE approveddrivers SET driverName = ?, driverGender = ?, driverAge = ?, driverPhoneNo = ?, driverEmail = ?, driverDrivingLno = ?, driverVehicleNo = ?, driverHospital = ?, driverPlace = ?, driverCity = ?, driverDates = ?, driverDays = ?, driverTime = ? WHERE driverUserName = ?";

          db.query(updateQuery, [name, gender, age, phoneno, email, dlno, vlno, hospital, drivingPlace, drivingCity, dates.join(', '), days.join(', '), time, uname], (err, data) => {
            if (err) {
              // Handle the error appropriately
              console.error(err);
              return res.render("errorA8", { errorMessage: "Failed to update approved profile." });
            }

            return res.render("successA2", { success: "Successfully updated profile." });
          });
        } else {
          return res.render("errorA8", { errorMessage: "Profile exists but not approved yet." });
        }
      });
    } else {
      return res.render("errorA8", { errorMessage: "Invalid UserName" });
    }
  });
});



//  update the date and time of driver.........................................


app.post("/driverprofileDate&Time", function(req, res) {
  const uname = req.cookies.driverUserName;
  const dates = Array.isArray(req.body.dates) ? req.body.dates : [req.body.dates];
  const days = Array.isArray(req.body.days) ? req.body.days : [req.body.days];
  const time = req.body.time;

  // Validate input here

  // Check if the driverUserName exists in the approveddrivers table
  const checkQuery = "SELECT * FROM approveddrivers WHERE driverUserName = ?";
  db.query(checkQuery, [uname], (checkErr, checkResults) => {
    if (checkErr) {
      // Handle the error appropriately
      console.error(checkErr);
      return res.render("errorA9", { errorMessage: "Failed to check driver existence" });
    }

    if (checkResults.length === 0) {
      // Driver's record not found in the approveddrivers table
      return res.render("errorA9", { errorMessage: "Driver not found" });
    }

    // Update the driverDates, driverTime, and driverDays in the approveddrivers table
    const updateQuery = "UPDATE approveddrivers SET driverDates = ?, driverTime = ?, driverDays = ? WHERE driverUserName = ?";
    const values = [
      dates.join(', '),
      time,
      days.join(', '),
      uname
    ];

    db.query(updateQuery, values, (updateErr, updateResults) => {
      if (updateErr) {
        // Handle the error appropriately
        console.error(updateErr);
        return res.render("errorA9", { errorMessage: "Failed to update driver dates and time" });
      }

      // Successful update of driver dates and time
      return res.render("successA2", { success: "Successfully updated the driver dates and time" });
    });
  });
});





// Upload files for drivers.....................................................


app.post("/driverfilesUpload", upload.fields([
  { name: "ppic", maxCount: 1 },
  { name: "idcard", maxCount: 1 },
  { name: "dl", maxCount: 1 },
  { name: "pan", maxCount: 1 }
]), async function(req, res) {
  const { uname } = req.body;

  // Verify if the files are properly uploaded
  if (!req.files) {
    return res.status(400).send("No files were uploaded.");
  }

  // Extract the file paths from the req.files object
  const filePaths = Object.values(req.files).map((file) => file[0].path);

  const values = [
    uname,
    filePaths[0],
    filePaths[1],
    filePaths[2],
    filePaths[3]
  ];

  console.log(values);

  // Check if the driverUserName is present in the ambulancedriver table
  const checkDriverQuery = "SELECT * FROM ambulancedriver WHERE driverUserName = ?";
  db.query(checkDriverQuery, [uname], (checkDriverErr, checkDriverResults) => {
    if (checkDriverErr) {
      // Handle the error appropriately
      console.error(checkDriverErr);
      return res.render("errorA5", { errorMessage: "Failed to check driver existence" });
    }

    if (checkDriverResults.length === 0) {
      // Driver's record does not exist in the ambulancedriver table
      return res.render("errorA5", { errorMessage: "Invalid UserName" });
    }

    // Insert the driver's details into the 'driversfiles' table
    const insertQuery = "INSERT INTO driversfiles (driverUserName, driverProfilePic, driverIdCard, driverLiscence, driverPanCard) VALUES (?, ?, ?, ?, ?)";
    db.query(insertQuery, values, (insertErr, insertResults) => {
      if (insertErr) {
        // Handle the error appropriately
        console.error(insertErr);
        return res.render("errorA5", { errorMessage: "Files already exist" });
      }

      // Successful upload of driver files
      return res.render("successA1", { success: "Successfully uploaded files" });
    });
  });
});



//  driver files Add............................................................


app.post("/driverfilesAdd", upload.fields([
  { name: "ppic", maxCount: 1 },
  { name: "idcard", maxCount: 1 },
  { name: "dl", maxCount: 1 },
  { name: "pan", maxCount: 1 }
]), async function(req, res) {
  const uname = req.cookies.driverUserName;

  // Verify if the files are properly uploaded
  if (!req.files) {
    return res.status(400).send("No files were uploaded.");
  }

  // Extract the file paths from the req.files object
  const filePaths = Object.values(req.files).map((file) => file[0].path);

  const values = [
    uname,
    filePaths[0],
    filePaths[1],
    filePaths[2],
    filePaths[3]
  ];

  console.log(values);

  const checkFilesQuery = "SELECT * FROM ambulancedriver WHERE driverUserName = ?";
  db.query(checkFilesQuery, [uname], (checkFilesErr, checkFilesResults) => {
    if (checkFilesErr) {
      // Handle the error appropriately
      console.error(checkFilesErr);
      return res.render("errorA4", { errorMessage: "Failed to check driver existence" });
    }

    if (checkFilesResults.length > 0) {
      // Driver's record already exists in the driversfiles table
      const checkPendingQuery = "SELECT * FROM driversfiles WHERE driverUserName = ?";
      db.query(checkPendingQuery, [uname], (checkPendingErr, checkPendingResults) => {
        if (checkPendingErr) {
          // Handle the error appropriately
          console.error(checkPendingErr);
          return res.render("errorA4", { errorMessage: "Failed to check driver existence" });
        }

        if (checkPendingResults.length > 0) {
          // Driver's profile is pending approval
          return res.render("errorA4", { errorMessage: "Files already uploaded" });
        } else {
          // Insert the driver's details into the 'driversfiles' table
          const insertQuery = "INSERT INTO driversfiles (driverUserName, driverProfilePic, driverIdCard, driverLiscence, driverPanCard) VALUES (?, ?, ?, ?, ?)";
          db.query(insertQuery, values, (insertErr, insertResults) => {
            if (insertErr) {
              // Handle the error appropriately
              console.error(insertErr);
              return res.render("errorA4", { errorMessage: "Failed to upload files" });
            }

            // Successful upload of driver files
            return res.render("successA2", { success: "Successfully uploaded files" });
          });
        }
      });
    } else {
      return res.render("errorA4", { errorMessage: "Invalid UserName" });
    }
  });
});


// Update files for drivers........................................................


app.post("/driverProfilePicUpdate", upload.fields([
  { name: "ppic", maxCount: 1 },
  { name: "idcard", maxCount: 1 }
]), async function(req, res) {
  const uname = req.cookies.driverUserName;;

  // Verify if the files are properly uploaded
  if (!req.files) {
    return res.status(400).send("No files were uploaded.");
  }

  // Extract the file paths from the req.files object
  const filePaths = Object.values(req.files).map((file) => file[0].path);

  // Check if the driverUserName exists in the driversfiles table
  const checkQuery = "SELECT * FROM driversfiles WHERE driverUserName = ?";
  db.query(checkQuery, [uname], (checkErr, checkResults) => {
    if (checkErr) {
      // Handle the error appropriately
      console.error(checkErr);
      return res.render("errorA7", { errorMessage: "Failed to check driver existence" });
    }

    if (checkResults.length === 0) {
      // Driver's record not found in the driversfiles table
      return res.render("errorA7", { errorMessage: "Driver not found" });
    }

    // Update the driver's profile picture and ID card in the driversfiles table
    const updateQuery = "UPDATE driversfiles SET driverProfilePic = ?, driverIdCard = ? WHERE driverUserName = ?";
    const values = [
      filePaths[0],
      filePaths[1],
      uname
    ];

    db.query(updateQuery, values, (updateErr, updateResults) => {
      if (updateErr) {
        // Handle the error appropriately
        console.error(updateErr);
        return res.render("errorA7", { errorMessage: "Failed to update driver ProfilePic" });
      }

      // Successful update of driver profile picture and ID card
      return res.render("successA2", { success: "Successfully updated the ProfilePic" });
    });
  });
});


//  to delete the driver profile................................................


app.post("/deleteDriverProfile", function(req, res){
  if(!req.cookies.driverUserName)
  {
    res.redirect("ambulancelogin")
  }
  const uname = req.body.unamedriver;
  console.log(uname);

  const q = "DELETE FROM approveddrivers WHERE driverUserName = ?";
  db.query(q, [uname], (err, data) => {
    if (err) {
      // Handle the error appropriately
      console.error(err);
      return res.render("errorA6", { errorMessage: "Failed to delete profile." });
    }

    if (data.affectedRows === 0) {
      return res.render("errorA6", { errorMessage: "Failed to delete profile. Didnt create/approve profile" });
    }

   const selectApprovedCount = "SELECT COUNT(*) AS approvedCount FROM approveddrivers";

     db.query(selectApprovedCount, (approvedErr, approvedResults) => {
       if (approvedErr) {
         console.error(approvedErr);
         return res.render("errorAD2", { errorMessage: "Failed to fetch approved doctor count" });
       }

       const approvedCount = approvedResults[0].approvedCount;

       // Set the pending and approved doctor counts as cookies
       res.cookie('totalApprovedDrivers', approvedCount);

    return res.render("successA2", { success: "Successfully deleted profile." });
  });
 });
});


//  to remove profile pic  for drivers


app.post("/removeDriverProfilePic", function(req, res) {
  if(!req.cookies.driverUserName)
  {
    res.redirect("ambulancelogin")
  }
  const uname = req.body.unamedriver;
  console.log(uname);

  const profilePicPath = path.join(__dirname, "uploads/profile.png");
  const updateQuery = "UPDATE driversfiles SET driverProfilePic = ? WHERE driverUserName = ?";

  db.query(updateQuery, [profilePicPath, uname], (err, data) => {
    if (err) {
      // Handle the error appropriately
      console.error(err);
      return res.render("errorA6", { errorMessage: "Failed to delete driver profile picture." });
    }

    if (data.affectedRows === 0) {
      return res.render("errorA6", { errorMessage: "Failed to remove, Didnt upload profilepic" });
    }

    return res.render("successA2", { success: "Successfully deleted driver profile picture." });
  });
});


//


app.post("/getbookinglist", function(req, res) {
  const uname = req.body.kundi;
  const date = req.body.date;

  // Perform a SELECT query to retrieve data from the ambpatient table
  const selectQuery = "SELECT * FROM ambpatient WHERE driverUserName = ? AND driverDate = ?";

  db.query(selectQuery, [uname, date], (err, results) => {
    if (err) {
      // Handle the error appropriately
      console.error(err);
      return res.render("errorA6", { errorMessage: "Failed to fetch booking list." });
    }

    if (results.length === 0) {
      // No bookings found for the given driverUserName and date
      return res.render("errorA6", { errorMessage: "No bookings found for the given date." });
    }

    // Set the date as a cookie
    res.cookie("selectedDate", date);

    // Render the "ambPatientsLists" page and pass the retrieved data to display the booking list
    res.render("ambPatientsLists", { bookings: results, selectedDate: date });
  });
});




//  to accept the patients......................................................


app.post("/acceptPatient", function(req, res) {
  const patientId = req.body.patientId;
  const patientEmail = req.body.patientEmail;
  const patientName = req.body.patientName;
  const driverName = req.body.driverName;
  const driverPhoneNo = req.body.driverPhoneNo;
    const driverPlace = req.body.driverPlace;
      const driverCity = req.body.driverCity;
      const driverHospital = req.body.driverHospital;
        const driverVehicleNo = req.body.driverVehicleNo;
        const driverDate = req.body.driverDate;
        const driverTime = req.body.driverTime;

  // Retrieve the patient details from the ambPatient table based on the patientId
  const selectQuery = "SELECT * FROM ambPatient WHERE patientId = ?";
  db.query(selectQuery, [patientId], (selectErr, selectResults) => {
    if (selectErr) {
      console.error(selectErr);
      // Handle the error appropriately
      return res.render("errorA6", { errorMessage: "Failed to fetch patient details." });
    }

    if (selectResults.length === 0) {
      // No patient found with the given patientId
      return res.render("errorA6", { errorMessage: "Patients not found." });
    }

    const patientData = selectResults[0];


    // Insert the patient details into the acceptedpatients table
    const insertQuery = "INSERT INTO acceptedpatients (patientName, patientGender, patientAge, patientEmail, patientPhoneNo, driverName, driverUserName, driverHospital, driverPlace, driverCity, driverDate, driverTime, driverVehicleNo, driverPhoneNo, bookingDate, bookingTime) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(
      insertQuery,
      [
        patientData.patientName,
        patientData.patientGender,
        patientData.patientAge,
        patientData.patientEmail,
        patientData.patientPhoneNo,
        patientData.driverName,
        patientData.driverUserName,
        patientData.driverHospital,
        patientData.driverPlace,
        patientData.driverCity,
        patientData.driverDate,
        patientData.driverTime,
        patientData.driverVehicleNo,
        patientData.driverPhoneNo,
        patientData.bookingDate,
        patientData.bookingTime,
      ],
      (insertErr, insertResult) => {
        if (insertErr) {
          console.error(insertErr);
          // Handle the error appropriately
          return res.render("errorA6", { errorMessage: "Failed to insert patient details." });
        }


        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'ahsanallajpk22@gmail.com',
            pass: 'iyiuvrdfvfrspksj'
          }
        });

        const mailOptions = {
      from: 'ahsanallajpk22@gmail.com',
      to: patientEmail,
      subject: 'Booking is Accepted',
      html: `<h3 style="color: #333; font-family: Arial, sans-serif;">Dear ${patientName},</h3>
        <p style="font-size: 16px;">Your Appointment has been confirmed, And your Booking ID is  ${patientId}</p>
        <h4 style="color: #666;">Driver: ${driverName}</h4>
        <h4 style="color: #666;">Phone No: ${driverPhoneNo}</h4>
        <h4 style="color: #666;">Vehicle No: ${driverVehicleNo}</h4>
        <h4 style="color: #666;">Hospital Name: ${driverHospital}</h4>
        <h4 style="color: #666;">Hospital Place: ${driverPlace}</h4>
        <h4 style="color: #666;">Hospital City: ${driverCity}</h4>
        <h4 style="color: #666;">Date: ${driverDate}</h4>
        <h4 style="color: #666;">Time: ${driverTime}</h4>
        <br>
        <p style="font-size: 16px;">Thank you for using our service,</p>
        <p style="font-size: 16px; color: white;">Doctors</p>`
    };


        transporter.sendMail(mailOptions, function(error, info) {
          if (error) {
            console.error(error);
            // Handle the email sending error
          } else {
            console.log('Email sent: ' + info.response);
          }
        });

        // Delete the patient details from the ambPatient table
        const deleteQuery = "DELETE FROM ambPatient WHERE patientId = ?";
        db.query(deleteQuery, [patientId], (deleteErr, deleteResult) => {
          if (deleteErr) {
            console.error(deleteErr);
            // Handle the error appropriately
            return res.render("errorA6", { errorMessage: "Failed to delete patient details." });
          }

          // Render the success page or redirect to a success page
          return res.redirect("ambPatientsLists")
        });
      }
    );
  });
});



//  to reject the patients......................................................


app.post("/rejectPatient", function(req, res) {
  const patientId = req.body.patientId;
  const patientEmail = req.body.patientEmail;
  const patientName = req.body.patientName;
  const driverName = req.body.driverName;
  const driverHospital = req.body.driverHospital;
  const driverDate = req.body.driverDate;
  const driverTime = req.body.driverTime;

  // Retrieve the patient details from the ambPatient table based on the patientId
  const selectQuery = "SELECT * FROM ambPatient WHERE patientId = ?";
  db.query(selectQuery, [patientId], (selectErr, selectResults) => {
    if (selectErr) {
      console.error(selectErr);
      // Handle the error appropriately
      return res.render("errorA6", { errorMessage: "Failed to fetch patient details." });
    }

    if (selectResults.length === 0) {
      // No patient found with the given patientId
      return res.render("errorA6", { errorMessage: "Patients not found." });
    }

    const patientData = selectResults[0];

    // Insert the patient details into the rejectedpatients table
    const insertQuery = "INSERT INTO rejectedpatients (patientName, patientGender, patientAge, patientEmail, patientPhoneNo, driverName, driverUserName, driverHospital, driverPlace, driverCity, driverDate, driverTime, driverVehicleNo, driverPhoneNo, bookingDate, bookingTime) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(
      insertQuery,
      [
        patientData.patientName,
        patientData.patientGender,
        patientData.patientAge,
        patientData.patientEmail,
        patientData.patientPhoneNo,
        patientData.driverName,
        patientData.driverUserName,
        patientData.driverHospital,
        patientData.driverPlace,
        patientData.driverCity,
        patientData.driverDate,
        patientData.driverTime,
        patientData.driverVehicleNo,
        patientData.driverPhoneNo,
        patientData.bookingDate,
        patientData.bookingTime,
      ],
      (insertErr, insertResult) => {
        if (insertErr) {
          console.error(insertErr);
          // Handle the error appropriately
          return res.render("errorA6", { errorMessage: "Failed to insert patient details into rejectedpatients table." });
        }


        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'ahsanallajpk22@gmail.com',
            pass: 'iyiuvrdfvfrspksj'
          }
        });

        const mailOptions = {
      from: 'ahsanallajpk22@gmail.com',
      to: patientEmail,
      subject: 'Booking is rejected',
      html: `<h3 style="color: #333; font-family: Arial, sans-serif;">Dear ${patientName},</h3>
        <p style="font-size: 16px;">Your Booking has been rejected for the,</p>
        <h4 style="color: #666;">Driver: ${driverName}</h4>
        <h4 style="color: #666;">Hospital Name: ${driverHospital}</h4>
        <h4 style="color: #666;">Date: ${driverDate}</h4>
        <h4 style="color: #666;">Time: ${driverTime}</h4>
        <br>
        <p style="font-size: 16px;">Thank you for using our service,</p>
        <p style="font-size: 16px; color: white;">Doctors</p>`
    };


        transporter.sendMail(mailOptions, function(error, info) {
          if (error) {
            console.error(error);
            // Handle the email sending error
          } else {
            console.log('Email sent: ' + info.response);
          }
        });

        const deleteQuery = "DELETE FROM ambPatient WHERE patientId = ?";
        db.query(deleteQuery, [patientId], (deleteErr, deleteResult) => {
          if (deleteErr) {
            console.error(deleteErr);
            // Handle the error appropriately
            return res.render("errorA6", { errorMessage: "Failed to delete patient details from ambPatient table." });
          }

          // Render the success page or redirect to a success page
          return res.redirect("ambPatientsLists");
        });
      }
    );
  });
});


// to get the lists of approved doctors.........................................
app.get("/acceptedPatients", requireLogin, function(req, res){
  res.render("acceptedPatients")
});

app.post("/acceptedPatients", function(req, res) {
  // Perform a SELECT query to retrieve data from the acceptedPatients table
  const selectQuery = "SELECT * FROM acceptedPatients";

  db.query(selectQuery, (err, results) => {
    if (err) {
      // Handle the error appropriately
      console.error(err);
      return res.render("errorA6", { errorMessage: "Failed to fetch patient details." });
    }

    if (results.length === 0) {
      // No patients found in the acceptedPatients table
      return res.render("errorA6", { errorMessage: "No patients found in the database." });
    }

    // Render the "acceptedPatients" page and pass the retrieved data to display the patient details
    res.render("acceptedPatients", { patients: results });
  });
});


// to get the lists of pending doctors..........................................
app.get("/rejectedPatients", requireLogin, function(req, res){
  res.render("rejectedPatients")
});

app.post("/rejectedPatients", function(req, res) {
  // Perform a SELECT query to retrieve data from the acceptedPatients table
  const selectQuery = "SELECT * FROM rejectedPatients";

  db.query(selectQuery, (err, results) => {
    if (err) {
      // Handle the error appropriately
      console.error(err);
      return res.render("errorA6", { errorMessage: "Failed to fetch patient details." });
    }

    if (results.length === 0) {
      // No patients found in the acceptedPatients table
      return res.render("errorA6", { errorMessage: "No patients found in the database." });
    }

    // Render the "acceptedPatients" page and pass the retrieved data to display the patient details
    res.render("rejectedPatients", { patients: results });
  });
});


//  to get the amb patients page after acceptng patients........................


app.get("/ambPatientsLists", requireLogin, function(req, res) {
  // Retrieve driverUserName and selectedDate from cookies
  const driverUserName = req.cookies.driverUserName;
  const selectedDate = req.cookies.selectedDate;

  // Perform a SELECT query to retrieve data from the ambpatient table
  const selectQuery = "SELECT * FROM ambpatient WHERE driverUserName = ? AND driverDate = ?";

  db.query(selectQuery, [driverUserName, selectedDate], (err, results) => {
    if (err) {
      // Handle the error appropriately
      console.error(err);
      return res.render("errorA6", { errorMessage: "Failed to fetch patient list." });
    }

    if (results.length === 0) {
      // No patients found for the given driverUserName and date
      return res.render("errorA6", { errorMessage: "No patients found" });
    }

    // Render the "ambPatientsLists" page and pass the retrieved data to display the patient list
    res.render("ambPatientsLists", { bookings: results });
  });
});


//  to logout from the ambulace page............................................

// Logout route
app.post("/logoutAmbulance", function(req, res) {
  // Clear the driverUserName and driverEmail cookies
  res.clearCookie('driverUserName');
  res.clearCookie('driverEmail');

  // Set cache-control headers to prevent caching
  res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");

  res.end(`
     <script>
       window.onload = function() {
         window.location.replace("/ambulancelogin");
         window.history.pushState(null, null, "/ambulance");
       };
     </script>
   `);
 });


//  to login to the admin page..................................................


app.post("/admin", function(req, res) {
  let name = req.body.name;
  let password = req.body.password;

  // Query to check if the name and password match in the admin table
  const q = "SELECT * FROM admin WHERE adminName = ? AND adminPassword = ?";
  db.query(q, [name, password], (err, results) => {
    if (err) {
      // Handle the error appropriately
      console.error(err);
      return res.render("errorAD1", { errorMessage: "An error occurred while logging in" });
    }

    if (!results || results.length === 0) {
      // Name and password do not match, redirect to an appropriate error page
      return res.render("errorAD1", { errorMessage: "Incorrect Name And Password" });
    }

    // Name and password match, retrieve the total number of users, doctors, and drivers
    const totalUserQuery = "SELECT COUNT(*) AS totalUsers FROM user";
    const totalDoctorsQuery = "SELECT COUNT(*) AS totalDoctors FROM doctor";
    const totalPendingDoctorsQuery = "SELECT COUNT(*) AS totalPendingDoctors FROM pendingdoctors";
    const totalApprovedDoctorsQuery = "SELECT COUNT(*) AS totalApprovedDoctors FROM approveddoctors";
    const totalDriversQuery = "SELECT COUNT(*) AS totalDrivers FROM ambulancedriver";
    const totalPendingDriversQuery = "SELECT COUNT(*) AS totalPendingDrivers FROM pendingdrivers";
    const totalApprovedDriversQuery = "SELECT COUNT(*) AS totalApprovedDrivers FROM approveddrivers";

    db.query(totalUserQuery, (userErr, userResults) => {
      if (userErr) {
        console.error(userErr);
        return res.render("errorAD1", { errorMessage: "Failed to retrieve the total number of users" });
      }

      db.query(totalDoctorsQuery, (doctorsErr, doctorsResults) => {
        if (doctorsErr) {
          console.error(doctorsErr);
          return res.render("errorAD1", { errorMessage: "Failed to retrieve the total number of doctors" });
        }

        db.query(totalPendingDoctorsQuery, (pendingDoctorsErr, pendingDoctorsResults) => {
          if (pendingDoctorsErr) {
            console.error(pendingDoctorsErr);
            return res.render("errorAD1", { errorMessage: "Failed to retrieve the total number of pending doctors" });
          }

          db.query(totalApprovedDoctorsQuery, (approvedDoctorsErr, approvedDoctorsResults) => {
            if (approvedDoctorsErr) {
              console.error(approvedDoctorsErr);
              return res.render("errorAD1", { errorMessage: "Failed to retrieve the total number of approved doctors" });
            }

            db.query(totalDriversQuery, (driversErr, driversResults) => {
              if (driversErr) {
                console.error(driversErr);
                return res.render("errorAD1", { errorMessage: "Failed to retrieve the total number of drivers" });
              }

              db.query(totalPendingDriversQuery, (pendingDriversErr, pendingDriversResults) => {
                if (pendingDriversErr) {
                  console.error(pendingDriversErr);
                  return res.render("errorAD1", { errorMessage: "Failed to retrieve the total number of pending drivers" });
                }

                db.query(totalApprovedDriversQuery, (approvedDriversErr, approvedDriversResults) => {
                  if (approvedDriversErr) {
                    console.error(approvedDriversErr);
                    return res.render("errorAD1", { errorMessage: "Failed to retrieve the total number of approved drivers" });
                  }

                  const userDetails = {
                    adminName: req.body.name,
                    password: req.body.password,
                    totalUsers: userResults[0].totalUsers,
                    totalDoctors: doctorsResults[0].totalDoctors,
                    totalPendingDoctors: pendingDoctorsResults[0].totalPendingDoctors,
                    totalApprovedDoctors: approvedDoctorsResults[0].totalApprovedDoctors,
                    totalDrivers: driversResults[0].totalDrivers,
                    totalPendingDrivers: pendingDriversResults[0].totalPendingDrivers,
                    totalApprovedDrivers: approvedDriversResults[0].totalApprovedDrivers
                  };

                  console.log(userDetails);

                  // Set user details as cookies
                  res.cookie('adminName', userDetails.adminName);
                  res.cookie('adminPassword', userDetails.password);
                  res.cookie('totalUsers', userDetails.totalUsers);
                  res.cookie('totalDoctors', userDetails.totalDoctors);
                  res.cookie('totalPendingDoctors', userDetails.totalPendingDoctors);
                  res.cookie('totalApprovedDoctors', userDetails.totalApprovedDoctors);
                  res.cookie('totalDrivers', userDetails.totalDrivers);
                  res.cookie('totalPendingDrivers', userDetails.totalPendingDrivers);
                  res.cookie('totalApprovedDrivers', userDetails.totalApprovedDrivers);

                  // Render the admin page
                  return res.render("loadingAdmin");
                });
              });
            });
          });
        });
      });
    });
  });
});


//  to get the lists of pending doctors.........................................


app.post("/pendingDoctors", requireadminLogin, function(req, res) {
  // Retrieve doctors from the 'pendingDoctors' table if their 'doctorUserName' exists in 'doctorsfiles'
  const query = "SELECT pd.doctorName, pd.doctorUserName, pd.doctorSpecialization, pd.doctorHospitalName, df.doctorId, df.doctorIdCard, df.doctorMbbs, df.doctorMd FROM pendingDoctors AS pd LEFT JOIN doctorsfiles AS df ON pd.doctorUserName = df.doctorUserName WHERE df.doctorUserName IS NOT NULL";

  db.query(query, (err, results) => {
    if (err) {
      // Handle the error appropriately
      console.error(err);
      return res.render("errorAD2", { errorMessage: "Failed to fetch doctor list." });
    }

    // Filter out the doctors who don't have matching records in 'doctorsfiles' table
    const validDoctors = results.filter((doctor) => doctor.doctorUserName !== null);

    if (validDoctors.length === 0) {
      // No doctors found in the 'pendingDoctors' table with matching 'doctorUserName' in 'doctorsfiles'
      return res.render("errorAD2", { errorMessage: "No doctors are available." });
    }

    // Render the "pendingDoctors" page and pass the retrieved data to display the list of doctors
    res.render("pendingDoctors", { doctors: validDoctors });
  });
});


// to approve the doctor from the pending lists.................................


app.post("/pendingDoctor", requireadminLogin, function(req, res) {
  const doctorUserName = req.body.doctorUserName;
  console.log(doctorUserName);

  // Retrieve the details of the doctor from the 'pendingdoctors' table
  const selectQuery = "SELECT * FROM pendingdoctors WHERE doctorUserName = ?";
  db.query(selectQuery, [doctorUserName], (selectErr, selectResults) => {
    if (selectErr) {
      console.error(selectErr);
      return res.render("errorAD2", { errorMessage: "Failed to fetch doctor details from pending list" });
    }

    if (selectResults.length === 0) {
      console.error("Doctor not found in the pending list");
      return res.render("errorAD2", { errorMessage: "Doctor not found in the pending list" });
    }

    const doctorDetails = selectResults[0];

    // Insert the doctor details into the 'approveddoctors' table
    const insertQuery = "INSERT INTO approveddoctors (doctorUserName, doctorName, doctorGender, doctorAge, doctorQualification, doctorSpecialization, doctorYearOfExp, doctorPlace, doctorHospitalName, doctorHospitalPlace, doctorHospitalCity, doctorHospitalDates, doctorHospitalDays, doctorStartTime, doctorEndTime) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(insertQuery, [doctorDetails.doctorUserName, doctorDetails.doctorName, doctorDetails.doctorGender, doctorDetails.doctorAge, doctorDetails.doctorQualification, doctorDetails.doctorSpecialization, doctorDetails.doctorYearOfExp, doctorDetails.doctorPlace, doctorDetails.doctorHospitalName, doctorDetails.doctorHospitalPlace, doctorDetails.doctorHospitalCity, doctorDetails.doctorHospitalDates, doctorDetails.doctorHospitalDays, doctorDetails.doctorStartTime, doctorDetails.doctorEndTime], (insertErr, insertResults) => {
      if (insertErr) {
        console.error(insertErr);
        return res.render("errorAD3", { errorMessage: "Failed to move doctor details to the approved list" });
      }

      // Delete the doctor details from the 'pendingdoctors' table
      const deleteQuery = "DELETE FROM pendingdoctors WHERE doctorUserName = ?";
      db.query(deleteQuery, [doctorUserName], (deleteErr, deleteResults) => {
        if (deleteErr) {
          console.error(deleteErr);
          return res.render("errorAD3", { errorMessage: "Failed to delete doctor details from pending list" });
        }

        //  to Calculate the no of pending and approved doctors.................

        const selectPendingCount = "SELECT COUNT(*) AS pendingCount FROM pendingdoctors";
       const selectApprovedCount = "SELECT COUNT(*) AS approvedCount FROM approveddoctors";

       db.query(selectPendingCount, (pendingErr, pendingResults) => {
         if (pendingErr) {
           console.error(pendingErr);
           return res.render("errorAD2", { errorMessage: "Failed to fetch pending doctor count" });
         }

         db.query(selectApprovedCount, (approvedErr, approvedResults) => {
           if (approvedErr) {
             console.error(approvedErr);
             return res.render("errorAD2", { errorMessage: "Failed to fetch approved doctor count" });
           }

           const pendingCount = pendingResults[0].pendingCount;
           const approvedCount = approvedResults[0].approvedCount;

           // Set the pending and approved doctor counts as cookies
           res.cookie('totalPendingDoctors', pendingCount);
           res.cookie('totalApprovedDoctors', approvedCount);


        return res.redirect("pendingDoctor");
     });
    });
   });
  });
 });
});


// To get the pendingDoctors page back after approve a doctor...................


app.get("/pendingDoctor", requireadminLogin, function(req, res){
const selectQuery = "SELECT ad.*, df.doctorId, df.doctorIdCard, df.doctorMbbs, df.doctorMd FROM pendingdoctors AS ad LEFT JOIN doctorsfiles AS df ON ad.doctorUserName = df.doctorUserName";
db.query(selectQuery, (selectErr, selectResults) => {
if (selectErr) {
 console.error(selectErr);
 return res.render("errorAD2", { errorMessage: "Failed to fetch doctor details from pending list" });
}

if (selectResults.length === 0) {
 console.error("Doctor not found in the pending list");
 return res.render("errorAD2", { errorMessage: "No Pending Doctors" });
}

// Render the "pendingDoctors" page and pass the retrieved data to display the list of doctors
res.render("pendingDoctors", { doctors: selectResults });
});
});


// To get the lists of Approved doctors.........................................


app.post("/approvedDoctors", requireadminLogin, function(req, res) {
  const selectQuery = "SELECT ad.*, df.doctorId, df.doctorIdCard, df.doctorMbbs, df.doctorMd FROM approveddoctors AS ad LEFT JOIN doctorsfiles AS df ON ad.doctorUserName = df.doctorUserName";
  db.query(selectQuery, (selectErr, selectResults) => {
    if (selectErr) {
      console.error(selectErr);
      return res.render("errorAD2", { errorMessage: "Failed to fetch doctor details from approved list" });
    }

    if (selectResults.length === 0) {
      console.error("No doctors found in the approved list");
      return res.render("errorAD2", { errorMessage: "No doctors are available" });
    }

    // Render the "approvedDoctors" page and pass the retrieved data to display the list of doctors
    res.render("approvedDoctors", { doctors: selectResults });
  });
});


//  To remove the doctor from the Approved lists................................


app.post("/approvedDoctor", requireadminLogin, function(req, res) {
  const doctorUserName = req.body.doctorUserName;

  // Retrieve the details of the doctor from the 'approveddoctors' table
  const selectQuery = "SELECT * FROM approveddoctors WHERE doctorUserName = ?";
  db.query(selectQuery, [doctorUserName], (selectErr, selectResults) => {
    if (selectErr) {
      console.error(selectErr);
      return res.render("errorAD2", { errorMessage: "Failed to fetch doctor details from the approved list" });
    }

    if (selectResults.length === 0) {
      console.error("Doctor not found in the approved list");
      return res.render("errorAD2", { errorMessage: "Doctor not found in the approved list" });
    }

    const doctorDetails = selectResults[0];

    // Insert the doctor details into the 'pendingdoctors' table
    const insertQuery = "INSERT INTO pendingdoctors (doctorUserName, doctorName, doctorGender, doctorAge, doctorQualification, doctorSpecialization, doctorYearOfExp, doctorPlace, doctorHospitalName, doctorHospitalPlace, doctorHospitalCity, doctorHospitalDates, doctorHospitalDays, doctorStartTime, doctorEndTime) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(insertQuery, [doctorDetails.doctorUserName, doctorDetails.doctorName, doctorDetails.doctorGender, doctorDetails.doctorAge, doctorDetails.doctorQualification, doctorDetails.doctorSpecialization, doctorDetails.doctorYearOfExp, doctorDetails.doctorPlace, doctorDetails.doctorHospitalName, doctorDetails.doctorHospitalPlace, doctorDetails.doctorHospitalCity, doctorDetails.doctorHospitalDates, doctorDetails.doctorHospitalDays, doctorDetails.doctorStartTime, doctorDetails.doctorEndTime], (insertErr, insertResults) => {
      if (insertErr) {
        console.error(insertErr);
        return res.render("errorAD2", { errorMessage: "Failed to move doctor details to the pending list" });
      }

      // Delete the doctor details from the 'approveddoctors' table
      const deleteQuery = "DELETE FROM approveddoctors WHERE doctorUserName = ?";
      db.query(deleteQuery, [doctorUserName], (deleteErr, deleteResults) => {
        if (deleteErr) {
          console.error(deleteErr);
          return res.render("errorAD2", { errorMessage: "Failed to delete doctor details from the approved list" });
        }

        //  to Calculate the no of pending and approved doctors.................

        const selectPendingCount = "SELECT COUNT(*) AS pendingCount FROM pendingdoctors";
       const selectApprovedCount = "SELECT COUNT(*) AS approvedCount FROM approveddoctors";

       db.query(selectPendingCount, (pendingErr, pendingResults) => {
         if (pendingErr) {
           console.error(pendingErr);
           return res.render("errorAD2", { errorMessage: "Failed to fetch pending doctor count" });
         }

         db.query(selectApprovedCount, (approvedErr, approvedResults) => {
           if (approvedErr) {
             console.error(approvedErr);
             return res.render("errorAD2", { errorMessage: "Failed to fetch approved doctor count" });
           }

           const pendingCount = pendingResults[0].pendingCount;
           const approvedCount = approvedResults[0].approvedCount;

           // Set the pending and approved doctor counts as cookies
           res.cookie('totalPendingDoctors', pendingCount);
           res.cookie('totalApprovedDoctors', approvedCount);

         return res.redirect("approvedDoctor");
      });
     });
    });
   });
 });
});


// To get the Approved Doctors page back even after remove a doctor.............


app.get("/approvedDoctor", requireadminLogin, function(req, res){
const selectQuery = "SELECT ad.*, df.doctorId, df.doctorIdCard, df.doctorMbbs, df.doctorMd FROM approveddoctors AS ad LEFT JOIN doctorsfiles AS df ON ad.doctorUserName = df.doctorUserName";
db.query(selectQuery, (selectErr, selectResults) => {
if (selectErr) {
 console.error(selectErr);
 return res.render("errorAD2", { errorMessage: "Failed to fetch doctor details from pending list" });
}

if (selectResults.length === 0) {
 console.error("Doctor not found in the pending list");
 return res.render("errorAD2", { errorMessage: "No Approved Doctors" });
}

// Render the "pendingDoctors" page and pass the retrieved data to display the list of doctors
res.render("approvedDoctors", { doctors: selectResults });
}); // Redirect to the approvedDoctors page after successful removal
});


// To get the lists of pending Drivers..........................................


app.post("/pendingDrivers", requireadminLogin, function(req, res) {
  const query = "SELECT pd.*, df.driverId, df.driverIdCard, df.driverLiscence, df.driverPanCard FROM pendingdrivers AS pd LEFT JOIN driversfiles AS df ON pd.driverUserName = df.driverUserName WHERE df.driverUserName IS NOT NULL";

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.render("errorAD2", { errorMessage: "Failed to fetch driver details." });
    }

    // Filter out the drivers who don't have matching records in 'driversfiles' table
    const validDrivers = results.filter((driver) => driver.driverUserName !== null);

    if (validDrivers.length === 0) {
      return res.render("errorAD2", { errorMessage: "No pending drivers." });
    }

    res.render("pendingDrivers", { drivers: validDrivers });
  });
});



// To approve the driver from the pending lists.................................


app.post("/pendingDriver", requireadminLogin, function(req, res) {
  const driverUserName = req.body.driverUserName;

  // Retrieve the details of the driver from the 'pendingdrivers' table
  const selectQuery = "SELECT pd.*, df.driverId, df.driverIdCard, df.driverLiscence, df.driverPanCard FROM pendingdrivers AS pd LEFT JOIN driversfiles AS df ON pd.driverUserName = df.driverUserName WHERE pd.driverUserName = ?";
  db.query(selectQuery, [driverUserName], (selectErr, selectResults) => {
    if (selectErr) {
      console.error(selectErr);
      return res.render("errorAD2", { errorMessage: "Failed to fetch driver details from the pending list" });
    }

    if (selectResults.length === 0) {
      console.error("Driver not found in the pending list");
      return res.render("errorAD2", { errorMessage: "Driver not found in the pending list" });
    }

    const driverDetails = selectResults[0];

    // Insert the driver details into the 'approveddrivers' table
    const insertQuery = "INSERT INTO approveddrivers (driverUserName, driverName, driverGender, driverAge, driverPhoneNo, driverEmail, driverDrivingLno, driverVehicleNo, driverHospital, driverPlace, driverCity, driverDates, driverDays, driverTime) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(insertQuery, [driverDetails.driverUserName, driverDetails.driverName, driverDetails.driverGender, driverDetails.driverAge, driverDetails.driverPhoneNo, driverDetails.driverEmail, driverDetails.driverDrivingLno, driverDetails.driverVehicleNo, driverDetails.driverHospital, driverDetails.driverPlace, driverDetails.driverCity, driverDetails.driverDates, driverDetails.driverDays, driverDetails.driverTime], (insertErr, insertResults) => {
      if (insertErr) {
        console.error(insertErr);
        return res.render("errorAD2", { errorMessage: "Failed to move driver details to the approved list" });
      }

      // Delete the driver details from the 'pendingdrivers' table
      const deleteQuery = "DELETE FROM pendingdrivers WHERE driverUserName = ?";
      db.query(deleteQuery, [driverUserName], (deleteErr, deleteResults) => {
        if (deleteErr) {
          console.error(deleteErr);
          return res.render("errorAD2", { errorMessage: "Failed to delete driver details from the pending list" });
        }


        //  to Calculate the no of pending and approved drivers.................

        const selectPendingCount = "SELECT COUNT(*) AS pendingCount FROM pendingdrivers";
       const selectApprovedCount = "SELECT COUNT(*) AS approvedCount FROM approveddrivers";

       db.query(selectPendingCount, (pendingErr, pendingResults) => {
         if (pendingErr) {
           console.error(pendingErr);
           return res.render("errorAD2", { errorMessage: "Failed to fetch pending doctor count" });
         }

         db.query(selectApprovedCount, (approvedErr, approvedResults) => {
           if (approvedErr) {
             console.error(approvedErr);
             return res.render("errorAD2", { errorMessage: "Failed to fetch approved doctor count" });
           }

           const pendingCount = pendingResults[0].pendingCount;
           const approvedCount = approvedResults[0].approvedCount;

           // Set the pending and approved doctor counts as cookies
           res.cookie('totalPendingDrivers', pendingCount);
           res.cookie('totalApprovedDrivers', approvedCount);

        // Retrieve the updated list of pending drivers including the additional details from driversfiles
         // Render the updated pendingDrivers page with the updated list
         return res.redirect("pendingDriver")
      });
     });
    });
   });
  });
});


// To get back to the page pending doctors after approve a driver...............


app.get("/pendingDriver", requireadminLogin, function(req, res) {
  const updatedSelectQuery = "SELECT pd.*, df.driverId, df.driverIdCard, df.driverLiscence, df.driverPanCard FROM pendingdrivers AS pd LEFT JOIN driversfiles AS df ON pd.driverUserName = df.driverUserName";
  db.query(updatedSelectQuery, (updatedSelectErr, updatedSelectResults) => {
    if (updatedSelectErr) {
      console.error(updatedSelectErr);
      return res.render("errorAD2", { errorMessage: "Failed to fetch driver details from the pending list" });
    }

    if (updatedSelectResults.length === 0) {
      return res.render("errorAD2", { errorMessage: "No pending drivers" });
    }

    return res.render("pendingDrivers", { drivers: updatedSelectResults });
  });
});


// To get the Approved lists of drivers.........................................


app.post("/approvedDrivers", requireadminLogin, function(req, res) {
  const selectQuery = "SELECT ad.*, df.driverId, df.driverIdCard, df.driverLiscence, df.driverPanCard FROM approveddrivers AS ad LEFT JOIN driversfiles AS df ON ad.driverUserName = df.driverUserName";
  db.query(selectQuery, (selectErr, selectResults) => {
    if (selectErr) {
      console.error(selectErr);
      return res.render("errorAD2", { errorMessage: "Failed to fetch driver details from the approved list" });
    }

    if (selectResults.length === 0) {
      return res.render("errorAD2", { errorMessage: "No Approved drivers" }); // Render a view indicating no approved drivers
    }

    // Render the "approvedDrivers" page and pass the retrieved data to display the list of approved drivers
    res.render("approvedDrivers", { drivers: selectResults });
  });
});


// To remove the driver from the approved lists of drivers......................


app.post("/approvedDriver", requireadminLogin, function(req, res) {
  const driverUserName = req.body.driverUserName;

  // Retrieve the details of the driver from the 'approveddrivers' table
  const selectQuery = "SELECT * FROM approveddrivers WHERE driverUserName = ?";
  db.query(selectQuery, [driverUserName], (selectErr, selectResults) => {
    if (selectErr) {
      console.error(selectErr);
      return res.render("errorAD2", { errorMessage: "Failed to fetch driver details from the approved list" });
    }

    if (selectResults.length === 0) {
      console.error("Driver not found in the approved list");
      return res.render("errorAD2", { errorMessage: "Driver not found in the approved list" });
    }

    const driverDetails = selectResults[0];

    // Insert the driver details into the 'pendingdrivers' table
    const insertQuery = "INSERT INTO pendingdrivers (driverUserName, driverName, driverGender, driverAge, driverPhoneNo, driverEmail, driverDrivingLno, driverVehicleNo, driverHospital, driverPlace, driverCity, driverDates, driverDays, driverTime) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(insertQuery, [driverDetails.driverUserName, driverDetails.driverName, driverDetails.driverGender, driverDetails.driverAge, driverDetails.driverPhoneNo, driverDetails.driverEmail, driverDetails.driverDrivingLno, driverDetails.driverVehicleNo, driverDetails.driverHospital, driverDetails.driverPlace, driverDetails.driverCity, driverDetails.driverDates, driverDetails.driverDays, driverDetails.driverTime], (insertErr, insertResults) => {
      if (insertErr) {
        console.error(insertErr);
        return res.render("errorAD2", { errorMessage: "Failed to move driver details to the pending list" });
      }

      // Delete the driver details from the 'approveddrivers' table
      const deleteQuery = "DELETE FROM approveddrivers WHERE driverUserName = ?";
      db.query(deleteQuery, [driverUserName], (deleteErr, deleteResults) => {
        if (deleteErr) {
          console.error(deleteErr);
          return res.render("errorAD2", { errorMessage: "Failed to delete driver details from the approved list" });
        }

        //  to Calculate the no of pending and approved drivers.................

        const selectPendingCount = "SELECT COUNT(*) AS pendingCount FROM pendingdrivers";
       const selectApprovedCount = "SELECT COUNT(*) AS approvedCount FROM approveddrivers";

       db.query(selectPendingCount, (pendingErr, pendingResults) => {
         if (pendingErr) {
           console.error(pendingErr);
           return res.render("errorAD2", { errorMessage: "Failed to fetch pending doctor count" });
         }

         db.query(selectApprovedCount, (approvedErr, approvedResults) => {
           if (approvedErr) {
             console.error(approvedErr);
             return res.render("errorAD2", { errorMessage: "Failed to fetch approved doctor count" });
           }

           const pendingCount = pendingResults[0].pendingCount;
           const approvedCount = approvedResults[0].approvedCount;

           // Set the pending and approved doctor counts as cookies
           res.cookie('totalPendingDrivers', pendingCount);
           res.cookie('totalApprovedDrivers', approvedCount);

        return res.redirect("/approvedDriver"); // Redirect to the approvedDrivers page after successful removal
      });
    });
   });
  });
 });
});


// To get back to the page approved drivers after remove a driver...............


app.get("/approvedDriver", requireadminLogin, function(req, res) {
  const selectQuery = "SELECT ad.*, df.driverId, df.driverIdCard, df.driverLiscence, df.driverPanCard FROM approveddrivers AS ad LEFT JOIN driversfiles AS df ON ad.driverUserName = df.driverUserName";
  db.query(selectQuery, (selectErr, selectResults) => {
    if (selectErr) {
      console.error(selectErr);
      return res.render("errorAD2", { errorMessage: "Failed to fetch driver details from the approved list" });
    }

    if (selectResults.length === 0) {
      return res.render("errorAD2", { errorMessage: "No Approved drivers" }); // Render a view indicating no approved drivers
    }

    // Render the "approvedDrivers" page and pass the retrieved data to display the list of approved drivers
    res.render("approvedDrivers", { drivers: selectResults });
  });
});


// to logout from admin page....................................................


app.post("/logoutAdmin", function(req, res) {
  // Clear the driverUserName and driverEmail cookies
  res.clearCookie('adminName');
  res.clearCookie('adminPassword');

  // Set cache-control headers to prevent caching
  res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");

  res.end(`
     <script>
       window.onload = function() {
         window.location.replace("/admin");
         window.history.pushState(null, null, "/admin");
       };
     </script>
   `);
 });


// to get the lists of doctors who created profile..............................


app.post("/doctorsLists", requireadminLogin, function(req, res) {
  const selectPendingQuery = "SELECT pd.*, df.doctorId, d.doctorEmail FROM pendingdoctors AS pd JOIN doctorsfiles AS df ON pd.doctorUserName = df.doctorUserName JOIN doctor AS d ON pd.doctorUserName = d.doctorUserName";
  const selectApprovedQuery = "SELECT ad.*, df.doctorId, d.doctorEmail FROM approveddoctors AS ad JOIN doctorsfiles AS df ON ad.doctorUserName = df.doctorUserName JOIN doctor AS d ON ad.doctorUserName = d.doctorUserName";
  // const selectDoctorQuery = "SELECT * FROM doctor"; // Query to fetch details from the 'doctor' table

  db.query(selectPendingQuery, (pendingErr, pendingResults) => {
    if (pendingErr) {
      console.error(pendingErr);
      return res.render("errorAD2", { errorMessage: "Failed to fetch pending doctor details" });
    }

    db.query(selectApprovedQuery, (approvedErr, approvedResults) => {
      if (approvedErr) {
        console.error(approvedErr);
        return res.render("errorAD2", { errorMessage: "Failed to fetch approved doctor details" });
      }


        const doctorsList = [...pendingResults, ...approvedResults];
        if (doctorsList.length === 0) {
          return res.render("errorAD2", { errorMessage: "No doctors found" });
        }

        // Calculate the number of doctors
        const totalDoctors = doctorsList.length;

        // Set the totalDoctors value as a cookie
        res.cookie('totalDoctors', totalDoctors);

        res.render("doctorsLists", { doctors: doctorsList });
      });
  });
});



//  to get the lits of approved doctors.........................................


app.post("/approvedDoctorsLists", requireadminLogin, function(req, res) {
  const selectQuery = "SELECT ad.*, df.doctorId, d.doctorEmail FROM approveddoctors AS ad JOIN doctorsfiles AS df ON ad.doctorUserName = df.doctorUserName JOIN doctor AS d ON ad.doctorUserName = d.doctorUserName";

  db.query(selectQuery, (err, results) => {
    if (err) {
      console.error(err);
      return res.render("errorAD2", { errorMessage: "Failed to fetch approved doctor details" });
    }

    if (results.length === 0) {
      return res.render("errorAD2", { errorMessage: "No approved doctors found" });
    }

    res.render("approvedDoctorsLists", { doctors: results });
  });
});



//  to get the lists of pending doctors.........................................


app.post("/pendingDoctorsLists", requireadminLogin, function(req, res) {
  const selectQuery = "SELECT pd.*, df.doctorId, d.doctorEmail FROM pendingdoctors AS pd JOIN doctorsfiles AS df ON pd.doctorUserName = df.doctorUserName JOIN doctor AS d ON pd.doctorUserName = d.doctorUserName";

  db.query(selectQuery, (err, results) => {
    if (err) {
      console.error(err);
      return res.render("errorAD2", { errorMessage: "Failed to fetch pending doctor details" });
    }

    if (results.length === 0) {
      return res.render("errorAD2", { errorMessage: "No pending doctors" });
    }


    res.render("pendingDoctorsLists", { doctors: results });
  });
});


//  to get the lists of drivers.................................................


app.post("/driversLists", requireadminLogin, function(req, res) {
  const selectPendingQuery = "SELECT pd.*, df.driverId FROM pendingdrivers AS pd JOIN driversfiles AS df ON pd.driverUserName = df.driverUserName";
  const selectApprovedQuery = "SELECT ad.*, df.driverId FROM approveddrivers AS ad JOIN driversfiles AS df ON ad.driverUserName = df.driverUserName";

  db.query(selectPendingQuery, (pendingErr, pendingResults) => {
    if (pendingErr) {
      console.error(pendingErr);
      return res.render("errorAD2", { errorMessage: "Failed to fetch pending driver details" });
    }

    db.query(selectApprovedQuery, (approvedErr, approvedResults) => {
      if (approvedErr) {
        console.error(approvedErr);
        return res.render("errorAD2", { errorMessage: "Failed to fetch approved driver details" });
      }

      const driversList = [...pendingResults, ...approvedResults];
      res.render("driversLists", { drivers: driversList });
    });
  });
});


// to get tghe lists of approved drivers lists..................................


app.post("/approvedDriversLists", requireadminLogin, function(req, res) {
  const selectQuery = "SELECT ad.*, df.driverId FROM approveddrivers AS ad JOIN driversfiles AS df ON ad.driverUserName = df.driverUserName";

  db.query(selectQuery, (err, results) => {
    if (err) {
      console.error(err);
      return res.render("errorAD2", { errorMessage: "Failed to fetch approved driver details" });
    }

    if (results.length === 0) {
      return res.render("errorAD2", { errorMessage: "No approved drivers" });
    }

    res.render("approvedDriversLists", { drivers: results });
  });
});


// to get the lists of pending drivers lists....................................


app.post("/pendingDriversLists", requireadminLogin, function(req, res) {
  const selectQuery = "SELECT pd.*, df.driverId FROM pendingdrivers AS pd JOIN driversfiles AS df ON pd.driverUserName = df.driverUserName";

  db.query(selectQuery, (err, results) => {
    if (err) {
      console.error(err);
      return res.render("errorAD2", { errorMessage: "Failed to fetch pending driver details" });
    }
    if (results.length === 0) {
      return res.render("errorAD2", { errorMessage: "No pending drivers" });
    }


    res.render("pendingDriversLists", { drivers: results });
  });
});


// to get the list of users.....................................................


app.post("/usersLists", requireadminLogin, function(req, res) {
  const selectQuery = "SELECT * FROM user";

  db.query(selectQuery, (err, results) => {
    if (err) {
      console.error(err);
      return res.render("errorAD2", { errorMessage: "Failed to fetch user details" });
    }

    if (results.length === 0) {
      return res.render("errorAD2", { errorMessage: "No users found" });
    }

    res.render("usersLists", { users: results });
  });
});


//  to get the messeges.........................................................


app.get("/Messages", requireadminLogin, function(req, res) {
  // Perform a SELECT query to retrieve all messages from the message table
  const selectQuery = "SELECT * FROM messege";
  db.query(selectQuery, (err, messages) => {
    if (err) {
      // Handle the error appropriately
      console.error(err);
      return res.render("errorAD2", { errorMessage: "Failed to fetch messages." });
    }

    if (messages.length === 0) {
      // No messages found in the database
      return res.render("errorAD2", { errorMessage: "No messages found." });
    }

    // Render the "Messages" page and pass the retrieved messages to display them
    res.render("Messages", { messages: messages });
  });
});



//  to get the lists of messages send by differnt users.........................


app.post("/Messages", function(req, res) {
  // Perform a SELECT query to retrieve data from the message table
  const selectQuery = "SELECT * FROM messege";

  db.query(selectQuery, (err, results) => {
    if (err) {
      // Handle the error appropriately
      console.error(err);
      return res.render("errorAD2", { errorMessage: "Failed to fetch messages." });
    }

    if (results.length === 0) {
      // No messages found in the message table
      return res.render("errorAD2", { errorMessage: "No messages found" });
    }

    // Render the "Messages" page and pass the retrieved data to display the messages
    res.render("Messages", { messages: results });
  });
});


//  to send message............................................................

app.post("/contact", requireUserLogin, function(req, res){
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.msg;
  const q = "INSERT INTO messege(`userName`, `userEmail`, `userMessege`) VALUES (?)";

  const values = [
    name,
    email,
    message,
  ];

  db.query(q, [values], (err, data) => {
    if (err)
    return res.console.error(err);
    return res.render("successM1", { success: "Successfully sent messege to admin" });
  });
});


// to read the messages.........................................................


app.post("/readMessage", function(req, res) {
  const userId = req.body.userId;

  // Perform a SELECT query to retrieve the message details based on the user ID
  const selectQuery = "SELECT * FROM messege WHERE userId = ?";
  db.query(selectQuery, [userId], (err, result) => {
    if (err) {
      // Handle the error appropriately
      console.error(err);
      return res.render("errorAD2", { errorMessage: "Failed to read message." });
    }

    if (result.length === 0) {
      // No message found with the given user ID
      return res.render("errorAD2", { errorMessage: "Message not found." });
    }

    // Retrieve the message details
    const messageDetails = result[0];

    // Perform a DELETE query to remove the message from the message table
    const deleteQuery = "DELETE FROM messege WHERE userId = ?";
    db.query(deleteQuery, [userId], (deleteErr) => {
      if (deleteErr) {
        // Handle the error appropriately
        console.error(deleteErr);
        return res.render("errorAD2", { errorMessage: "Failed to delete message." });
      }

      // Redirect back to the Messages page after deleting the message
      res.redirect("/Messages");
    });
  });
});



// To run  on the server port 3000..............................................


app.listen("3000", function(){
  console.log("Doctors Server is Running On Port 3000");
})
