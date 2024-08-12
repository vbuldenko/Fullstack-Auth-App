import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../configs/firebase";
import { authService } from "../services/authService.js";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "./AuthContext.jsx";

const GoogleSignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginFirebaseUser } = useAuthContext();

  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();
      // Send the ID token to your backend
      const res = await authService.loginGoogleFBase(idToken);

      await loginFirebaseUser(res);

      navigate(location.state?.from?.pathname || "/profile");
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  return <button onClick={handleSignIn}>Google Sign in </button>;
};

export default GoogleSignIn;
