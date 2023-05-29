import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import { getDocs, collection } from "firebase/firestore";
import { db, auth } from "../../config/firebase";
import Post from "../../components/Post/Post";
import "./Home.css";
import { useAuthState } from "react-firebase-hooks/auth";
import Login from "../Login/Login";

function Home() {
  const [postList, setPostList] = useState(null);
  const postRef = collection(db, "posts");

  const [user] = useAuthState(auth);

  const getPost = async () => {
    const data = await getDocs(postRef);
    setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <div>
      {user ? (
        <>
          <Navbar />
          <div className="posts">
            {postList?.map((post, key) => (
              <Post key={key} post={post} />
            ))}
          </div>
        </>
      ) : (
        <>
          <Navbar />
          <Login />
        </>
      )}
    </div>
  );
}

export default Home;
