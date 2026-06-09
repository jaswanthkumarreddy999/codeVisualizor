package com.codevisualizer.controller;

import com.codevisualizer.model.User;
import com.codevisualizer.repository.UserRepository;
import com.codevisualizer.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final org.springframework.security.crypto.password.PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String password = request.get("password");

        if (email == null || password == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Email and password required"));
        }

        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (user.getPassword() != null && passwordEncoder.matches(password, user.getPassword())) {
                String token = jwtService.generateToken(user.getId(), user.getRole());
                return ResponseEntity.ok(Map.of(
                    "token", token,
                    "name", user.getName(),
                    "email", user.getEmail(),
                    "avatar", user.getAvatar() != null ? user.getAvatar() : "",
                    "role", user.getRole()
                ));
            }
        }

        return ResponseEntity.status(401).body(Map.of("error", "Invalid credentials"));
    }

    // GET /api/auth/me — returns current user info from JWT
    @GetMapping("/me")
    public ResponseEntity<?> me(Authentication auth) {
        if (auth == null) return ResponseEntity.ok(null);
        String userId = (String) auth.getPrincipal();
        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty()) return ResponseEntity.ok(null);
        User u = user.get();
        return ResponseEntity.ok(Map.of(
            "id",     u.getId(),
            "name",   u.getName(),
            "email",  u.getEmail(),
            "avatar", u.getAvatar() != null ? u.getAvatar() : "",
            "role",   u.getRole()
        ));
    }

    // GET /api/auth/google — initiates Google OAuth (handled by Spring Security)
    // The actual OAuth flow is: /oauth2/authorization/google → Google → /api/auth/callback/google
    // OAuth2SuccessHandler redirects to frontend with JWT token

    // POST /api/auth/signout — client just discards the JWT token (stateless)
    @PostMapping("/signout")
    public ResponseEntity<?> signout() {
        return ResponseEntity.ok(Map.of("success", true));
    }
}
