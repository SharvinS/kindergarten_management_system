package kms.backend.model;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import org.hibernate.annotations.Filter;
import org.hibernate.annotations.FilterDef;
import org.hibernate.annotations.ParamDef;
import org.hibernate.annotations.SQLDelete;

@Entity
@Table(name = "users", uniqueConstraints = { @UniqueConstraint(columnNames = "username"),
		@UniqueConstraint(columnNames = "email") })

public class User extends Auditable<String> {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotBlank
	@Size(max = 20)
	private String username;

	@NotBlank
	@Size(max = 50)
	@Email
	private String email;

	@NotBlank
	@Size(max = 120)
	private String password;

	private Boolean deleted = false;

	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
	private Set<Role> roles = new HashSet<>();

	@Column(name = "reset_password_token")
	private String resetPasswordToken;

	@Column(name = "expiry_date"/* , nullable = false */)
	private LocalDateTime expiryDate;

	// User Details
	
	@Size(max = 10)
	@Column(name = "userId")
	private String userId;

	@Size(max = 120)
	@Column(name = "name")
	private String name;
	
	@Column(name = "dateOfBirth")
	private String dateOfBirth;
	
	@Size(max = 3)
	@Column(name = "age")
	private int age;

	@Size(max = 80)
	@Column(name = "addressLine1")
	private String addressLine1;
	
	@Size(max = 80)
	@Column(name = "addressLine2")
	private String addressLine2;
	
	@Size(max = 10)
	@Column(name = "addressZip")
	private String addressZip;
	
	@Size(max = 50)
	@Column(name = "addressCity")
	private String addressCity;
	
	@Size(max = 50)
	@Column(name = "addressState")
	private String addressState;
	
	@Size(max = 50)
	@Column(name = "addressCountry")
	private String addressCountry;

	@Size(max = 10)
	@Column(name = "classroom")
	private String classroom;

	@Column(name = "date_joined")
	private String dateJoined;
	
	@Column(name = "date_stopped")
	private String dateStopped;
	
	@Size(max = 10)
	@Column(name = "gender")
	private String gender;
	
	@Size(max = 50)
	@Column(name = "foodIntake")
	private String foodIntake;

	@Size(max = 3)
	@Column(name = "experience")
	private String experience;

	@Size(max = 100)
	@Column(name = "illness")
	private String illness;

	@Size(max = 100)
	@Column(name = "allergy")
	private String allergy;

	@Size(max = 20)
	@Column(name = "contact")
	private String contact;

	@Size(max = 50)
	@Column(name = "toiletEthics")
	private String toiletEthics;
	
	@Size(max = 120)
	@Column(name = "fatherName")
	private String fatherName;

	@Size(max = 3)
	@Column(name = "fatherAge")
	private int fatherAge;
	
	@Size(max = 20)
	@Column(name = "fatherPhoneNumber")
	private String fatherPhoneNumber;

	@Column(name = "fatherDateOfBirth")
	private String fatherDateOfBirth;
	
	@Size(max = 50)
	@Column(name = "fatherOccupation")
	private String fatherOccupation;
	
	@Size(max = 80)
	@Column(name = "fatherEmployer")
	private String fatherEmployer;
	
	@Size(max = 20)
	@Column(name = "fatherOfficeNumber")
	private String fatherOfficeNumber;
	
	@Size(max = 120)
	@Column(name = "motherName")
	private String motherName;

	@Size(max = 3)
	@Column(name = "motherAge")
	private int motherAge;
	
	@Size(max = 20)
	@Column(name = "motherPhoneNumber")
	private String motherPhoneNumber;

	@Column(name = "motherDateOfBirth")
	private String motherDateOfBirth;
	
	@Size(max = 50)
	@Column(name = "motherOccupation")
	private String motherOccupation;
	
	@Size(max = 80)
	@Column(name = "motherEmployer")
	private String motherEmployer;
	
	@Size(max = 20)
	@Column(name = "motherOfficeNumber")
	private String motherOfficeNumber;
	
	@Size(max = 120)
	@Column(name = "studentEmergencyPersonName")
	private String studentEmergencyPersonName;
	
	@Size(max = 20)
	@Column(name = "studentEmergencyPersonNumber")
	private String studentEmergencyPersonNumber;

	@Column(name = "profile_picture")
	private String profilePicture;

	@Column(name = "attachment")
	@Size(max = 255)
	private String attachment;

	
	public User() {
	}

	public User(String username, String email, String password) {
		this.username = username;
		this.email = email;
		this.password = password;
	}
		

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Boolean getDeleted() {
		return deleted;
	}

	public void setDeleted(Boolean deleted) {
		this.deleted = deleted;
	}

