// $(function(){
//   i = 0;
//   wordsArray = [
//     "The Best Doctors In Your City.",
//     "Doctors Is  The Best Health Care website."
//     ];
//     words1Array = [
//       "You can know about the doctors near your home and also can book your appointment online.",
//       "You can know about the hospitals near your home and also can book your appointment online."
//     ];
//   setInterval(function(){
//     i++;
//     $('#words').slideUp(500, function(){
//       $(this).text(wordsArray[i % wordsArray.length]).slideDown(300);
//     });
//     $('#words1').slideUp(500, function(){
//       $(this).text(words1Array[i % words1Array.length]).slideDown(300);
//     });
//   }, 3500);
// });

/* let deg = 0; // Declare the deg variable outside of the interval function

 setInterval(function() {
  deg++;
  if (deg > 90) {
    deg = -120;
  }
  $(".images").css({
    'transform': 'rotateY(' + deg + 'deg)',
    'transform-style': 'preserve-3d'
  });
}, 30); */


// ...............................................

document.addEventListener('DOMContentLoaded', function() {
    $("#search-amb").css({"display": "none"});
    $("#search-amb").slideUp(0);

    // $("#click-ambulance").css({"display": "none"});
});


$("#click-ambulance").click(function(){
  $("#search-amb").slideDown(400);
  $("#search-amb").css({"display": "block"});
  $("#click-ambulance").css({"display": "none"});
  $("#ambuu").css({"display": "none"});
  $("#toggle").hide();
});

$("#click-doctor").click(function(){
  $("#search-amb").slideUp(400);
    $("#click-ambulance").css({"display": "block"});
    $("#ambuu").css({"display": "block"});
  $("#toggle").show();
});

//  to disply the list of specialization.......................................

$("#spec").click(function(){
  $("display-box").css({"display": "block"});
});

/* patients login*/

$(".btn-go-signup").click(function(){
  $(".form-login").slideUp(350);
});

$(".btn-go-back-login").click(function(){
  $(".form-login").slideDown(350);
});

$("#userPassword").click(function(){
  $("#signup").css({"display": "none"});
    $("#login").css({"display": "none"});
     $("#forgot-password").css({"display": "block"});
});

$(".btn-gotologin").click(function(){
  $("#signup").css({"display": "block"});
    $("#login").css({"display": "block"});
     $("#forgot-password").css({"display": "none"});
});

$("#docpassword").click(function(){
  $("#docsignup").css({"display": "none"});
    $("#doclogin").css({"display": "none"});
     $("#forgot-password-doc").css({"display": "block"});
});

$(".btn-go-back").click(function(){
  $("#docsignup").css({"display": "block"});
    $("#doclogin").css({"display": "block"});
     $("#forgot-password-doc").css({"display": "none"});
});

$("#ambpassword").click(function(){
  $("#signupamb").css({"display": "none"});
    $("#loginamb").css({"display": "none"});
     $("#forgot-password-amb").css({"display": "block"});
});

$(".btn-gologin").click(function(){
  $("#signupamb").css({"display": "block"});
    $("#loginamb").css({"display": "block"});
     $("#forgot-password-amb").css({"display": "none"});
});
// password toggle buttons

