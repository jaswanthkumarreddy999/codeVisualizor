package com.codevisualizer.controller;

import com.codevisualizer.model.Folder;
import com.codevisualizer.model.Program;
import com.codevisualizer.repository.FolderRepository;
import com.codevisualizer.repository.ProgramRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.time.Instant;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/public")
@RequiredArgsConstructor
public class PublicController {

    private final FolderRepository folderRepo;
    private final ProgramRepository programRepo;

    // ── Folders ──────────────────────────────────────────────────────────────

    @GetMapping("/folders")
    public List<Folder> getFolders() {
        return folderRepo.findByIsPublicTrueOrderByOrderAsc();
    }

    @PostMapping("/folders")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Folder> createFolder(@RequestBody Folder folder) {
        folder.setPublic(true);
        folder.setOwnerId(null);
        return ResponseEntity.status(201).body(folderRepo.save(folder));
    }

    @PutMapping("/folders/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Folder> updateFolder(@PathVariable String id, @RequestBody Folder body) {
        return folderRepo.findById(id).map(f -> {
            if (body.getName() != null) f.setName(body.getName());
            if (body.getIcon() != null) f.setIcon(body.getIcon());
            if (body.getColor() != null) f.setColor(body.getColor());
            if (body.getDescription() != null) f.setDescription(body.getDescription());
            return ResponseEntity.ok(folderRepo.save(f));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/folders/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteFolder(@PathVariable String id) {
        folderRepo.deleteById(id);
        return ResponseEntity.ok(Map.of("success", true));
    }

    // ── Programs ─────────────────────────────────────────────────────────────

    @GetMapping("/folders/{folderId}/programs")
    public List<Program> getProgramsInFolder(@PathVariable String folderId) {
        return programRepo.findByIsPublicTrueAndFolderIdOrderByOrderAsc(folderId);
    }

    @GetMapping("/programs/{id}")
    public ResponseEntity<Program> getProgram(@PathVariable String id) {
        return programRepo.findById(id)
            .filter(Program::isPublic)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/folders/{folderId}/programs")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Program> createProgram(@PathVariable String folderId, @RequestBody Program program) {
        long count = programRepo.countByIsPublicTrueAndFolderId(folderId);
        program.setFolderId(folderId);
        program.setPublic(true);
        program.setOwnerId(null);
        program.setOrder((int) count);
        program.setUpdatedAt(Instant.now());
        return ResponseEntity.status(201).body(programRepo.save(program));
    }

    @PutMapping("/programs/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Program> updateProgram(@PathVariable String id, @RequestBody Program body) {
        return programRepo.findById(id).filter(Program::isPublic).map(p -> {
            if (body.getTitle() != null) p.setTitle(body.getTitle());
            if (body.getCode() != null) p.setCode(body.getCode());
            if (body.getLanguage() != null) p.setLanguage(body.getLanguage());
            p.setUpdatedAt(Instant.now());
            return ResponseEntity.ok(programRepo.save(p));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/programs/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteProgram(@PathVariable String id) {
        programRepo.deleteById(id);
        return ResponseEntity.ok(Map.of("success", true));
    }
}
