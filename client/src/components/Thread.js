import { useEffect, useState } from "react";
import { getPosts } from "../actions/post.action";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty} from "./Utils"

export default function Thread() {
  const [loadPost, setLoadPost] = useState(true);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postReducer)

  useEffect(() => {
    if (loadPost) {
      dispatch(getPosts());
      setLoadPost(false);
    }
  }, [loadPost, dispatch]);

  return (
    <div className="thread-container">
        <ul>
            {!isEmpty(posts[0]) &&
            posts.map((post) => {
                return <li>{post._id}</li>
            })
            }
        </ul>
    </div>
  )
  
}
