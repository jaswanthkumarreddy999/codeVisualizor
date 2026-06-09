package com.codevisualizer.repository;

import com.codevisualizer.model.Folder;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface FolderRepository extends MongoRepository<Folder, String> {
    List<Folder> findByIsPublicTrueOrderByOrderAsc();
    List<Folder> findByOwnerIdOrderByOrderAsc(String ownerId);
}
