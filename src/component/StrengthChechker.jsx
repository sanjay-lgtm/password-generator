import React from "react";

const PasswordStrengthIndicator = ({ password = "" }) => {
    // Function to determine the password strength based on its length
    const getPasswordStrength = () => {
        const passwordLength = password.length;
        
        if (passwordLength < 1) {
            return ""; // No password entered
        } else if (passwordLength < 4) {
            return "Very Weak";
        } else if (passwordLength < 8) {
            return "Poor";
        } else if (passwordLength < 12) {
            return "Medium";
        } else if (passwordLength < 16) {
            return "Strong";
        } else {
            return "Very Strong";
        }
    };

    // Calculate the password strength
    const passwordStrength = getPasswordStrength();

    // If no password strength (e.g., empty password), render nothing
    if (!passwordStrength) return <React.Fragment />;

    // Render the password strength indicator
    return (
        <div className="password-strength">
            Strength: <span style={{ fontWeight: "bold" }}>{passwordStrength}</span>
        </div>
    );
};

export default PasswordStrengthIndicator;
