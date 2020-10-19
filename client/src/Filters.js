import React,{useState} from "react";
import {
  Button,
  Navbar,
  Nav,
  Form,
  FormControl,
  ButtonGroup,
  ToggleButton,
} from "react-bootstrap";

function Filters(props) {
  const [toggleValue, setTuggleValue] = useState("number");
  const [word, setWord] = useState("");

  let toggles = [
    { name: "name", value: "name" },
    { name: "surname", value: "surname" },
    { name: "city", value: "city" },
    { name: "number", value: "number" },
  ];

  return (
    <Navbar bg="light" fixed="top" expand="lg">
      <Navbar.Brand href="#home">Phonebook </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#sort" className="sort">
            Sort by:
          </Nav.Link>
          <Nav.Link href="#name" onClick={() => props.sortByParam("name")}>
            name
          </Nav.Link>
          <Nav.Link
            href="#surname"
            onClick={() => props.sortByParam("surname")}
          >
            surname
          </Nav.Link>
          <Nav.Link href="#city" onClick={() => props.sortByParam("city")}>
            city
          </Nav.Link>
        </Nav>

        <Form inline>
          <ButtonGroup
            toggle
            aria-label="Basic example"
            size="sm"
            className="search"
          >
            {toggles.map((toggle, idx) => (
              <ToggleButton
                key={idx}
                type="radio"
                variant="secondary"
                name="radio"
                value={toggle.value}
                checked={toggleValue === toggle.value}
                onChange={(e) => setTuggleValue(e.currentTarget.value)}
              >
                {toggle.name}
              </ToggleButton>
            ))}
          </ButtonGroup>
          <FormControl
            type="text"
            placeholder="Search"
            className="mr-sm-2"
            onChange={(event) => setWord(event.target.value)}
          />
          <Button variant="outline-secondary" onClick={()=>props.searchByParam(toggleValue,word)}>Search...</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Filters;
