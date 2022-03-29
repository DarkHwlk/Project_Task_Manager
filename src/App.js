import React,{Component} from 'react';
import './App.css';

import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';

import {connect} from 'react-redux';
import * as actions from './actions/index';

class App extends React.Component {

    constructor(props){
        super(props);
        this.state = {

        }
    }

    /* Toggle Redux */
    onToggleTaskForm = () => {
        var newTask = {
            id: '',  
            name: '',
            status: false
        }
        if(this.props.itemEditing.id === ''){
            /* Neu dang khong edit */
            this.props.onToggleTaskForm();
        }
        this.props.onClearTask(newTask);
    }

    render(){

        var {isDisplayTaskForm} = this.props;  //isDisplayTaskForm = this.props.isDisplayTaskForm
        
        return (
        <div className="container">
            <div className="text-center">
                <h1>Quản Lý Công Việc</h1>
                <hr/>
            </div>
            <div className="row">
                <div className={isDisplayTaskForm ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : '' }>
                    {/* Form */}
                    <TaskForm />
                </div>
                <div className={isDisplayTaskForm ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" 
                : "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
                    <button 
                        type="button" 
                        className="btn btn-primary"
                        onClick={ this.onToggleTaskForm }    
                    >
                        <span className="fa fa-plus mr-5"></span>Thêm Công Việc
                    </button>
                    {/* Search - Sort */}
                    <Control />
                    {/* List */}
                    <div className="row mt-15">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <TaskList />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

/* Chuyen state cua reducer thanh props cua component nay */
const mapStateToProps = (state) => {  //state nay la state cua reducer
    return { 
        isDisplayTaskForm: state.isDisplayTaskForm,
        itemEditing: state.itemEditing,
    };
}
/* Chuyen action thanh props cua component nay */
const mapDispatchToProps = (dispatch, props) => {
    return {
        onToggleTaskForm: () => {
            dispatch(actions.toggleForm());  //khi co dispatch reduce se xu li su kien
        },
        onCloseForm: () => {
            dispatch(actions.closeForm());  //khi co dispatch reduce se xu li su kien
        },
        onClearTask: (task) => {
            dispatch(actions.editTask(task));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
