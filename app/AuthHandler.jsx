import React, { useEffect, useState } from "react";
import AuthNav from "../navigation/AuthNav";
import { getAuth } from "firebase/auth";
import Loader from "./loader/Loader";
import { useUserAuth } from "../context/UserAuthContext";
import FeedNav from "./navigator/FeedNav";

const AuthHandler = () => {
  const [loading, setLoading] = useState(true);

  const { user } = useUserAuth();

  useEffect(() => {
    getAuth().onAuthStateChanged((user) => {
      if (user) {
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
  }, []);

  return loading ? <Loader /> : user ? <FeedNav /> : <AuthNav />;
};

export default AuthHandler;
