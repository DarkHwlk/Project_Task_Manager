import React,{Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/index';

class TaskForm extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            /*neu id empty thi la them task, 
            neu k empty la cap nhat task*/
            id: '',  
            name: '',
            status: false
        }
    }

    componentWillMount(){
        /* Chay khi component TaskForm moi duoc gan vao html(show) */
        if(this.props.itemEditing && this.props.itemEditing.id !== null){
            /* Neu da ton tai taskEditing */
            this.setState({
                id: this.props.itemEditing.id,
                name: this.props.itemEditing.name,
                status: this.props.itemEditing.status
            });
        }else{
            this.setState({
                id: '',
                name: '',
                status: false
            });
        }
    }

    /* Moi khi nhan duoc props */
    componentWillReceiveProps(nextProps){
        if(nextProps && nextProps.itemEditing){
            /* Neu ton tai itemEditing */
            this.setState({
                id: nextProps.itemEditing.id,
                name: nextProps.itemEditing.name,
                status: nextProps.itemEditing.status
            });
        }else if(nextProps && nextProps.itemEditing === null){
            /* Neu dang cap nhat task ma nhan them task */
            this.setState({
                id: '',
                name: '',
                status: "false"
            });
        }
    }

    onCloseForm = () => {
        this.props.onCloseForm();
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;  // name of input or section that changes
        var value = target.value;  // value of input or section that changes
        if(name==='status'){
            value = (target.value==='true')?"true":"false"
        }
        this.setState({
            [name] : value
        });
    }

    onClear = () => {
        this.setState({
            name: '',
            status: "false"
        });
    }

    onSubmit = (event) => {
        event.preventDefault();  // ham ngan k load lai trang
        this.props.onSaveTask(this.state);
        /* Clear du lieu va Close TaskForm */
        this.onClear();
        this.onCloseForm();
    }

  render(){ 

    var {id} = this.state;
    if(!this.props.isDisplayTaskForm) return null; 
  return (
    <div className="panel panel-warning">
        <div className="panel-heading">
            <h3 className="panel-title">
                {id !=='' ? 'Cập nhật công việc' : 'Thêm công việc'}
                <span
                    className='fa fa-times-circle text-right'
                    onClick = {this.onCloseForm}
                >
                </span>
            </h3>
        </div>
        <div className="panel-body">
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Tên :</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name='name'
                        value={this.state.name}  //gia tri mac dinh
                        onChange={this.onChange}
                    />
                </div>
                <label>Trạng Thái :</label>
                <select 
                    className="form-control" 
                    name='status'
                    value={this.state.status}  //gia tri mac dinh
                    onChange={this.onChange}
                >
                    <option value={true}>Kích Hoạt</option>
                    <option value={false}>Ẩn</option>
                </select>
                <br/>
                <div className="text-center">
                    <button 
                        type="submit" 
                        class="btn btn-warning"
                    >Lưu lại</button>&nbsp;
                    <button 
                        type="submit" 
                        class="btn btn-danger"
                        onClick={this.onCloseForm}
                    >Hủy Bỏ</button>
                </div>
            </form>
        </div>
    </div>
  );
  }
}

/* Chuyen state cua reducer thanh props cua component nay */
const mapStateToProps = (state) => {
    return { 
        isDisplayTaskForm: state.isDisplayTaskForm,
        itemEditing: state.itemEditing,
    };
}
/* Chuyen action thanh props cua component nay */
const mapDispatchToProps = (dispatch, props) => {
    return {
        onSaveTask: (task) => {
            dispatch(actions.saveTask(task));
        },
        onCloseForm: () => {
            dispatch(actions.closeForm());
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);