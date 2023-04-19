import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { Global } from "../../helpers/Global";
import { Publications } from "../publications/Publications";

export const Feed = () => {
  const Url = Global.Url;
  const [counters, setCounters] = useState({});
  const token = localStorage.getItem("token");
  const [post, setPost] = useState([]);
  const { auth } = useAuth();
  const { _id } = auth;
  const [message, setMessage] = useState("");

  useEffect(() => {
    getPublic();
  }, []);
  useEffect(() => {}, [post]);
  const getPublic = async (nextpage = 1) => {
    const request = await fetch(`${Url}/public/feed/${nextpage}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    const data = await request.json();
    if (data.status === "Success") {
      if (data.publication.length <= 0) {
        setPost([]);
        setMessage("The feed doesn't have publications yet.");
      } else {
        setPost(data.publication);
        setMessage("");
      }
    }
  };

  return (
    <>
      <header className="content__header">
        <h1 className="content__title">Timeline</h1>
        {/* <button className="content__button">Mostrar nuevas</button> */}
      </header>
      {post.length >= 1 ? (
        <div className="posts__post__feed">
          <div className="post__container__feed">
            <div className=".content__posts_feed">
              <div className="posts__post_feed">
                <Publications
                  post={post}
                  setPost={setPost}
                  getPublic={getPublic}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h2>{message}</h2>
      )}
    </>
  );
};
