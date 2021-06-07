import { useState } from "react";

import AuthChecker from "./AuthChecker.jsx";

export default function Provider(props) {
  const [status, setStatus] = useState(true);
  const [isEditable, setisEditable] = useState(false);

  return (
    <AuthChecker.Provider value={{ status, setStatus, isEditable, setisEditable }}>
      {props.children}
    </AuthChecker.Provider>
  );
}
