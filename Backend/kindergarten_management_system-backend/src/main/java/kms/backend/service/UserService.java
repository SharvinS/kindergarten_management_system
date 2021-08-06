package kms.backend.service;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

import kms.backend.exception.ResourceNotFoundException;
import kms.backend.model.User;
import kms.backend.repository.UserRepository;

import org.springframework.stereotype.Service;

@Service
@Transactional
public class UserService {

	@Autowired
	private UserRepository userRepository;

	public void updateResetPasswordToken(String token, String email) throws ResourceNotFoundException {
		User user = userRepository.findByEmail(email);
		if (user != null) {
			user.setResetPasswordToken(token);
			user.setExpiryDate(LocalDateTime.now().plusMinutes(1));
			userRepository.save(user);
		} else {
			throw new ResourceNotFoundException("Could not find any user with the email " + email);
		}
	}

	public User getByResetPasswordToken(String token) {
		return userRepository.findByResetPasswordToken(token);
	}

	public void updatePassword(User user, String newPassword) {
		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		String encodedPassword = passwordEncoder.encode(newPassword);
		user.setPassword(encodedPassword);

		user.setResetPasswordToken(null);
		userRepository.save(user);
	}

	// user logs in
	public User getByEmail(String email) {
		return userRepository.findByEmail(email);
	}

	public void changePassword(User user, String newPassword) {
		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		String encodedPassword = passwordEncoder.encode(newPassword);
		user.setPassword(encodedPassword);

		userRepository.save(user);
	}

}