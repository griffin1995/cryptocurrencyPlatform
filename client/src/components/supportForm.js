import { useState } from "react";

const supportForm = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [userID, setUserID] = useState("");
  const [status] = useState("");
  const [supportID] = useState("");
  const [body, setBody] = useState("");
  const [priority] = useState("");
  const [department, setDepartment] = useState("");

  return <form className="supportForm" onSubmit={handleSubmit}></form>;
};
