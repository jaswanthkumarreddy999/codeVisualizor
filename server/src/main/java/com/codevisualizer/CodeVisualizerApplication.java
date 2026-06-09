package com.codevisualizer;

import com.codevisualizer.model.User;
import com.codevisualizer.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class CodeVisualizerApplication {
    public static void main(String[] args) {
        SpringApplication.run(CodeVisualizerApplication.class, args);
    }

    @Bean
    public CommandLineRunner initAdmin(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            String adminEmail = "tjaswanthkumarreddy@gmail.com";
            if (userRepository.findByEmail(adminEmail).isEmpty()) {
                User admin = new User();
                admin.setEmail(adminEmail);
                admin.setName("Admin");
                admin.setRole("admin");
                admin.setPassword(passwordEncoder.encode("admin123"));
                userRepository.save(admin);
                System.out.println("Admin user created with password: admin123");
            } else {
                userRepository.findByEmail(adminEmail).ifPresent(admin -> {
                    if (admin.getPassword() == null) {
                        admin.setPassword(passwordEncoder.encode("admin123"));
                        admin.setRole("admin");
                        userRepository.save(admin);
                        System.out.println("Updated existing user to admin with password: admin123");
                    }
                });
            }
        };
    }
}
