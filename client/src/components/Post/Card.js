import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPosts,
  updatePost,
  uploadPicturePost,
} from "../../actions/post.action";
import { dateParser, isEmpty } from "../Utils";
import LikeButton from "./LikeButton";
import DeletePost from "./DeleteCard";
import "../../styles/cardPost.css";

const Card = ({ post }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdated, setTextUpdated] = useState(null);
  // const [postPicture, setPostPicture] = useState(null);
  const [file, setFile] = useState();
  const dispatch = useDispatch();

  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);

  const updateItem = async () => {
    if (textUpdated) {
      await dispatch(updatePost(post._id, textUpdated))
        .then(() => dispatch(getPosts()))
        .catch((err) => console.log(err));
    }
    setIsUpdated(false);
  };

  const handlePicturePost = (e) => {
    e.preventDefault();
    const data = new FormData();
    console.log(post._id);
    data.append("name", post.userId);
    data.append("_id", post._id);
    data.append("file", file);

    dispatch(uploadPicturePost(data, post._id));
  };

  useEffect(() => {
    !isEmpty(usersData[0]) && setIsLoading(false);
  }, [usersData]);

  return (
    <div className="card-container" key={post._id}>
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
              <div>
                <div className="post-text">
                  <>
                    {isUpdated === false && (
                      <div>
                        <div className="post-container">
                          <p>{post.message}</p>
                        </div>
                        {post.picture && (
                          <div>
                            <img
                              src={post.picture}
                              alt="card-pic"
                              className="card-picture-post"
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </>
                  {isUpdated && (
                    <div className="update-post">
                      <div className="post-container">
                        <textarea
                          id="message"
                          defaultValue={post.message}
                          onChange={(e) => setTextUpdated(e.target.value)}
                        />
                      </div>
                      <div className="btn-send">
                        <button className="button" onClick={updateItem}>
                          Valider
                        </button>
                      </div>

                      {post.picture && (
                        <div>
                          <img
                            src={post.picture}
                            alt="card-pic"
                            className="card-picture-post"
                          />
                          <form
                            action=""
                            id="form"
                            onSubmit={handlePicturePost}
                            className="upload-picture-post"
                          >
                            <label htmlFor="file" className="label-file">
                              Modifier l'image
                            </label>
                            <br />
                            <div className="card-footer new">
                              <>
                                <i className="fa-regular fa-image"></i>
                                <input
                                  type="file"
                                  id="file-upload"
                                  name="file"
                                  accept=".jpg, .jpeg, .png"
                                  onChange={(e) => setFile(e.target.files[0])}
                                />
                              </>
                            </div>

                            <br />
                            <input
                              type="submit"
                              value="Envoyer"
                              className="btn-send"
                            />
                          </form>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <br />
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
    </div>
  );
};

export default Card;
