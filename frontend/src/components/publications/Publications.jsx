import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import moment from "moment";
import { Global } from "../../helpers/Global";
import ReactTimeAgo from "react-time-ago";

const { Url } = Global;

export const Publications = ({ post, setPost, getPublic, date, datas }) => {
  const { auth } = useAuth();

  const deletePost = async (id) => {
    const request = await fetch(`${Url}/public/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });
    const data = await request.json();
    if (data.status === "Success") {
      getPublic();
    }
  };
  return (
    <>
      {post.map((getpost) => {
        return (
          <div key={getpost._id}>
            <div className="post__image-user">
              <Link
                to={`/social/profile/${getpost.user._id}`}
                className="post__image-link">
                <img
                  src={`${Url}/user/avatar/${getpost.user.image}`}
                  className="post__user-image"
                  alt="Foto de perfil"
                />
              </Link>
            </div>

            <div className="post__body">
              <div className="post__user-info">
                <Link
                  to={`/social/profile/${getpost.user._id}`}
                  className="user-info__name">
                  {getpost.user.name}
                </Link>
                <span className="user-info__divider"> | </span>
                <a href="#" className="user-info__create-date">
                  <ReactTimeAgo date={getpost.created_At} locale="en-US" timeStyle="twitter" />
                </a>
              </div>

              <h4 className="post__content">{getpost.text}</h4>
              <div className="post__image">
                {getpost.file && (
                  <img src={`${Url}/public/media/${getpost.file}`} />
                )}
              </div>
            </div>

            {auth._id === getpost.user._id && (
              <div className="post__buttons">
                <button
                  onClick={() => deletePost(getpost._id)}
                  className="post__button">
                  <i className="fa-solid fa-trash-can"></i>
                </button>
              </div>
            )}
          </div>
        );
      })}
    </>
  );
};
