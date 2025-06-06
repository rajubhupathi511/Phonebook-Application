package com.phonebook.www.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.phonebook.www.Entity.Contact;
import com.phonebook.www.Entity.User;
import com.phonebook.www.Repo.ContactRepository;
import com.phonebook.www.Repo.UserRepository;

@RestController
@RequestMapping("/api")

@CrossOrigin(origins="*")
public class AppController {
    @Autowired private UserRepository userRepo;
    @Autowired private ContactRepository contactRepo;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        userRepo.save(user);
        return ResponseEntity.ok("User Registered");
    }

    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody User user) {
        User existing = userRepo.findByEmailAndPassword(user.getEmail(), user.getPassword());
        return existing != null ? ResponseEntity.ok(existing) : ResponseEntity.status(401).build();
    }

    @PostMapping("/contacts")
    public ResponseEntity<String> saveContact(@RequestBody Contact contact) {
        contactRepo.save(contact);
        return ResponseEntity.ok("Contact Saved");
    }

//  @GetMapping("/contacts/{userId}")
//   public List<Contact> getContacts(@PathVariable Long userId) {
//       User user = userRepo.findById(userId).orElse(null);
//       return contactRepo.findByUser(user);
//   }
    
    
    
    @GetMapping("/contacts/{userId}")
    public List<Contact> getContacts(
        @PathVariable Long userId,
        @RequestParam(required = false) String search
    ) {
        User user = userRepo.findById(userId).orElse(null);
        if (search != null && !search.isEmpty()) {
            return contactRepo.findByUserAndNameContainingIgnoreCase(user, search);
        }
        return contactRepo.findByUser(user);
    }

}
