
function GetUsers() {
 fetch("/api/users/",{
   method:"GET",
   contentType: "application/json"
 })
 .then(response => response.json())
 .then(result =>(result.forEach((item) => row(item))))

}

function GetUser(id) {
 fetch("/api/users/"+id,{
  method:"GET",
  contentType: "application/json"
 })
 .then(response => response.json())
 .then(result =>(GetForm(result)))
}

function DeleteUser(id) {
 fetch("/api/users/"+id,{
  method:"DELETE",
  contentType: "application/json"
 })
}

function CreateUser( userName, userSurname, userTelephoneNumber,userCity,userEmail) {
 fetch("api/users" ,{
  method:"POST",
  headers:{
   'Content-Type': 'application/json'
  },
  body: JSON.stringify({
  name: userName,
  surname: userSurname,
  telephoneNumber:userTelephoneNumber,
  city:userCity,
  email:userEmail
  })
 })
}

function EditUser(userId,userName, userSurname, userTelephoneNumber,userCity,userEmail) {
 fetch("api/users" ,{
  method:"PUT",
  headers:{
   'Content-Type': 'application/json'
  } ,
  body: JSON.stringify({
   id: userId,
   name: userName,
   surname: userSurname,
   telephoneNumber:userTelephoneNumber,
   city:userCity,
   email:userEmail
  })
 })
}

function GetForm(user) {
 let form = document.forms["userForm"];
 form.elements["id"].value = user._id;
 form.elements["name"].value = user.name;
 form.elements["surname"].value = user.surname;
 form.elements["telephoneNumber"].value = user.telephoneNumber;
 form.elements["city"].value = user.city;
 form.elements["email"].value = user.email
}

function reset() {
 let form = document.forms["userForm"];
  form.elements["name"].value = '';
  form.elements["surname"].value = '';
  form.elements["telephoneNumber"].value = '';
  form.elements["city"].value = '';
  form.elements["email"].value = '';
  form.elements["id"].value = 0;
}

let row = (user) => {
 let table = document.getElementById("table")
 let tr = document.createElement("tr");
 tr.setAttribute("scope", "row")
 tr.setAttribute("id", user._id)
 tr.innerHTML =(
  "<tr scope='row' id=" + user._id + ">"+
  "<td>" + user.name + "</td>" +
  "<td>" + user.surname + "</td>" +
  "<td>" + user.telephoneNumber + "</td>"+
  "<td>" + user.city + "</td>"+
  "<td>" + user.email + "</td>"+
  "<td><a class='editLink' id='" + user._id + "'>Изменить</a> | " +
  "<a class='removeLink' id='" + user._id + "'>Удалить</a></td></tr>")
 return(table.append(tr))
}

let addUser = document.getElementById("addUser")
 addUser.addEventListener('click', function(evt){
 let userId = this.elements["id"].value;
 let userName = this.elements["name"].value;
 let userSurname = this.elements["surname"].value;
 let userTelephoneNumber = this.elements["telephoneNumber"].value;
 let userCity = this.elements["city"].value;
 let userEmail = this.elements["email"].value;
  if (userId == 0){
   CreateUser(userName, userSurname, userTelephoneNumber,userCity,userEmail);
  }else{
   EditUser(userId,userName, userSurname, userTelephoneNumber,userCity,userEmail);
  }
},false);

let edit = document.getElementById("table")
edit.addEventListener('click', function(evt){
 if(evt.target.closest('.editLink')) {
  GetForm( GetUser(evt.target.id))
 }
},false)

table.addEventListener('click', function(evt){
 if(evt.target.closest('.removeLink')) {
  evt.target.closest('tr').remove()
  DeleteUser(evt.target.id)
 }
},false)

GetUsers();
