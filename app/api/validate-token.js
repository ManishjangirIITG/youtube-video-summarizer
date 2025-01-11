// import jwt from 'jsonwebtoken';

// // Secret key used for JWT verification (you should keep this secret and store it securely)
// const SECRET_KEY = 'your-secret-key';

// // Function to validate the access token
// export function validateToken(token) {
//   if (!token) {
//     return { valid: false, message: 'No token provided.' };
//   }

//   try {
//     // Verify the token using the secret key
//     const decoded = jwt.verify(token, SECRET_KEY);

//     // If the token is valid, return the decoded data
//     return { valid: true, decoded };
//   } catch (error) {
//     // If the token is invalid or expired, return an error message
//     return { valid: false, message: 'Invalid or expired token.' };
//   }
// }

// // Example usage of the validateToken function
// const tokenToValidate = 'your-access-token-here';

// const validationResponse = validateToken(tokenToValidate);

// if (validationResponse.valid) {
//   console.log('Token is valid. Decoded data:', validationResponse.decoded);
// } else {
//   console.log('Token validation failed. Message:', validationResponse.message);
// }
