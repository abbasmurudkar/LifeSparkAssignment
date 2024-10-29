package com.example.server.Repository;

import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.server.Model.User;

public interface UserRepo extends MongoRepository<User,String> {
        Optional<User> findByEmail(String email);

        
}
