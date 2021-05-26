import React, { Component } from "react";
import { connect } from "react-redux";
const mapStateToProps = state => {
  return { doctors: state.doctors };
};

//const PublishLists = ({ doctors }) => (
//	<>
//  <ul>
//      <span onClick={this.handlePublish} className="publish_button">publish map</span>
//  </ul>
//);

class PublishList extends Component {
	constructor(props) {
		super(props);
		this.handlePublish = this.handlePublish.bind(this);
	}
	handlePublish () {
		var requestOptions = {
	    	method: 'POST',
	    	// headers: { 'Content-Type': 'application/json' ,'Access-Control-Allow-Origin': 'http://localhost:3000', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS', 'Access-Control-Allow-Headers': '*'},
	    	headers: { 'Content-Type': 'application/json' },
	    	body: JSON.stringify({ name: 'supermarket',commands: this.props.doctors })
	    	// body: JSON.stringify({ name: 'supermarket' })
		};
			fetch("http://localhost/i.php",requestOptions)
	      .then(res => res.json())
	      .then(
	        (result) => {

	        },
	        // Note: it's important to handle errors here
	        // instead of a catch() block so that we don't swallow
	        // exceptions from actual bugs in components.
	        (error) => {

	        }
	      )
	}
	render () {
		return (<span onClick={this.handlePublish} className="publish_button">publish map</span>);
	}
}
const Publishing = connect(mapStateToProps)(PublishList);

export default Publishing;