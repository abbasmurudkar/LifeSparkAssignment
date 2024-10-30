import React, { useEffect, useState } from 'react';
import { Button, Input, InputGroup, Modal } from 'rsuite';
import styled from 'styled-components';
import { Cell, Column, HeaderCell, Table } from "rsuite-table";
import SearchPeopleIcon from "@rsuite/icons/SearchPeople";
import axios from 'axios';
import Model from '../Model/Model';
import View from '../Model/View';
import Edit from '../Model/Edit';

const Dashboard = () => {
  const [patients, setPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalData, setModalData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const handleViewClose = () => setViewModalOpen(false);
  const handleEditClose = () => setEditModalOpen(false);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get('http://localhost:8080/patients/listOfPatients');
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const refreshPatients = () => {
    fetchPatients();
  };

  const handleSearchChange = (value) => {
    setSearchQuery(value);
  };

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) || // Match by name
    patient.condition.toLowerCase().includes(searchQuery.toLowerCase()) || // Match by condition
    patient.assignedTherapist.toLowerCase().includes(searchQuery.toLowerCase()) // Match by assigned therapist
  );

  const handleViewClick = (id) => {
    const patient = patients.find(p => p.id === id);
    setModalData(patient);
    setShowModal(true);
  };

  const handleEditClick = (id) => {
    setSelectedPatientId(id);
    setEditModalOpen(true);
  };
   const viewData = (id) => {
    setSelectedPatientId(id);
    setViewModalOpen(true);
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/patients/${id}`);
      fetchPatients();
    } catch (error) {
      console.error('Error deleting patient:', error);
    }
  };

  return (
    <MainBox>
      <Card>
        <CardHeader>Patient Details</CardHeader>
        <Block1>
          <InputGroup className="inputgroup">
            <Input
              placeholder="Search for result"
              value={searchQuery}
              onChange={(value) => handleSearchChange(value)}
              type="text"
            />
            <InputGroup.Addon><SearchPeopleIcon /></InputGroup.Addon>
          </InputGroup>
          <Button appearance="primary" onClick={handleOpen}>
            Create new
          </Button>
        </Block1>
        <Block2>
          <Table height={500} data={filteredPatients} >
            <Column width={90} align="center">
              <HeaderCell>Id</HeaderCell>
              <Cell dataKey="id" />
            </Column>
            <Column width={200} align="center">
              <HeaderCell>Name</HeaderCell>
              <Cell dataKey="name" />
            </Column>
            <Column width={80} align="center">
              <HeaderCell>Age</HeaderCell>
              <Cell dataKey="age" />
            </Column>
            <Column width={200} align="center">
              <HeaderCell>Condition</HeaderCell>
              <Cell dataKey="condition" />
            </Column>
            <Column width={200} align="center">
              <HeaderCell>Assigned Therapist</HeaderCell>
              <Cell dataKey="assignedTherapist" />
            </Column>
            <Column width={250} align="center">
              <HeaderCell>Contact Info</HeaderCell>
              <Cell dataKey="contactInfo" />
            </Column>
            <Column width={100} align="center">
              <HeaderCell>View</HeaderCell>
              <Cell>
                {(rowData) => (
                  <Button
                    appearance="link"
                    color="blue"
                    onClick={() => viewData(rowData.id)}
                  >
                    View
                  </Button>
                )}
              </Cell>
            </Column>
            <Column width={100} align="center">
              <HeaderCell>Edit</HeaderCell>
              <Cell>
                {(rowData) => (
                  <Button
                    appearance="link"
                    color="blue"
                    onClick={() => handleEditClick(rowData.id)}
                  >
                    Edit
                  </Button>
                )}
              </Cell>
            </Column>
            <Column width={100} align="center">
              <HeaderCell>Delete</HeaderCell>
              <Cell>
                {(rowData) => (
                  <Button
                    appearance="link"
                    color="blue"
                    onClick={() => handleDeleteClick(rowData.id)}
                  >
                    Delete
                  </Button>
                )}
              </Cell>
            </Column>
          </Table>
        </Block2>
      </Card>
      <Model
        handleClose={handleClose}
        handleOpen={handleOpen}
        refreshPatients={refreshPatients}
        open={showModal}
      />
      <View
       patientId={selectedPatientId}
       handleViewClose={handleViewClose}
       openView={viewModalOpen}
      />
      <Edit
        patientId={selectedPatientId}
        openEdit={editModalOpen}
        handleEditClose={handleEditClose}
        onEditSuccess={refreshPatients}
      />
    </MainBox>
  );
};

export default Dashboard;

const MainBox = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Card = styled.div`
  margin-bottom: 20px;
  padding: 40px;
  border-radius: 8px;
  width: 100%;
  box-shadow: 0 4px 8px #3498ff;
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const CardHeader = styled.h2`
  margin-bottom: 20px;
  font-size: 1.5em;
  color:#3498ff;
`;

const Block1 = styled.div`
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .inputgroup {
    width: 250px;
    margin-bottom: 10px;
    @media (max-width: 768px) {
      width: 100%;
    }
  }
  button {
    @media (max-width: 768px) {
      width: 100%;
    }
  }
`;

const Block2 = styled.div`
  /* width: 100%;
  overflow-x: auto; */
`;
