import React, { useState } from "react";
import { Button, Form, Modal, useToaster, Notification } from "rsuite";
import axios from "axios";

const Model = (props) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [condition, setCondition] = useState("");
  const [assignedTherapist, setAssignedTherapist] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const toaster = useToaster();

  const handleSubmit = async () => {
    if (!name || !age || !condition || !assignedTherapist || !contactInfo) {
      toaster.push(
        <Notification type="error" header="Error">
          Please fill in all the required fields.
        </Notification>,
        { placement: "topCenter", duration: 3000 }
      );
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/patients/addPatient",
        {
          name,
          age: parseInt(age),
          condition,
          assignedTherapist,
          contactInfo,
        }
      );

      if (response.data.error) {
        toaster.push(
          <Notification type="error" header="Error">
            {response.data.error}
          </Notification>,
          { placement: "topCenter", duration: 3000 }
        );
      } else {
        toaster.push(
          <Notification type="success" header="Success">
            Patient Added Successfully
          </Notification>,
          { placement: "topCenter", duration: 3000 }
        );
        resetForm();
        props.refreshPatients();
        props.handleClose();
      }
    } catch (error) {
      toaster.push(
        <Notification type="error" header="Error">
          {error.message}
        </Notification>,
        { placement: "topCenter", duration: 3000 }
      );
    }
  };

  const resetForm = () => {
    setName("");
    setAge("");
    setCondition("");
    setAssignedTherapist("");
    setContactInfo("");
  };

  return (
    <Modal size="lg" open={props.open} onClose={props.handleClose} style={{ overflow: "hidden" }}>
      <Modal.Header>
        <Modal.Title>Add New Patient</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form fluid>
          <Form.Group controlId="name">
            <Form.ControlLabel>Name</Form.ControlLabel>
            <Form.Control name="name" value={name} onChange={(value) => setName(value)} />
          </Form.Group>
          <Form.Group controlId="age">
            <Form.ControlLabel>Age</Form.ControlLabel>
            <Form.Control name="age" type="number" value={age} onChange={(value) => setAge(value)} />
          </Form.Group>
          <Form.Group controlId="condition">
            <Form.ControlLabel>Condition</Form.ControlLabel>
            <Form.Control name="condition" value={condition} onChange={(value) => setCondition(value)} />
          </Form.Group>
          <Form.Group controlId="assignedTherapist">
            <Form.ControlLabel>Assigned Therapist</Form.ControlLabel>
            <Form.Control name="assignedTherapist" value={assignedTherapist} onChange={(value) => setAssignedTherapist(value)} />
          </Form.Group>
          <Form.Group controlId="contactInfo">
            <Form.ControlLabel>Contact Info</Form.ControlLabel>
            <Form.Control name="contactInfo" type="email" value={contactInfo} onChange={(value) => setContactInfo(value)} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button appearance="primary" onClick={handleSubmit}>Submit</Button>
        <Button onClick={props.handleClose} appearance="subtle">Cancel</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Model;
