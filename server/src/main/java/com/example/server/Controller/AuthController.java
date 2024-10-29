package com.example.server.Controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.server.Model.User;
import com.example.server.Service.UserService;
import com.example.server.Utility.JwtUtil;
import com.example.server.Utility.PasswordUtil;


import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("/Login")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;


    @PostMapping
    public ResponseEntity<?> login(@RequestBody User loginRequest) {
        Optional<User> userOptional = userService.findByEmail(loginRequest.getEmail());
        if (!userOptional.isPresent()) {
            return ResponseEntity.status(401).body("User not found");
        }

        User user = userOptional.get();
        
         if (!PasswordUtil.checkPassword(loginRequest.getPassword(), user.getPassword())) {
        return ResponseEntity.status(401).body("Invalid credentials");
    }
        jwtUtil.generateToken(user.getName());
        return ResponseEntity.ok("Login Successfully");
    }
}

