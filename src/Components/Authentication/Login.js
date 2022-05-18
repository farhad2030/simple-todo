import React, { useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook, BsGithub } from "react-icons/bs";
import {
  useAuthState,
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ changeAuthUi }) => {
  const fontStyles = { color: "white", fontSize: "40px" };

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  //   firebase hook
  const [signInWithGoogle, googleUser, googleLoading, googleError] =
    useSignInWithGoogle(auth);
  const [signInWithEmailAndPassword, emailUser, emailLoading, emailError] =
    useSignInWithEmailAndPassword(auth);
  const [user, loading, error] = useAuthState(auth);

  //  handel google login
  const handelgooglelogin = async () => {
    await signInWithGoogle();
    const email = user?.email;
    const { data } = await axios.post(
      "https://radiant-inlet-16077.herokuapp.com/login",
      {
        email,
      }
    );
    localStorage.setItem("accessToken", data.accessToken);
  };

  useEffect(() => {
    if (googleError) toast.error(`${googleError}`);
    if (emailError) toast.error(`${emailError}`);
    if (googleUser || emailUser) {
      console.log(googleUser);
      navigate(from, { replace: true });
    }
  }, [googleUser, googleError, emailError, emailUser]);

  const handelLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formDataObj = Object.fromEntries(formData.entries());
    console.log(formDataObj);
    await signInWithEmailAndPassword(formDataObj.email, formDataObj.password);
    const email = formDataObj.email;
    const { data } = await axios.post(
      "https://radiant-inlet-16077.herokuapp.com/login",
      { email }
    );
    localStorage.setItem("accessToken", data.accessToken);
  };
  return (
    <div className="container">
      <Form
        className="d-flex flex-column align-items-center "
        onSubmit={handelLogin}
      >
        <h1 className="py-3 color-white">Login</h1>
        <Form.Group className="mb-3 inputfield">
          <Form.Control type="email" name="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3 inputfield">
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
          />
        </Form.Group>
        {emailLoading ? (
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        ) : (
          <Button variant="primary" type="submit">
            Login
          </Button>
        )}
        <p className="my-3">
          Dont have an account , Please{" "}
          <span className="changeAuthPageLink" onClick={changeAuthUi}>
            Register
          </span>
        </p>
        {/* social login */}
        <p>or sign up with:</p>
        <p className="">
          {googleLoading ? (
            <div class="spinner-border" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          ) : (
            <button
              type="button"
              className="btn btn-link btn-floating mx-1"
              onClick={handelgooglelogin}
            >
              <FcGoogle style={fontStyles} />
            </button>
          )}

          <button
            type="button"
            className="btn btn-link btn-floating mx-1 disabled"
          >
            <BsFacebook style={fontStyles} />
          </button>

          <button
            type="button"
            className="btn btn-link btn-floating mx-1 disabled"
          >
            <BsGithub style={fontStyles} />
          </button>
        </p>
      </Form>
    </div>
  );
};

export default Login;
