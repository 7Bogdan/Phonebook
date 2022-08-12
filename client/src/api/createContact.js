let createContact = (contact) => {
  fetch("api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: contact.name,
      surname: contact.surname || "~~~~~",
      telephoneNumber: contact.telephoneNumber,
      city: contact.city || "~~~~~",
      email: contact.email,
    }),
  }).catch((error) => console.error("Error:", error));
};

export { createContact };
