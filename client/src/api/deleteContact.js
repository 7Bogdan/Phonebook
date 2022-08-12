const deleteContact = (_id) => {
  fetch("/api/users/" + _id, {
    method: "DELETE",
    contentType: "application/json",
  }).catch((error) => console.error("Error:", error));
};

export { deleteContact };
