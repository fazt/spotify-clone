import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Cookie from "universal-cookie";

const cookie = new Cookie();

const Callback = () => {
  const history = useHistory();
  let query: any = new URLSearchParams(window.location.hash.replace('#', ''))
  cookie.set("token", query.get('access_token'));

  useEffect(() => {
    history.push('/')
  }, [history])

  return <div></div>;
};

export default Callback;