function togglePasswordVisibility() {
   var passwordInput = document.getElementById("passwordInput");
   var passwordToggle = document.querySelector(".password-toggle");
   var icon = document.getElementById("icon");

   if (passwordInput.type === "password") {
     passwordInput.type = "text";
     passwordToggle.classList.add("active");
     icon.classList.add("fa-eye-slash");
     icon.classList.remove("fa-eye");
   } else {
     passwordInput.type = "password";
     passwordToggle.classList.remove("active");
     icon.classList.remove("fa-eye-slash");
     icon.classList.add("fa-eye");
   }
 }

 function togglePasswordVisibility1() {
    var passwordInput = document.getElementById("passwordInput1");
    var passwordToggle = document.querySelector(".password-toggle1");
    var icon = document.getElementById("icon1");

    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      passwordToggle.classList.add("active");
      icon.classList.add("fa-eye-slash");
      icon.classList.remove("fa-eye");
    } else {
      passwordInput.type = "password";
      passwordToggle.classList.remove("active");
      icon.classList.remove("fa-eye-slash");
      icon.classList.add("fa-eye");
    }
  }

  function togglePasswordVisibility2() {
     var passwordInput = document.getElementById("passwordInput2");
     var passwordToggle = document.querySelector(".password-toggle2");
     var icon = document.getElementById("icon2");

     if (passwordInput.type === "password") {
       passwordInput.type = "text";
       passwordToggle.classList.add("active");
       icon.classList.add("fa-eye-slash");
       icon.classList.remove("fa-eye");
     } else {
       passwordInput.type = "password";
       passwordToggle.classList.remove("active");
       icon.classList.remove("fa-eye-slash");
       icon.classList.add("fa-eye");
     }
   }

   function togglePasswordVisibility3() {
      var passwordInput = document.getElementById("passwordInput3");
      var passwordToggle = document.querySelector(".password-toggle3");
      var icon = document.getElementById("icon3");

      if (passwordInput.type === "password") {
        passwordInput.type = "text";
        passwordToggle.classList.add("active");
        icon.classList.add("fa-eye-slash");
        icon.classList.remove("fa-eye");
      } else {
        passwordInput.type = "password";
        passwordToggle.classList.remove("active");
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
      }
    }

    function togglePasswordVisibility4() {
       var passwordInput = document.getElementById("passwordInput4");
       var passwordToggle = document.querySelector(".password-toggle4");
       var icon = document.getElementById("icon4");

       if (passwordInput.type === "password") {
         passwordInput.type = "text";
         passwordToggle.classList.add("active");
         icon.classList.add("fa-eye-slash");
         icon.classList.remove("fa-eye");
       } else {
         passwordInput.type = "password";
         passwordToggle.classList.remove("active");
         icon.classList.remove("fa-eye-slash");
         icon.classList.add("fa-eye");
       }
     }

// $(".btn-finddoc").click(function(){
//   $("#main-image").css({"filter": "blur(0.6rem)", "opacity": "0.2"});
//   $("#main1").css({"filter": "blur(0.6rem)", "opacity": "0.2"});
//   $("#signup").css({"display": "block"});
//   $("#login").css({"display": "block"});
//   $(".extra ").css({"display": "block"});
//   $(".btn-finddoc").hide();
// });

/* input clicks*/

$(".category").click(function(){
    $(".categorys").css({"z-index": "3"});
    $(".places").css({"z-index": "0"});
})
$(".places").click(function(){
    $(".categorys").css({"z-index": "0"});
    $(".places").css({"z-index": "3"});
});

/* take appointment*/
//
// $(".btn-take-appointment").click(function(){
//   $("#taking-appointment").css({"display": "block", "z-index": "10"})
//   $("#doctors-list").css({"z-index": "-20"})
//   $(".doctor-lists, .h5-doctor-lists").css({"filter": "blur(0.15rem)", "opacity": "0.3"});
// })


/* doctor signup page buttons*/

$(".btn-go-docsignup").click(function(){
  $(".form-doclogin").slideUp(350);
});

$(".btn-go-back-doc-login").click(function(){
    $(".form-doclogin").slideDown(350);
        $(".form-docsignup").css({"z-index": "0"});
})

// $(".btn-go-upload").click(function(){
//   $(".form-docsignup").slideUp(230);
// })
//
// $(".btn-gologin").click(function(){
//   $(".form-doclogin").slideDown(230);
//   $(".form-docsignup").slideDown(230);
// })


/* to get the profilre picture*/

$(document).ready(function() {
  var uploadFile = function(file) {
    var formData = new FormData();
    formData.append('ppic', file);
    formData.append('idcard', file);
    formData.append('mbbs', file);
    formData.append('md', file);
    // formData.append('filename', file.name); // Append the filename to the formData

    // Send the file to the server using AJAX
    $.ajax({
      url: '/createprofile',
      type: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      success: function(response) {
        // Handle the response from the server
        console.log(response);
      },
      error: function(xhr, status, error) {
        // Handle any errors that occurred during the upload
        console.error(error);
      }
    });
  };

  // var readURL = function(input) {
  //   if (input.files && input.files[0]) {
  //     var reader = new FileReader();
  //
  //     reader.onload = function(e) {
  //       $('.profile-pic').attr('src', e.target.result);
  //     };
  //
  //     reader.readAsDataURL(input.files[0]);
  //
  //     // Call the uploadFile function to upload the file
  //     uploadFile(input.files[0]);
  //   }
  // };

  $(".file-upload").on('change', function() {
    readURL(this);
  });

  $(".upload-button").on('click', function() {
    $(".file-upload").click();
  });
});




