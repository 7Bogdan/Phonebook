import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Filters from "./Filters";
import SaveContact from "./SaveContact";
import Contacts from "./Contacts";
import { Container, Col, Row } from "react-bootstrap";
import { deleteContact } from "./api/deleteContact";
import { getContacts } from "./api/getContacts";
import { getContact } from "./api/getContact";
import { sortByLetters } from "./filters/sort";
import { searchByLetters } from "./filters/search";


function Page() {
  const [contact, setContact] = useState({});
  const [contacts, setContacts] = useState([]);
  let interimArr = contacts.slice();

  useEffect(() => {
    getContacts().then((result) => setContacts(result));
  }, []);

  const change = (_id) => {
    getContact(_id).then((result) => setContact(result));
  };

  let remove = (_id) => {
    deleteContact(_id);
    setContacts(contacts.filter((contact) => contact._id !== _id));
  };

  let sortByParam = (param) => {
    sortByLetters(interimArr, param);
    setContacts(interimArr);
  };

  let searchByParam =(value,word) =>{
    setContacts(searchByLetters(interimArr, word, value));
  }

  return (
    <Container fluid>
      <Filters
        sortByParam={sortByParam}
        searchByParam={searchByParam}
        />
      <Row className="justify-content-md-center">
        <Col lg={3}>
          <SaveContact contact={contact} />
        </Col>
        <Col lg={8}>
          <Contacts change={change} remove={remove} contacts={contacts} />
        </Col>
      </Row>
    </Container>
  );
}

export default Page;
