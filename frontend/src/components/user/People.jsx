import React, { useEffect } from "react";
import { useState } from "react";
import { Global } from "../../helpers/Global";
import { UserList } from "./UserList";

const { Url } = Global;
export const People = () => {
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


  return (
    <>
      <header className="content__header">
        <h1 className="content__title">People</h1>
      </header>
      <UserList
        users={users}
        setUsers={setUsers}
        getUser={getUser}
        following={following}
        setFollowing={setFollowing}
        page={page}
        setPage={setPage}
        more={more}
        setMore={setMore}
        loading={loading}
        setLoading={setLoading}
      />
      
    </>
  );
};
