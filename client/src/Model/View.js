import React, { useEffect, useState } from 'react';
import { Modal, Button, Panel, Row, Col } from 'rsuite';
import axios from 'axios';

const View = (props) => {
  const { patientId, openView, handleViewClose } = props;
  const [selectedPatient, setSelectedPatient] = useState(null);

  useEffect(() => {
    const fetchPatientData = async () => {
      if (patientId) {
        try {
          const response = await axios.get(`http://localhost:8080/patients/${patientId}`);
          setSelectedPatient(response.data);
        } catch (error) {
          console.error('Error fetching patient data:', error);
        }
      }
    };
    fetchPatientData();
  }, [patientId, openView]);

  return (
    <Modal open={openView} onClose={handleViewClose} size="lg" style={{ borderRadius: 10 }}>
      <Modal.Header style={{ backgroundColor: '#f7f7f7', padding: 20, borderRadius: 10 }}>
        <Modal.Title style={{ fontSize: 24, fontWeight: 600, color: '#333' }}>
          {selectedPatient ? selectedPatient.name : "Loading..."}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ padding: 20 }}>
        {selectedPatient ? (
          <Panel shaded bordered style={{ borderRadius: 10, marginBottom: 20, boxShadow: "grey 0px 0px 6px 0px" }}>
            <h2 style={{ fontSize: 20, fontWeight: 600, color: '#333', padding: 10 }}>Patient Overview</h2>
            <Row style={{ marginBottom: 20 }}>
              <Col xs={12}>
                <h4 style={{ fontSize: 16, fontWeight: 600, color: '#666' }}>Age:</h4>
                <p style={{ fontSize: 16, color: '#333' }}>{selectedPatient.age}</p>
              </Col>
              <Col xs={12}>
                <h4 style={{ fontSize: 16, fontWeight: 600, color: '#666' }}>Condition:</h4>
                <p style={{ fontSize: 16, color: '#333' }}>{selectedPatient.condition}</p>
              </Col>
            </Row>
            <Row style={{ marginBottom: 20 }}>
              <Col xs={12}>
                <h4 style={{ fontSize: 16, fontWeight: 600, color: '#666' }}>Contact Info:</h4>
                <p style={{ fontSize: 16, color: '#333' }}>{selectedPatient.contactInfo}</p>
              </Col>
              <Col xs={12}>
                <h4 style={{ fontSize: 16, fontWeight: 600, color: '#666' }}>Assigned Therapist</h4>
                <p style={{ fontSize: 16, color: '#333' }}>{selectedPatient.assignedTherapist}</p>
              </Col>
            </Row>
          </Panel>
        ) : (
          <p style={{ fontSize: 16, color: '#333' }}>Loading patient details...</p>
        )}
      </Modal.Body>
      <Modal.Footer style={{ padding: 20, borderRadius: 10 }}>
        <Button color='blue' onClick={handleViewClose} appearance="primary">
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default View;
