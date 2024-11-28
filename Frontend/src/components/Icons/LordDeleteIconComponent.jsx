// LordIconComponent.js
import React, { useEffect } from "react";

const LordDeleteIconComponent = () => {
  useEffect(() => {
    // Initialize lordicon when the component mounts
    if (window.Lordicon) {
      window.Lordicon.init();
    }
  }, []);

  return (
    <lord-icon
      src="https://cdn.lordicon.com/crxdwbpm.json"
      trigger="loop"
      colors="primary:#110a5c,secondary:#7166ee"
      style={{ width: "150px", height: "150px" }}
    ></lord-icon>

    
  );
};

export default LordDeleteIconComponent;
