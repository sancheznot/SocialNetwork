import React from "react";
import { useState } from "react";
import { Global } from "../../helpers/Global";
import { SerializerForm } from "../../helpers/SerializerForm";
import useAuth from "../../hooks/useAuth";

const { Url } = Global;
export const Config = () => {
  const { auth, setAuth } = useAuth();
  const { name, lastname, email, username, image, role, bio } = auth;
  const [save, setSave] = useState("notSaved");

  const updateUser = async (e) => {
    e.preventDefault();
    const tokenLoged = localStorage.getItem("token");
    // get data from form
    let newDataUser = SerializerForm(e.target);
    // delete data not needed
    delete newDataUser.file0;
    // update data user in backend
    const request = await fetch(`${Url}/user/update`, {
      method: "PUT",
      body: JSON.stringify(newDataUser),
      headers: {
        "Content-Type": "application/json",
        Authorization: tokenLoged,
      },
    });
    const data = await request.json();
    if (data.status === "Success" && data.user) {
      // update data user in frontend
      delete data.user.password;
      setAuth(data.user);
      setSave("saved");
    } else {
      setSave("error");
    }
    const fileInput = document.querySelector("#file");
    if (data.status === "Success" && fileInput.files[0]) {
      // update avatar in backend

      const formData = new FormData();
      formData.append("file0", fileInput.files[0]);
      const request = await fetch(`${Url}/user/imgupload`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: tokenLoged,
        },
      });
      const uploadData = await request.json();
      if (uploadData.status === "Success" && uploadData.user) {
        // update avatar in frontend
        // delete data not needed
        delete uploadData.user.password;
        console.log(uploadData);
        setAuth(uploadData.user);
        setSave("saved");
      }else{
        setSave("error");
      }
    }
  };

  return (
    <>
      <header className="content__header">
        <h1 className="header__title">Profile</h1>
      </header>
      <div className="profileDiv">
        <div className="content__posts">
          <form className="profileForm" onSubmit={updateUser}>
          {save === "saved" ? (
            <div className="alert alert-success" role="alert">  
              <strong>Save</strong> 
            </div>
          ) : null}
          {save === "error" ? (
            <div className="alert alert-danger" role="alert">
              <strong>Oh snap!</strong> Change a few things up and try
              submitting again.
            </div>
          ) : null}
            <div className="form__group">
              <label htmlFor="name" className="form__label">
                Name
              </label>
              <input
                type="text"
                name="name"
                className="form__input"
                placeholder="Name"
                defaultValue={name}
              />
            </div>
            <div className="form__group">
              <label htmlFor="LastName" className="form__label">
                LastName
              </label>
              <input
                type="text"
                name="lastname"
                className="form__input"
                placeholder="LastName"
                defaultValue={lastname}
              />
            </div>
            <div className="form__group">
              <label htmlFor="username" className="form__label">
                Username
              </label>
              <input
                type="text"
                name="username"
                className="form__input"
                placeholder="Username"
                defaultValue={username}
              />
            </div>
            <div className="form__group">
              <label htmlFor="email" className="form__label">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="form__input"
                placeholder="Email"
                defaultValue={email}
              />
            </div>
            <div className="form__group">
              <label htmlFor="password" className="form__label">
                Password
              </label>
              <input
                type="password"
                name="password"
                className="form__input"
                placeholder="Password"
              />
            </div>
            <div className="form__group">
              <label htmlFor="repeatPassword" className="form__label">
                Repeat Password
              </label>
              <input
                type="password"
                name="repeatPassword"
                className="form__input"
                placeholder="Repeat Password"
              />
            </div>
            <div className="form__group">
              <label htmlFor="avatar" className="form__label">
                Avatar
              </label>
              <input
                type="file"
                name="file0"
                id="file"
                className="form__inputAvatar"
                placeholder="Avatar"
              />
            </div>
            <div className="form__group">
              <label htmlFor="bio" className="form__label">
                Bio
              </label>
              <textarea
                name="bio"
                className="form__textarea"
                placeholder="Write something about you"
                maxLength="100"
                defaultValue={bio}
              ></textarea>
            </div>
            <input type="submit" value="Save" className="btn mt-4" />
          </form>
        </div>
        {/* Profile preview */}
        <div className="content__profile">
          <header className="content__header">
            <h1 className="header__titleProfile">Info to be displayed</h1>
          </header>
          <div className="profile__container">
            <div className="container__info">
              <h2 className="info__name">
                {name} {lastname}
              </h2>
              <h3 className="info__username">@{username}</h3>
              {bio === "" ? (
                "Tell us something about you"
              ) : (
                <p className="info__bio">{bio}</p>
              )}
            </div>
            <div className="general-info__container-avatarProfile">
              <img
                src={`${Url}/user/avatar/${image}`}
                alt="Avatar"
                className="avatar__img"
              />
            </div>
          </div>
          <header className="content__header">
            <h1 className="header__titleProfile">Personal Information</h1>
          </header>
          <div className="profile__container">
            <div className="container__info">
              <label htmlFor="emailprofile">Email</label>
              <h2 className="info__name">{email}</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
