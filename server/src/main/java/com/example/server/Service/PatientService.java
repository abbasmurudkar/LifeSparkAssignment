package com.example.server.Service;

import com.example.server.Model.Patient;
import com.example.server.Repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PatientService {

    @Autowired
    private PatientRepository patientRepository;

    public Patient addPatient(Patient patient) {
        return patientRepository.save(patient);
    }

    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    public Optional<Patient> getPatientById(String id) {
        return patientRepository.findById(id);
    }

    public Patient updatePatient(String id, Patient patientDetails) {
        Patient patient = patientRepository.findById(id).orElse(null);
        if (patient != null) {
            patient.setName(patientDetails.getName());
            patient.setAge(patientDetails.getAge());
            patient.setCondition(patientDetails.getCondition());
            patient.setAssignedTherapist(patientDetails.getAssignedTherapist());
            patient.setContactInfo(patientDetails.getContactInfo());
            return patientRepository.save(patient);
        }
        return null;
    }

    public boolean deletePatient(String id) {
        if (patientRepository.existsById(id)) {
            patientRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public List<Patient> findByConditionAndAssignedTherapist(String condition, String assignedTherapist) {
        return patientRepository.findByConditionAndAssignedTherapist(condition, assignedTherapist);
    }
    public List<Patient> findByCondition(String condition) {
        return patientRepository.findByCondition(condition);
    }

    public List<Patient> findByAssignedTherapist(String assignedTherapist) {
        return patientRepository.findByAssignedTherapist(assignedTherapist);
    }
}