/* doctors page buttoons*/

$(".btn-create-card").click(function(){
  $("#delete").css({"display": "none"});
  $("#card-big").css({"display": "block"});
  $("#patients-list").css({"display": "none"});
  $("#update").css({"display": "none"});
  $("#presc").css({"display": "none"});
  $(".btn-get-list").css({"text-decoration": "none"});
  $(".btn-create-card").css({"text-decoration": "none"});
  $(".btn-delete-card").css({"text-decoration": "none"});
  $(".btn-update-card").css({"text-decoration": "none"});
  $(".btn-get-prescription").css({"text-decoration": "none"});
})

$(".btn-update-card").click(function(){
  $("#delete").css({"display": "none"});
  $("#card-big").css({"display": "none"});
  $("#patients-list").css({"display": "none"});
  $("#update").css({"display": "block"});
  $("#presc").css({"display": "none"});
  $(".btn-get-list").css({"text-decoration": "none"});
  $(".btn-create-card").css({"text-decoration": "none"});
  $(".btn-delete-card").css({"text-decoration": "none"});
  $(".btn-update-card").css({"text-decoration": "none"});
  $(".btn-get-prescription").css({"text-decoration": "none"});
})

$(".btn-delete-card").click(function(){
  $("#delete").css({"display": "block"});
  $("#card-big").css({"display": "none"});
  $("#patients-list").css({"display": "none"});
  $("#update").css({"display": "none"});
  $("#presc").css({"display": "none"});
  $(".btn-get-list").css({"text-decoration": "none"});
  $(".btn-create-card").css({"text-decoration": "none"});
  $(".btn-delete-card").css({"text-decoration": "none"});
  $(".btn-update-card").css({"text-decoration": "none"});
  $(".btn-get-prescription").css({"text-decoration": "none"});
})

$(".btn-dropdown-prof").click(function(){
  $(".btn-get-list").css({"text-decoration": "none"});
  $(".btn-create-card").css({"text-decoration": "none"});
  $(".btn-delete-card").css({"text-decoration": "none"});
  $(".btn-update-card").css({"text-decoration": "none"});
  $(".btn-dropdown-prof").css({"text-decoration": "underline"});
  $(".btn-get-prescription").css({"text-decoration": "none"});
})

$(".btn-get-list").click(function(){
  $("#delete").css({"display": "none"});
  $("#card-big").css({"display": "none"});
  $("#patients-list").css({"display": "block"});
  $("#update").css({"display": "none"});
  $("#presc").css({"display": "none"});
  $(".btn-get-list").css({"text-decoration": "underline"});
  $(".btn-create-card").css({"text-decoration": "none"});
  $(".btn-delete-card").css({"text-decoration": "none"});
  $(".btn-update-card").css({"text-decoration": "none"});
  $(".btn-get-prescription").css({"text-decoration": "none"});
  $(".btn-dropdown-prof").css({"text-decoration": "none"});
})

$(".btn-get-prescription").click(function(){
  $("#delete").css({"display": "none"});
  $("#card-big").css({"display": "none"});
  $("#patients-list").css({"display": "none"});
  $("#update").css({"display": "none"});
  $("#presc").css({"display": "block"});
  $(".btn-get-list").css({"text-decoration": "none"});
  $(".btn-create-card").css({"text-decoration": "none"});
  $(".btn-delete-card").css({"text-decoration": "none"});
  $(".btn-update-card").css({"text-decoration": "none"});
  $(".btn-dropdown-prof").css({"text-decoration": "none"});
  $(".btn-get-prescription").css({"text-decoration": "underline"});
})




/* ambulance page buttons*/

$(".btn-create-prof").click(function(){
  $(".form-post-ambulance").css({"display": "block"});
  $(".form-ambulance").css({"display": "none"});
  $(".form-delete-ambulance").css({"display": "none"});
  $(".btn-create-prof").css({"text-decoration": "underline"});
  $(".btn-delete-prof").css({"text-decoration": "none"});
  $(".btn-search-driver").css({"text-decoration": "none"});
})



$(".btn-delete-prof").click(function(){
  $(".form-delete-ambulance").css({"display": "block"});
  $(".form-ambulance").css({"display": "none"});
  $(".form-post-ambulance").css({"display": "none"});
  $(".btn-create-prof").css({"text-decoration": "none"});
  $(".btn-delete-prof").css({"text-decoration": "underline"});
  $(".btn-search-driver").css({"text-decoration": "none"});
})



