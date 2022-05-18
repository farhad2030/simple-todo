import React, { useEffect, useState } from "react";
import Login from "./Login";
import Register from "./Register";

import "./Authentication.css";
import { useLocation } from "react-router-dom";

const Authentication = () => {
  const location = useLocation();

  //   console.log(location);

  const [Islogin, setIslogin] = useState(false);
  const changeAuthUi = () => {
    setIslogin(!Islogin);
  };
  useEffect(() => {
    setIslogin(location.state?.Islogin);
  }, [location]);

  return (
    <div className="authentication">
      <div className={`authForm loginContainer ${Islogin ? "showLogin" : ""}`}>
        <Login changeAuthUi={changeAuthUi} />
      </div>

      <div
        className={`authForm registerContainer ${
          Islogin ? "" : "showResister"
        }`}
      >
        <Register changeAuthUi={changeAuthUi} />
      </div>
    </div>
  );
};

export default Authentication;
