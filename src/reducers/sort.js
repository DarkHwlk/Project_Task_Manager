import * as types from '../constants/ActionTypes';  // import toan bo voi ten la types

var initialState = {
    sortBy: 'name',
    sortValue: 1,
};  // khoi tao la false la close form

var myReducer = (state = initialState, action) => {
    switch(action.type){
        case types.SORT:
            state = action.sort;
            return state;  // return ra state
        
        default: 
            return state;
    }  
};

export default myReducer;