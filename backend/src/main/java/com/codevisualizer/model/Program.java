package com.codevisualizer.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.Instant;
import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@Document(collection = "programs")
public class Program {
    @Id
    private String id;
    private String title;
    private String code = "";
    private String language = "java"; // typescript|python|java|c|cpp
    private String folderId;          // null = root
    private boolean isPublic = false;
    private String ownerId;           // null for public programs
    private List<String> visualizedVariables = List.of();
    private Map<String, Object> ignoredPointers = Map.of();
    private Map<String, Object> visualizerPositions = Map.of();
    private int order = 0;
    private Instant createdAt = Instant.now();
    private Instant updatedAt = Instant.now();
}
