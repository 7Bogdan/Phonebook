import React from "react";
import { Table, Button } from "react-bootstrap";

function Info(props) {

  const row = (contact) => {
    return (
      <tr id={contact._id} key={contact._id}>
        <td> {contact.name} </td>
        <td> {contact.surname}</td>
        <td> {contact.telephoneNumber} </td>
        <td> {contact.city} </td>
        <td> {contact.email} </td>
        <td>
          <Button
            className="edit"
            variant="outline-info"
            onClick={() => props.change(contact._id)}
          >
            Изменить
          </Button>
          {"  "}
          <Button
            className="remove"
            variant="outline-danger"
            onClick={() => props.remove(contact._id)}
          >
            Удалить
          </Button>
        </td>
      </tr>
    );
  };

  return (
    <div className="info">
      <h2>Your contacts</h2>
      <Table responsive="sm">
        <thead>
          <tr>
            <th>Name</th>
            <th>Surname</th>
            <th>Number</th>
            <th>City</th>
            <th>Email</th>
            <th></th>
          </tr>
        </thead>
        <tbody align="center">{props.contacts.map((data) => row(data))}</tbody>
      </Table>
    </div>
  );
}

export default Info;
