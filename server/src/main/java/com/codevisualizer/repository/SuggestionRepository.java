package com.codevisualizer.repository;

import com.codevisualizer.model.Suggestion;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface SuggestionRepository extends MongoRepository<Suggestion, String> {
    List<Suggestion> findAllByOrderByCreatedAtDesc();
}
