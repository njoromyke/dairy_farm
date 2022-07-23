import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import Loader from "./components/loader/Loader";
import { useUserAuth } from "./context/UserAutContext";
import AuthNav from "./navigator/AuthNav";
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
