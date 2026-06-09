package com.codevisualizer.controller;

import com.codevisualizer.model.Suggestion;
import com.codevisualizer.model.User;
import com.codevisualizer.repository.SuggestionRepository;
import com.codevisualizer.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/suggestions")
@RequiredArgsConstructor
public class SuggestionController {

    private final SuggestionRepository suggestionRepo;
    private final UserRepository userRepo;

    @PostMapping
    public ResponseEntity<?> submitSuggestion(Authentication auth, @RequestBody Map<String, String> body) {
        String message = body.get("message");
        if (message == null || message.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Message cannot be empty"));
        }

        Suggestion s = new Suggestion();
        s.setMessage(message);
        s.setCreatedAt(Instant.now());

        if (auth != null) {
            String userId = (String) auth.getPrincipal();
            s.setUserId(userId);
            Optional<User> user = userRepo.findById(userId);
            if (user.isPresent()) {
                s.setUserName(user.get().getName());
                s.setUserEmail(user.get().getEmail());
            }
        }

        suggestionRepo.save(s);
        return ResponseEntity.ok(Map.of("success", true));
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<Suggestion> getSuggestions() {
        return suggestionRepo.findAllByOrderByCreatedAtDesc();
    }
}
