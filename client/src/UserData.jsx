import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const UserData = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);
  const [formData, setForm] = useState({
    Username: "",
    Email: "",
    Password: "",
  });

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
      setUsers(users.filter((user) => user._id !== _id));
    } catch (error) {
      setError(error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>There was an Error</p>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/users", formData);
    } catch (error) {
      setError(error);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setForm({ ...formData, [e.target.name]: value });
  };

  return (
    <div className="home">
      <h1>User List</h1>
      <button
        className="add"
        onClick={() => {
          setShow(!show);
        }}
      >
        Add User
      </button>
      {users.map((user) => (
        <ul key={user._id}>
          <li>
            <h3>Name</h3> {user.Username} <h3>Email</h3> {user.Email}
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
      {show && (
        <div className="myform">
          <form className="form" onSubmit={handleSubmit}>
            <h3>Add User</h3>
            <div>
              <input
                type="text"
                placeholder="Your Email Address"
                name="Username"
                value={formData.Username}
                onChange={handleChange}
              />
              <input
                type="email"
                placeholder="Your Email Address"
                name="Email"
                value={formData.Email}
                onChange={handleChange}
              />
              <input
                type="Password"
                value={formData.Password}
                placeholder="Your Password"
                name="Password"
                onChange={handleChange}
              />
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default UserData;
