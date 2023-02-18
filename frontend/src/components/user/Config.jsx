import React from "react";
import { Global } from "../../helpers/Global";
import useAuth from "../../hooks/useAuth";

const {Url} = Global
export const Config = () => {
  const { auth } = useAuth();
  const { name, email, username, image, role } = auth;
  console.log(auth);
  return (
    <>
      <header className="content__header">
        <h1 className="header__title">Profile</h1>
      </header>
      <div className="profileDiv">
        <div className="content__posts">
          <form className="profileForm">
            <div className="form__group">
              <label htmlFor="name" className="form__label">
                Name
              </label>
              <input
                type="text"
                name="name"
                className="form__input"
                placeholder="Name"
              />
            </div>
            <div className="form__group">
              <label htmlFor="LastName" className="form__label">
                LastName
              </label>
              <input
                type="text"
                name="LastName"
                className="form__input"
                placeholder="LastName"
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
                name="avatar"
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
              ></textarea>
            </div>
          </form>
        </div>
        {/* Profile preview */}
        <div className="content__profile">
          <header className="content__header">
            <h1 className="header__titleProfile">Info to be displayed</h1>
          </header>
          <div className="profile__container">
            <div className="container__info">
              <h2 className="info__name">{name} {name}</h2>
              <h3 className="info__username">@{username}</h3>
              <p className="info__bio">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos perferendis reprehenderit ullam voluptates nesciunt recusandae consequatur, adipisci saepe molestias, rerum unde eos deleniti? Blanditiis, dolore.</p>
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
