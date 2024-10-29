package com.example.server.Repository;

import com.example.server.Model.Patient;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface PatientRepository extends MongoRepository<Patient, String> {
     @Query("{ 'condition': ?0, 'assignedTherapist': ?1 }")
    List<Patient> findByConditionAndAssignedTherapist(String condition, String assignedTherapist);
    @Query("{ 'condition': ?0 }")
    List<Patient> findByCondition(String condition);
    @Query("{ 'assignedTherapist': ?0 }")
    List<Patient> findByAssignedTherapist(String assignedTherapist);
}
