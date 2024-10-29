package com.example.server.Service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.server.Exception.UserAlreadyExistsException;
import com.example.server.Model.User;
import com.example.server.Repository.UserRepo;
import com.example.server.Utility.PasswordUtil;

@Service
public class UserService {
    @Autowired
    private UserRepo UserRepository;

     public User addUser(User user) throws UserAlreadyExistsException {
        Optional<User> existingUser = UserRepository.findByEmail(user.getEmail());
        if (existingUser.isPresent()) {
            throw new UserAlreadyExistsException("Email already exists");
        }
       String hashedPassword = PasswordUtil.hashPassword(user.getPassword());
        user.setPassword(hashedPassword);
        return UserRepository.save(user);
    }

    public List<User> findAllUser(){
       return UserRepository.findAll();
    }

    public Optional<User> findByEmail(String email) {
        return UserRepository.findByEmail(email);
    }

    public boolean checkPassword(User user, String rawPassword) {
        return user.getPassword().equals(rawPassword);
    }


}
