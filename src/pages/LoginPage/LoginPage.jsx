import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import BackgroundAnimation from "../../components/BackgroundAnimation/BackgroundAnimation";
import { applicationContext } from "../../context";
import { validateEmail } from "../../utils/utils";

import "./loginPage.css";
import DeletableChips from "../../components/DeletableChips/DeletableChips";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [EmailIsClicked, setEmailIsClicked] = useState(true);
  const [PasswordIsClicked, setPasswordIsClicked] = useState(true);
  

  const { setToken } = useContext(applicationContext);

  const history = useHistory();

  const updateToken = async (token) => {
    await setToken(token);
    localStorage.setItem("token", token);
    history.push("/home");
  };

  const login = () => {
    setIsSubmitted(true);
    setErrorMessage("");

    // validate data
    if (!validateEmail(email)) {
      setIsSubmitted(false);
      return setErrorMessage("Wrong email address format!");
    }

    if (!password) {
      setIsSubmitted(false);
      return setErrorMessage("Please enter password");
    }

    fetch("https://node-api-krmk.onrender.com/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password, // ovde prosledjujemo email i password koji je ukucan
      }),
    })
      .then((response) => {
        // proveravamo da li je uspesan nas api poziv
        if (response.ok) return response.json();

        // ako je status od 400 do 500 (znaci nesto na frontendu nije dobro sifra, email , ruta itd
        if (response.status < 500) return Promise.reject("Wrong credentials!");

        // ako je staus veci od 500 (znaci greska je na backendu)
        return Promise.reject("Oops something went wrong, please try later!");
      })

      // if response is good do this
      .then((data) => updateToken(data.accessToken))

      // if response is not good do this
      .catch((error) => setErrorMessage(error))

      .finally((data) =>
        setTimeout(() => {
          setIsSubmitted(false);
        }, 500)
      );
  };

  const emailDelete = () => {
    setEmailIsClicked(false)
  };
  const passwordDelete = () => {
    setPasswordIsClicked(false)
  };
  

  return (
    <>
      <div
        id="loginPage"
        onKeyUp={(e) => {
          if (e.key === `Enter`) {
            login();
          }
        }}
      >
        <BackgroundAnimation />
        <div className="login-wrapper bg-glass">
          <h2>Sign in</h2>
          <div className="">
            <label>
              Email
              <input
                type="email"
                value={email}
                onBlur={(event) => {
                  setErrorMessage(
                    validateEmail(event.target.value)
                      ? ""
                      : "Wrong email address format!"
                  );
                }}
                onChange={(event) => setEmail(event.target.value)}
              />
            </label>
            {EmailIsClicked && <DeletableChips chipDelete={emailDelete} text={"Try with: admin@admin.com"}/>}
          </div>

          <div>
            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </label>
			{PasswordIsClicked && <DeletableChips chipDelete={passwordDelete} text={"Try with: admin"}/>}
          </div>
          <div className="errorMessage" onClick={() => setErrorMessage("")}>
            {errorMessage}
          </div>
          <div>
            <button disabled={isSubmitted} onClick={login}>
              Sign in
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
