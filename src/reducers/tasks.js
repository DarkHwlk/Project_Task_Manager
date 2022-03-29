import * as types from '../constants/ActionTypes';  // import toan bo voi ten la types

var s4 = () => {
    return Math.floor((1+Math.random())*0x10000).toString(16).substring(1);
}

var generateID = () => {
    return s4()+'-'+s4()+'-'+s4()+"-"+s4()+'-'+s4()+'-'+s4()+'-'+s4()+"-"+s4()+'-'+s4();
}

var findIndex = (tasks, id) => {
    var result = -1;
    tasks.forEach((task, index) => {
        if(task.id === id){
            result = index;
        }
    });
    return result;
}

var data = JSON.parse(localStorage.getItem('tasks'));  //lay data tu local store
var initialState = data ? data : [];  // neu data co gia tri thi lay data

var myReducer = (state = initialState, action) => {
    var id = '';
    var index = -1;

    switch(action.type){
        case types.LIST_ALL:
            return state;  // return ra tasks

        case types.SAVE_TASK:
            var task = {
                id: action.task.id,
                name: action.task.name,
                status: action.task.status === 'true' ? true : false,
            }
            /* Truong hop add Task */
            if(!action.task.id){
                task.id = generateID();  //tao id moi
                state.push(task);
            }
            /* Truong hop edit Task */
            else{
                index = findIndex(state, task.id);  //Tim index cua task dua vao id
                if(index !==  -1){
                    /* Co tim thay task */
                    state[index] = task;  // gan task vua tim duoc
                }
            }
            localStorage.setItem('tasks',JSON.stringify(state));
            return [...state];

        case types.UPDATE_STATUS_TASK:
            id = action.id
            index = findIndex(state, id);  //state la tasks
            if(index !==  -1){
                /* Co tim thay task can doi trang thai */
                state[index] = {
                    ...state[index],
                    status: !state[index].status
                };  //state la tasks
                localStorage.setItem('tasks',JSON.stringify(state));  //save vao localStorage
            }
            return [...state];

        case types.DELETE_TASK:
            id = action.id
            index = findIndex(state, id);  //state la tasks
            if(index !==  -1){
                /* Co tim thay task can doi trang thai */
                state.splice(index, 1);  //xoa phan tu thứ index
                localStorage.setItem('tasks',JSON.stringify(state));  //save vao localStorage
            }
            return [...state];
            this.props.onCloseForm();

        default: return state;  //state chinh la tasks
    }  
};

export default myReducer;