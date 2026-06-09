package com.codevisualizer.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.Instant;
import java.util.List;
import java.util.Map;
import com.fasterxml.jackson.annotation.JsonProperty;

@Data
@NoArgsConstructor
@Document(collection = "programs")
public class Program {
    @Id
    private String id;
    @JsonProperty("name")
    private String title;
    private String code = "";
    private String language = "java";
    private String folderId;

    @JsonProperty("isPublic")
    private boolean isPublic = false;

    private String ownerId;
    private List<String> visualizedVariables = List.of();
    private Map<String, Object> ignoredPointers = Map.of();
    private Map<String, Object> visualizerPositions = Map.of();
    private int order = 0;
    private Instant createdAt = Instant.now();
    private Instant updatedAt = Instant.now();
}