	public Set<Role> getRoles() {
		return roles;
	}

	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}

	public String getResetPasswordToken() {
		return resetPasswordToken;
	}

	public void setResetPasswordToken(String resetPasswordToken) {
		this.resetPasswordToken = resetPasswordToken;
	}

	public LocalDateTime getExpiryDate() {
		return expiryDate;
	}

	public void setExpiryDate(LocalDateTime expiryDate) {
		this.expiryDate = expiryDate;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDateOfBirth() {
		return dateOfBirth;
	}

	public void setDateOfBirth(String dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}

	public String getAddressLine1() {
		return addressLine1;
	}

	public void setAddressLine1(String addressLine1) {
		this.addressLine1 = addressLine1;
	}

	public String getAddressLine2() {
		return addressLine2;
	}

	public void setAddressLine2(String addressLine2) {
		this.addressLine2 = addressLine2;
	}

	public String getAddressZip() {
		return addressZip;
	}

	public void setAddressZip(String addressZip) {
		this.addressZip = addressZip;
	}

	public String getAddressCity() {
		return addressCity;
	}

	public void setAddressCity(String addressCity) {
		this.addressCity = addressCity;
	}

	public String getAddressState() {
		return addressState;
	}

	public void setAddressState(String addressState) {
		this.addressState = addressState;
	}

	public String getAddressCountry() {
		return addressCountry;
	}

	public void setAddressCountry(String addressCountry) {
		this.addressCountry = addressCountry;
	}

	public String getClassroom() {
		return classroom;
	}

	public void setClassroom(String classroom) {
		this.classroom = classroom;
	}

	public String getDateJoined() {
		return dateJoined;
	}

	public void setDateJoined(String dateJoined) {
		this.dateJoined = dateJoined;
	}

	public String getDateStopped() {
		return dateStopped;
	}

	public void setDateStopped(String dateStopped) {
		this.dateStopped = dateStopped;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getFoodIntake() {
		return foodIntake;
	}

	public void setFoodIntake(String foodIntake) {
		this.foodIntake = foodIntake;
	}

	public String getExperience() {
		return experience;
	}

	public void setExperience(String experience) {
		this.experience = experience;
	}

	public String getIllness() {
		return illness;
	}

	public void setIllness(String illness) {
		this.illness = illness;
	}

	public String getAllergy() {
		return allergy;
	}

	public void setAllergy(String allergy) {
		this.allergy = allergy;
	}

	public String getContact() {
		return contact;
	}

	public void setContact(String contact) {
		this.contact = contact;
	}

	public String getToiletEthics() {
		return toiletEthics;
	}

	public void setToiletEthics(String toiletEthics) {
		this.toiletEthics = toiletEthics;
	}

	public String getFatherName() {
		return fatherName;
	}

	public void setFatherName(String fatherName) {
		this.fatherName = fatherName;
	}

	public int getFatherAge() {
		return fatherAge;
	}

	public void setFatherAge(int fatherAge) {
		this.fatherAge = fatherAge;
	}

	public String getFatherPhoneNumber() {
		return fatherPhoneNumber;
	}

	public void setFatherPhoneNumber(String fatherPhoneNumber) {
		this.fatherPhoneNumber = fatherPhoneNumber;
	}

	public String getFatherDateOfBirth() {
		return fatherDateOfBirth;
	}

	public void setFatherDateOfBirth(String fatherDateOfBirth) {
		this.fatherDateOfBirth = fatherDateOfBirth;
	}

	public String getFatherOccupation() {
		return fatherOccupation;
	}

	public void setFatherOccupation(String fatherOccupation) {
		this.fatherOccupation = fatherOccupation;
	}

	public String getFatherEmployer() {
		return fatherEmployer;
	}

	public void setFatherEmployer(String fatherEmployer) {
		this.fatherEmployer = fatherEmployer;
	}

	public String getFatherOfficeNumber() {
		return fatherOfficeNumber;
	}

	public void setFatherOfficeNumber(String fatherOfficeNumber) {
		this.fatherOfficeNumber = fatherOfficeNumber;
	}

	public String getMotherName() {
		return motherName;
	}

	public void setMotherName(String motherName) {
		this.motherName = motherName;
	}

	public int getMotherAge() {
		return motherAge;
	}

	public void setMotherAge(int motherAge) {
		this.motherAge = motherAge;
	}

	public String getMotherPhoneNumber() {
		return motherPhoneNumber;
	}

	public void setMotherPhoneNumber(String motherPhoneNumber) {
		this.motherPhoneNumber = motherPhoneNumber;
	}

	public String getMotherDateOfBirth() {
		return motherDateOfBirth;
	}

	public void setMotherDateOfBirth(String motherDateOfBirth) {
		this.motherDateOfBirth = motherDateOfBirth;
	}

	public String getMotherOccupation() {
		return motherOccupation;
	}

	public void setMotherOccupation(String motherOccupation) {
		this.motherOccupation = motherOccupation;
	}

	public String getMotherEmployer() {
		return motherEmployer;
	}

	public void setMotherEmployer(String motherEmployer) {
		this.motherEmployer = motherEmployer;
	}

	public String getMotherOfficeNumber() {
		return motherOfficeNumber;
	}

	public void setMotherOfficeNumber(String motherOfficeNumber) {
		this.motherOfficeNumber = motherOfficeNumber;
	}

	public String getStudentEmergencyPersonName() {
		return studentEmergencyPersonName;
	}

	public void setStudentEmergencyPersonName(String studentEmergencyPersonName) {
		this.studentEmergencyPersonName = studentEmergencyPersonName;
	}

	public String getStudentEmergencyPersonNumber() {
		return studentEmergencyPersonNumber;
	}

	public void setStudentEmergencyPersonNumber(String studentEmergencyPersonNumber) {
		this.studentEmergencyPersonNumber = studentEmergencyPersonNumber;
	}

	public String getProfilePicture() {
		return profilePicture;
	}

	public void setProfilePicture(String profilePicture) {
		this.profilePicture = profilePicture;
	}

	public String getAttachment() {
		return attachment;
	}

	public void setAttachment(String attachment) {
		this.attachment = attachment;
	}

}
