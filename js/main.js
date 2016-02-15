 var studentsArray = [];
 var selectedIndex = -1;

 function init() {
  document.getElementById("tablerows").innerHTML = "";
  if (localStorage.studentsRecord) {
   studentsArray = JSON.parse(localStorage.studentsRecord);
   for (var i = 0; i < studentsArray.length; i++) {
    prepareTableCell(i, studentsArray[i].firstname, studentsArray[i].lastname, studentsArray[i].company, studentsArray[i].email, studentsArray[i].mobile, studentsArray[i].imageupload);
   }
  }
 }

 function savePressed() {

  var firstName = document.getElementById("firstname").value;
  var lastName = document.getElementById("lastname").value;
  var birthday = document.getElementById("birthday").value;
  var company = document.getElementById("company").value;
  var email = document.getElementById("email").value;
  var mobile = document.getElementById("mobile").value;
  var imageupload = document.getElementById("imageupload").value;
  if((firstName !="")&&(lastName !="")&&(birthday !="")&&(company !="")&&(email !="")&&(mobile !="")){
  var stuObj = {
   firstname: firstName,
   lastname: lastName,
   birthday: birthday,
   company: company,
   email: email,
   mobile: mobile,
   imageupload: imageupload
  };
  if (selectedIndex === -1) {
   studentsArray.push(stuObj);
  } else {
   studentsArray.splice(selectedIndex, 1, stuObj);
  }

}else{
  alert("Please input required fields");
}
  localStorage.studentsRecord = JSON.stringify(studentsArray);
  init();
  cancelPressed();
 }

 function prepareTableCell(index, firstName, lastName) {
  var table = document.getElementById("tablerows");
  var row = table.insertRow();
  var firstNameCell = row.insertCell(0);
  var actionCell = row.insertCell(1);
  firstNameCell.innerHTML = firstName + ' ' + lastName;


  actionCell.innerHTML = '<div class="edit_del"><button onclick="onEditPressed(' + index + ')">Edit</button><button onclick="deleteTableRow(' + index + '),cancelPressed()">Delete</button></div>';
 }

 function deleteTableRow(index) {
  /*
   var table = document.getElementById("regtable");
   table.deleteRow(index+1);
   */
  studentsArray.splice(index, 1);
  localStorage.studentsRecord = JSON.stringify(studentsArray);
  init();
 }

 function cancelPressed() {
  selectedIndex = -1;
  document.getElementById("firstname").value = "";
  document.getElementById("lastname").value = "";
  document.getElementById("birthday").value = "";
  document.getElementById("company").value = "";
  document.getElementById("email").value = "";
  document.getElementById("mobile").value = "";
  document.getElementById("imageupload").value = "";

  document.getElementById("submit").innerHTML = "Save";
 }

 function onEditPressed(index) {
  selectedIndex = index;
  var stuObj = studentsArray[index];
  document.getElementById("firstname").value = stuObj.firstname;
  document.getElementById("lastname").value = stuObj.lastname;
  document.getElementById("birthday").value = stuObj.birthday;
  document.getElementById("company").value = stuObj.company;
  document.getElementById("email").value = stuObj.email;
  document.getElementById("mobile").value = stuObj.mobile;
  document.getElementById("imageupload").value = stuObj.imageupload;
  document.getElementById("submit").innerHTML = "Update";
 }


 function previewFile() {
  var preview = document.querySelector('img');
  var file = document.querySelector('input[type=file]').files[0];
  var reader = new FileReader();
  reader.onloadend = function() {
   preview.src = reader.result;
  }
  if (file) {
   reader.readAsDataURL(file);
  } else {
   preview.src = "";
  }
 }
