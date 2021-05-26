import React, { Component } from "react";
import "./docpage.css";
import { connect } from "react-redux";
import { addDoctor } from "../actions/index";
import List from "./selectprod";
import PublishList from "./publishing";
function mapDispatchToProps(dispatch) {
  return {
    addDoctor: doctor => dispatch(addDoctor(doctor))
  };
}

class docpage extends Component {
	constructor(props) {
		super(props);
		this.pressed = false;
		this.moveMouseOnCanvas = this.moveMouseOnCanvas.bind(this);
		this.initMoveMouseOnCanvas = this.initMoveMouseOnCanvas.bind(this);
		this.stopMoveMouseOnCanvas = this.stopMoveMouseOnCanvas.bind(this);
		this.selectTextBox = this.selectTextBox.bind(this);
		this.selectLineR = this.selectLineR.bind(this);
		this.selectCircle = this.selectCircle.bind(this);
		this.selectEraser = this.selectEraser.bind(this);
		this.openLineWidth = this.openLineWidth.bind(this);
		this.chooseLineWidth = this.chooseLineWidth.bind(this);
		this.chooseWideLineWidth = this.chooseWideLineWidth.bind(this);
		this.chooseWiderLineWidth = this.chooseWiderLineWidth.bind(this);
		
		this.readNewItem = this.readNewItem.bind(this);
		this.handlePublish = this.handlePublish.bind(this);
		this.chooseColor = this.chooseColor.bind(this);
		this.openColorPallette = this.openColorPallette.bind(this);
		this.textInput = React.createRef();
		this.widthSelect = React.createRef();
		this.prevX = null;
		this.prevY = null;
		this.start_init_y = null;
		this.start_init_x = null;
		this.line_pressed = false;
		this.circle_pressed = false;
		this.eraser_pressed = false;
		this.textbox_pressed = false;
		this.textbox_pressed_pressed = false;
		this.text_pressed_x = 0;
		this.text_pressed_y = 0;
	    this.state = {
	      info: "",
	      local: ""
	    };
	}
	moveMouseOnCanvas (e){
		if(this.textbox_pressed === true && this.textbox_pressed_pressed === true){ 
			// document.getElementById('text_box').style.display = "block";
			this.textInput.current.style.display = "block";
			var new_pos;
			if(( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) === false){
				new_pos = e;
			} else {
				new_pos = e.targetTouches[0];
			}
			this.textInput.current.style.width = "50px";
			this.textInput.current.style.height = "30px";
			this.textInput.current.style.top = (new_pos.pageY - (document.getElementsByClassName('cover_canvas')[0].getBoundingClientRect().top - document.body.getBoundingClientRect().top)+1 - 5)+"px";
			this.textInput.current.style.left = (new_pos.pageX - (document.getElementsByClassName('cover_canvas')[0].getBoundingClientRect().left - document.body.getBoundingClientRect().left)+1 - 5)+"px";
			// document.getElementById('text_box').style.width = "50px";
			// document.getElementById('text_box').style.height = "30px";
			// document.getElementById('text_box').style.top = (new_pos.pageY - (document.getElementsByClassName('cover_canvas')[0].getBoundingClientRect().top - document.body.getBoundingClientRect().top)+1 - 5)+"px";
			// document.getElementById('text_box').style.left = (new_pos.pageX - (document.getElementsByClassName('cover_canvas')[0].getBoundingClientRect().left - document.body.getBoundingClientRect().left)+1 - 5)+"px";
			return;
		}
		if(this.pressed === true){
			if(this.wide_pressed !== true)
				this.ctx.lineWidth = 1;
			if(this.eraser_pressed === true){
				this.ctx.lineWidth = 10;
				this.ctx.globalCompositeOperation = "destination-out";
				this.props.addDoctor("***start_erase***");
			}
			if(( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) === false){
				this.prevX = (e.pageX - document.getElementById('canvas').getBoundingClientRect().left)*1249 / document.getElementById('canvas').getBoundingClientRect().width;
				this.prevY = (e.pageY - (document.getElementById('canvas').getBoundingClientRect().top - document.body.getBoundingClientRect().top))*625/document.getElementById('canvas').getBoundingClientRect().height;
			} else {
				this.prevX = (e.targetTouches[0].pageX - document.getElementById('canvas').getBoundingClientRect().left)*1249 / document.getElementById('canvas').getBoundingClientRect().width;
				this.prevY = (e.targetTouches[0].pageY - document.getElementById('canvas').getBoundingClientRect().top)*625/document.getElementById('canvas').getBoundingClientRect().height;				
			}
			this.ctx.lineTo(this.prevX, this.prevY);
			if(this.line_pressed === true || (this.line_pressed === false && this.circle_pressed === false && this.textbox_pressed === false))
				this.props.addDoctor("***lineto***" + "#"+this.prevX+"&"+this.prevY);
			this.ctx.stroke();
		}
	}
	initMoveMouseOnCanvas (e){
		this.ctx = document.getElementById('canvas').getContext('2d');
		this.pressed = true;
		if(this.line_pressed === true || this.circle_pressed === true || this.textbox_pressed === true)
			this.pressed = false;
		var prev_x;
		var prev_y;
		if(( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) === false){
			prev_x = (e.pageX - document.getElementById('canvas').getBoundingClientRect().left)*1249 / document.getElementById('canvas').getBoundingClientRect().width;
			prev_y = (e.pageY - (document.getElementById('canvas').getBoundingClientRect().top - document.body.getBoundingClientRect().top))*625 / document.getElementById('canvas').getBoundingClientRect().height;
		} else {
			prev_x = (e.targetTouches[0].pageX - document.getElementById('canvas').getBoundingClientRect().left)*1249 / document.getElementById('canvas').getBoundingClientRect().width;
			prev_y = (e.targetTouches[0].pageY - (document.getElementById('canvas').getBoundingClientRect().top - document.body.getBoundingClientRect().top))*625 / document.getElementById('canvas').getBoundingClientRect().height;
		}
		this.ctx.beginPath();
		this.ctx.moveTo(prev_x, prev_y);
		if(this.line_pressed === true || (this.line_pressed === false && this.circle_pressed === false && this.textbox_pressed === false))
			this.props.addDoctor("***linefrom***" + "#"+prev_x+"&"+prev_y);
		if(this.circle_pressed === true)
			this.props.addDoctor("***startcircle***" + "#"+prev_x+"&"+prev_y);
		this.ctx.stroke();
		this.prevX = prev_x;
		this.prevY = prev_y;
		if(this.textbox_pressed === true){
			if(( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) === false){
				this.start_init_y = e.pageY;
				this.start_init_x = e.pageX;
			} else {
				this.start_init_y = e.targetTouches[0].pageY;
				this.start_init_x = e.targetTouches[0].pageX;
			}
			this.textbox_pressed_pressed = true;
		}
	}
	stopMoveMouseOnCanvas (e){
		if(this.line_pressed === true){
			if(( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) === false){
				this.prevX = (e.pageX - document.getElementById('canvas').getBoundingClientRect().left)*1249 / document.getElementById('canvas').getBoundingClientRect().width;
				this.prevY = (e.pageY - document.getElementById('canvas').getBoundingClientRect().top)*625/document.getElementById('canvas').getBoundingClientRect().height;
			} else {
				this.prevX = (e.targetTouches[0].pageX - document.getElementById('canvas').getBoundingClientRect().left)*1249 / document.getElementById('canvas').getBoundingClientRect().width;
				this.prevY = (e.targetTouches[0].pageY - document.getElementById('canvas').getBoundingClientRect().top)*625/document.getElementById('canvas').getBoundingClientRect().height;				
			}
			this.ctx.lineTo(this.prevX, this.prevY);
			this.props.addDoctor("***straight_line***"+this.prevX+"&"+this.prevY);
			this.ctx.stroke();
		}
		if(this.circle_pressed === true){
			var prev_x_circle = this.prevX;
			var prev_y_circle = this.prevY;
			if(( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) === false){
				this.prevX = (e.pageX - document.getElementById('canvas').getBoundingClientRect().left)*1249 / document.getElementById('canvas').getBoundingClientRect().width;
				this.prevY = (e.pageY - document.getElementById('canvas').getBoundingClientRect().top)*625/document.getElementById('canvas').getBoundingClientRect().height;
			} else {
				this.prevX = (e.targetTouches[0].pageX - document.getElementById('canvas').getBoundingClientRect().left)*1249 / document.getElementById('canvas').getBoundingClientRect().width;
				this.prevY = (e.targetTouches[0].pageY - document.getElementById('canvas').getBoundingClientRect().top)*625/document.getElementById('canvas').getBoundingClientRect().height;				
			}
			var x_axis = Math.abs(prev_x_circle - this.prevX);
			var y_axis = Math.abs(prev_y_circle - this.prevY);
			var radius = Math.sqrt(x_axis * x_axis + y_axis * y_axis);
			this.ctx.closePath();
			this.ctx.stroke();
			this.ctx.beginPath();
			this.ctx.arc(prev_x_circle, prev_y_circle, radius, 0, 1 * Math.PI);
			console.log("circle: x:"+prev_x_circle+" y: "+prev_y_circle+" radius: "+radius+" 0,1");
			this.props.addDoctor("***endcircle***#"+prev_x_circle+"&"+prev_y_circle+"&"+radius);
			this.ctx.stroke();
		}
		if(this.textbox_pressed === true){
			console.log("this.text_pressed_x: "+this.text_pressed_x);
			this.text_pressed_x = e.pageX;
			this.text_pressed_y = e.pageY;
		}
		if(this.pressed === true && this.line_pressed === false && this.circle_pressed === false && this.eraser_pressed === false)
			this.props.addDoctor("***stop_draw***");
		this.pressed = false;
		this.line_pressed = false;
		this.circle_pressed = false;
		if(this.eraser_pressed === true)
			this.props.addDoctor("***stop_erase***");
		this.eraser_pressed = false;
		this.textbox_pressed = false;
		this.prevX = null;
		this.prevY = null;
		this.ctx.closePath();
		this.textbox_pressed_pressed = false;
	}
	selectLineR (e){
		this.line_pressed = true;
		this.textbox_pressed_pressed = false;
		this.textbox_pressed = false;
		if(this.ctx === null || this.ctx === undefined){
			this.ctx = document.getElementById('canvas').getContext('2d');
			this.ctx.strokeStyle = 'blue';
			this.props.addDoctor("***color_change***#blue");
		}
		this.ctx.lineWidth = 2;
	}
	selectCircle (e){
		this.circle_pressed = true;
		this.textbox_pressed_pressed = false;
		this.textbox_pressed = false;
		if(this.ctx === null || this.ctx === undefined){
			this.ctx = document.getElementById('canvas').getContext('2d');
			this.ctx.strokeStyle = 'blue';
			this.props.addDoctor("***color_change***#blue");
		}
		this.ctx.lineWidth = 2;
	}
	selectEraser (e){
		this.eraser_pressed = true;
		this.textbox_pressed_pressed = false;
		this.textbox_pressed = false;
		this.ctx.lineWidth = 10;
	}
	openLineWidth (e){
		if(this.widthSelect.current.style.display === ""){
			this.widthSelect.current.style.display = "none";
		} else
			this.widthSelect.current.style.display = "";
		
	}
	chooseLineWidth (e){
		try{
			if(this.ctx === null || this.ctx === undefined)
				this.ctx = document.getElementById('canvas').getContext('2d');
			this.wide_pressed = true;
			this.ctx.lineWidth = 1;
		} catch(e){}
	}
	chooseWideLineWidth(e){
		try{
			if(this.ctx === null || this.ctx === undefined)
				this.ctx = document.getElementById('canvas').getContext('2d');
			this.wide_pressed = true;
			this.ctx.lineWidth = 5;
		} catch(e){}
	}
	chooseWiderLineWidth(e){
		try{
			if(this.ctx === null || this.ctx === undefined)
				this.ctx = document.getElementById('canvas').getContext('2d');
			this.wide_pressed = true;
			this.ctx.lineWidth = 10;
		} catch(e){}
	}
	// chooseLineWidthFactory (width_value){
	// 	this.chooseLineWidth();
	// }
	selectTextBox (e){
		this.textbox_pressed = true;
	}
	readNewItem (e){
		if(e.keyCode === 13){
			var x_place = (this.text_pressed_x - document.getElementById('canvas').getBoundingClientRect().left)*1249 / document.getElementById('canvas').getBoundingClientRect().width;
			var y_place = (this.text_pressed_y - document.getElementById('canvas').getBoundingClientRect().top)*625/document.getElementById('canvas').getBoundingClientRect().height;
			console.log('x_place: '+x_place+' y_place: '+y_place);
			// this.ctx.strokeStyle = 'blue';
			// this.props.addDoctor("***color_change***#blue");
			this.ctx.fillRect(x_place,y_place,1,1);
			// document.getElementById('text_box').style.display = "none";
			// document.getElementById('text_box').style.width = "";
			// document.getElementById('text_box').style.height = "";
			// document.getElementById('text_box').style.top = "";
			// document.getElementById('text_box').style.left = "";

			this.textInput.current.style.display = "none";
			this.textInput.current.style.width = "";
			this.textInput.current.style.height = "";
			this.textInput.current.style.top = "";
			this.textInput.current.style.left = "";
			this.textbox_pressed = false;
			this.textbox_pressed_pressed = false;
			this.handleChange(this.textInput.current.value,x_place+"_"+y_place);
			this.textInput.current.value = "";
		}
	}
	handleChange(name,location) {
		this.setState({ local: location, info: name });
		this.props.addDoctor("p)r)o)d)"+location + "#"+name);
	}
	openColorPallette(){
		if(this.ctx === null || this.ctx === undefined){
			this.ctx = document.getElementById('canvas').getContext('2d');
			this.ctx.strokeStyle = 'blue';
			this.props.addDoctor("***color_change***#blue");
		}
		document.getElementById('color_pallette').style.display = "block";
	}
	chooseColor(e){
		if(this.ctx === null || this.ctx === undefined){
			this.ctx = document.getElementById('canvas').getContext('2d');
			this.ctx.strokeStyle = 'blue';
			this.props.addDoctor("***color_change***#blue");
		}
		document.getElementById('color_pallette').style.display = "none";
		this.ctx.strokeStyle = e.target.style.backgroundColor;
		this.props.addDoctor("***color_change***#"+e.target.style.backgroundColor);
		document.getElementById('open_color_pallette').style.backgroundColor = e.target.style.backgroundColor;
	}
handlePublish () {
	var requestOptions = {
    	method: 'POST',
    	// headers: { 'Content-Type': 'application/json' ,'Access-Control-Allow-Origin': 'http://localhost:3000', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS', 'Access-Control-Allow-Headers': '*'},
    	headers: { 'Content-Type': 'application/json' },
    	body: JSON.stringify({ name: 'supermarket',commands: this.state })
	};
		fetch("http://localhost/i.php",requestOptions)
      .then(res => res.json())
      .then(
        (result) => {

        },
        // Note: it's important to handle errors here 10.100.102.28
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {

        }
      )
	}
	render() {
	    return (<div><div className="headline">Map your store</div>
	      <div className="paint-icon icons" title="painting tools"></div><div title="paint straight line" className="draw-line-icon icons" onClick={this.selectLineR} ><span className="line-icon"></span></div><div className="icons"><div onClick={this.selectCircle} title="draw half a circle" className="draw-circle-icon"></div></div><div title="erase" onClick={this.selectEraser} className="eraser icons"></div><div className="icons" onClick={this.openLineWidth}><span className='narrow-icon'></span><span className='wide-icon'></span><span className='wider-icon'></span><span id="line_width" ref={this.widthSelect} style={{display:'none',zIndex:'10000',backgroundColor:'white',position: 'fixed',width: '30px',height: '90px',borderStyle: 'solid',borderWidth: '1px',left: '143px',marginTop: '31px'}}><span style={{position:'absolute',height:'30px',top:'0px',left:'0px',width:'30px',borderBottomStyle:'solid',borderWidth:'1px'}} onClick={this.chooseLineWidth}><span style={{position:'absolute',height:'3px',top:'49%',width:'90%',left:'5%',backgroundColor:'black'}}></span></span>    <span onClick={this.chooseWideLineWidth} style={{position:'absolute',height:'30px',top:'30px',left:'0px',width:'30px',borderBottomStyle:'solid',borderWidth:'1px'}}><span style={{top:'49%',position:'absolute',height:'5px',width:'90%',left:'5%',backgroundColor:'black'}}></span></span>   <span onClick={this.chooseWiderLineWidth} style={{position:'absolute',height:'30px',top:'60px',left:'0px',width:'30px'}}><span style={{top:'40%',position:'absolute',height:'7px',width:'90%',left:'5%',backgroundColor:'black'}}></span></span>   </span></div><div onClick={this.selectTextBox} title="1) add a text box on the place where the product is supposed to be then write the name of the product" className="icons"><span className="textabox">T</span></div><div id="open_color_pallette" onClick={this.openColorPallette} className="icons" style={{backgroundColor: "black"}}></div><div id="color_pallette" style={{zIndex:'10',backgroundColor:'white',display:'none',top: '35px',left: '180px',width:'120px',height:'96px',position:'fixed'}}><div className="sub-icons" style={{backgroundColor:'red'}}></div><div onClick={this.chooseColor} className="sub-icons" style={{backgroundColor:'blue'}}></div><div className="sub-icons" onClick={this.chooseColor} style={{backgroundColor:'green'}}></div><div onClick={this.chooseColor} className="sub-icons" style={{backgroundColor:'orange'}}></div><div className="sub-icons" onClick={this.chooseColor} style={{backgroundColor:'yellow'}}></div><div className="sub-icons" onClick={this.chooseColor} style={{backgroundColor:'purple'}}></div><div className="sub-icons" onClick={this.chooseColor} style={{backgroundColor:'black'}}></div><div className="sub-icons" onClick={this.chooseColor} style={{backgroundColor:'white'}}></div><div className="sub-icons" style={{backgroundColor:'pink'}} onClick={this.chooseColor}></div></div><List />
	      <div className="cover_canvas"><textarea onMouseDown={this.initMoveMouseOnCanvas} onMouseUp={this.stopMoveMouseOnCanvas} onKeyDown={this.readNewItem} ref={this.textInput} id="text_box"></textarea><canvas width="1249" height="624" id="canvas" onMouseDown={this.initMoveMouseOnCanvas} onMouseUp={this.stopMoveMouseOnCanvas} onMouseMove={this.moveMouseOnCanvas} onTouchStart={this.initMoveMouseOnCanvas} onTouchEnd={this.stopMoveMouseOnCanvas} onTouchMove={this.moveMouseOnCanvas}></canvas></div>
	   	 <PublishList />
	    </div>


	    );
	}
}



const products_canvas = connect(
  null,
  mapDispatchToProps
)(docpage);
// const products_canvas = connect(mapStateToProps)(docpage);

export default products_canvas;
// export default docpage;