package kms.backend.controller;

import java.io.UnsupportedEncodingException;
import java.time.LocalDateTime;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import kms.backend.exception.ResourceNotFoundException;
import kms.backend.model.User;
import kms.backend.payload.response.MessageResponse;
import kms.backend.repository.UserRepository;
import kms.backend.service.UserService;
import net.bytebuddy.utility.RandomString;

@RestController
public class PasswordController {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private UserService userService;

	@Autowired
	private JavaMailSender mailSender;

	@GetMapping("/forgot_password")
	public String showForgotPasswordForm(Model model) {
		model.addAttribute("pageTitle", "Forgot Password");
		return "forgot_password_form";
	}

	@CrossOrigin(origins = "*", maxAge = 3600)
	@PostMapping("/forgot_password")
	public String processForgotPassword(HttpServletRequest request, Model model) {
		String email = request.getParameter("email");
		String token = RandomString.make(45);

		System.out.println("Email" + email);
		System.out.println("Token" + token);

		try {
			userService.updateResetPasswordToken(token, email);

			String resetPasswordLink = "http://localhost:3000" + "/reset_password/" + token;
			sendEmail(email, resetPasswordLink);
			model.addAttribute("message", "We have sent a reset password link to your email. Please check.");

		} catch (ResourceNotFoundException ex) {
			model.addAttribute("error", ex.getMessage());
		} catch (UnsupportedEncodingException | MessagingException e) {
			model.addAttribute("error", "Error while sending email");
		}

		return "forgot_password_form";
	}


	private void sendEmail(String email, String resetPasswordLink)
			throws UnsupportedEncodingException, MessagingException {
		MimeMessage message = mailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message);

		helper.setFrom("EMAIL_TO_SEND_SYSTEM_EMAIL(PASSWORD_RESET)", "KMS Support");
		helper.setTo(email);

		String subject = "Here's the link to reset your password";

		String content = "<p>Hello, </p>" + "<p>You have requested to reset your password.</p>"
				+ "<p>Click the link below to change your password: </p>" + "<p><b><a href=\"" + resetPasswordLink
				+ "\">Change my password</a><b></p>"
				+ "<p>Ignore this email if you do remember your password, or you have not made the request.</p>";

		helper.setSubject(subject);
		helper.setText(content, true);

		mailSender.send(message);
	}


	@GetMapping("/reset_password")
	public String showResetPasswordForm(@Param(value = "token") String token, Model model) {
		User user = userService.getByResetPasswordToken(token);
		if (user == null) {
			model.addAttribute("title", "Reset your password");
			model.addAttribute("message", "Invalid Token");
			return "message";
		} else if (user.getExpiryDate().isBefore(LocalDateTime.now())) {
			model.addAttribute("message", "Token Expired. Please request an email again");
			return "message";
		} else {
			model.addAttribute("token", token);
			model.addAttribute("page title", "Reset your password");
		}
		return "ResetPassword";
	}

	@PostMapping("/reset_password")
	public String processResetPassword(HttpServletRequest request, Model model) {
		String token = request.getParameter("token");
		String password = request.getParameter("password");

		System.out.println("Token" + token);
		System.out.println("Password" + password);

		User user = userService.getByResetPasswordToken(token);
		model.addAttribute("title", "Reset your password");

		if (user == null) {
			model.addAttribute("message", "Invalid Token");
			return "message";
		} else {
			userService.updatePassword(user, password);

			model.addAttribute("message", "You have successfully changed your password");
		}
		return "message";
	}
	
	// user logs in and change password in the profile
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@PostMapping("/change_password/check")
	public ResponseEntity<?> changePassword(HttpServletRequest request) {
		String email = request.getParameter("email");
		String oldPassword = request.getParameter("oldPassword");
		
		System.out.println("Email" + email);
		System.out.println("Old password" + oldPassword);

		User user = userRepository.findByEmail(email);
		if (user == null) {
			return ResponseEntity.badRequest().body(new MessageResponse("Incorrect user"));
		}
		if (!passwordEncoder.matches(oldPassword, user.getPassword())) {

			return ResponseEntity.badRequest().body(new MessageResponse("Incorrect old password"));
		} else {
			return ResponseEntity.ok(new MessageResponse("Correct"));
		}
	}

	@PostMapping("/change_password")
	@PreAuthorize("hasRole('PRINCIPAL') or hasRole('STUDENT')")
	public ResponseEntity<?> changePassword(HttpServletRequest request, Model model) {
		String email = request.getParameter("email");
		String oldPassword = request.getParameter("oldPassword");
		String password = request.getParameter("password");
		String confirmPassword = request.getParameter("confirmPassword");

		System.out.println("Email" + email);
		System.out.println("Old password" + oldPassword);
		System.out.println("New password" + password);
		System.out.println("Confirm password" + confirmPassword);

		User user = userRepository.findByEmail(email);

		// System.out.print(user.getEmail());

		if (user == null) {
			return ResponseEntity.badRequest().body(new MessageResponse("Incorrect user"));
		}
		  else {
			userService.changePassword(user, password);
		}
		return ResponseEntity.ok(new MessageResponse("You have successfully changed your password"));
	}
}
