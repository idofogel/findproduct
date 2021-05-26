import React from "react";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return { doctors: state.doctors };
};
// function mapDispatchToProps(dispatch) {
//   return {
//     addDoctor: doctor => dispatch(addDoctor(doctor))
//   };
// }
	var selectProduct = (event) => {
		var coords = event.currentTarget.value.replace("p)r)o)d)","").split('_');
		coords[0] = parseFloat(coords[0]);
		coords[1] = parseFloat(coords[1]);
		document.getElementById('prod_place').style.left = (coords[0]*document.getElementById('canvas').getBoundingClientRect().width / document.getElementById('canvas').width) + "px";
		// if(document.getElementById('canvas').getBoundingClientRect().top >= 0)
		document.getElementById('prod_place').style.top = (document.getElementById('canvas').getBoundingClientRect().top + coords[1]*document.getElementById('canvas').getBoundingClientRect().height / document.getElementById('canvas').height)+"px";
		document.getElementById('prod_place').style.display = "block";
		// else {
		// 	document.getElementById('prod_place').style.top = ( coords[1]*document.getElementById('canvas').getBoundingClientRect().height / document.getElementById('canvas').height)+"px";
		// }
	}
const ProdList = ({ doctors }) => { 

  return (<select onChange={selectProduct}>
    {doctors.map(el => {
      // if(el.indexOf("***start_erase***") === -1 && el.indexOf("***lineto***") === -1 && el.indexOf("***linefrom***") === -1 && el.indexOf("***straight_line***") === -1 && el.indexOf("***stop_erase***") === -1 && el.indexOf("***startcircle***") === -1 && el.indexOf("***endcircle***") === -1){
      	return <option key={el.split('#')[0]} value={el.split('#')[0]}>{el.split('#')[1]}</option>;
   		// }
    }
    )}
  </select>);
}

// const List = connect(mapStateToProps)(ConnectedList);

// export default List;

const ProdListSelect = connect(mapStateToProps)(ProdList);

export default ProdListSelect;