import React, { useState } from "react";
import { Global } from "../../helpers/Global";
import { useForm } from "../../hooks/useForm";
import { Navigate, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { Loader } from "../layout/public/Loader";

const { Url } = Global;

export const SignInUp = () => {
  const { form, changed, clearForm } = useForm({});
  const [messages, setMessage] = useState("");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();


  const saveUser = async (e) => {
    // Prevent the default behavior of the form
    e.preventDefault();
    console.log(form);
    let newUser = form;
    const request = await fetch(`${Url}/user/signup`, {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "content-type": "application/json",
      },
    });
    const data = await request.json();

    if (data.status === "Error 500") {
      return setErrors(<p className="errorForm">Server Error</p>);
    }
    const success = data.message;
    setMessage(success);

    if (data.errors.length > 0) {
      const thePWErrors = data.errors.map((error, index) => {
        return (
          <p id={index} className="errorForm">
            {error.text}
          </p>
        );
      });
      setErrors(thePWErrors);
    }
    if (data.errors.length <= 0) {
      setErrors([]);
    }
  };

  const loginUser = async (e) => {
    // Prevent the default behavior of the form
    e.preventDefault();
    // data from the form
    const userLogin = form;
    // request to the server
    const request = await fetch(`${Url}/user/signin`, {
      method: "POST",
      body: JSON.stringify(userLogin),
      headers: {
        "content-type": "application/json",
      },
    });
    const data = await request.json();
    console.log(data);
    if (data.status === "Error") {
      setMessage("");
      return setErrors(<p className="errorForm">{data.message}</p>);
    }
    if (data.status === "Success") {
      setErrors([]);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      const success = data.message;
      setMessage(success);
      // Set the auth state with the user and token
      setAuth(data.user);
      // Navigate to the social page
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");
      if (token && user) {
        setTimeout(() => {
          navigate("loading");
          setTimeout(() => {
            window.location.reload();
          }, 4000)
        }, 500);
      }
    }
    // if the server returns an error
  };
  return (
    <div className="section">
      <div className="container">
        <div className="row full-height justify-content-center">
          <div className="col-12 text-center align-self-center py-5">
            <div className="section pb-5 pt-5 pt-sm-2 text-center">
              <h6 className="mb-0 pb-3">
                <span>Log In </span>
                <span>Sign Up</span>
              </h6>
              <input
                className="checkbox"
                type="checkbox"
                id="reg-log"
                name="reg-log"
                onClick={clearForm}
              />
              <label htmlFor="reg-log"></label>
              <div className="card-3d-wrap mx-auto">
                <div className="card-3d-wrapper">
                  <div className="card-front">
                    <div className="center-wrap">
                      <div className="section text-center">
                        {/*--------------- LOGIN --------------- */}
                        <h4 className="mb-4 pb-3">Log In</h4>
                        <h4 className="successForm">{messages}</h4>
                        <h4>{errors}</h4>
                        <form onSubmit={loginUser}>
                          <div className="form-group">
                            <input
                              type="text"
                              name="email"
                              className="form-style"
                              placeholder="User or Email"
                              id="logemail"
                              autoComplete="off"
                              onChange={changed}
                            />
                            <i className="input-icon uil uil-at"></i>
                          </div>
                          <div className="form-group mt-2">
                            <input
                              type="password"
                              name="password"
                              className="form-style"
                              placeholder="Your Password"
                              id="logpass"
                              autoComplete="off"
                              onChange={changed}
                            />
                            <i className="input-icon uil uil-lock-alt"></i>
                          </div>
                          <input
                            className="btn mt-4"
                            type="submit"
                            value="Sign In"
                          />
                        </form>
                        <p className="mb-0 mt-4 text-center">
                          <a href="#0" className="link">
                            Forgot your password?
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="card-back">
                    <div className="center-wrap">
                      <div className="section text-center">
                        {/*--------------- SIGNUP --------------- */}
                        <h4 className="mb-4 pb-3">Sign Up</h4>
                        <h4 className="successForm">{messages}</h4>
                        <h4>{errors}</h4>
                        <form onSubmit={saveUser} className="formUP">
                          <div className="form-group">
                            <input
                              type="text"
                              name="name"
                              className="form-style"
                              placeholder="Your First Name"
                              id="logname"
                              autoComplete="off"
                              onChange={changed}
                            />
                            <i className="input-icon uil uil-user"></i>
                          </div>
                          <div className="form-group mt-2">
                            <input
                              type="email"
                              name="email"
                              className="form-style"
                              placeholder="Your Email"
                              id="logemail"
                              autoComplete="off"
                              onChange={changed}
                            />
                            <i className="input-icon uil uil-at"></i>
                          </div>
                          <div className="form-group mt-2">
                            <input
                              type="text"
                              name="username"
                              className="form-style"
                              placeholder="Your Username"
                              id="username"
                              autoComplete="off"
                              onChange={changed}
                            />
                            <i className="input-icon uil uil-user"></i>
                          </div>
                          <div className="form-group mt-2">
                            <input
                              type="password"
                              name="password"
                              className="form-style"
                              placeholder="Your Password"
                              id="logpass"
                              autoComplete="off"
                              onChange={changed}
                            />
                            <i className="input-icon uil uil-lock-alt"></i>
                          </div>
                          <div className="form-group mt-2">
                            <input
                              type="password"
                              name="confirm_password"
                              className="form-style"
                              placeholder="Repeat your Password"
                              id="password-confirm"
                              autoComplete="off"
                              onChange={changed}
                            />
                            <i className="input-icon uil uil-lock-alt"></i>
                          </div>
                          <input
                            className="btn mt-4"
                            type="submit"
                            value="Sign Up"
                          />
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
