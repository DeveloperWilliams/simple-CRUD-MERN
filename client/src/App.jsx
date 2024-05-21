import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const displayUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/users");
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    displayUsers();
  }, []);

  const handleDelete = async (_id) => {
    try {
      await axios.delete(`http://localhost:8080/users/${_id}`);
      setUsers(users.filter((user)=> user._id !== _id))
    } catch (error) {
      setError(error)
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>There was an Error</p>;

  return (
    <div className="home">
      <h1>User List</h1>
      {users.map((user) => (
        <ul key={user._id}>
          <li>
            {user.Username} - {user.Email}
            <div>
              <button className="edit">Edit</button>
              <button
                className="del"
                onClick={() => {
                  handleDelete(user._id);
                }}
              >
                Delete
              </button>
            </div>
          </li>
        </ul>
      ))}
    </div>
  );
};

export default App;
