// src/Model/Edit.js

import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'rsuite';
import axios from 'axios';

const Edit = ({ patientId, handleEditClose, openEdit, onEditSuccess }) => {
  const [patient, setPatient] = useState({
    name: '',
    age: '',
    condition: '',
    assignedTherapist: '',
    contactInfo: '',
  });

  const fetchPatientData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/patients/${patientId}`);
      setPatient(response.data);
    } catch (error) {
      console.error('Error fetching patient data:', error);
    }
  };

  useEffect(() => {
    if (patientId) {
      fetchPatientData();
    }
  }, [patientId]);

  const handleChange = (value, field) => {
    setPatient({
      ...patient,
      [field]: value,
    });
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:8080/patients/${patientId}`, patient);
      onEditSuccess(); // Callback to refresh patient data
      handleEditClose(); // Close modal
    } catch (error) {
      console.error('Error updating patient data:', error);
    }
  };

  return (
    <Modal size="lg" open={openEdit} onClose={handleEditClose}>
      <Modal.Header>
        <Modal.Title>Edit Patient</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form fluid>
          <Row gutter={15}>
            <Col xs={24} md={12}>
              <Form.Group>
                <Form.ControlLabel>Name</Form.ControlLabel>
                <Form.Control
                  name="name"
                  value={patient.name}
                  onChange={(value) => handleChange(value, 'name')}
                />
              </Form.Group>
            </Col>
            <Col xs={24} md={12}>
              <Form.Group>
                <Form.ControlLabel>Age</Form.ControlLabel>
                <Form.Control
                  name="age"
                  value={patient.age}
                  onChange={(value) => handleChange(value, 'age')}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row gutter={15}>
            <Col xs={24}>
              <Form.Group>
                <Form.ControlLabel>Condition</Form.ControlLabel>
                <Form.Control
                  name="condition"
                  value={patient.condition}
                  onChange={(value) => handleChange(value, 'condition')}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row gutter={15}>
            <Col xs={24}>
              <Form.Group>
                <Form.ControlLabel>Assigned Therapist</Form.ControlLabel>
                <Form.Control
                  name="assignedTherapist"
                  value={patient.assignedTherapist}
                  onChange={(value) => handleChange(value, 'assignedTherapist')}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row gutter={15}>
            <Col xs={24}>
              <Form.Group>
                <Form.ControlLabel>Contact Info</Form.ControlLabel>
                <Form.Control
                  name="contactInfo"
                  value={patient.contactInfo}
                  onChange={(value) => handleChange(value, 'contactInfo')}
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button appearance="primary"  onClick={handleSave}>
          Save
        </Button>
        <Button onClick={handleEditClose} appearance="subtle">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Edit;
