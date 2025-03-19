import React, { useState } from "react";
import * as Components from "./components";
import { useNavigate } from "react-router-dom";

function Login() {
  const [signIn, toggle] = useState(true);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // ✅ Handle Login Submission
  const handleLogin = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccessMessage(null);

    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
      const response = await fetch("http://localhost:9000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.status === 200) {
        localStorage.setItem("role", data.user.role); // Save role
        localStorage.setItem("user", JSON.stringify(data.user)); // Save user data
        // Inside login handler after successful login
        localStorage.setItem("userId", data.user._id); // Assuming the response contains the user details

        setSuccessMessage("Login successful! Redirecting...");
        setTimeout(() => {
          // Redirect based on user role
          if (data.user.role === "admin") {
            window.location.href = "/admin"; // Redirect to admin page
          } else {
            window.location.href = "/home"; // Redirect to home page
          }
        }, 200);
      } else if (response.status === 400) {
        // Handle unregistered user
        alert("User is not registered. Please sign up.");
        toggle(false); // Switch to the sign-up form
      } else {
        setError(data.message || "Invalid credentials. Please try again.");
      }
    } catch (error) {
      setError("Server error, please try again later.");
      console.error(error);
    }
  };

  // ✅ Handle Registration Submission
  const handleSignUp = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccessMessage(null);

    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
      const response = await fetch("http://localhost:9000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.status === 201) {
        alert("User registered successfully!"); // Show success alert
        setTimeout(() => {
          toggle(true); // Switch to login form
        }, 2000);
      } else {
        setError(data.message || "Registration failed. Try again.");
      }
    } catch (error) {
      setError("Server error, please try again later.");
      console.error(error);
    }
  };

  return (
    <Components.Container>
      {/* ✅ Sign Up Form */}
      <Components.SignUpContainer signinIn={signIn}>
        <Components.Form onSubmit={handleSignUp}>
          <Components.Title>Create Account</Components.Title>
          <Components.Input
            type="text"
            name="name"
            placeholder="Name"
            required
          />
          <Components.Input
            type="email"
            name="email"
            placeholder="Email"
            required
          />
          <Components.Input
            type="password"
            name="password"
            placeholder="Password"
            required
          />
          <Components.Button type="submit">Sign Up</Components.Button>
        </Components.Form>

        {/* ✅ Display error messages */}
        {error && <Components.Error>{error}</Components.Error>}
      </Components.SignUpContainer>

      {/* ✅ Login Form */}
      <Components.SignInContainer signinIn={signIn}>
        <Components.Form onSubmit={handleLogin}>
          <Components.Title>Sign In</Components.Title>
          <Components.Input
            type="email"
            name="email"
            placeholder="Email"
            required
          />
          <Components.Input
            type="password"
            name="password"
            placeholder="Password"
            required
          />
          <Components.Anchor href="#">Forgot your password?</Components.Anchor>
          <Components.Button type="submit">Sign In</Components.Button>
        </Components.Form>

        {/* ✅ Display success or error messages */}
        {error && <Components.Error>{error}</Components.Error>}
        {successMessage && (
          <Components.Success>{successMessage}</Components.Success>
        )}
      </Components.SignInContainer>

      {/* ✅ Overlay Switch */}
      <Components.OverlayContainer signinIn={signIn}>
        <Components.Overlay signinIn={signIn}>
          <Components.LeftOverlayPanel signinIn={signIn}>
            <Components.Title>Welcome Back!</Components.Title>
            <Components.Paragraph>
              To keep connected with us please login with your personal info.
            </Components.Paragraph>
            <Components.GhostButton onClick={() => toggle(true)}>
              Sign In
            </Components.GhostButton>
          </Components.LeftOverlayPanel>

          <Components.RightOverlayPanel signinIn={signIn}>
            <Components.Title>Hello, Friend!</Components.Title>
            <Components.Paragraph>
              Enter your personal details and start the journey with us.
            </Components.Paragraph>
            <Components.GhostButton onClick={() => toggle(false)}>
              Sign Up
            </Components.GhostButton>
          </Components.RightOverlayPanel>
        </Components.Overlay>
      </Components.OverlayContainer>
    </Components.Container>
  );
}

export default Login;
