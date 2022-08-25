import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { addPost, getPosts } from "../../actions/post.action";
import { isEmpty} from "../Utils";

export default function NewPost() {
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [postPicture, setPostPicture] = useState(null);
  const [file, setFile] = useState();
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const handlePost = async () => {
    if (message || postPicture) {
      const data = new FormData();
      data.append("userId", userData._id);
      data.append("message", message);
      if (file) data.append("file", file);

      await dispatch(addPost(data))
      dispatch(getPosts())
      cancelPost();
    } else {
      alert("Veuillez saisir un message");
    }
  };

  const handlePicture = (e) => {
    setPostPicture(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };

  const cancelPost = () => {
    setMessage("");
    setPostPicture("");
    setFile("");
  };

  useEffect(() => {
    if (!isEmpty(userData)) setIsLoading(false);
  }, [userData]);

  return (
    <div className="card-container">
      {isLoading ? (
        <i className="fas fa-spinner fa-pulse"></i>
      ) : (
        <>
          <NavLink to="/profil">
            <div className="card-left">
              <img src={userData.picture} alt="user-img" />
            </div>
          </NavLink>
          <div className="card-right">
            <div className="newPost-container">
              <textarea
                name="message"
                id="message"
                placeholder="Quoi de neuf ?"
                onChange={(e) => setMessage(e.target.value)}
                value={message}
              />
            </div>
            {postPicture ? (
              <li className="card-container-newPost">
                <div className="content">
                  <img src={postPicture} alt="" />
                </div>
              </li>
            ) : null}
            <div className="footer-form">
              <div className="card-footer new">
                <>
                  <i className="fa-regular fa-image"></i>
                  <input
                    type="file"
                    id="file-upload"
                    name="file"
                    accept=".jpg, .jpeg, .png"
                    onChange={(e) => handlePicture(e)}
                  />
                </>

                <div className="btn-send">
                  {message || postPicture ? (
                    <button className="cancel" onClick={cancelPost}>
                      Annuler message
                    </button>
                  ) : null}
                  <button className="send" onClick={handlePost}>
                    Envoyer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
