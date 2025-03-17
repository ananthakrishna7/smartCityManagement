import React from "react";
import * as Components from './components';
import { useNavigate } from "react-router-dom"; // Import navigation

function Login() {
    const navigate = useNavigate(); // Hook for redirection

    const handleLogin = (event) => {
        event.preventDefault(); // Prevent default form submission

        // Get form data
        const email = event.target.email.value;
        const password = event.target.password.value;

        // Dummy authentication logic (Replace with actual backend API)
        const adminEmail = "admin@example.com";
        const adminPassword = "admin123"; // Replace with a secure check

        if (email === adminEmail && password === adminPassword) {
            navigate("/adminannouncement"); // Redirect Admin
        } else if (email && password) {
            navigate("/home"); // Redirect Normal User
        } else {
            alert("Invalid credentials! Please try again.");
        }
    };

    const [signIn, toggle] = React.useState(true);
    return (
        <Components.Container>
            <Components.SignUpContainer signinIn={signIn}>
                <Components.Form>
                    <Components.Title>Create Account</Components.Title>
                    <Components.Input type="text" placeholder="Name" required />
                    <Components.Input type="email" placeholder="Email" required />
                    <Components.Input type="password" placeholder="Password" required />
                    <Components.Button>Sign Up</Components.Button>
                </Components.Form>
            </Components.SignUpContainer>

            <Components.SignInContainer signinIn={signIn}>
                {/* Updated to handle form submission */}
                <Components.Form onSubmit={handleLogin}>
                    <Components.Title>Sign in</Components.Title>
                    <Components.Input type="email" name="email" placeholder="Email" required />
                    <Components.Input type="password" name="password" placeholder="Password" required />
                    <Components.Button type="submit">Sign In</Components.Button>
                </Components.Form>
            </Components.SignInContainer>

            <Components.OverlayContainer signinIn={signIn}>
                <Components.Overlay signinIn={signIn}>
                    <Components.LeftOverlayPanel signinIn={signIn}>
                        <Components.Title>Welcome Back!</Components.Title>
                        <Components.Paragraph>
                            To keep connected with us please login with your personal info
                        </Components.Paragraph>
                        <Components.GhostButton onClick={() => toggle(true)}>
                            Sign In
                        </Components.GhostButton>
                    </Components.LeftOverlayPanel>

                    <Components.RightOverlayPanel signinIn={signIn}>
                        <Components.Title>Hello, Friend!</Components.Title>
                        <Components.Paragraph>
                            Enter your personal details and start the journey with us
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
