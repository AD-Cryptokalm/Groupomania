import { useContext } from "react";
import { UidContext } from "../components/AppContext";
import NavBarIcon from "../components/NavBarIcon";
import NewPost from "../components/Post/NewPost";
import Thread from '../components/Thread'
import '../styles/home.css'
import Log from "../components/Log/Auth";

export default function Home() {
  const uid = useContext(UidContext);


  return (
    <>
    {uid ? <div className="home-container">
      <NavBarIcon />
      <div className="all-posts">
        <div className="newPost">
          <NewPost/>
        </div>
        <Thread />
      </div>
    </div> : <Log signin={true} signup={false} />}
    </>
  );
}
