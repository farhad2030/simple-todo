import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
// icon
import { FcGoogle } from "react-icons/fc";
import { BsFacebook, BsGithub } from "react-icons/bs";

// auth and firebase hook
import auth from "../../firebase.init";
import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
  useSignInWithGoogle,
  useUpdateProfile,
} from "react-firebase-hooks/auth";

import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = ({ changeAuthUi }) => {
  // iconstyle
  const fontStyles = { color: "white", fontSize: "40px" };

  // react-router -hook
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathnane || "/";

  //   firebase hook
  const [signInWithGoogle, googleUser, googleLoading, googleError] =
    useSignInWithGoogle(auth);
  const [createUserWithEmailAndPassword, emailUser, emailLoading, emailError] =
    useCreateUserWithEmailAndPassword(auth);
  const [updateProfile, updating, updateError] = useUpdateProfile(auth);
  const [user, loading, error] = useAuthState(auth);

  const [displayName, setdisplayName] = useState("");

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
    if (updateError) toast.error(`${updateError}`);
    if (googleUser) {
      navigate(from, { replace: true });
    }
    if (emailUser) {
      const updateProfileHandeler = async () => {
        await updateProfile({ displayName });

        navigate(from, { replace: true });
      };
      updateProfileHandeler();
    }
  }, [googleUser, googleError, emailError, emailUser, updateError]);

  // handel submit
  const handelRegister = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const formDataObj = Object.fromEntries(formData.entries());
    setdisplayName(formDataObj.name);
    const name = formDataObj.name;
    console.log(formDataObj, name);

    await createUserWithEmailAndPassword(
      formDataObj.email,
      formDataObj.password
    );
    const email = formDataObj.email;
    const { data } = await axios.post(
      "https://radiant-inlet-16077.herokuapp.com/login",
      {
        email,
      }
    );
    localStorage.setItem("accessToken", data.accessToken);

    console.log(emailError);
  };

  return (
    <div>
      <div className="container d-flex justify-content-center align-item-center">
        <Form
          className="d-flex flex-column align-items-center "
          onSubmit={handelRegister}
        >
          <h1 className="py-3 color-white">Register</h1>

          <Form.Group className="mb-3 inputfield ">
            <Form.Control
              className=""
              type="text"
              name="name"
              placeholder="Enter Name"
            />
          </Form.Group>
          <Form.Group className="mb-3 inputfield ">
            <Form.Control
              className=""
              type="email"
              name="email"
              placeholder="Enter email"
            />
          </Form.Group>
          <Form.Group className="mb-3 inputfield">
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
            />
          </Form.Group>

          {!emailLoading ? (
            <Button variant="primary" type="submit">
              Register
            </Button>
          ) : (
            <div class="spinner-border" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          )}

          <p className="my-3">
            Have an account , Please{" "}
            <span className="changeAuthPageLink" onClick={changeAuthUi}>
              login
            </span>
          </p>
          {/* social login */}
          <p>or sign up with:</p>
          <p className="">
            {!googleLoading ? (
              <button
                type="button"
                className="btn btn-link btn-floating mx-1"
                onClick={() => {
                  handelgooglelogin();
                }}
              >
                <FcGoogle style={fontStyles} />
              </button>
            ) : (
              <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
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
    </div>
  );
};

export default Register;
