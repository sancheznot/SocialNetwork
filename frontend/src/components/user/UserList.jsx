import React from "react";
import useAuth from "../../hooks/useAuth";
import { Global } from "../../helpers/Global";
import { Link } from "react-router-dom";
const { Url } = Global;

export const UserList = ({
  users,
  getUser,
  setUsers,
  following,
  setFollowing,
  loading,
  more,
  page,
  setPage,
}) => {
  const { auth } = useAuth();
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
  };
  const nextPage = async () => {
    let next = page + 1;
    setPage(next);
    getUser(next);
    // console.log(data);
  };
  return (
    <>
      <div className="content__posts">
        {users.map((user) => {
          const { _id, image, name, lastname, create_at, bio } = user;
          return (
            <article className="posts__post" key={_id}>
              <div className="post__container">
                <div className="post__image-user">
                  <Link to={`/social/profile/${_id}`} className="post__image-link">
                    <img
                      src={`${Url}/user/avatar/${image}`}
                      className="post__user-image"
                      alt="Foto de perfil"
                    />
                  </Link>
                </div>

                <div className="post__body">
                  <div className="post__user-info">
                    <Link to={`/social/profile/${_id}`} className="user-info__name">
                      {name}
                      {lastname}
                    </Link>
                    <span className="user-info__divider"> | </span>
                    <Link to={`/social/profile/${_id}`} className="user-info__create-date">
                      {create_at}
                    </Link>
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
