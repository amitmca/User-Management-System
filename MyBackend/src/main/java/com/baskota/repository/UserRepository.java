package com.baskota.repository;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.baskota.domain.User;

@Transactional
public interface UserRepository extends JpaRepository<User, Long>{

	public User findByEmail(String email);

}
