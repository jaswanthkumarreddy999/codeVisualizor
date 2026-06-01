package com.codevisualizer.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.Instant;
import com.fasterxml.jackson.annotation.JsonProperty;

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

    @JsonProperty("isPublic")
    private boolean isPublic = false;

    private String ownerId;
    private int order = 0;
    private Instant createdAt = Instant.now();
}
