import * as types from '../constants/ActionTypes';  // import toan bo voi ten la types

var initialState = {
    name: '',
    status: -1,
};  // khoi tao la false la close form

var myReducer = (state = initialState, action) => {
    switch(action.type){
        case types.FILTER_TABLE:
            state.name = action.filter.name;
            state.status = parseInt(action.filter.status);
            return state;  // return ra state
        
        default: 
            return state;
    }  
};

export default myReducer;