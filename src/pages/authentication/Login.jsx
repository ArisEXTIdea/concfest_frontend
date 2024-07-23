import React, { useEffect } from "react";
import {
  arrayNamespace,
  changeTitle,
  handleShowError,
  handleToastDisplay
} from "../../utils/global_function";
import { brandLogo } from "../../assets";
import { Link } from "react-router-dom";
import { ButtonIcon, InputText } from "../../components";
import axios from "axios";
import { apiHost } from "../../utils/global_variable";
import { useDispatch } from "react-redux";

const Login = () => {
  // ================== HOOKS ================== //
  const dispatch = useDispatch();

  useEffect(() => {
    changeTitle("Buat Akun Baru");
  }, []);

  // ================== API ================== //

  const handleLogin = () => {
    const loginData = arrayNamespace.serializeArrayToObject("login-form");

    axios
      .post(`${apiHost}/authentication/login`, loginData)
      .then((res) => {
        const token = res.data.data.token;
        dispatch({ type: "CREATE_AUTH_CREDENTIAL", newValue: token });
        window.location = "/dashboard";
      })
      .catch((err) => {
        try {
          handleToastDisplay("red", "ri-close-line", "Login failed!");
          handleShowError(err.response.data.error);
        } catch (err) {
          handleToastDisplay("red", "ri-close-line", "Internal server error!");
        }
      });
  };

  // ================== INTTERFACE ================== //

  return (
    <div
      className="w-full h-screen bg-cover bg-no-repeat bg-center flex justify-center items-center"
      style={{
        backgroundImage: `url(https://images.unsplash.com/photo-1501612780327-45045538702b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`
      }}
    >
      <div className="duration-300 backdrop-blur-md rounded-md shadow-xl">
        <div className="w-full h-full bg-slate-900 p-10 rounded-md pb-32 duration-300 bg-opacity-80">
          <div>
            <div className="pb-10">
              <Link to={"/"}>
                <img src={brandLogo} alt="Brand" className="w-32" />
              </Link>
            </div>
            <div className="mb-10">
              <span className="text-white">START TO ENJOY FESTIVAL</span>
              <h1 className="text-white">Create new account</h1>
              <span className="text-white">
                Login to get all access for scheduling festival
              </span>
            </div>

            <div>
              <form id="login-form">
                <InputText
                  name={"username"}
                  label="Username"
                  type="text"
                  placeholder="username123"
                  icon={"ri-user-line"}
                />
                <InputText
                  name={"password"}
                  label="Password"
                  type="password"
                  placeholder="Type your password"
                  icon={"ri-key-line"}
                />
                <ButtonIcon
                  text="Login"
                  bgColor="bg-gray-200 hover:bg-gray-100"
                  textColor="black"
                  iconPosition="l"
                  classAdd="rounded shadow-[0px_20px_200px_0px_#f7fafc]"
                  type="button"
                  icon={"ri-login-circle-line"}
                  onClick={handleLogin}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
