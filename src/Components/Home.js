import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import auth from "../firebase.init";

const Home = () => {
  const navigate = useNavigate();

  const [user, isLoading, error] = useAuthState(auth);
  return (
    <div className="py-5 my-4 justify-content-center text-center">
      <h1 className="text-primary text-center">Welcome to ToDo App</h1>
      {!user ? (
        <>
          <p className=""> To Maintain your task please Login</p>
          <button
            className="btn btn-primary"
            onClick={() => {
              navigate("/authentication/login");
            }}
          >
            Login
          </button>
        </>
      ) : (
        <>
          <p className="">
            {" "}
            Thank you for with us .Go to Task page to maintain you Task
          </p>
          <button
            className="btn btn-primary"
            onClick={() => {
              navigate("/task");
            }}
          >
            Manage Task
          </button>
        </>
      )}
    </div>
  );
};

export default Home;
