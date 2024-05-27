import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "./firebase";

const AuthDetails = () => {
  const [authUser, setAuthUser] = useState(null);
  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) setAuthUser(user);
      else setAuthUser(null);
    });
    return () => {
      listen();
    };
  }, []);

  const logoutHandler = () => {
    signOut(auth)
      .then(() => {
        console.log("Signed Out Successfully");
      })
      .catch((e) => console.log(e));
  };

  return (
    <div>
      {authUser ? (
        <p>
          {`Signed In as ${authUser.email}`}
          <button onClick={logoutHandler}>Log Out</button>
        </p>
      ) : (
        <p>Signed Out</p>
      )}
    </div>
  );
};

export default AuthDetails;
