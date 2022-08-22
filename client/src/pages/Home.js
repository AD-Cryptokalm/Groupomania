import NavBarIcon from "../components/NavBarIcon";
import Thread from '../components/Thread'
import '../styles/home.css'

export default function Home() {
  return (
    <div className="home-container">
      <NavBarIcon />
      <div className="all-posts">
        <div className="newPost"></div>
        <Thread />
      </div>
    </div>
  );
}
