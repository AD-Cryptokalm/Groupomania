import { useDispatch } from "react-redux";
import { deletePost } from "../../actions/post.action";

export default function DeleteCard(props) {
  const dispatch = useDispatch();
  const deleteQuote = () => dispatch(deletePost(props.id));

  return (
    <div
      onClick={() => {
        if (window.confirm("Voulez-vous supprimer ce post ?")) {
          deleteQuote();
        }
      }}
    >
      <i className="fa-regular fa-trash-can"></i>
    </div>
  );
}
