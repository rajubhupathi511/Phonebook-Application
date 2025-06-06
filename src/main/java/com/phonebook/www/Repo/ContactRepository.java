package com.phonebook.www.Repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.phonebook.www.Entity.Contact;
import com.phonebook.www.Entity.User;

@Repository
public interface ContactRepository extends JpaRepository<Contact, Long> {
    List<Contact> findByUser(User user);
    List<Contact> findByUserAndNameContainingIgnoreCase(User user, String name);

}