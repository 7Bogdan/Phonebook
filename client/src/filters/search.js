let searchByLetters = (contact, word,value) => {
  if(value==="name"){
 return( contact.filter(interim => interim.name === word) )}
 else if(value==="surname"){
   return( contact.filter(interim => interim.surname === word) )}
 else if(value==="city"){
   return( contact.filter(interim => interim.city === word) )}
 else if(value==="number"){
   return( contact.filter(interim => interim.telephoneNumber === word) )}
};

export { searchByLetters }
