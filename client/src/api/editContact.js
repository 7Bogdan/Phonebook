const editContact = (contact) => {
  fetch("api/users", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: contact.index,
      name: contact.name,
      surname: contact.surname || "~~~~~",
      telephoneNumber: contact.telephoneNumber,
      city: contact.city || "~~~~~",
      email: contact.email,
    }),
  })
    .catch((error) => console.error("Error:", error));
};

export {editContact}
