import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProfile } from "../../helpers/GetProfile";
import { Global } from "../../helpers/Global";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

import { Publications } from "../publications/Publications";


const { Url } = Global;
export const Profile = () => {
  const [user, setUser] = useState({});
  const [counters, setCounters] = useState({});
  const [iFollow, setIFollow] = useState(false);
  const params = useParams();
  const userId = params.userId;
  const token = localStorage.getItem("token");
  const [post, setPost] = useState([]);
  const { auth } = useAuth();
  const { _id } = auth;

  useEffect(() => {
    DataUser();
    getCounters();
    getPublic();
  }, []);
  useEffect(() => {
    DataUser();
    getCounters();
    getPublic();
  }, [params]);

  const DataUser = async () => {
    let dataUser = await getProfile(userId, setUser);
    if (dataUser.following && dataUser.following._id) setIFollow(true);
  };


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

 const getPublic = async (nextpage = 1) => {
    const request = await fetch(`${Url}/public/user/${userId}/${nextpage}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });
    const data = await request.json();
    if (data.status === "Success") {
      if (data.publication.length <= 0) {
        setPost([]);
      } else {
        setPost(data.publication);
      }
    }
  };
  // const deletePost = async (id) => {
  //   const request = await fetch(`${Url}/public/delete/${id}`, {
  //     method: "DELETE",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: localStorage.getItem("token"),
  //     },
  //   });
  //   const data = await request.json();
  //   if (data.status === "Success") {
  //     getPublic();
  //   }
  // };
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
          <Publications
          post={post}
          setPost={setPost}
          getPublic={getPublic}
          />
      </div>
    </>
  );
};
