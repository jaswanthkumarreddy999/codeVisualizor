package com.codevisualizer.dto;

import lombok.Data;

@Data
public class ExecutionRequest {
    private String code;
    private String input = "";
}
