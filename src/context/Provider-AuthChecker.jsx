import {useState} from "react";

import AuthChecker from "./AuthChecker.jsx";

export default function Provider(props) {
  const [status, setStatus] = useState(true);

  return (
    <AuthChecker.Provider value={{ status, setStatus }}>
      {props.children}
    </AuthChecker.Provider>
  );
}
