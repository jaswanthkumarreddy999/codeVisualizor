package com.codevisualizer.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.io.*;
import java.nio.file.*;
import java.util.*;
import java.util.concurrent.TimeUnit;

@Service
public class PythonExecutionService {

    @Value("${app.tracer.python-script}")
    private String tracerScript;

    private final ObjectMapper mapper = new ObjectMapper();

    public Map<String, Object> execute(String code, String input) throws Exception {
        String id = UUID.randomUUID().toString().replace("-", "").substring(0, 12);
        Path tmpDir = Files.createTempDirectory("pyviz_" + id);
        Path codeFile = tmpDir.resolve("temp_" + id + ".py");

        try {
            Files.writeString(codeFile, code);

            String python = System.getProperty("os.name").toLowerCase().contains("win") ? "python" : "python3";
            ProcessBuilder pb = new ProcessBuilder(python, tracerScript, codeFile.toString());
            pb.redirectErrorStream(false);
            Process process = pb.start();

            if (input != null && !input.isEmpty()) {
                try (OutputStream os = process.getOutputStream()) {
                    os.write(input.getBytes());
                }
            } else {
                process.getOutputStream().close();
            }

            String stdout = new String(process.getInputStream().readAllBytes());
            String stderr = new String(process.getErrorStream().readAllBytes());
            process.waitFor(10, TimeUnit.SECONDS);
            if (process.isAlive()) process.destroyForcibly();

            try {
                @SuppressWarnings("unchecked")
                Map<String, Object> result = mapper.readValue(stdout, Map.class);
                if (!stderr.isEmpty()) result.put("stderr", stderr);
                return result;
            } catch (Exception e) {
                Map<String, Object> err = new HashMap<>();
                err.put("error", "Execution Failed");
                err.put("stderr", stderr.isEmpty() ? stdout : stderr);
                return err;
            }
        } finally {
            try { Files.deleteIfExists(codeFile); Files.deleteIfExists(tmpDir); } catch (IOException ignored) {}
        }
    }
}
