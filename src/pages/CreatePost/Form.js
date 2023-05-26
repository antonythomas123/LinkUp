import "./Form.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection } from "firebase/firestore";
import { db, auth, storage } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

function Form() {
  const [user] = useAuthState(auth);

  const navigate = useNavigate();

  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState([]);

  const schema = yup.object().shape({
    title: yup.string().required("Title is necessary"),
    description: yup.string().required("Please describe your post!"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const postRef = collection(db, "posts");

  const imageListRef = ref(storage, "images/");

  const submitCreatePost = async (data) => {
    //console.log(data);
    //if no files return null
    const postData = {
      title: data.title,
      description: data.description,
      userId: user?.uid,
      username: user?.displayName,
      photoURL: user?.photoURL,
    };
    if (imageUpload != null) {
      const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
      await uploadBytes(imageRef, imageUpload).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setImageList((prev) => [...prev, url]);
          postData.imageURL = url;
          addDoc(postRef, postData).then(() => {
            navigate("/");
          });
        });
        //alert("Image Uploaded");
      });
    } else {
      await addDoc(postRef, postData).then(() => {
        navigate("/");
      });
    }
  };

  useEffect(() => {
    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, url]);
        });
      });
    });
  }, []);
  return (
    <form className="createpost_form" onSubmit={handleSubmit(submitCreatePost)}>
      <input
        type="file"
        onChange={(event) => setImageUpload(event.target.files[0])}
        className="image_input"
      />
      <input
        type="text"
        placeholder="Title..."
        className="form_input"
        {...register("title")}
      />
      <span style={{ color: "red" }}>{errors.title?.message}</span>
      <textarea
        type="text"
        placeholder="Description"
        className="form_textarea"
        {...register("description")}
      />
      <span style={{ color: "red" }}>{errors.description?.message}</span>
      <input type="submit" className="form_submit" />
    </form>
  );
}

export default Form;
