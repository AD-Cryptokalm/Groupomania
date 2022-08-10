import classes from "./Banner.module.css";
import Button from "../UI/Button";

const Banner = () => {
  return (
    <>
      <nav className={classes.banner}>
        <img
          src="./icon-left-font-monochrome-black.png"
          alt="Logo Groupomania"
        ></img>

        <div className={classes.buttonNav}>
          <Button type="submit" onClick={() => {}}>
            Signup
          </Button>
          <Button type="submit" onClick={() => {}}>
            Login
          </Button>
        </div>
      </nav>
    </>
  );
};

export default Banner;
