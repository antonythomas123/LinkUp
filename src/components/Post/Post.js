import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Post.css";
import { useEffect, useState } from "react";

function Post(props) {
  const { post } = props;
  const [user] = useAuthState(auth);

  const [likes, setLikes] = useState(null);

  const likesRef = collection(db, "likes");
  const likesDoc = query(likesRef, where("postId", "==", post.id));

  const getLikes = async () => {
    const data = await getDocs(likesDoc);
    setLikes(
      data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id }))
    );
  };

  const addLike = async () => {
    try {
      const newDoc = await addDoc(likesRef, {
        userId: user?.uid,
        postId: post.id,
      });
      //Optimistic rendenring
      if (user) {
        setLikes((prev) =>
          prev
            ? [...prev, { userId: user?.uid, likeId: newDoc }]
            : [{ userId: user?.uid, likeId: newDoc }]
        );
      }
    } catch (err) {
      console.log(err);
    }
  };
  //To remove duplicate likes
  const removeLike = async () => {
    try {
      //To get the specific like we want to delete
      const likeToDeleteQuery = query(
        likesRef,
        where("postId", "==", post.id),
        where("userId", "==", user?.uid)
      );
      const likeToDeleteData = await getDocs(likeToDeleteQuery);

      const likeId = likeToDeleteData.docs[0].id;
      const likeToDelete = doc(db, "likes", likeId);
      await deleteDoc(likeToDelete);
      //Optimistic rendering
      if (user) {
        setLikes((prev) =>
          prev ? prev.filter((like) => like.likeId.id !== likeId) : []
        );
      }
    } catch (err) {
      console.log(err);
    }
  };
  
  //checking whether the current user has liked the post or not
  const hasUserLiked = likes?.find((like) => like.userId === user?.uid);

  useEffect(() => {
    getLikes();
  }, []);

  return (
    <div>
      <div>
        <span>{post.title}</span>
      </div>
      <div>
        <span>{post.description}</span>
      </div>
      <div>
        <span>@{post.username}</span>
        <button
          className="like_button"
          onClick={hasUserLiked ? removeLike : addLike}
        >
          {hasUserLiked ? <>&#128078;</> : <>&#128077;</>}
        </button>
        {likes && <span>Likes: {likes?.length}</span>}
      </div>
    </div>
  );
}

export default Post;