$(".btn-search-driver").click(function(){
  $("#loginamb").css({"display": "none"});
  $("#signupamb").css({"display": "none"});
  $(".form-ambulance").css({"display": "block"});
  $(".btn-signpamb").css({"text-decoration": "none"});
  $(".btn-search-driver").css({"text-decoration": "underline"});
})


$(".btn-signpamb").click(function(){
  $("#loginamb").css({"display": "block"});
  $("#signupamb").css({"display": "block"});
  $(".form-ambulance").css({"display": "none"});
  $(".btn-signpamb").css({"text-decoration": "underline"});
  $(".btn-search-driver").css({"text-decoration": "none"});
})
// bookdetails page buttoons

$(".btn-go-amb").click(function(){
   $(".form-history-doc").slideUp(350);
});
$(".btn-go-doc").click(function(){
   $(".form-history-doc").slideDown(350);
});

$(".btn-appo").click(function(){
    $(".form-appointment-details").css({"display": "block"});
    $(".form-ambulance-details").css({"display": "none"});
    $(".form-booking-list").css({"display": "none"});
    $(".form-cancel-doc").css({"display": "none"});
    $(".form-cancel-amb").css({"display": "none"});
    $(".form-history-amb").css({"display": "none"});
    $(".form-history-doc").css({"display": "none"});
    $(".btn-appo").css({"text-decoration": "underline"});
    $(".btn-prescription").css({"text-decoration": "none"});
    $(".btn-ambu").css({"text-decoration": "none"});
    $(".btn-cancel-doc").css({"text-decoration": "none"});
    $(".btn-cancel-dri").css({"text-decoration": "none"});
    $(".btn-history").css({"text-decoration": "none"});
});

$(".btn-prescription").click(function(){
    $(".form-appointment-details").css({"display": "none"});
    $(".form-ambulance-details").css({"display": "none"});
    $(".form-booking-list").css({"display": "block"});
    $(".form-cancel-doc").css({"display": "none"});
    $(".form-cancel-amb").css({"display": "none"});
    $(".form-history-amb").css({"display": "none"});
    $(".form-history-doc").css({"display": "none"});
    $(".btn-appo").css({"text-decoration": "none"});
    $(".btn-prescription").css({"text-decoration": "underline"});
    $(".btn-ambu").css({"text-decoration": "none"});
    $(".btn-cancel-doc").css({"text-decoration": "none"});
    $(".btn-cancel-dri").css({"text-decoration": "none"});
    $(".btn-history").css({"text-decoration": "none"});
});

$(".btn-ambu").click(function(){
    $(".form-appointment-details").css({"display": "none"});
    $(".form-ambulance-details").css({"display": "block"});
    $(".form-booking-list").css({"display": "none"});
    $(".form-cancel-doc").css({"display": "none"});
    $(".form-cancel-amb").css({"display": "none"});
    $(".form-history-amb").css({"display": "none"});
    $(".form-history-doc").css({"display": "none"});
    $(".btn-appo").css({"text-decoration": "none"});
    $(".btn-prescription").css({"text-decoration": "none"});
    $(".btn-ambu").css({"text-decoration": "underline"});
    $(".btn-cancel-doc").css({"text-decoration": "none"});
    $(".btn-cancel-dri").css({"text-decoration": "none"});
    $(".btn-history").css({"text-decoration": "none"});
});

$(".btn-cancel-doc").click(function(){
    $(".form-appointment-details").css({"display": "none"});
    $(".form-ambulance-details").css({"display": "none"});
    $(".form-booking-list").css({"display": "none"});
    $(".form-cancel-doc").css({"display": "block"});
    $(".form-cancel-amb").css({"display": "none"});
    $(".form-history-amb").css({"display": "none"});
    $(".form-history-doc").css({"display": "none"});
    $(".btn-appo").css({"text-decoration": "none"});
    $(".btn-prescription").css({"text-decoration": "none"});
    $(".btn-ambu").css({"text-decoration": "none"});
    $(".btn-cancel-doc").css({"text-decoration": "underline"});
    $(".btn-cancel-dri").css({"text-decoration": "none"});
    $(".btn-history").css({"text-decoration": "none"});
});

