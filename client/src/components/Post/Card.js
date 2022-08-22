import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { dateParser, isEmpty } from "../Utils";

const Card = ({ post }) => {
  const [isLoading, setIsLoading] = useState(true);
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);

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
                      })
                      .join("")}
                </h3>
              </div>
              <div className="date-post">{dateParser(post.createdAt)}</div>
            </div>
            <div className="card-post">
              {post.message}
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
                <div className="card-like"></div>
            </div>
          </div>
        </>
      )}
    </li>
  );
};

export default Card;
