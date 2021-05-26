import React, { Component } from "react";
import "./docpage.css";
import { connect } from "react-redux";
import { addDoctor } from "../actions/index";
import ProdListSelect from "./prodlist";
function mapDispatchToProps(dispatch) {
  return {
    addDoctor: doctor => dispatch(addDoctor(doctor))
  };
}

class docclient extends Component {
	constructor(props) {
		super(props);
		this.ctx = null;
		// this.props.products = [];
		var requestOptions = {
	    	method: 'POST',
	    	// headers: { 'Content-Type': 'application/json' ,'Access-Control-Allow-Origin': 'http://localhost:3000', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS', 'Access-Control-Allow-Headers': '*'},
	    	headers: { 'Content-Type': 'application/json' },
	    	body: JSON.stringify({ name: 'supermarket' })
	    	// body: JSON.stringify({ name: 'supermarket' })
		};
			fetch("http://localhost/store.php",requestOptions)
	      .then(res => res.json())
	      .then(

	        (result) => {
	        	var ind = 0;
	        	var now_paint = false;
	        	this.ctx = document.getElementById('canvas').getContext('2d');
	      		// this.ctx.strokeStyle = 'blue';
	      		this.ctx.lineWidth = 2;
	      		for(ind = 0; ind < result.length; ind++){
	      			if(result[ind].indexOf('linefrom') > -1){
	      				now_paint = true;
	      				var xy = result[ind].split('#')[1].split('&');
	      				this.ctx.moveTo(parseInt(xy[0]), parseInt(xy[1]));
	      			}
	      			if(result[ind].indexOf('lineto') > -1){
	      				now_paint = true;
	      				var xy = result[ind].split('#')[1].split('&');
	      				this.ctx.lineTo(parseInt(xy[0]), parseInt(xy[1]));

	      			}
	      			if(result[ind].indexOf('stop_draw') > -1){
	      				now_paint = false;
	      			}
	      			if(result[ind].indexOf('p)r)o)d)') > -1){
	      				var loc_and_prod = result[ind].split('#');
	      				var location = loc_and_prod[0].split('_');
	      				var product_obj = {'name': loc_and_prod[1],'location': location};
	      				this.state.products.push(product_obj);
	      				    this.setState({
      products: this.state.products
    });
	      				console.log("this.state.products: "+this.state.products);
	      				this.props.addDoctor(result[ind]);
	      			}
	      			if(result[ind].indexOf('straight_line') > -1){
	      				var straight = result[ind].split("***")[2].split('&');
	      				this.ctx.lineTo(parseInt(straight[0]), parseInt(straight[1]));
	      			}
	      			if(result[ind].indexOf('startcircle') > -1){
	      				var start_circle = result[ind].split('#')[1].split('&');
	      				this.ctx.moveTo(parseInt(start_circle[0]), parseInt(start_circle[1]));
	      			}
	      			if(result[ind].indexOf('endcircle') > -1){
	      				var start_circle = result[ind].split('#')[1].split('&');
	      				this.ctx.closePath();
	      				this.ctx.stroke();
			this.ctx.beginPath();
	      				this.ctx.arc(parseFloat(start_circle[0]), parseFloat(start_circle[1]), parseFloat(start_circle[2]), 0, 1 * Math.PI);
	      				console.log("circle: x:"+parseFloat(start_circle[0])+" y: "+parseFloat(start_circle[1])+" radius: "+parseFloat(start_circle[2])+" 0,1");
	      			}
	      			if(result[ind].indexOf('color_change') > -1){
	      				this.ctx.closePath();
	      				this.ctx.stroke();
	      				this.ctx.beginPath();
	      				var color_pick = result[ind].split("***")[2].split('#');
	      				this.ctx.strokeStyle = color_pick[1];
	      				this.ctx.stroke();
	      			}
	      			
	      		}
	      		this.ctx.stroke();
	        },
	        // Note: it's important to handle errors here
	        // instead of a catch() block so that we don't swallow
	        // exceptions from actual bugs in components.
	        (error) => {

	        }
	      )
	    this.state = {
	      products: []
	    };
	}

	createSelectItems() {
     let items = [];         
     for (let i = 0; i < this.state.products.length; i++) {             
          items.push(<option key={this.state.products[i].name +"_"+ this.state.products[i].location}>{this.state.products[i].name}</option>);
          //here I will be creating my options dynamically based on
          //what props are currently passed to the parent component
     }
     return items;
 	}
	render() {
	    return (<div><div className="headline">Store map</div>
	      <ProdListSelect />
	      <div className="cover_canvas"><textarea id="text_box"></textarea><canvas width="1249" height="624" id="canvas" ></canvas></div>
	    	<span id="prod_place"></span>
	    </div>
	    );
	}
}



const products_canvas_1 = connect(
  null,
  mapDispatchToProps
)(docclient);
// const products_canvas = connect(mapStateToProps)(docpage);

export default products_canvas_1;
// export default docpage;