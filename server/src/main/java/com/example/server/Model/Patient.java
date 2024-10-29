package com.example.server.Model;

import org.springframework.data.annotation.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Min;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "patients")
public class Patient {
    @Id
    private String id;
    @NotBlank(message = "Name is required")
    private String name;
    @Min(value = 0, message = "Age must be a positive number")
    private int age;
    @NotBlank(message = "Condition is required")
    private String condition;
    @NotBlank(message = "Assigned therapist is required")
    private String assignedTherapist;
    @Email(message = "Contact info must be a valid email")
    @NotBlank(message = "Contact info is required")
    private String contactInfo;

    // Getters and Setters

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getCondition() {
        return condition;
    }

    public void setCondition(String condition) {
        this.condition = condition;
    }

    public String getAssignedTherapist() {
        return assignedTherapist;
    }

    public void setAssignedTherapist(String assignedTherapist) {
        this.assignedTherapist = assignedTherapist;
    }

    public String getContactInfo() {
        return contactInfo;
    }

    public void setContactInfo(String contactInfo) {
        this.contactInfo = contactInfo;
    }
}
