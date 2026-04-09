export const getFirebaseErrorMessage = (error) => {
  const code = error.code || error.nativeErrorCode || "unknown";

  switch (code) {
    case "auth/user-not-found":
      return "No account found. Try signing up or continue with google.";
    case "auth/email-already-in-use":
      return "Email is already in use";
    case "auth/invalid-email":
      return "Invalid email address";
    case "auth/weak-password":
      return "Password must be at least 6 characters";
    case "auth/wrong-password":
      return "Incorrect password";
    case "auth/invalid-credential":
      return "Invalid login credentials. Please try signing in again.";   
    case "auth/too-many-requests":
      return "Too many attempts. Try again later";
  
    default:
      return "Something went wrong. Try again";
  }
};