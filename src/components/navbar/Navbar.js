import React from "react";
import "./Navbar.css";
import { ReactComponent as Avatar } from "../../assets/avatar.svg";
import { Link } from "react-router-dom";
import { auth } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

function Navbar() {
  const [user] = useAuthState(auth);

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <div className="navbar_main">
      <div className="app_name">
        <span>LinkUp</span>
      </div>
      <div className="options">
        <span>
          <Link to={"/"} className="links">
            Home
          </Link>
        </span>
        {!user ? (
          <span>
            <Link to={"/login"} className="links">
              Login
            </Link>
          </span>
        ) : (
          <span>
            <Link to={"/createpost"} className="links">
              Create Post
            </Link>
          </span>
        )}

        <span>{user?.displayName}</span>
        <span>
          {user?.photoURL ? (
            <img src={user?.photoURL} className="avatar" alt="" />
          ) : (
            <Avatar className="avatar" />
          )}
        </span>
        {user ? (
          <span>
            <button onClick={logout}>Logout</button>
          </span>
        ) : (
          " "
        )}
      </div>
    </div>
  );
}

export default Navbar;
