const getContact = (id) => {
 let contact = fetch("/api/users/"+id,{
  method:"GET",
  contentType: "application/json"
 })
 .then(response => response.json())
 .catch((error) => console.error('Error:', error));
 return contact
}

export {getContact}
