package com.example.server.Controller;

import com.example.server.Model.Patient;
import com.example.server.Service.PatientService;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/patients")
@CrossOrigin(origins = "http://localhost:3000")
public class PatientController {

    @Autowired
    private PatientService patientService;

    @PostMapping("/addPatient")
    public ResponseEntity<Patient> addPatient(@Valid @RequestBody Patient patient) {
        Patient savedPatient = patientService.addPatient(patient);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedPatient);
    }
    
    @GetMapping("/listOfPatients")
    public ResponseEntity<List<Patient>> getAllPatients() {
        List<Patient> patients = patientService.getAllPatients();
        return ResponseEntity.ok(patients);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Patient> getPatientById(@PathVariable String id) {
        Optional<Patient> patient = patientService.getPatientById(id);
        return patient.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Patient> updatePatient(@PathVariable String id,@Valid @RequestBody Patient patientDetails) {
        Patient updatedPatient = patientService.updatePatient(id, patientDetails);
        return updatedPatient != null ?
                ResponseEntity.ok(updatedPatient) :
                ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePatient(@PathVariable String id) {
        boolean deleted = patientService.deletePatient(id);
        return deleted ?
                ResponseEntity.status(HttpStatus.NO_CONTENT).build() :
                ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @GetMapping("/search")
    public ResponseEntity<List<Patient>> searchPatients(
            @RequestParam(required = false) String condition,
            @RequestParam(required = false) String assignedTherapist) {

        List<Patient> patients;
        
        if (condition != null && assignedTherapist != null) {
            patients = patientService.findByConditionAndAssignedTherapist(condition, assignedTherapist);
        } 
        else if (condition != null) {
            patients = patientService.findByCondition(condition);
        } 
        else if (assignedTherapist != null) {
            patients = patientService.findByAssignedTherapist(assignedTherapist);
        } 
        else {
            patients = patientService.getAllPatients();
        }

        return ResponseEntity.ok(patients);
    }
}
