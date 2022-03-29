import React,{Component} from 'react';

import {connect} from 'react-redux';
import * as actions from '../actions/index';

class TaskItem extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          
        }
    }

    onUpdateStatus = () => {
        this.props.onUpdateStatus(this.props.task.id);
    }

    onDeleteTask = () => {
        this.props.onDeleteTask(this.props.task.id);
        this.props.onCloseForm();
    }

    onEditTask = () => {
        this.props.onEditTask(this.props.task);
        this.props.onOpenForm();
    }

    render(){ 
    return (
    <tr>
        <td>{this.props.index}</td>
        <td>{this.props.task.name}</td>
        <td class="text-center">
            <span class= {this.props.task.status?"labelRed":"labelGreen"}
                onClick={this.onUpdateStatus}
            >
                {this.props.task.status ? 'Kích hoạt' : 'Ẩn'}
            </span>
        </td>
        <td class="text-center">
            <button 
                type="button" 
                class="btn btn-warning"
                onClick={this.onEditTask}
            >
                <span class="fa fa-pencil mr-5"></span>Sửa
            </button>
            &nbsp;
            <button 
                type="button" 
                class="btn btn-danger"
                onClick={this.onDeleteTask}
            >
                <span class="fa fa-trash mr-5"></span>Xóa
            </button>
        </td>
    </tr>
    );
    }
}

/* Chuyen state cua reducer thanh props cua component nay */
const mapStateToProps = (state) => {  //state nay la state cua reducer
    return { 
        
    };
}
/* Chuyen action thanh props cua component nay */
const mapDispatchToProps = (dispatch, props) => {
    return {
        onUpdateStatus: (id) => {
            dispatch(actions.updateStatus(id));  //khi co dispatch reduce se xu li su kien
        },
        onDeleteTask: (id) => {
            dispatch(actions.deleteTask(id));  //khi co dispatch reduce se xu li su kien
        },
        onCloseForm: () => {
            dispatch(actions.closeForm());
        },
        onOpenForm: () => {
            dispatch(actions.openForm());
        },
        onEditTask: (task) => {
            dispatch(actions.editTask(task));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskItem);