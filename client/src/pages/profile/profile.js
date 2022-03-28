import "./profile.css";
import Feed from "../../components/feed/Feed";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { useSelector } from "react-redux";

export default function Profile() {
  const auth = useSelector((state) => state.auth);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [ user  , setUser] = useState({});
  //const name = useParams().name;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`http://localhost:5000:/user/${auth._id}`);
      setUser(res.data);
    };
    fetchUser();
  }, [auth._id]);

  return (
    <div>
      <div className="profile">
        <img
          className="profileUserImg"
          src={user.avatar ? PF + user.avatar : PF + "person/noAvatar.png"}
          alt=""
        />
      </div>
      <div className="profileInfo">
        <h4 className="profileInfoName">{user._id}</h4>
        <span className="profileInfoDesc">{user.title}</span>
      </div>
      <div className="profileRightBottom">
        <Feed name={user.name} />
      </div>
    </div>
  );
}
