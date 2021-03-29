// import Auth from '../pages/Auth.jsx'

// import {useState} from 'react'

export default function AuthIcons({toggle, authChecker}) {
  const styles = {
    authIcons: { display: "flex", flexDirection: "row", flexWrap: "nowrap" },
    h6: {margin:'1rem', cursor: "pointer"}
  };

  function btnClicker (e) {
    toggle();
    authChecker(e)
  }

  return (
    <div style={styles.authIcons}>
    <h6 id="sign-in" onClick={btnClicker} style={styles.h6}>Sign In</h6>
    <h6 id="sign-up" onClick={btnClicker} style={styles.h6}>Sign Up</h6>
  </div>

  );
}
