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
