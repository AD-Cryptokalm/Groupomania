
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadPicture } from "../../actions/user.action";

export default function UploadImg() {
  const [file, setFile] = useState();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer)

  const handlePicture = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", userData.pseudo);
    data.append("userId", userData._id);
    data.append("file", file);

    dispatch(uploadPicture(data, userData._id))
  };

  return (
    <form action="" onSubmit={handlePicture} className="upload-picture">
      <label htmlFor="file">Modifier sa photo de profil</label>
      <br />
      <input
        type="file"
        id="file"
        name="file"
        accept=".jpeg, .jpg, .png, .gif"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <br/>
      <input type="submit" value="Envoyer"/>
    </form>
  );
}
