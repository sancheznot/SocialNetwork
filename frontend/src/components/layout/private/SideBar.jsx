import React from "react";
import imgProfile from "../../../assets/img/user.png";
import { Global } from "../../../helpers/Global";
import useAuth from "../../../hooks/useAuth";

const { Url } = Global;

export const SideBar = () => {
  const { auth, counters } = useAuth();
  const { name, username, image } = auth;
  const { following, followed, publications } = counters;
  return (
    <aside className="layout__aside">
      <header className="aside__header">
        <h1 className="aside__title">I'm, {name}</h1>
      </header>

      <div className="aside__container">
        <div className="aside__profile-info">
          <div className="profile-info__general-info">
            <div className="general-info__container-avatar">
              <img
                src={`${Url}/user/avatar/${image}`}
                className="container-avatar__img"
                alt="avatar"
              />
            </div>

            <div className="general-info__container-names">
              <a href="#" className="container-names__name">
                {name}
              </a>
              <p className="container-names__nickname">@{username}</p>
            </div>
          </div>

          <div className="profile-info__stats">
            <div className="stats__following">
              <a href="#" className="following__link">
                <span className="following__title">Following</span>
                <span className="following__number">{following}</span>
              </a>
            </div>
            <div className="stats__following">
              <a href="#" className="following__link">
                <span className="following__title">Followers</span>
                <span className="following__number">{followed}</span>
              </a>
            </div>

            <div className="stats__following">
              <a href="#" className="following__link">
                <span className="following__title">Post</span>
                <span className="following__number">{publications}</span>
              </a>
            </div>
          </div>
        </div>

        <div className="aside__container-form">
          <form className="container-form__form-post">
            <div className="form-post__inputs">
              <label htmlFor="post" className="form-post__label">
                ¿Que estas pesando hoy?
              </label>
              <textarea name="post" className="form-post__textarea"></textarea>
            </div>

            <div className="form-post__inputs">
              <label htmlFor="image" className="form-post__label">
                Sube tu foto
              </label>
              <input type="file" name="image" className="form-post__image" />
            </div>

            <input
              type="submit"
              value="Enviar"
              className="form-post__btn-submit"
              disabled
            />
          </form>
        </div>
      </div>
    </aside>
  );
};
