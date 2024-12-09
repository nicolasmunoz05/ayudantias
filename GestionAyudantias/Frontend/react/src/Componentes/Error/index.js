import React from "react";

class ErrorAlerta extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: props.message,
    };
  }

  componentDidMount() {
    window.alert(this.state.message);
  }

  render() {
    return null; // No se renderiza ningún elemento
  }
}

export default ErrorAlerta;
