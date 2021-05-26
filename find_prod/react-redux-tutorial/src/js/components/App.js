import React from "react";
import List from "./List";
import Form from "./Form";
import Post from "./Posts";
// import './App.css';
const App = () => (
  <>
    <div>
      <h2>Doctors</h2>
      <List />
    </div>
    <div>
      <h2>Add a new Doctor</h2>
      <Form />
    </div>
    <div>
      <img />
    </div>
  </>
);
// <h2>API posts</h2>
//       <Post />
export default App;