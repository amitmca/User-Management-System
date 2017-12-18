package com.baskota.service;

import java.util.List;

import com.baskota.domain.User;

public interface UserService {

	public void saveUser(User user);
	
    public List<User> getAllUser();
    
    public void deleteUser(User user);
    
    public User findByEmail(String email);
    
    public void updateUser(User user);
    
    public User findById(long userId);
    
    public boolean isValidUser(String username, String password);
	
}
