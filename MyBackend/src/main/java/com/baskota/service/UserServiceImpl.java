package com.baskota.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.baskota.domain.User;
import com.baskota.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService{

	@Autowired
	private UserRepository userRepository;
	
	@Override
	public void saveUser(User user) {
		userRepository.save(user);
	}

	@Override
	public List<User> getAllUser() {
		return (List<User>) userRepository.findAll();
	}

	@Override
	public User findByEmail(String email) {
		return userRepository.findByEmail(email);
	}

	@Override
	public void updateUser(User user) {
		userRepository.save(user);
	}

	@Override
	public User findById(long userId) {
		return (User) userRepository.findOne(userId);
	}

	@Override
	public boolean isValidUser(String email, String password) {	
		User user = findByEmail(email);
		if(user == null){
			return false;
		}
		String valid_password = user.getPassword();
		return (password.equals(valid_password));
	}

	@Override
	public void deleteUser(User user) {
		userRepository.delete(user);
		
	}

}
