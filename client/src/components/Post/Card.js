import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, updatePost } from "../../actions/post.action";
import { dateParser, isEmpty } from "../Utils";
import LikeButton from "./LikeButton";
import DeletePost from "./DeleteCard";

const Card = ({ post }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdated, setTextUpdated] = useState(null);
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const updateItem = async () => {
    if (textUpdated) {
      await dispatch(updatePost(post._id, textUpdated))
        .then(() => dispatch(getPosts()))
        .catch((err) => console.log(err));
    }
    setIsUpdated(false);
  };

  useEffect(() => {
    !isEmpty(usersData[0]) && setIsLoading(false);
  }, [usersData]);

  return (
    <li className="card-container" key={post._id}>
      {isLoading ? (
        <i className="fas fa-spinner fa-spin"></i>
      ) : (
        <>
          <div className="card-left">
            <img
              src={
                !isEmpty(usersData[0]) &&
                usersData
                  .map((user) => {
                    if (user._id === post.userId) return user.picture;
                    else return null;
                  })
                  .join("")
              }
              alt="postPict"
            />
          </div>
          <div className="card-right">
            <div className="card-header">
              <div className="pseudo">
                <h3>
                  {!isEmpty(usersData[0]) &&
                    usersData
                      .map((user) => {
                        if (user._id === post.userId) return user.pseudo;
                        else return null;
                      })
                      .join("")}
                </h3>
              </div>
              <div className="date-post">{dateParser(post.createdAt)}</div>
            </div>
            <div className="card-post">
              <div className="post-container">
                <div className="post-text">
                  {isUpdated === false && <p>{post.message}</p>}
                  {isUpdated && (
                    <div className="update-post">
                      <textarea
                        defaultValue={post.message}
                        onChange={(e) => setTextUpdated(e.target.value)}
                      />
                      <div className="button-container">
                        <button className="button" onClick={updateItem}>
                          Valider
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <br />
              {post.picture && (
                <img
                  src={post.picture}
                  alt="card-pic"
                  className="card-picture-post"
                />
              )}
              {post.video && (
                <iframe
                  width="500"
                  height="300"
                  src={post.video}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={post._id}
                ></iframe>
              )}
            </div>
            <div className="card-footer">
              <LikeButton post={post} />
              {userData._id === post.userId && (
                <>
                <div className="button-card">
                  <div onClick={() => setIsUpdated(!isUpdated)}>
                    <i className="fa-solid fa-pen-to-square"></i>
                  </div>
                  <DeletePost id={post._id} />
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </li>
  );
};

export default Card;
