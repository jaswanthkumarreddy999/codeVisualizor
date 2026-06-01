package com.codevisualizer.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.Instant;

@Data
@NoArgsConstructor
@Document(collection = "folders")
public class Folder {
    @Id
    private String id;
    private String name;
    private String icon = "Folder";
    private String color = "#10b981";
    private String description = "";
    private boolean isPublic = false;
    private String ownerId;   // null for public folders
    private int order = 0;
    private Instant createdAt = Instant.now();
}
