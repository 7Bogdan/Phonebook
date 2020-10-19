let sortByLetters = (contacts, param) => {
  if (param === "name") {
    contacts.sort((a, b) => (a.name > b.name ? 1 : -1));
  } else if (param === "surname") {
    contacts.sort((a, b) => (a.surname > b.surname ? 1 : -1));
  } else if (param === "city") {
    contacts.sort((a, b) => (a.city > b.city ? 1 : -1));
  }
  return contacts;
};


export { sortByLetters };
