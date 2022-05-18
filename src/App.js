import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";

// bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
// tostify
import "react-toastify/dist/ReactToastify.css";
import Authentication from "./Components/Authentication/Authentication";

function App() {
  return (
    <>
      <div className="App">
        <h1 className="text-3xl font-bold  underline">Hello world!</h1>
      </div>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
      </Routes>
      <Authentication></Authentication>
    </>
  );
}

export default App;
