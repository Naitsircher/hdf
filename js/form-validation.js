class request{
  constructor(p){
    this.formData = p;
  }
  ajaxRequestGetDetails (){
    return new Promise ((resolve, reject)=>{
      /**AJAX REQUEST */
      $.ajax({
        type: 'POST',
        url: "./php/getDetails.php",
        data: this.formData,
        processData: false,
        contentType: false,
        cache: false,
        dataType: "json",
        success: function(response){
            resolve(response);
        },
        error: function(e){
            reject(e);
        }
      });
    });
  };
};
// Example starter JavaScript for disabling form submissions if there are invalid fields
( function () {
  'use strict'


  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation');
  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', async function (event) {
        // INITIALIZATION OF VARIABLES...
        var btemp           = $("input[name='btemp']").val();
        var empid           = $("input[name='empid']").val();
        var fname           = $("input[name='fname']").val();
        var dept            = $("input[name='lname']").val();
        var time            = $('#time').val();
        var date            = $('#date').val();
        var symptoms        = $("input[name='symptoms']:checked").val();
        var travelled       = $("input[name='travelled']:checked").val();
        var willing         = $("input[name='willing']:checked").val();
        var vacRegistered   = $("input[name='vacRegistered']:checked").val();
        var takedVac        = $("input[name='vaccinated']:checked").val();
        var tempTravLoc     = document.getElementById("travloc");
        var tempWhyNo       = document.getElementById("whyNo");
        var tempregLoc      = document.getElementById("regLoc");
        var tempVacTaken    = document.getElementById("vacDate");
        var tempdosetype    = document.getElementById("dosetype");
        var tempbakunatype  = document.getElementById("bakunatype");
        var travloc = null;
        var whyNo = null;
        var regLoc = null;
        var vacDate = null;
        var dosetype = null;
        var bakunatype = null;
        // ** This if statements are responsible to check the
        // variable in it is not null 
        if (tempTravLoc) {
         travloc =  tempTravLoc.value.toUpperCase();
        }
        if (tempWhyNo) {
          whyNo =  tempWhyNo.value.toUpperCase();
        }
        if (tempregLoc) {
          regLoc =  tempregLoc.value.toUpperCase();
        }
        if (tempVacTaken) {
          vacDate =  tempVacTaken.value;
        }
        if (tempdosetype) {
          dosetype =  tempdosetype.value;
        }
        if (tempbakunatype) {
          bakunatype =  tempbakunatype.value;
        }/*END OF CHECKING*/
        var storedEmailFormat = new emails();
        var sweetAlerts = new alerts();
        // FUNCTION THAT HANDLES THE FORMAT OF EMAILS
        function emails() {
          this.employeeEmailFormat = async function(subjectMsg){
            const p = new FormData();
            p.append("empid",  empid);
            p.append('request', 1);
            /**NEW INSTANCE FOR VACCINATION DETAILS REQUEST */
            const vacDetailsReq = new request(p);
            let  vacStat = await vacDetailsReq.ajaxRequestGetDetails();
            if(vacStat){
                vacStat = "Unvaccinated";
            }
            else{
              vacStat = "Vaccinated";
            }
            // console.log("Email sent with subject |", subjectMsg);
            // ** Email API format that employee have a COVID19 symptoms!
            Email.send({
              Host: "smtp.gmail.com",
              Username : "telford.mis.hdf.developer@gmail.com",
              Password : "pxowqhiqpysxlnjn",
              To : "mariarizalinacortez@astigp.com, leelipkeng@astigp.com, mellobo@astigp.com, paolojehecoaurigue@astigp.com, charitylanceta@astigp.com, , telford_clinic_ph@astigp.com, raqueltibayan@astigp.com, telford_mis_ph@astigp.com",
              // To : "telford_mis_ph@astigp.com",
              // To : "leilaungson@astigp.com, chanchristianarana@gmail.com",
              From : "telford.mis.hdf.developer@gmail.com",
              Subject : subjectMsg,
              Body : "To whom it may concern,"+
              "<br/>" + "<br/>" + "<br/>" +
              "Please accept this letter as notification regarding our employee." +
              "<br/>" +
              "Kindly see employee inputted details below for your reference."+
              "<br/>" + "<br/>" +
              "Employee ID: " + " " + empid + "<br/>" +
              "Employee Name: " + " " + fname + "<br/>" + 
              "Body temperature: " + " " + btemp + "<br/>" +
              "Vaccination Status: " + " " + vacStat + "<br/>" +
              "Symptoms : " + " " + symptoms + "<br/>" + 
              "Inputted travel location : " + " " + travloc + "<br/>" + 
              "Date and Time of Declaration : " + " " + date + ' ' + ' ' + time + 
              "<br/>"+ "<br/>"+ "<br/>"+
              "Note:" + 
              "<br/>"+
              "😸 This mail is autogenerated by the HDF System. Please do not reply directly. 😸" + 
              "<br/>"+ "<br/>",   
            });// </ END OF EMAIL
          };
        }; /*END OF FUNCTION THAT HANDLES THE FORMAT OF EMAILS*/
        // FUNCTION THAT HANDLES THE ALERT FORMATS
        function alerts(){
          // ** Function responsible to handle alert message to those
          //employee with symptoms of COVID19
          function withSympAlertLayout(str){
            const wrapper     = document.createElement('div');
                  wrapper.innerHTML ="<span style='font-size: 18px; color:red; text-transform:uppercase; font-family: Arial, Helvetica, sans-serif;'>" + str + "</span>" + "<br>"+ "<br>"+
                              "Please inform the SECURITY PERSONNEL to call the nurse\n"+
                              "on duty for assessment and proceed to the isolation area. And don't worry &#8221Every thing gonna be all right!&#8221"  + "<br>" + "<br>"+ "<br>";
            return wrapper;
          };
          // ** SUCCESS ALERT SCRIPT
          this.successDeclaration = function(){
            insertData();
            // FORMAT FOR HTML CONTENT
            const wrapper     = document.createElement('div');
            wrapper.innerHTML = "<span style='font-family: Arial, Helvetica, sans-serif;'>&#8221You're a great example to others&#8221</span>" + "<br>" +
                    "Data successfully saved on the day of " + "<br> <br>" +
                    "<span style='font-size: 1.3rem; font-weight: bold; color: #00D100; text-transform:uppercase; font-family: Arial, Helvetica, sans-serif;'>" +
                    date + " " + time + "</span>";
            // SWEET ALERT FOR VALID HDR DATA
            Swal.fire({
              title: 'Thank you \n'  + fname.toUpperCase() ,
              html: wrapper,
              icon: "success",
              background: '#fff',
              width: 600,
              allowOutsideClick: false,
              allowEscapeKey: false,
              confirmButtonColor: "#22BB33",
              confirmButtonText: '<i class="fa fa-thumbs-up"></i> Great!',
              backdrop: `
                rgba(10, 209, 60, 0.50)
                url("./img_ico/img/party-popper1.gif")
                bottom left
                no-repeat
              `
            })
            .then((result)=>{
              if(result.isConfirmed){
                window.location.href = "index.php";
              }
            }); /* ALERT ENDS HERE */

          };
          // ** High body temperature and with covid symptoms
          // alert script
          this.covid19SymptomsDetected = function (str){
            Swal.fire({
              title: 'Are you sure?',
              html: "Detected COVID19 symptoms with <br>" + "<span style='font-size: 3rem; color:red; font-family: Arial, Helvetica, sans-serif;'>" + btemp + "&#x2103 </span><br>" + "body temperature!",
              icon: 'warning',
              showCancelButton: true,
              backdrop: "rgba(209, 10, 10, 0.77)",
              confirmButtonColor: '#22BB33',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes, declare!',
              cancelButtonText: 'Do not declare'
            }).then((result) => {
              if (result.isConfirmed) {
                insertData();
                let btemp           = document.getElementById('btemp').value 
                let checkRadio      = document.querySelector('#symp_toms:checked');
                let msgFormat = withSympAlertLayout(str);
                let emailSubject = "Employee having COVID19 Symptoms and Higher Body Temperature than Normal.";
                let emailSubject1 = "Employee having Higher Body Temperature than Normal";
                let emailSubject2 = "Employee having COVID19 Symptoms.";
                // ** IF statements to check what kind of email should the system
                // will send 
                if (checkRadio != null  && btemp >= 37.60){ //HIGHER BODY TEMP AND HAVE SYMPTOMS
                  storedEmailFormat.employeeEmailFormat(emailSubject);
                }
                else if (btemp >= 37.60 && checkRadio == null){ // HIGHER BODY TEMP
                  storedEmailFormat.employeeEmailFormat(emailSubject1);
                }
                else if (btemp <= 37.50 && checkRadio != null ){ // WITH SYMPTOMS
                  storedEmailFormat.employeeEmailFormat(emailSubject2);
                }; /* if else condition ends here! */
                // ** ALERT WHEN USER DECLARE THE DATA WITH COVID19 SYMPTOMS
                Swal.fire({
                  icon: 'warning',
                  title: 'WARNING!',
                  html: msgFormat,
                  backdrop: "rgba(209, 10, 10, 0.77)",
                  allowOutsideClick: false,
                  allowEscapeKey: false,
                  allowEnterKey: false,
                  showConfirmButton: false,
                }); /* ALERT ENDS HERE */
              }
              else if (
              /* CANCEL EVENT SCRIPT */
              result.dismiss === Swal.DismissReason.cancel
              ) {
                Swal.fire({
                  title: 'Cancelled',
                  text: "Data unsaved and email not sent! 😿",
                  icon: 'error',
                  backdrop: "rgba(209, 10, 10, 0.77)",
                  confirmButtonColor: '#22BB33',
                });
              }
            });
          };
        };/*END OF FUNCTION THAT HANDLES THE ALERT FORMATS*/

        // Function responsible for sending data to the database
        function insertData(){
          $.ajax({
            type: 'POST',
            url: './php/process.php',
            dataType: "text",
            data:{btemp           : btemp,
                  empid           : empid,
                  fname           : fname,
                  dept            : dept,
                  time            : time,
                  date            : date,
                  symptoms        : symptoms,
                  travelled       : travelled,
                  travloc         : travloc,
                  willing         : willing,
                  whyNo           : whyNo,
                  vacRegistered   : vacRegistered,
                  registrationLoc : regLoc,
                  takedVac        : takedVac,
                  vacDate         : vacDate,
                  dosetype        : dosetype,
                  bakunatype      : bakunatype
            },
            cache : false, 
            error: function (){
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                backdrop: "rgba(209, 10, 10, 0.77)",
                allowOutsideClick: false,
                allowEscapeKey: false,
                text: 'Something went wrong data not save!',
              })
            },
          });
        }; /* FUNCTION FOR INSERTING DATA ENDS HERE */

        // Function responsible for handling alert in different situation
        function alertExecute(){
          var btemp           = document.getElementById('btemp').value 
          var checkRadio      = document.querySelector('#symp_toms:checked');
          let str1 = "You have COVID19 symptoms and higher body temperature than normal.";
          let str2 = "Your temp is higher than normal body temperature.";
          let str3 = "You have COVID19 symptoms.";
          // ** Condition before sending alerts 
          // ** This if else statement will recognize what kind of
          // alert will be going to popup.
          if (checkRadio != null  && btemp >= 37.60){ //HIGHER BODY TEMP AND HAVE SYMPTOMS
            sweetAlerts.covid19SymptomsDetected(str1);
          }
          else if (btemp >= 37.60 && checkRadio == null){ // HIGHER BODY TEMP
            sweetAlerts.covid19SymptomsDetected(str2);
          }
          else if (btemp <= 37.50 && checkRadio != null ){ // WITH SYMPTOMS
            sweetAlerts.covid19SymptomsDetected(str3);
          }
          else {
            sweetAlerts.successDeclaration();
          }
        }; /* Function alertExecute ends here */
        // CHECKING THE VALIDITY OF INPUTS INSIDE FORM
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }  
        else {
          event.preventDefault();
          alertExecute();
          /**PASSING VALUE TO THE FromData Built In function */
            const p = new FormData();
            p.append("empid",  empid);
            p.append('request', 1);
            /**NEW INSTANCE FOR VACCINATION DETAILS REQUEST */
            const vacDetailsReq = new request(p);
            const vacDetailsRes = await vacDetailsReq.ajaxRequestGetDetails();
            if(vacDetailsRes){
              let emailSubject2 = "Attendance Notification of Unvaccinated Employee";
              storedEmailFormat.employeeEmailFormat(emailSubject2);
            }
            else{
            };
          
        };
        form.classList.add('was-validated')
      }, false)
    })
})()

