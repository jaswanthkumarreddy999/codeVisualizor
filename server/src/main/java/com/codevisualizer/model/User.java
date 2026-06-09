package com.codevisualizer.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.Instant;

@Data
@NoArgsConstructor
@Document(collection = "users")
public class User {
    @Id
    private String id;

    @Indexed(unique = true)
    private String googleId;

    @Indexed(unique = true)
    private String email;

    private String name;
    private String avatar;
    private String role = "user"; // "user" or "admin"
    private String password; // hashed password for manual login
    
    // Profile fields
    private String contact;
    private String address;
    private Integer age;
    private String dob;
    private String professionalRole; // e.g., "Student", "Working Professional", "Educator"
    private String bio;

    private Instant createdAt = Instant.now();
    private Instant lastLoginAt = Instant.now();
}
