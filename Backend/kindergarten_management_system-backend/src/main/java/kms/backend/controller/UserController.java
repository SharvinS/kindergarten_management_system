package kms.backend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import kms.backend.exception.ResourceNotFoundException;
import kms.backend.message.ResponseFile;
import kms.backend.message.ResponseMessage;
import kms.backend.model.User;
import kms.backend.repository.UserRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/kms")
public class UserController {
	
	@GetMapping("/all")
	public String allAccess() {
		return "Public Content.";
	}
	
	@Autowired
	private UserRepository userRepository;

	// view current user
	@GetMapping("/user/{id}")
	@PreAuthorize("hasRole('STUDENT')")
	public ResponseEntity<User> getUserById(@PathVariable Long id) {
		User user = userRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("User does not exist with id :" + id));
		return ResponseEntity.ok(user);
	}

	// update current user
	@PutMapping("/user-update/{id}")
	@PreAuthorize("hasRole('STUDENT')")
	public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User userDetails) {
		User user = userRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("User does not exist with id :" + id));

		user.setUserId(userDetails.getUserId());
		user.setName(userDetails.getName());
		user.setDateOfBirth(userDetails.getDateOfBirth());
		user.setAge(userDetails.getAge());
		user.setAddressLine1(userDetails.getAddressLine1());
		user.setAddressLine2(userDetails.getAddressLine2());
		user.setAddressZip(userDetails.getAddressZip());
		user.setAddressCity(userDetails.getAddressCity());
		user.setAddressState(userDetails.getAddressState());
		user.setAddressCountry(userDetails.getAddressCountry());
		user.setClassroom(userDetails.getClassroom());
		user.setDateJoined(userDetails.getDateJoined());
		user.setDateStopped(userDetails.getDateStopped());
		user.setGender(userDetails.getGender());
		user.setFoodIntake(userDetails.getFoodIntake());
		user.setExperience(userDetails.getExperience());
		user.setIllness(userDetails.getIllness());
		user.setAllergy(userDetails.getAllergy());
		user.setContact(userDetails.getContact());
		user.setToiletEthics(userDetails.getToiletEthics());
		
		user.setFatherName(userDetails.getFatherName());
		user.setFatherAge(userDetails.getFatherAge());
		user.setFatherPhoneNumber(userDetails.getFatherPhoneNumber());
		user.setFatherDateOfBirth(userDetails.getFatherDateOfBirth());
		user.setFatherOccupation(userDetails.getFatherOccupation());
		user.setFatherEmployer(userDetails.getFatherEmployer());
		user.setFatherOfficeNumber(userDetails.getFatherOfficeNumber());

		user.setMotherName(userDetails.getMotherName());
		user.setMotherAge(userDetails.getMotherAge());
		user.setMotherPhoneNumber(userDetails.getMotherPhoneNumber());
		user.setMotherDateOfBirth(userDetails.getMotherDateOfBirth());
		user.setMotherOccupation(userDetails.getMotherOccupation());
		user.setMotherEmployer(userDetails.getMotherEmployer());
		user.setMotherOfficeNumber(userDetails.getMotherOfficeNumber());

		user.setStudentEmergencyPersonName(userDetails.getStudentEmergencyPersonName());
		user.setStudentEmergencyPersonNumber(userDetails.getStudentEmergencyPersonNumber());
		
		user.setProfilePicture(userDetails.getProfilePicture());
		user.setAttachment(userDetails.getAttachment());

		User updatedUser = userRepository.save(user);
		return ResponseEntity.ok(updatedUser);
	}

	// view user list
	@GetMapping("/principal/student-list")
	@PreAuthorize("hasRole('PRINCIPAL')")
	public List<User> getAllUsers() {
		return userRepository.findAll();
	}

	// create user
	@PostMapping("/principal/add-user")
	@PreAuthorize("hasRole('PRINCIPAL')")
	public User createUser(@RequestBody User user) {
		return userRepository.save(user);
	}

	// get user by id
	@GetMapping("/principal/view-user/{id}")
	@PreAuthorize("hasRole('PRINCIPAL')")
	public ResponseEntity<User> getStudentById(@PathVariable Long id) {
		User user = userRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("User does not exist with id :" + id));
		return ResponseEntity.ok(user);
	}

	// update user
	@PutMapping("/principal/update-student/{id}")
	@PreAuthorize("hasRole('PRINCIPAL')")
	public ResponseEntity<User> updateStudent(@PathVariable Long id, @RequestBody User userDetails) {
		User user = userRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("User does not exist with id :" + id));

		user.setUserId(userDetails.getUserId());
		user.setName(userDetails.getName());
		user.setDateOfBirth(userDetails.getDateOfBirth());
		user.setAge(userDetails.getAge());
		user.setAddressLine1(userDetails.getAddressLine1());
		user.setAddressLine2(userDetails.getAddressLine2());
		user.setAddressZip(userDetails.getAddressZip());
		user.setAddressCity(userDetails.getAddressCity());
		user.setAddressState(userDetails.getAddressState());
		user.setAddressCountry(userDetails.getAddressCountry());
		user.setClassroom(userDetails.getClassroom());
		user.setDateJoined(userDetails.getDateJoined());
		user.setDateStopped(userDetails.getDateStopped());
		user.setGender(userDetails.getGender());
		user.setFoodIntake(userDetails.getFoodIntake());
		user.setExperience(userDetails.getExperience());
		user.setIllness(userDetails.getIllness());
		user.setAllergy(userDetails.getAllergy());
		user.setContact(userDetails.getContact());
		user.setToiletEthics(userDetails.getToiletEthics());
		
		user.setFatherName(userDetails.getFatherName());
		user.setFatherAge(userDetails.getFatherAge());
		user.setFatherPhoneNumber(userDetails.getFatherPhoneNumber());
		user.setFatherDateOfBirth(userDetails.getFatherDateOfBirth());
		user.setFatherOccupation(userDetails.getFatherOccupation());
		user.setFatherEmployer(userDetails.getFatherEmployer());
		user.setFatherOfficeNumber(userDetails.getFatherOfficeNumber());

		user.setMotherName(userDetails.getMotherName());
		user.setMotherAge(userDetails.getMotherAge());
		user.setMotherPhoneNumber(userDetails.getMotherPhoneNumber());
		user.setMotherDateOfBirth(userDetails.getMotherDateOfBirth());
		user.setMotherOccupation(userDetails.getMotherOccupation());
		user.setMotherEmployer(userDetails.getMotherEmployer());
		user.setMotherOfficeNumber(userDetails.getMotherOfficeNumber());

		user.setStudentEmergencyPersonName(userDetails.getStudentEmergencyPersonName());
		user.setStudentEmergencyPersonNumber(userDetails.getStudentEmergencyPersonNumber());
		
		user.setProfilePicture(userDetails.getProfilePicture());
		user.setAttachment(userDetails.getAttachment());
		
		user.setDeleted(userDetails.getDeleted());

		User updatedUser = userRepository.save(user);
		return ResponseEntity.ok(updatedUser);
	}

	// soft delete user
	@PutMapping("/principal/remove/{id}")
	@PreAuthorize("hasRole('PRINCIPAL')")
	public ResponseEntity<User> removeUser(@PathVariable long id) {
		User user = userRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("User not exist with the id: " + id));
		user.setDeleted(true);
		User removedUser = userRepository.save(user);
		return ResponseEntity.ok(removedUser);
	}

	// restore user
	@PutMapping("/principal/restore/{id}")
	@PreAuthorize("hasRole('PRINCIPAL')")
	public ResponseEntity<User> restoreUser(@PathVariable long id) {
		User user = userRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("User not exist with the id: " + id));
		user.setDeleted(false);
		User restoredUser = userRepository.save(user);
		return ResponseEntity.ok(restoredUser);
	}

	// hard delete user
	@DeleteMapping("/principal/delete/{id}")
	@PreAuthorize("hasRole('PRINCIPAL')")
	public ResponseEntity<Map<String, Boolean>> deleteUser(@PathVariable Long id) {
		User user = userRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("User does not exist with id :" + id));

		userRepository.delete(user);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}

	@GetMapping("/admin")
	@PreAuthorize("hasRole('ADMIN')")
	public String adminAccess() {
		return "Admin Board.";
	}
	
}
