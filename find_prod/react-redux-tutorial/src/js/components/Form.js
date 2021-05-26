import React, { Component } from "react";
import { connect } from "react-redux";
import { addDoctor } from "../actions/index";

function mapDispatchToProps(dispatch) {
  return {
    addDoctor: doctor => dispatch(addDoctor(doctor))
  };
}

class ConnectedForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      specialty: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { title } = this.state.title;
    const { specialty } = this.state.specialty;
    this.props.addDoctor(this.state.title + "#"+this.state.specialty);
    this.setState({ title: "", specialty: "" });
    window.location.href = window.location.href.replace('login','docpage');
  }
  render() {
    const { title } = this.state.title;
    const { specialty } = this.state.specialty;
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="title"></label>
          <input
            type="text"
            id="title"
            placeholder="name"
            value={title}
            onChange={this.handleChange}
          ></input>
              
          <div><input
            type="text"
            id="specialty"
            value={specialty}
            placeholder="Specialty"
            onChange={this.handleChange}
          ></input></div>
        </div>
        <button type="submit">SAVE</button>
      </form>
    );
  }
}

const Form = connect(
  null,
  mapDispatchToProps
)(ConnectedForm);

export default Form;