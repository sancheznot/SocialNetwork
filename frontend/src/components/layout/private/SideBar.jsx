import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Global } from "../../../helpers/Global";
import useAuth from "../../../hooks/useAuth";
import { useForm } from "../../../hooks/useForm";
import { useState } from "react";

const { Url } = Global;

export const SideBar = () => {
  const token = localStorage.getItem("token");
  const { auth, counters } = useAuth();
  const { name, username, image, _id } = auth;
  const { following, followed, publications } = counters;
  const [stored, setStored] = useState("not_stored");
  const [messages, setMessages] = useState([]);

  const { form, changed } = useForm({});
  const savePost = async (e) => {
    e.preventDefault();
    // get the data from the form
    let newPost = form;
    newPost.user = _id;

    // send the data to the backend
    const request = await fetch(`${Url}/public/save`, {
      method: "POST",
      body: JSON.stringify(newPost),
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    const data = await request.json();
    if (data.status === "Success") {
      setStored("stored");
      setMessages([data.message]);
      const myform = document.getElementById("post-form");
      const myFile = document.getElementById("file");
      if (myFile.files.length <= 0) {
        myform.reset();
      }
    } else {
      setStored("Error");
      setMessages([data.message]);
    }
    // upload the image
    const fileInput = document.querySelector("#file");
    if (data.status === "Success" && fileInput.files[0]) {
      const formData = new FormData();
      formData.append("file0", fileInput.files[0]);
      const request = await fetch(
        `${Url}/public/imgpubupload/${data.publication._id}`,
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: token,
          },
        }
      );
      const uploadData = await request.json();
      if (uploadData.status === "Success") {
        setStored("stored");
        setMessages([uploadData.message]);
      } else {
        setStored("Error");
        setMessages([uploadData.message]);
      }
      if (data.status === "Success" || uploadData.status === "Success") {
        const myform = document.getElementById("post-form");
        myform.reset();
      }
    }
  };

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
                className="asideavatar__img"
                alt="avatar"
              />
            </div>

            <div className="general-info__container-names">
              <Link
                to={`/social/profile/${_id}`}
                className="container-names__name">
                {name}
              </Link>
              <p className="container-names__nickname">@{username}</p>
            </div>
          </div>

          <div className="profile-info__stats">
            <div className="stats__following">
              <Link to={"following/" + _id} className="following__link">
                <span className="following__title">Following</span>
                <span className="following__number">{following}</span>
              </Link>
            </div>
            <div className="stats__following">
              <Link to={"followers/" + _id} className="following__link">
                <span className="following__title">Followers</span>
                <span className="following__number">{followed}</span>
              </Link>
            </div>

            <div className="stats__following">
              <Link to={"profile/" + _id} className="following__link">
                <span className="following__title">Post</span>
                <span className="following__number">{publications}</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="aside__container-form">
          {stored === "stored" ? (
            <div className="alert alert-success" role="alert">
              <strong> {messages}</strong>
            </div>
          ) : null}
          {stored === "Error" ? (
            <div className="alert alert-danger" role="alert">
              <strong>{messages}</strong>
            </div>
          ) : null}
          <form
            className="container-form__form-post"
            onSubmit={savePost}
            id="post-form">
            <div className="form-post__inputs">
              <label htmlFor="text" className="form-post__label">
                ¿Que estas pesando hoy?
              </label>
              <textarea
                name="text"
                className="form-post__textarea"
                onChange={changed}
              />
            </div>

            <div className="form-post__inputs">
              <label htmlFor="file" className="form-post__label">
                Sube tu foto
              </label>
              <input
                type="file"
                name="file0"
                id="file"
                className="form-post__image"
              />
            </div>

            <input
              type="submit"
              value="Enviar"
              className="form-post__btn-submit"
            />
          </form>
        </div>
      </div>
    </aside>
  );
};
