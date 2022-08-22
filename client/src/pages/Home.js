import NavBarIcon from "../components/NavBarIcon";
import Thread from '../components/Thread'

export default function Home() {
  return (
    <div>
      <NavBarIcon />
      <div>
        <div className="newPost"></div>
        <Thread />
      </div>
    </div>
  );
}
