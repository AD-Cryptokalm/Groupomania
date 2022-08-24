import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getPosts } from "../../actions/post.action";
import { likePost } from "../../actions/post.action";
import { unlikePost } from "../../actions/post.action";
import { UidContext } from "../AppContext";

export default function LikeButton({ post }) {
  const [liked, setLiked] = useState(false);
  const uid = useContext(UidContext);
  const dispatch = useDispatch();

  const like = async () => {
    await dispatch(likePost(post._id, uid))
      .then(() => dispatch(getPosts()))
      .catch((err) => console.log(err));
    setLiked(true);
  };

  const unlike = async () => {
    await dispatch(unlikePost(post._id, uid))
      .then(() => dispatch(getPosts()))
      .catch((err) => console.log(err));
    setLiked(false);
  };

  useEffect(() => {
    if (post.userlikers.includes(uid)) setLiked(true);
    else setLiked(false);
  }, [uid, post.userlikers, liked, dispatch]);

  return (
    <div className="card-like">
      {uid && liked === false && (
        <i className="fa-regular fa-thumbs-up" onClick={like}></i>
      )}
      {uid && liked && (
        <i className="fa-solid fa-thumbs-up" onClick={unlike}></i>
      )}
      <span>{post.userlikers.length}</span>
    </div>
  );
}
