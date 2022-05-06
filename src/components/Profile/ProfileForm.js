import { useRef, useContext } from "react";
import AuthContext from "../../store/auth-context";
import classes from "./ProfileForm.module.css";
import { useHistory } from "react-router-dom";

const ProfileForm = () => {
  const history = useHistory;

  const authCtx = useContext(AuthContext);
  const newPasswordInputRef = useRef();
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredNewPassword = newPasswordInputRef.current.value;

    // add validation: optional

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDvrm2YmdGwcsZn4FwMw6ebrfkrIguWCAo",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
          password: enteredNewPassword,
          returnSecureToken: false,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      // assumption: always succeeds!
      history.replace("/");
    });
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          ref={newPasswordInputRef}
          minLength="7"
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
