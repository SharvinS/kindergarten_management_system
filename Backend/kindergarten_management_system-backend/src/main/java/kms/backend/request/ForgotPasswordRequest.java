package kms.backend.request;

import java.time.LocalDateTime;

import javax.validation.constraints.NotBlank;

public class ForgotPasswordRequest {

	@NotBlank
	private String email;

	@NotBlank
	private String token;

	@NotBlank
	private String password;

	private LocalDateTime tokenTimeout;

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public LocalDateTime getTokenTimeout() {
		return tokenTimeout;
	}

	public void setTokenTimeout(LocalDateTime tokenTimeout) {
		this.tokenTimeout = tokenTimeout;
	}

}
