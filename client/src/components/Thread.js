import { useEffect, useState } from "react";
import { getPosts } from "../actions/post.action";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty} from "./Utils"
import Card from "./Post/Card";

import '../styles/cardPost.css'


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
                return <Card post={post} key={post._id}/>
            })
            }
        </ul>
    </div>
  )
  
}
