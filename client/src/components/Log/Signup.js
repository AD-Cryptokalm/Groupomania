import { useRef } from "react";
// import ErrorModal from "../UI/ErrorModal";
import Button from "../UI/Button";
import classes from "../../styles/Signup.module.css";


const Auth = () => {
  // Récupérer les value des champs avec useref
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    const emailValue = emailInputRef.current.value;
    const passwordValue = passwordInputRef.current.value;

    const regexEmail = (value) => {
      return /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
    }

    if (!regexEmail(emailValue)) {
      return
    }

    console.log("test");
    console.log(emailValue, passwordValue);

    // Vider les champs
    emailInputRef.current.value = "";
    passwordInputRef.current.value = "";
  };

  return (
    <>
    {/* <ErrorModal
    title="Il y a une erreur"
    message="Les champs sont vides"
    /> */}
      <section className={classes.auth}>
        <form onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" ref={emailInputRef} required />
          </div>

          <div className={classes.control}>
            <label htmlFor="password">Password</label>
            <input type="text" id="password" ref={passwordInputRef} required />
          </div>

          <div className={classes.actions}>
            {/* <button
            type="button"
            onClick={() => {}}
          >
            Valider
          </button> */}
            <Button type="submit" onClick={() => {}}>
              Valider
            </Button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Auth;
