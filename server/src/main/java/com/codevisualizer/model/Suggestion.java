package com.codevisualizer.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.Instant;

@Data
@Document(collection = "suggestions")
public class Suggestion {
    @Id
    private String id;
    private String userId;
    private String userName;
    private String userEmail;
    private String message;
    private Instant createdAt;
}