$(".btn-cancel-dri").click(function(){
    $(".form-appointment-details").css({"display": "none"});
    $(".form-ambulance-details").css({"display": "none"});
    $(".form-booking-list").css({"display": "none"});
    $(".form-cancel-doc").css({"display": "none"});
    $(".form-cancel-amb").css({"display": "block"});
    $(".form-history-amb").css({"display": "none"});
    $(".form-history-doc").css({"display": "none"});
    $(".btn-appo").css({"text-decoration": "none"});
    $(".btn-prescription").css({"text-decoration": "none"});
    $(".btn-ambu").css({"text-decoration": "none"});
    $(".btn-cancel-doc").css({"text-decoration": "none"});
    $(".btn-cancel-dri").css({"text-decoration": "underline"});
    $(".btn-history").css({"text-decoration": "none"});
});

$(".btn-history").click(function(){
    $(".form-appointment-details").css({"display": "none"});
    $(".form-ambulance-details").css({"display": "none"});
    $(".form-booking-list").css({"display": "none"});
    $(".form-cancel-doc").css({"display": "none"});
    $(".form-cancel-amb").css({"display": "none"});
    $(".form-history-amb").css({"display": "block"});
    $(".form-history-doc").css({"display": "block"});
    $(".btn-appo").css({"text-decoration": "none"});
    $(".btn-prescription").css({"text-decoration": "none"});
    $(".btn-ambu").css({"text-decoration": "none"});
    $(".btn-cancel-doc").css({"text-decoration": "none"});
    $(".btn-cancel-dri").css({"text-decoration": "none"});
    $(".btn-history").css({"text-decoration": "underline"});
});

// hospital lists page buttons


$(".btn-get-doctor").click(function(){
  $("#hos-search").css({"display": "block"});
    $(".p-hos").css({"opacity": "0"});
    $("#simply2").css({"display": "block"});
  $(".row-hos-list").css({"opacity": "0"});
  $(".btn-get-doctor").css({"text-decoration": "underline"});
   $(".btn-get-hospital").css({"text-decoration": "none"});
})

$(".btn-get-hospital").click(function(){
  $("#hos-search").css({"display": "none"});
    $(".p-hos").css({"opacity": "1"});
    $("#simply2").css({"display": "none"});
  $(".row-hos-list").css({"opacity": "1"});
  $(".btn-get-doctor").css({"text-decoration": "none"});
   $(".btn-get-hospital").css({"text-decoration": "underline"});
})


$(".btn-home").click(function(){
  $("#messege").css({"display": "none"});
  $("#hos").css({"display": "none"});
  $("#doc-approve").css({"display": "none"});
  $("#amb").css({"display": "none"});
  $("#home").css({"display": "block"});
  $("#doc-delete").css({"display": "none"});
  $("#doc-pending").css({"display": "none"});
  $("#amb-approve").css({"display": "none"});
  $("#amb-pending").css({"display": "none"});
  $("#amb-delete").css({"display": "none"});
  $(".btn-messeges").css({"text-decoration": "none"});
  $(".btn-dropdown").css({"text-decoration": "none"});
  $(".btn-hospital").css({"text-decoration": "none"});
  $(".btn-ambulance").css({"text-decoration": "none"});
  $(".btn-home").css({"text-decoration": "underline"});
})


// admin page, driver page, doctor page buttoons

$(".btn-dash").click(function(){
  $("#home").css("display", "block");
  $(".form-booking-list").css("display", "none");
  $(".form-update-prof").css("display", "none");
  $(".form-delete-prof").css("display", "none");
  $(".form-upload-prof").css("display", "none");
  $(".form-get-patient").css("display", "none");
    $(".btn-patient").css({"text-decoration": "none"});
  $(".btn-dash").css({"text-decoration": "underline"});
  $(".btn-prebook").css({"text-decoration": "none"});
  $(".btn-profile").css({"text-decoration": "none"});
  $(".btn-account").css({"text-decoration": "none"});
  $(".btn-upload").css({"text-decoration": "none"});
});


$(".btn-prebook").click(function(){
  $("#home").css("display", "none");
  $(".form-booking-list").css("display", "block");
  $(".form-update-prof").css("display", "none");
  $(".form-delete-prof").css("display", "none");
  $(".form-upload-prof").css("display", "none");
  $(".form-get-patient").css("display", "none");
    $(".btn-patient").css({"text-decoration": "none"});
  $(".btn-dash").css({"text-decoration": "none"});
  $(".btn-prebook").css({"text-decoration": "underline"});
  $(".btn-profile").css({"text-decoration": "none"});
  $(".btn-account").css({"text-decoration": "none"});
  $(".btn-upload").css({"text-decoration": "none"});
});

