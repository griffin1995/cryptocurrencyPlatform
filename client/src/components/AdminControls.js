import React from "react";
import SignUpUser from "./SignUpUser"; // Make sure the path is correct based on your file structure

const AdminControls = () => {
  return (
    <div className="admin-controls">
      <h2>Admin Controls</h2>
      <SignUpUser />
    </div>
  );
};

export default AdminControls;
