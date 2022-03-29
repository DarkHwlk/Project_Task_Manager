import React,{Component} from 'react';
import TaskItem from './TaskItem';
import {connect} from 'react-redux'

import * as actions from '../actions/index';

class TaskList extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            filterName: '',
            filterStatus: -1  //tat ca: -1, an: 0, kich hoat: 1
        }
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;  //name of input or section that changes
        var value = target.value;  //value of input or section that changes
        var filter = {
            name: (name === 'filterName') ? value : this.state.filterName,
            status: (name === 'filterStatus') ? value : this.state.filterStatus
        };
        this.props.onFilterTask(filter);
        this.setState({
            [name] : value
        });

    }

    render(){

        var {tasks, filterTable, keyword, sort} = this.props;  //var tasks = this.props.tasks; var filteTable = this.props.filterTable
        var {filterName, filterStatus} = this.state;

        /* Filter and return task */
        if(filterTable.name){  //kiem tra neu k empty thi thuc hien
            /* Loc task va return mang task thoa man vao bien tasks */
            tasks = tasks.filter((task) => {
                /* Kiem tra trong task.name co chuoi trong thanh tim kiem hay k? */
                if(task.name.toLowerCase().indexOf(filterTable.name.toLowerCase()) !== -1) return task;
            });
        }
        if(filterTable.status){  //neu filter.status khac 0 (tim task tat ca or kich hoat)
            tasks = tasks.filter((task) => {
                if(filterTable.status===-1){
                    /* return task tat ca */
                    return task;
                }else if(filterTable.status===1){
                    if(task.status===true){
                        /* return task kich hoat */
                        return task;
                    }
                }
            });
        }else{  //neu filter.status == 0 (tim task an)
            tasks = tasks.filter((task) => {
                if(task.status===false){
                    /* return task an */
                    return task;
                }
            });
        }
        
        /* Search */  
        tasks = tasks.filter((task) => {
            /* Kiem tra trong task.name co chuoi trong thanh tim kiem hay k? */
            if(task.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1) return task;
        });  

        /* Sort */
        if(sort.sortBy==='name'){
            tasks.sort((a,b) => {
                if(a.name > b.name) return sort.sortValue;
                else if(a.name < b.name) return -sort.sortValue;
                else return 0;
            });
        }else{
            tasks.sort((a,b) => {
                if(a.status > b.status) return -sort.sortValue;
                else if(a.status < b.status) return sort.sortValue;
                else return 0;
            });
        }

        var elmTasks = tasks.map((task, index) => {
            return <TaskItem 
                        key={task.id} 
                        index={index} 
                        task={task}
                    />
        });

        return (
        <table className="table table-bordered table-hover mt-15">
            <thead>
                <tr>
                    <th className="text-center">STT</th>
                    <th className="text-center">Tên</th>
                    <th className="text-center">Trạng Thái</th>
                    <th className="text-center">Hành Động</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td></td>
                    <td>
                        <input 
                            type="text" 
                            className="form-control" 
                            name='filterName'
                            value = {filterName}
                            onChange={this.onChange}
                        />
                    </td>
                    <td>
                        <select 
                            className="form-control"
                            name='filterStatus'
                            value = {filterStatus}
                            onChange={this.onChange}
                        >
                            <option value={-1}>Tất Cả</option>
                            <option value={0}>Ẩn</option>
                            <option value={1}>Kích Hoạt</option>
                        </select>
                    </td>
                    <td></td>
                </tr>
                {elmTasks}
            </tbody>
        </table>
        );
    }
}

/* Chuyen state cua reducer thanh props cua component nay */
const mapStateToProps = (state) => {
    return { 
        tasks: state.tasks,  //tasks la this.props.tasks cua component nay
        filterTable: state.filterTable,
        keyword: state.search,
        sort: state.sort,
    };
}
/* Chuyen action thanh props cua component nay */
const mapDispatchToProps = (dispatch, props) => {
    return {
        onFilterTask: (filter) => {
            dispatch(actions.filterTask(filter));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);