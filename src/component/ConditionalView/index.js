const conditionalView = (props) => {
  const {condition, children} = props;

  if (condition) {
    return children;
  }
  else {
    return null;
  }
}


export default conditionalView;
