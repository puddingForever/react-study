const Button = (props) => {
  const classes = props.text ? 'text-button' : 'button';

  return (
    <button
      className={classes}
      onClick={props.onClick}
      type={props.type || 'button'}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;