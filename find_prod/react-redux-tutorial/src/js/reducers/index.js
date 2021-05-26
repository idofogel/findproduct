import { ADD_DOCTOR } from "../constants/action-types";

const initialState = {
  doctors: [],
  remoteDoctors: []
};

function rootReducer(state = initialState, action) {
  if (action.type === ADD_DOCTOR) {
    return Object.assign({}, state, {
      doctors: state.doctors.concat(action.payload)
    });
  }
  if (action.type === "DATA_LOADED") {
    return Object.assign({}, state, {
      remoteDoctors: state.remoteDoctors.concat(action.payload)
    });
  }
  return state;
}

export default rootReducer;
