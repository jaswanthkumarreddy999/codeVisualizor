package com.codevisualizer.controller;

import com.codevisualizer.model.Folder;
import com.codevisualizer.model.Program;
import com.codevisualizer.model.User;
import com.codevisualizer.repository.FolderRepository;
import com.codevisualizer.repository.ProgramRepository;
import com.codevisualizer.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final FolderRepository folderRepo;
    private final ProgramRepository programRepo;
    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;

    private String userId(Authentication auth) {
        return (String) auth.getPrincipal();
    }

    // ── Profile ──────────────────────────────────────────────────────────────

    @GetMapping("/profile")
    public ResponseEntity<User> getProfile(Authentication auth) {
        return userRepo.findById(userId(auth))
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/profile")
    public ResponseEntity<User> updateProfile(Authentication auth, @RequestBody User body) {
        return userRepo.findById(userId(auth))
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

    @PostMapping("/profile/password")
    public ResponseEntity<?> setPassword(Authentication auth, @RequestBody Map<String, String> body) {
        String password = body.get("password");
        if (password == null || password.length() < 6) {
            return ResponseEntity.badRequest().body(Map.of("error", "Password must be at least 6 characters"));
        }
        return userRepo.findById(userId(auth))
            .map(user -> {
                user.setPassword(passwordEncoder.encode(password));
                userRepo.save(user);
                return ResponseEntity.ok(Map.of("success", true));
            }).orElse(ResponseEntity.notFound().build());
    }

    // ── Folders ──────────────────────────────────────────────────────────────

    @GetMapping("/folders")
    public List<Folder> getFolders(Authentication auth) {
        return folderRepo.findByOwnerIdOrderByOrderAsc(userId(auth));
    }

    @PostMapping("/folders")
    public ResponseEntity<Folder> createFolder(Authentication auth, @RequestBody Folder folder) {
        long count = folderRepo.findByOwnerIdOrderByOrderAsc(userId(auth)).size();
        folder.setOwnerId(userId(auth));
        folder.setPublic(false);
        folder.setOrder((int) count);
        return ResponseEntity.status(201).body(folderRepo.save(folder));
    }

    @PutMapping("/folders/{id}")
    public ResponseEntity<Folder> updateFolder(Authentication auth, @PathVariable String id, @RequestBody Folder body) {
        return folderRepo.findById(id)
            .filter(f -> userId(auth).equals(f.getOwnerId()))
            .map(f -> {
                if (body.getName() != null) f.setName(body.getName());
                if (body.getIcon() != null) f.setIcon(body.getIcon());
                if (body.getColor() != null) f.setColor(body.getColor());
                if (body.getDescription() != null) f.setDescription(body.getDescription());
                return ResponseEntity.ok(folderRepo.save(f));
            }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/folders/{id}")
    public ResponseEntity<?> deleteFolder(Authentication auth, @PathVariable String id) {
        folderRepo.findById(id)
            .filter(f -> userId(auth).equals(f.getOwnerId()))
            .ifPresent(f -> {
                folderRepo.delete(f);
                // Move programs to root
                programRepo.findByOwnerIdAndFolderIdOrderByOrderAsc(userId(auth), id)
                    .forEach(p -> { p.setFolderId(null); programRepo.save(p); });
            });
        return ResponseEntity.ok(Map.of("success", true));
    }

    // ── Programs ─────────────────────────────────────────────────────────────

    @GetMapping("/programs")
    public List<Program> getPrograms(Authentication auth, @RequestParam(required = false) String folderId) {
        if (folderId != null)
            return programRepo.findByOwnerIdAndFolderIdOrderByOrderAsc(userId(auth), folderId);
        return programRepo.findByOwnerIdOrderByOrderAscUpdatedAtDesc(userId(auth));
    }

    @PostMapping("/programs")
    public ResponseEntity<Program> createProgram(Authentication auth, @RequestBody Program program) {
        long count = programRepo.countByOwnerIdAndFolderId(userId(auth), program.getFolderId());
        program.setOwnerId(userId(auth));
        program.setPublic(false);
        program.setOrder((int) count);
        program.setUpdatedAt(Instant.now());
        return ResponseEntity.status(201).body(programRepo.save(program));
    }

    @PutMapping("/programs/{id}")
    public ResponseEntity<Program> updateProgram(Authentication auth, @PathVariable String id, @RequestBody Program body) {
        return programRepo.findById(id)
            .filter(p -> userId(auth).equals(p.getOwnerId()))
            .map(p -> {
                if (body.getTitle() != null) p.setTitle(body.getTitle());
                if (body.getCode() != null) p.setCode(body.getCode());
                if (body.getLanguage() != null) p.setLanguage(body.getLanguage());
                if (body.getFolderId() != null) p.setFolderId(body.getFolderId());
                if (body.getVisualizedVariables() != null) p.setVisualizedVariables(body.getVisualizedVariables());
                if (body.getIgnoredPointers() != null) p.setIgnoredPointers(body.getIgnoredPointers());
                if (body.getVisualizerPositions() != null) p.setVisualizerPositions(body.getVisualizerPositions());
                p.setUpdatedAt(Instant.now());
                return ResponseEntity.ok(programRepo.save(p));
            }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/programs/{id}")
    public ResponseEntity<?> deleteProgram(Authentication auth, @PathVariable String id) {
        programRepo.findById(id)
            .filter(p -> userId(auth).equals(p.getOwnerId()))
            .ifPresent(programRepo::delete);
        return ResponseEntity.ok(Map.of("success", true));
    }

    // ── Fork public program ───────────────────────────────────────────────────

    @PostMapping("/programs/fork")
    public ResponseEntity<Program> forkProgram(Authentication auth, @RequestBody Map<String, String> body) {
        String programId = body.get("programId");
        String code      = body.get("code");
        String folderId  = body.get("folderId");

        return programRepo.findById(programId)
            .filter(Program::isPublic)
            .map(original -> {
                long count = programRepo.countByOwnerIdAndFolderId(userId(auth), folderId);
                Program forked = new Program();
                forked.setTitle(original.getTitle() + " (Fork)");
                forked.setCode(code != null ? code : original.getCode());
                forked.setLanguage(original.getLanguage());
                forked.setFolderId(folderId);
                forked.setOwnerId(userId(auth));
                forked.setPublic(false);
                forked.setVisualizedVariables(original.getVisualizedVariables());
                forked.setIgnoredPointers(original.getIgnoredPointers());
                forked.setVisualizerPositions(original.getVisualizerPositions());
                forked.setOrder((int) count);
                return ResponseEntity.status(201).body(programRepo.save(forked));
            }).orElse(ResponseEntity.notFound().build());
    }

    // ── Migrate localStorage data ─────────────────────────────────────────────

    @PostMapping("/migrate")
    public ResponseEntity<?> migrate(Authentication auth, @RequestBody Map<String, Object> body) {
        String uid = userId(auth);
        @SuppressWarnings("unchecked")
        List<Map<String, Object>> projects = (List<Map<String, Object>>) body.getOrDefault("projects", List.of());
        @SuppressWarnings("unchecked")
        List<Map<String, Object>> folders  = (List<Map<String, Object>>) body.getOrDefault("folders", List.of());

        java.util.Set<String> defaultIds = java.util.Set.of(
            "basics","arrays","two-pointers","sliding-window","stack","binary-search",
            "linked-list","trees","tries","heap","backtracking","graphs","advanced-graphs",
            "1d-dp","2d-dp","greedy","intervals","math","bit-manipulation"
        );

        Map<String, String> folderIdMap = new java.util.HashMap<>();
        int imported = 0;

        for (Map<String, Object> f : folders) {
            String oldId = (String) f.get("id");
            if (defaultIds.contains(oldId)) continue;
            Folder folder = new Folder();
            folder.setName((String) f.getOrDefault("name", "Folder"));
            folder.setIcon((String) f.getOrDefault("icon", "Folder"));
            folder.setColor((String) f.getOrDefault("color", "#10b981"));
            folder.setDescription((String) f.getOrDefault("description", ""));
            folder.setOwnerId(uid);
            folder.setPublic(false);
            folder.setOrder(((Number) f.getOrDefault("order", 0)).intValue());
            Folder saved = folderRepo.save(folder);
            folderIdMap.put(oldId, saved.getId());
        }

        for (Map<String, Object> p : projects) {
            String pid = (String) p.get("id");
            if (pid != null && pid.startsWith("nc150-")) continue;
            String oldFolderId = (String) p.get("folderId");
            String newFolderId = oldFolderId != null ? folderIdMap.getOrDefault(oldFolderId, null) : null;

            Program program = new Program();
            program.setTitle((String) p.getOrDefault("name", "Untitled"));
            program.setCode((String) p.getOrDefault("code", ""));
            program.setLanguage((String) p.getOrDefault("language", "java"));
            program.setFolderId(newFolderId);
            program.setOwnerId(uid);
            program.setPublic(false);
            program.setOrder(0);
            program.setUpdatedAt(Instant.now());
            programRepo.save(program);
            imported++;
        }

        return ResponseEntity.ok(Map.of("success", true, "imported", imported));
    }
}