$(".btn-profile").click(function(){
  $("#home").css("display", "none");
  $(".form-booking-list").css("display", "none");
  $(".form-update-prof").css("display", "block");
  $(".form-delete-prof").css("display", "none");
  $(".form-upload-prof").css("display", "none");
  $(".form-get-patient").css("display", "none");
    $(".btn-patient").css({"text-decoration": "none"});
  $(".btn-dash").css({"text-decoration": "none"});
  $(".btn-prebook").css({"text-decoration": "none"});
  $(".btn-profile").css({"text-decoration": "underline"});
  $(".btn-account").css({"text-decoration": "none"});
  $(".btn-upload").css({"text-decoration": "none"});
});


$(".btn-account").click(function(){
  $("#home").css("display", "none");
  $(".form-booking-list").css("display", "none");
  $(".form-update-prof").css("display", "none");
  $(".form-delete-prof").css("display", "block");
  $(".form-upload-prof").css("display", "none");
  $(".form-get-patient").css("display", "none");
    $(".btn-patient").css({"text-decoration": "none"});
  $(".btn-dash").css({"text-decoration": "none"});
  $(".btn-prebook").css({"text-decoration": "none"});
  $(".btn-profile").css({"text-decoration": "none"});
  $(".btn-account").css({"text-decoration": "underline"});
  $(".btn-upload").css({"text-decoration": "none"});
});

$(".btn-upload").click(function(){
  $("#home").css("display", "none");
  $(".form-get-patient").css("display", "none");
  $(".form-booking-list").css("display", "none");
  $(".form-update-prof").css("display", "none");
  $(".form-delete-prof").css("display", "none");
  $(".form-upload-prof").css("display", "block");
  $(".btn-dash").css({"text-decoration": "none"});
  $(".btn-prebook").css({"text-decoration": "none"});
  $(".btn-profile").css({"text-decoration": "none"});
  $(".btn-account").css({"text-decoration": "none"});
  $(".btn-patient").css({"text-decoration": "none"});
  $(".btn-upload").css({"text-decoration": "underline"});
});

$(".btn-patient").click(function(){
  $("#home").css("display", "none");
  $(".form-get-patient").css("display", "block");
  $(".form-booking-list").css("display", "none");
  $(".form-update-prof").css("display", "none");
  $(".form-delete-prof").css("display", "none");
  $(".form-upload-prof").css("display", "none");
  $(".btn-dash").css({"text-decoration": "none"});
  $(".btn-prebook").css({"text-decoration": "none"});
  $(".btn-profile").css({"text-decoration": "none"});
  $(".btn-account").css({"text-decoration": "none"});
  $(".btn-upload").css({"text-decoration": "none"});
  $(".btn-patient").css({"text-decoration": "underline"});
});


document.addEventListener('DOMContentLoaded', function() {
  // Retrieve user details from cookies
  const specialization = decodeURIComponent(getCookie('specialization'));
  const city = decodeURIComponent(getCookie('city'));
  const date = decodeURIComponent(getCookie('date'));

  // Display user details on the doctor page
  document.getElementById('specialization').textContent = specialization;


});

// Function to retrieve a specific cookie by name
function getCookie(name) {
  const cookies = document.cookie.split(';');

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();

    // Check if the cookie starts with the provided name
    if (cookie.startsWith(name + '=')) {
      // Return the cookie value
      const cookieValue = cookie.substring(name.length + 1);
      return decodeURIComponent(cookieValue);
    }
  }

  // Cookie not found
  return null;
}



document.addEventListener('DOMContentLoaded', function() {
  // Retrieve user details from cookies
  const userName = decodeURIComponent(getCookie('userName'));
  const userEmail = decodeURIComponent(getCookie('userEmail'));

  // Display user details on the ambulance page
  document.getElementById('uName').textContent = userName;
  document.getElementById('uEmail').textContent = userEmail;

});

