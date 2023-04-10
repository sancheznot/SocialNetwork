import React from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { Global } from "../../../helpers/Global";
import { useAuth } from "../../../hooks/useAuth";

export const Header = () => {
  const {Url} = Global
  const { auth } = useAuth();
  const {  image, _id } = auth;
console.log(_id)
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/social">
            <i className="lni lni-home"></i>
          </NavLink>
        </li>
      </ul>
      <ul>
        <li>
          <NavLink to={`/social/profile/+${_id}`} >
          <div className="avatar-To-Profile">
              <img
                src={`${Url}/user/avatar/${image}`}
                className="imgToProfile"
                alt="avatar"
              />
            </div>
          </NavLink>
        </li>
      </ul>
      <ul>
        <li>
          <NavLink to="/social/people">
            <i className="lni lni-circle-plus"></i>
          </NavLink>
        </li>
      </ul>
      <ul>
        <li>
          <NavLink to="/social/config">
            <i className="lni lni-user"></i>
          </NavLink>
        </li>
      </ul>
      <ul>
        <li>
          <div className="dropdown">
            <button className="dropbtn">
              <i className="lni lni-cog"></i>
            </button>
            <div className="dropdown-content">
              <NavLink to="/social/logout">Log out</NavLink>
              <a href="/social/logout">l</a>
              <a href="#">Link 2</a>
              <a href="#">Link 3</a>
            </div>
          </div>
        </li>
      </ul>
    </nav>
  );
};
