import React, { useState, useEffect } from "react";
import { Button, Form, InputGroup, Alert } from "react-bootstrap";
import { createContact } from "./api/createContact";
import { editContact } from "./api/editContact";

function SaveContact(props) {
  const [index, setIndex] = useState(0);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [telephoneNumber, setTelephoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [validated, setValidated] = useState(false);

  let contact = { index, name, surname, telephoneNumber, city, email };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
    } else {
      setValidated(false);
      index === 0 ? createContact(contact) : editContact(contact);
    }
  };

  const handleReset = (user) => {
    setIndex(user._id || 0);
    setName(user.name || "");
    setSurname((user.surname === "~~~~~") ? "" :user.surname||"");
    setTelephoneNumber(user.telephoneNumber || "");
    setCity((user.city === "~~~~~") ? "" : user.city ||"");
    setEmail(user.email || "");
  };

  useEffect(() => handleReset(props.contact), [props.contact]);

  return (
    <Form
      noValidate
      validated={validated}
      name="contactForm"
      onSubmit={handleSubmit}
      onReset={handleReset}
    >
      <h2>Save contact</h2>
      <input type="hidden" name="index" value={index} />
      <Form.Group controlId="formGridName">
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text>Name</InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
            onChange={(event) => setName(event.target.value)}
            value={name}
            name="name"
            type="text"
            pattern="[A-Za-zА-Яа-яЁё]*"
            maxLength="20"
            minLength="2"
            required
          />
          <Form.Control.Feedback type="invalid">
            Please choose a name (min. length 2 letters,only letters) .
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>
      <Form.Group controlId="formGridSurname">
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text>Surname</InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
            onChange={(event) => setSurname(event.target.value)}
            value={surname}
            name="surname"
            type="text"
            pattern="[A-Za-zА-Яа-яЁё]*"
            maxLength="20"
            minLength="4"
          />
          <Form.Control.Feedback type="invalid">
            Please choose a surname (min. length 4 letters,only letters) .
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>
      <Form.Group controlId="formGridTelephoneNumber">
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text>Telephone </InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
            onChange={(event) => setTelephoneNumber(event.target.value)}
            name="telephoneNumber"
            value={telephoneNumber}
            type="text"
            pattern="[0-9]*"
            maxLength="20"
            minLength="5"
            required
          />
          <Form.Control.Feedback type="invalid">
            Please choose a telephone (min. length 5 numbers,only numbers).
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>
      <Form.Group controlId="formGridCity">
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text>City</InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
            onChange={(event) => setCity(event.target.value)}
            value={city}
            type="text"
            pattern="[A-Za-zА-Яа-яЁё]*"
            name="city"
            maxLength="20"
          />
          <Form.Control.Feedback type="invalid">
            Please choose a city (Only letters) .
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>
      <Form.Group controlId="formGridEmail">
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text>Email</InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            value={email}
            name="email"
            maxLength="25"
          />
          <Form.Control.Feedback type="invalid">
            Incorrect email .
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>
      <Alert variant="warning">
        Name and telephone are required, the rest is optional
      </Alert>
      <Button variant="outline-secondary" type="submit">
        Сохранить
      </Button>{" "}
      <Button variant="outline-secondary" type="reset">
        Сбросить
      </Button>
    </Form>
  );
}

export default SaveContact;
