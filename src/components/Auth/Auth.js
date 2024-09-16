import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { child, get, getDatabase, ref, set, update } from "firebase/database";
import { Button } from "flowbite-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../utils/LoginForm";
import SignUpForm from "../utils/SignUpForm";
import app from "./firebase.config";

const Auth = () => {
  const url = "/application-tracker";
  const auth = getAuth();
  const db = getDatabase(app);

  const [loginToggle, setLoginToggle] = useState(true);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleBlur = (e) => {
    let res = { ...user };
    res[e.target.name] = e.target.value;
    setUser(res);
  };

  /**--------------------------------------------
   *!               Signup
   *---------------------------------------------**/
  const handleSignUp = (e) => {
    if (user.password === "") {
      alert("Fill up Your password");
    }
    if (user.email === "") {
      alert("Fill up Your email");
    }

    createUserWithEmailAndPassword(auth, user.email, user.password)
      .then((res) => {
        const u = res.user;
        alert("user created");
        set(ref(db, `${url}/${u.uid}`), {
          name: user.name,
          email: user.email,
          password: user.password,
          uid: u.uid,
        });
        localStorage.setItem("name", user.name);
        localStorage.setItem("email", user.email);
        localStorage.setItem("uid", u.uid);
        e.target.reset();
        navigate(-1 || "/", { replace: true });
        setUser("");
      })
      .catch((error) => {
        alert(error.code, error.message);
        // ..
      });
    e.preventDefault();
  };

  /**--------------------------------------------
   *!               Login
   *---------------------------------------------**/
  const handleLogin = async (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, user.email, user.password)
      .then(async (res) => {
        const u = res.user;
        // last login update
        await update(ref(db, `${url}/${u.uid}`), {
          last_login: new Date(),
        });
        // get data from dtabase
        const dbRef = ref(getDatabase());
        get(child(dbRef, `${url}/${u.uid}`))
          .then((snapshot) => {
            if (snapshot.exists()) {
              const userData = snapshot.val();
              localStorage.setItem("name", userData.name);
              localStorage.setItem("email", userData.email);
              localStorage.setItem("uid", userData.uid);
              navigate(-1 || "/", { replace: true });
              setUser("");
            } else {
              console.log("No data available");
            }
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  };

  return (
    <div className="max-w-[600px] mx-auto">
      <div>
        <Button
          color="dark"
          pill={true}
          onClick={() => {
            setLoginToggle(!loginToggle);
          }}
        >
          {loginToggle ? "Signup" : "Login"}
        </Button>
      </div>
      {loginToggle ? (
        <LoginForm handleLogin={handleLogin} handleBlur={handleBlur} />
      ) : (
        <SignUpForm handleSignUp={handleSignUp} handleBlur={handleBlur} />
      )}
    </div>
  );
};

export default Auth;
