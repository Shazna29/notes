import React, { Component } from "react";
import { useLocation  } from "react-router-dom";

const withLocation = Component => props => {
  const location = useLocation();

  return <Component {...props} location={location} />;
};

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};
class AuthVerify extends Component {
  constructor(props) {
    super(props);
    props.navigate.listen(() => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        const decodedJwt = parseJwt(user.accessToken);
        if (decodedJwt.exp * 1000 < Date.now()) {
          props.logOut();
        }
      }
    });
  }
  render() {
    return <div></div>;
  }
}
export default withLocation(AuthVerify);