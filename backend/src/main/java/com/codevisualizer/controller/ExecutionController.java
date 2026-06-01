package com.codevisualizer.controller;

import com.codevisualizer.dto.ExecutionRequest;
import com.codevisualizer.service.CExecutionService;
import com.codevisualizer.service.JavaExecutionService;
import com.codevisualizer.service.PythonExecutionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class ExecutionController {

    private final JavaExecutionService javaService;
    private final PythonExecutionService pythonService;
    private final CExecutionService cService;

    @PostMapping("/api/run-java")
    public ResponseEntity<Map<String, Object>> runJava(@RequestBody ExecutionRequest req) {
        try {
            return ResponseEntity.ok(javaService.execute(req.getCode(), req.getInput()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/api/run-python")
    public ResponseEntity<Map<String, Object>> runPython(@RequestBody ExecutionRequest req) {
        try {
            return ResponseEntity.ok(pythonService.execute(req.getCode(), req.getInput()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/api/run-c")
    public ResponseEntity<Map<String, Object>> runC(@RequestBody ExecutionRequest req) {
        try {
            return ResponseEntity.ok(cService.execute(req.getCode(), req.getInput(), false));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/api/run-cpp")
    public ResponseEntity<Map<String, Object>> runCpp(@RequestBody ExecutionRequest req) {
        try {
            return ResponseEntity.ok(cService.execute(req.getCode(), req.getInput(), true));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
    }
}
