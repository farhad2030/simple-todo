import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";

// bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
// tostify
import "react-toastify/dist/ReactToastify.css";
import Authentication from "./Components/Authentication/Authentication";
import RequireAuth from "./Components/RequireAuth/RequireAuth";
import Task from "./Components/Task/Task";
import AllTask from "./Components/Task/AllTask";
import TopNavbar from "./Components/TopNavbar/TopNavbar";

function App() {
  return (
    <>
      <TopNavbar></TopNavbar>
      <Routes>
        <Route
          path="/authentication/login"
          element={<Authentication></Authentication>}
        ></Route>
        <Route path="/" element={<Home></Home>}></Route>
        <Route
          path="/task"
          element={
            <RequireAuth>
              <Task></Task>
            </RequireAuth>
          }
        ></Route>
        <Route
          path="/alltask"
          element={
            <RequireAuth>
              <AllTask></AllTask>
            </RequireAuth>
          }
        ></Route>
      </Routes>
    </>
  );
}

export default App;
