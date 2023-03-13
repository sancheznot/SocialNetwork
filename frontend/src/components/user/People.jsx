import React, { useEffect } from "react";
import { useState } from "react";
import { Global } from "../../helpers/Global";
import useAuth from "../../hooks/useAuth";

const { Url } = Global;
export const People = () => {
  const { auth } = useAuth();
  useEffect(() => {
    getUser(1);
  }, []);

  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [more, setMore] = useState(true);
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(true);

  const getUser = async (nextPage = 1) => {
    setLoading(true);
    const request = await fetch(`${Url}/user/list/${nextPage}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });
    const data = await request.json();
    if (data.users && data.status === "Success") {
      let newUsers = data.users;
      if (users.length >= 1) {
        newUsers = [...users, ...data.users];
      }
      setUsers(newUsers);
      setFollowing(data.user_following);
      setLoading(false);
    }
    // check if there are more users
    const fullUsers = data.total - data.users.length;
    if (users.length >= fullUsers) {
      setMore(false);
    }
  };
  const nextPage = async () => {
    let next = page + 1;
    setPage(next);
    getUser(next);
    // console.log(data);
  };
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
      // update the following list adding the new user
      if (!following.includes(id)) {
        console.log("no esta en el array");
        if (following.length === 0) {
          setFollowing([id]);
          console.log("esto es el id");
        } else {
          setFollowing([...following, id]);
          console.log("esto es el id con el otro array");
        }
      }
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
      console.log(data);
      // update the following list removing the user
      const newFollowing = following.filter(
        (followingUserId) => id !== followingUserId
      );
      setFollowing(newFollowing);
      console.log(newFollowing);
    }
    console.log(users, following, data);
  };
  return (
    <>
      <header className="content__header">
        <h1 className="content__title">People</h1>
      </header>

      <div className="content__posts">
        {users.map((user) => {
          const { _id, image, name, lastname, create_at, bio } = user;
          return (
            <article className="posts__post" key={_id}>
              <div className="post__container">
                <div className="post__image-user">
                  <a href="#" className="post__image-link">
                    <img
                      src={`${Url}/user/avatar/${image}`}
                      className="post__user-image"
                      alt="Foto de perfil"
                    />
                  </a>
                </div>

                <div className="post__body">
                  <div className="post__user-info">
                    <a href="#" className="user-info__name">
                      {name}
                      {lastname}
                    </a>
                    <span className="user-info__divider"> | </span>
                    <a href="#" className="user-info__create-date">
                      {create_at}
                    </a>
                  </div>

                  <h4 className="post__content">{bio}</h4>
                </div>
              </div>
              {/* show buttons while the id is different to the current user*/}
              {_id != auth._id && (
                <div className="post__buttonsFollow">
                  {!following.includes(_id) && (
                    <button
                      className="post__buttonFollow"
                      onClick={() => followUser(_id)}
                    >
                      Follow
                    </button>
                  )}
                  {following.includes(_id) && (
                    <button
                      className="post__buttonFollow"
                      onClick={() => {
                        unfollowUser(_id);
                      }}
                    >
                      Unfollow
                    </button>
                  )}
                </div>
              )}
            </article>
          );
        })}
      </div>
      {loading ? "Loading..." : ""}
      {more && (
        <div className="content__container-btn">
          <button className="content__btn-more-post" onClick={nextPage}>
            Show more people
          </button>
        </div>
      )}
    </>
  );
};
