import React from "react";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return { doctors: state.doctors };
};

const ConnectedList = ({ doctors }) => (
  <ul>
    {doctors.map(el => (
      <li key={el.id}>{el.title}</li>
    ))}
  </ul>
);

const List = connect(mapStateToProps)(ConnectedList);

export default List;