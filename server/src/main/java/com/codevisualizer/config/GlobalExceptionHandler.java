package com.codevisualizer.config;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, String>> handleAll(Exception e) {
        // Log full stack trace
        e.printStackTrace();
        return ResponseEntity.internalServerError().body(Map.of(
            "error", e.getClass().getSimpleName(),
            "message", e.getMessage() != null ? e.getMessage() : "Unknown error"
        ));
    }
}
