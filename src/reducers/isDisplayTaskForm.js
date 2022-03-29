import * as types from '../constants/ActionTypes';  // import toan bo voi ten la types

var initialState = false;  // khoi tao la false la close form

var myReducer = (state = initialState, action) => {
    switch(action.type){
        case types.TOGGLE_FORM:
            state = !state;
            return state;  // return ra state
        case types.OPEN_FORM:
            return true;  // return ra true
        case types.CLOSE_FORM:
            return false;  // return ra false
        default: return state;
    }  
};

export default myReducer;