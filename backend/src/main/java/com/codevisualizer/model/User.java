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
    private Instant createdAt = Instant.now();
    private Instant lastLoginAt = Instant.now();
}
