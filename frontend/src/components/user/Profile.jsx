import React, { useEffect, useState } from "react";
import imgProfile from "../../assets/img/user.png";
import { useParams } from "react-router-dom";
import { getProfile } from "../../helpers/GetProfile";
import { Global } from "../../helpers/Global";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const { Url } = Global;
export const Profile = () => {
  useEffect(() => {
    DataUser();
    getCounters();
  }, []);
  const params = useParams();
  useEffect(() => {
    DataUser();
    getCounters();
  }, [params]);
  const DataUser = async () => {
    let dataUser = await getProfile(userId, setUser);
    console.log(dataUser);
    if (dataUser.following && dataUser.following._id) setIFollow(true);
  };
  const [user, setUser] = useState({});
  const [counters, setCounters] = useState({});
  const [iFollow, setIFollow] = useState(false);
  const userId = params.userId;
  const token = localStorage.getItem("token");
  const { auth } = useAuth();
  const { _id } = auth;

  const getCounters = async () => {
    const request = await fetch(`${Url}/user/counters/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    const data = await request.json();
    if (data.status === "Success") {
      setCounters(data);
    }
  };
  const { following, followed, publications } = counters;
  const followUser = async (id) => {
    // request to follow user backend api
    const request = await fetch(`${Url}/follow/save/`, {
      method: "POST",
      body: JSON.stringify({ followed: id }),
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });
    const data = await request.json();
    if (data.status === "Success") {
      
          setIFollow(true);
       
    }
  };
  const unfollowUser = async (id) => {
    const request = await fetch(`${Url}/follow/unfollow/${id}`, {
      method: "DELETE",
      headers: {
        "content-typw": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });
    const data = await request.json();
    if (data.status === "Success") {
      setIFollow(false);
    }
  };
  return (
    <>
      <aside className="layout__aside">
        <div className="aside__container">
          <div className="aside__profile-info">
            <div className="profile-info__general-info">
              <div className="general-info__container-avatar">
                <img
                  src={`${Url}/user/avatar/${user.image}`}
                  className="container-avatar__img"
                  alt="Foto de perfil"
                />
              </div>

              <div className="general-info__container-names">
                <a href="#" className="container-names__name">
                  {user.name}
                </a>
                <p className="container-names__nickname">{user.username}</p>
                <p className="container-names__nickname">{user.bio}</p>
                {user._id != _id &&
                  (iFollow ? (
                    <button
                      onClick={() => unfollowUser(user._id)}
                      className="content__button">
                      Unfollow
                    </button>
                  ) : (
                    <button
                      onClick={() => followUser(user._id)}
                      className="content__button">
                      follow
                    </button>
                  ))}
              </div>
            </div>

            <div className="profile-info__stats">
              <div className="stats__following">
                <Link
                  to={"/social/following/" + user._id}
                  className="following__link">
                  <span className="following__title">Following</span>
                  <span className="following__number">{following}</span>
                </Link>
              </div>
              <div className="stats__following">
                <Link
                  to={"/social/followers/" + user._id}
                  className="following__link">
                  <span className="following__title">Followers</span>
                  <span className="following__number">{followed}</span>
                </Link>
              </div>

              <div className="stats__following">
                <Link
                  to={"/social/profile/" + user._id}
                  className="following__link">
                  <span className="following__title">Post</span>
                  <span className="following__number">{publications}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <div className="content__posts_profile">
        <div className="posts__post_profile">
          <div className="post__container">
            <div className="post__image-user">
              <a href="#" className="post__image-link">
                <img
                  src={imgProfile}
                  className="post__user-image"
                  alt="Foto de perfil"
                />
              </a>
            </div>

            <div className="post__body">
              <div className="post__user-info">
                <a href="#" className="user-info__name">
                  Adrian
                </a>
                <span className="user-info__divider"> | </span>
                <a href="#" className="user-info__create-date">
                  Hace 1 hora
                </a>
              </div>

              <h4 className="post__content">Hola, buenos dias.</h4>
            </div>
          </div>

          <div className="post__buttons">
            <a href="#" className="post__button">
              <i className="fa-solid fa-trash-can"></i>
            </a>
          </div>
        </div>
        <div className="posts__post_profile">
          <div className="post__container">
            <div className="post__image-user">
              <a href="#" className="post__image-link">
                <img
                  src={imgProfile}
                  className="post__user-image"
                  alt="Foto de perfil"
                />
              </a>
            </div>

            <div className="post__body">
              <div className="post__user-info">
                <a href="#" className="user-info__name">
                  Victor Robles
                </a>
                <span className="user-info__divider"> | </span>
                <a href="#" className="user-info__create-date">
                  Hace 1 hora
                </a>
              </div>

              <h4 className="post__content">Hola, buenos dias.</h4>
            </div>
          </div>

          <div className="post__buttons">
            <a href="#" className="post__button">
              <i className="fa-solid fa-trash-can"></i>
            </a>
          </div>
        </div>{" "}
        <div className="posts__post_profile">
          <div className="post__container">
            <div className="post__image-user">
              <a href="#" className="post__image-link">
                <img
                  src={imgProfile}
                  className="post__user-image"
                  alt="Foto de perfil"
                />
              </a>
            </div>

            <div className="post__body">
              <div className="post__user-info">
                <a href="#" className="user-info__name">
                  Victor Robles
                </a>
                <span className="user-info__divider"> | </span>
                <a href="#" className="user-info__create-date">
                  Hace 1 hora
                </a>
              </div>

              <h4 className="post__content">Hola, buenos dias.</h4>
            </div>
          </div>

          <div className="post__buttons">
            <a href="#" className="post__button">
              <i className="fa-solid fa-trash-can"></i>
            </a>
          </div>
        </div>{" "}
        <div className="posts__post_profile">
          <div className="post__container">
            <div className="post__image-user">
              <a href="#" className="post__image-link">
                <img
                  src={imgProfile}
                  className="post__user-image"
                  alt="Foto de perfil"
                />
              </a>
            </div>

            <div className="post__body">
              <div className="post__user-info">
                <a href="#" className="user-info__name">
                  Victor Robles
                </a>
                <span className="user-info__divider"> | </span>
                <a href="#" className="user-info__create-date">
                  Hace 1 hora
                </a>
              </div>

              <h4 className="post__content">Hola, buenos dias.</h4>
            </div>
          </div>

          <div className="post__buttons">
            <a href="#" className="post__button">
              <i className="fa-solid fa-trash-can"></i>
            </a>
          </div>
        </div>{" "}
        <div className="posts__post_profile">
          <div className="post__container">
            <div className="post__image-user">
              <a href="#" className="post__image-link">
                <img
                  src={imgProfile}
                  className="post__user-image"
                  alt="Foto de perfil"
                />
              </a>
            </div>

            <div className="post__body">
              <div className="post__user-info">
                <a href="#" className="user-info__name">
                  Victor Robles
                </a>
                <span className="user-info__divider"> | </span>
                <a href="#" className="user-info__create-date">
                  Hace 1 hora
                </a>
              </div>

              <h4 className="post__content">Hola, buenos dias.</h4>
            </div>
          </div>

          <div className="post__buttons">
            <a href="#" className="post__button">
              <i className="fa-solid fa-trash-can"></i>
            </a>
          </div>
        </div>
        <div className="posts__post_profile">
          <div className="post__container">
            <div className="post__image-user">
              <a href="#" className="post__image-link">
                <img
                  src={imgProfile}
                  className="post__user-image"
                  alt="Foto de perfil"
                />
              </a>
            </div>

            <div className="post__body">
              <div className="post__user-info">
                <a href="#" className="user-info__name">
                  Victor Robles
                </a>
                <span className="user-info__divider"> | </span>
                <a href="#" className="user-info__create-date">
                  Hace 1 hora
                </a>
              </div>

              <h4 className="post__content">Hola, buenos dias.</h4>
            </div>
          </div>

          <div className="post__buttons">
            <a href="#" className="post__button">
              <i className="fa-solid fa-trash-can"></i>
            </a>
          </div>
        </div>
        <div className="posts__post_profile">
          <div className="post__container">
            <div className="post__image-user">
              <a href="#" className="post__image-link">
                <img
                  src={imgProfile}
                  className="post__user-image"
                  alt="Foto de perfil"
                />
              </a>
            </div>

            <div className="post__body">
              <div className="post__user-info">
                <a href="#" className="user-info__name">
                  Victor Robles
                </a>
                <span className="user-info__divider"> | </span>
                <a href="#" className="user-info__create-date">
                  Hace 1 hora
                </a>
              </div>

              <h4 className="post__content">Hola, buenos dias.</h4>
            </div>
          </div>

          <div className="post__buttons">
            <a href="#" className="post__button">
              <i className="fa-solid fa-trash-can"></i>
            </a>
          </div>
        </div>
        <div className="posts__post_profile">
          <div className="post__container">
            <div className="post__image-user">
              <a href="#" className="post__image-link">
                <img
                  src={imgProfile}
                  className="post__user-image"
                  alt="Foto de perfil"
                />
              </a>
            </div>

            <div className="post__body">
              <div className="post__user-info">
                <a href="#" className="user-info__name">
                  Victor Robles
                </a>
                <span className="user-info__divider"> | </span>
                <a href="#" className="user-info__create-date">
                  Hace 1 hora
                </a>
              </div>

              <h4 className="post__content">Hola, buenos dias.</h4>
            </div>
          </div>

          <div className="post__buttons">
            <a href="#" className="post__button">
              <i className="fa-solid fa-trash-can"></i>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
