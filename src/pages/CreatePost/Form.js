import "./Form.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {addDoc, collection} from 'firebase/firestore'
import { db, auth } from "../../config/firebase";
import {useAuthState} from 'react-firebase-hooks/auth';
import {useNavigate} from 'react-router-dom';

function Form() {

  const [user] = useAuthState(auth);

  const navigate = useNavigate();

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

  const submitCreatePost = async(data) => {
    console.log(data);
    await addDoc(postRef, {
      title: data.title,
      description: data.description,
      userId: user?.uid,
      username: user?.displayName,
      photoURL: user?.photoURL,
    })
    navigate('/');
  }
  return (
    <form className="createpost_form" onSubmit={handleSubmit(submitCreatePost)}>
      <input type="text" placeholder="Title..." className="form_input" {...register("title")}/>
      <span style={{color: "red"}}>{errors.title?.message}</span>
      <textarea
        type="text"
        placeholder="Description"
        className="form_textarea"
        {...register("description")}
      />
      <span style={{color: "red"}}>{errors.description?.message}</span>
      <input type="submit" className="form_submit" />
    </form>
  );
}

export default Form;
