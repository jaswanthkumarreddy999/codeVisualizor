package com.codevisualizer.repository;

import com.codevisualizer.model.Program;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface ProgramRepository extends MongoRepository<Program, String> {
    List<Program> findByIsPublicTrueAndFolderIdOrderByOrderAsc(String folderId);
    List<Program> findByIsPublicTrueOrderByOrderAsc();
    List<Program> findByOwnerIdOrderByOrderAscUpdatedAtDesc(String ownerId);
    List<Program> findByOwnerIdAndFolderIdOrderByOrderAsc(String ownerId, String folderId);
    long countByOwnerIdAndFolderId(String ownerId, String folderId);
    long countByIsPublicTrueAndFolderId(String folderId);
}
