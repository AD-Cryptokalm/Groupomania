import Button from "./Button";
import Card from "./Card";
import classes from "./ErrorModal.module.css";

const ErrorModal = (props) => {
  return (
    <div className={classes.backdrop}>
      <Card className={classes.modal}>
        <h2>{props.title}</h2>
        <p>{props.message}</p>
        <Button>Ok</Button>
      </Card>
    </div>
  );
};

export default ErrorModal;
