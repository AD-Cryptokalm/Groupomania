import NavBarIcon from "../components/NavBarIcon";
import NewPost from "../components/Post/NewPost";
import Thread from '../components/Thread'
import '../styles/home.css'

export default function Home() {



  return (
    <div className="home-container">
      <NavBarIcon />
      <div className="all-posts">
        <div className="newPost">
          <NewPost/>
        </div>
        <Thread />
      </div>
    </div>
  );
}
