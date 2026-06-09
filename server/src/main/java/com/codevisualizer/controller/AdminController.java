package com.codevisualizer.controller;

import com.codevisualizer.model.Program;
import com.codevisualizer.model.User;
import com.codevisualizer.repository.ProgramRepository;
import com.codevisualizer.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final UserRepository userRepo;
    private final ProgramRepository programRepo;

    /** List all users */
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

    /** Get a specific user's programs */
    @GetMapping("/users/{userId}/programs")
    public List<Program> getUserPrograms(@PathVariable String userId) {
        return programRepo.findByOwnerIdOrderByOrderAscUpdatedAtDesc(userId);
    }

    /** Update a user's profile */
    @PostMapping("/users/{userId}/profile")
    public ResponseEntity<User> updateUserProfile(@PathVariable String userId, @RequestBody User body) {
        return userRepo.findById(userId)
            .map(user -> {
                if (body.getName() != null) user.setName(body.getName());
                if (body.getContact() != null) user.setContact(body.getContact());
                if (body.getAddress() != null) user.setAddress(body.getAddress());
                if (body.getAge() != null) user.setAge(body.getAge());
                if (body.getDob() != null) user.setDob(body.getDob());
                if (body.getProfessionalRole() != null) user.setProfessionalRole(body.getProfessionalRole());
                if (body.getBio() != null) user.setBio(body.getBio());
                return ResponseEntity.ok(userRepo.save(user));
            }).orElse(ResponseEntity.notFound().build());
    }

    /** Update a user's program */
    @PutMapping("/programs/{programId}")
    public ResponseEntity<Program> updateProgram(@PathVariable String programId, @RequestBody Program body) {
        return programRepo.findById(programId)
            .map(p -> {
                if (body.getTitle() != null) p.setTitle(body.getTitle());
                if (body.getCode() != null) p.setCode(body.getCode());
                if (body.getLanguage() != null) p.setLanguage(body.getLanguage());
                if (body.getFolderId() != null) p.setFolderId(body.getFolderId());
                if (body.getVisualizedVariables() != null) p.setVisualizedVariables(body.getVisualizedVariables());
                if (body.getIgnoredPointers() != null) p.setIgnoredPointers(body.getIgnoredPointers());
                if (body.getVisualizerPositions() != null) p.setVisualizerPositions(body.getVisualizerPositions());
                p.setUpdatedAt(java.time.Instant.now());
                return ResponseEntity.ok(programRepo.save(p));
            }).orElse(ResponseEntity.notFound().build());
    }

    /** Delete a user's program */
    @DeleteMapping("/programs/{programId}")
    public ResponseEntity<?> deleteProgram(@PathVariable String programId) {
        programRepo.deleteById(programId);
        return ResponseEntity.ok(Map.of("success", true));
    }
}
