import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UserLog = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/users/${id}`);
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
      }
    };
    fetchUser();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>There was an error fetching user data.</p>;

  return (
    <div className="home">
      {user ? (
        <div>
          <h1>{user.Username}</h1>
          <p>Email: {user.Email}</p>
          <p>Password: {user.Password}</p>
        </div>
      ) : (
        <p>User Not Found</p>
      )}
    </div>
  );
};

export default UserLog;
