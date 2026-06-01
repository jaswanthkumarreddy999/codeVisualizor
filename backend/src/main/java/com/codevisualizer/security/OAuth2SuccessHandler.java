package com.codevisualizer.security;

import com.codevisualizer.model.User;
import com.codevisualizer.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import java.io.IOException;
import java.time.Instant;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final UserRepository userRepository;
    private final JwtService jwtService;

    @Value("${app.frontend-url}")
    private String frontendUrl;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException {
        OAuth2User oauthUser = (OAuth2User) authentication.getPrincipal();

        String googleId = oauthUser.getAttribute("sub");
        String email    = oauthUser.getAttribute("email");
        String name     = oauthUser.getAttribute("name");
        String avatar   = oauthUser.getAttribute("picture");

        // Upsert user in MongoDB
        Optional<User> existing = userRepository.findByGoogleId(googleId);
        User user;
        if (existing.isPresent()) {
            user = existing.get();
            user.setLastLoginAt(Instant.now());
            user.setName(name);
            user.setAvatar(avatar);
            userRepository.save(user);
        } else {
            user = new User();
            user.setGoogleId(googleId);
            user.setEmail(email);
            user.setName(name);
            user.setAvatar(avatar);
            user.setRole("user");
            userRepository.save(user);
        }

        // Generate JWT and redirect to frontend with token
        String token = jwtService.generateToken(user.getId(), user.getRole());
        String redirectUrl = frontendUrl + "/auth/callback?token=" + token
                + "&name=" + java.net.URLEncoder.encode(name, "UTF-8")
                + "&email=" + java.net.URLEncoder.encode(email, "UTF-8")
                + "&avatar=" + java.net.URLEncoder.encode(avatar != null ? avatar : "", "UTF-8")
                + "&role=" + user.getRole();

        getRedirectStrategy().sendRedirect(request, response, redirectUrl);
    }
}
