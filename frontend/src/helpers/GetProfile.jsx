import { Global } from "./Global";
const { Url } = Global;

export const getProfile = async (userId, setState) => {
  const token = localStorage.getItem("token");
  const request = await fetch(`${Url}/user/profile/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
  const data = await request.json();
  if (data.status === "Success") {
    setState(data.user);
  }
};