// Function to retrieve a specific cookie by name
function getCookie(name) {
  const cookies = document.cookie.split(';');

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();

    // Check if the cookie starts with the provided name
    if (cookie.startsWith(name + '=')) {
      // Return the cookie value
      const cookieValue = cookie.substring(name.length + 1);
      return decodeURIComponent(cookieValue);
    }
  }

  // Cookie not found
  return null;
}


document.addEventListener('DOMContentLoaded', function() {
  // Retrieve user details from cookies
  const driveruserName = decodeURIComponent(getCookie('driverUserName'));
  const driveremail = decodeURIComponent(getCookie('driverEmail'));

  // Display user details on the ambulance page
  document.getElementById('username').textContent = driveruserName;
  document.getElementById('email').textContent = driveremail;
  document.getElementById('unamedriver').value = driveruserName;
  document.getElementById('kundi').value = driveruserName;
  document.getElementById('unamedriverpro').value = driveruserName;

});

// Function to retrieve a specific cookie by name
function getCookie(name) {
  const cookies = document.cookie.split(';');

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();

    // Check if the cookie starts with the provided name
    if (cookie.startsWith(name + '=')) {
      // Return the cookie value
      const cookieValue = cookie.substring(name.length + 1);
      return decodeURIComponent(cookieValue);
    }
  }

  // Cookie not found
  return null;
}


document.addEventListener('DOMContentLoaded', function() {
  // Retrieve user details from cookies
  const doctorUserName = decodeURIComponent(getCookie('doctorUserName'));
  const doctorEmail = decodeURIComponent(getCookie('doctorEmail'));

  // Display user details on the doctor page
  document.getElementById('doctorUname').textContent = doctorUserName;
  document.getElementById('doctorEmail').textContent = doctorEmail;
  document.getElementById('doctorUserName').value = doctorUserName;
  document.getElementById('doctorUser').value = doctorUserName;
  document.getElementById('doctorUserpro').value = doctorUserName;
});

// Function to retrieve a specific cookie by name
function getCookie(name) {
  const cookies = document.cookie.split(';');

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();

    // Check if the cookie starts with the provided name
    if (cookie.startsWith(name + '=')) {
      // Return the cookie value
      const cookieValue = cookie.substring(name.length + 1);
      return decodeURIComponent(cookieValue);
    }
  }

  // Cookie not found
  return null;
}


document.addEventListener('DOMContentLoaded', function() {
  // Retrieve user details from cookies
  const adminName = decodeURIComponent(getCookie('adminName'));
  const adminPassword = decodeURIComponent(getCookie('adminPassword'));
  const totalUsers = decodeURIComponent(getCookie('totalUsers'));
  const totalDoctors = decodeURIComponent(getCookie('totalDoctors'));
  const totalPendingDoctors = decodeURIComponent(getCookie('totalPendingDoctors'));
  const totalApprovedDoctors = decodeURIComponent(getCookie('totalApprovedDoctors'));
  const totalDrivers = decodeURIComponent(getCookie('totalDrivers'));
  const totalPendingDrivers = decodeURIComponent(getCookie('totalPendingDrivers'));
  const totalApprovedDrivers = decodeURIComponent(getCookie('totalApprovedDrivers'));

  // Display user details on the admin page
  document.getElementById('adminName').textContent = adminName;
  document.getElementById('adminPassword').textContent = adminPassword;
  document.getElementById('totalUsers').textContent = totalUsers;
  document.getElementById('totalDoctors').textContent = totalDoctors;
  document.getElementById('totalPendingDoctors').textContent = totalPendingDoctors;
  document.getElementById('totalApprovedDoctors').textContent = totalApprovedDoctors;
  document.getElementById('totalDrivers').textContent = totalDrivers;
  document.getElementById('totalPendingDrivers').textContent = totalPendingDrivers;
  document.getElementById('totalApprovedDrivers').textContent = totalApprovedDrivers;
});

// Function to retrieve a specific cookie by name
function getCookie(name) {
  const cookies = document.cookie.split(';');

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();

    // Check if the cookie starts with the provided name
    if (cookie.startsWith(name + '=')) {
      // Return the cookie value
      const cookieValue = cookie.substring(name.length + 1);
      return decodeURIComponent(cookieValue);
    }
  }

  // Cookie not found
  return null;
}



$("#refreshDoctor").submit(function(event) {
  event.preventDefault(); // Prevent the default form submission

  $.post("/refreshDoctor", function() {
    // Handle the response or perform any necessary actions
    console.log("POST request to /refreshDoctor successful");
  });
});
