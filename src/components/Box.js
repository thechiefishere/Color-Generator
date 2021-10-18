import { useState, useEffect } from "react";

const Box = ({ val, index }) => {
  const [showClipboard, setShowClipboard] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowClipboard(false);
    }, 3000);
  }, [showClipboard]);

  return (
    <div
      key={index}
      style={{ backgroundColor: val }}
      onClick={() => {
        setShowClipboard(true);
        navigator.clipboard.writeText(val);
      }}
    >
      {val}
      {showClipboard && <p>Copied To Clipboard</p>}
    </div>
  );
};

export default Box;
