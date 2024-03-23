import React from "react";
import GoogleSignin from "../img/btn_google_signin_dark_pressed_web.png";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import GitHubButton from "react-github-btn";
import { auth, db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
const Welcome = () => {
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
    //only once the user is signed in, send the UID to the database
  };

  return (
    <main className="welcome">
      <h2>Chatroom</h2>
      <p>
        Sign in with Google to start chatting. <br /> Wanna know more about this
        chat app? Visit it's Github.{" "}
      </p>
      <button className="sign-in">
        <img
          onClick={googleSignIn} // Add sendUID to the onClick event handler
          src={GoogleSignin}
          alt="sign in with google"
          type="button"
        />
      </button>
      <div className="github">
        <GitHubButton
          href="https://github.com/yalikejazz1337/skibidi"
          data-color-scheme="no-preference: light; light: light; dark: dark;"
          data-icon="octicon-star"
          aria-label="Star yalikejazz1337/skibidi on GitHub"
          className="github"
        >
          Star
        </GitHubButton>
      </div>
    </main>
  );
};

export default Welcome;
