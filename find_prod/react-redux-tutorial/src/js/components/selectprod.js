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
const ConnectedList = ({ doctors }) => { 
  return (<select>
    {doctors.map(el => {
      if(el.indexOf("***color_change***") === -1 && el.indexOf("***stop_draw***") === -1 && el.indexOf("***start_erase***") === -1 && el.indexOf("***lineto***") === -1 && el.indexOf("***linefrom***") === -1 && el.indexOf("***straight_line***") === -1 && el.indexOf("***stop_erase***") === -1 && el.indexOf("***startcircle***") === -1 && el.indexOf("***endcircle***") === -1){
      	return <option key={el.split('#')[0]} value={el.split('#')[0]}>{el.split('#')[1]}</option>;
   		}
    }
    )}
  </select>);
}

// const List = connect(mapStateToProps)(ConnectedList);

// export default List;

const List = connect(mapStateToProps)(ConnectedList);

export default List;