package com.baskota.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.baskota.domain.User;
import com.baskota.service.UserService;

/**
 * @author Sushan
 *
 */
//@CrossOrigin(origins = "http://localhost:4200/user")
@RestController
public class UserController {

	@Autowired
	private UserService userService;
	
	//Retrieve all user
	//status : all corner case handled
	@GetMapping("/user/all")
	public ResponseEntity<List<User>> listAllUser(){
		return new ResponseEntity<List<User>>(userService.getAllUser(), HttpStatus.OK);
	}
	
	//create new user
	//status : all corner case handled
	@PostMapping("/user/create")
	public ResponseEntity<User> createUser(@RequestBody User user) {
		//if user already existed don't create new 
		String email = user.getEmail();
		User alreadyExistedUser = userService.findByEmail(email);
		if(alreadyExistedUser != null){
			return new ResponseEntity<>(HttpStatus.FORBIDDEN);
		}
		userService.saveUser(user);
		return new ResponseEntity<>(user,HttpStatus.CREATED);
	}
	
	//login check
	//status : all corner case handled
	@PostMapping("/user/login")
	public ResponseEntity<User> loginUser(@RequestBody User user) {
		//extract email and password
		String email = user.getEmail();
		String password = user.getPassword();
		boolean isValid = userService.isValidUser(email, password);
		if(isValid){
			return new ResponseEntity<>(userService.findByEmail(email),HttpStatus.OK);
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
	
	//search user
	//status : all corner case handled
	@GetMapping("/user/find")
	public ResponseEntity<User> findByEmail(@RequestParam String email){
		User user = userService.findByEmail(email);
		if(user == null){
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(user, HttpStatus.OK);
	}
	
	//update user
	//status : all corner case handled
	@PutMapping("/user/update")
	public ResponseEntity<User> updateUser(@RequestBody User user){
		//check weather the update request is from already created user or not
		User validUser = userService.findById(user.getId());
		if(validUser == null){
			return new ResponseEntity<>(HttpStatus.FORBIDDEN);
		}
		userService.updateUser(user);
		return new ResponseEntity<User>(user, HttpStatus.CREATED);
	}
	
	//delete user
	@DeleteMapping("/user/delete/{id}")
	public ResponseEntity<String> deleteUser(@PathVariable("id") long id){
		//check weather the delete request is from already created user or not 
		User validUser = userService.findById(id);
		if(validUser == null){
			return new ResponseEntity<String>("No Such User found to delete.",HttpStatus.NOT_FOUND);
		}
		userService.deleteUser(validUser);
		return new ResponseEntity<String>("User deleted.",HttpStatus.OK);
	}
	
	//find by id
	@GetMapping("/user/{id}")
	public ResponseEntity<User> findById(@PathVariable("id") long id){
		User validUser = userService.findById(id);
		if(validUser == null){
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<User>(validUser,HttpStatus.OK);
	}
}
