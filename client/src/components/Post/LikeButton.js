import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getPosts } from "../../actions/post.action";
import { likePost } from "../../actions/post.action";
import { unlikePost } from "../../actions/post.action";
import { UidContext } from "../AppContext";

export default function LikeButton({ post }) {
    const [loadPost, setLoadPost] = useState(true);
    const [count, setCount] = useState(5)
  const [liked, setLiked] = useState(false);
  const uid = useContext(UidContext);
  const dispatch = useDispatch();
  

  const like = () => {
    dispatch(likePost(post._id, uid));
    setLoadPost(true)
    setLiked(true);
  };

  const unlike = () => {
    dispatch(unlikePost(post._id, uid));
    setLoadPost(true)
    setLiked(false);
  };

  useEffect(() => {
    if (loadPost) {
        dispatch(getPosts(count));
        setCount(count + 5)
        setLoadPost(false);
      }
    if (post.userlikers.includes(uid)) setLiked(true);
    else setLiked(false);
  }, [uid, post.userlikers, liked, loadPost, dispatch, count]);

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
