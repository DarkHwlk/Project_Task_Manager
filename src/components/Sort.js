import React,{Component} from 'react';

import {connect} from 'react-redux';
import * as actions from '../actions/index';

class Sort extends React.Component {

    constructor(props){
        super(props);
      }

    onClick = (sortBy, sortValue) => {
        var sort = {
            sortBy: sortBy,
            sortValue: sortValue,
        }
        this.props.onSort(sort);
    }

  render(){
  return (
    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
        <div className="dropdown">
            <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                Sắp Xếp <span className="fa fa-caret-square-o-down ml-5"></span>
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                <li className='pointer' onClick={ () => this.onClick('name',1) }>
                    <a 
                        role="button"
                        className={
                            (this.props.sort.sortBy==='name'&&this.props.sort.sortValue===1)
                            ? 'sort_selected' : '' }
                    >
                        <span className="fa fa-sort-alpha-asc pr-5">
                            Tên A-Z
                        </span>
                    </a>
                </li>
                <li className='pointer' onClick={ () => this.onClick('name',-1) }>
                    <a 
                        role="button"
                        className={
                            (this.props.sort.sortBy==='name'&&this.props.sort.sortValue===-1)
                            ? 'sort_selected' : '' }
                    >
                        <span className="fa fa-sort-alpha-desc pr-5">
                            Tên Z-A
                        </span>
                    </a>
                </li>
                <li role="separator" className="divider"></li>
                <li className='pointer' onClick={ () => this.onClick('status',1) }>
                    <a 
                        role="button"
                        className={
                            (this.props.sort.sortBy==='status'&&this.props.sort.sortValue===1)
                            ? 'sort_selected' : '' }   
                    >Trạng Thái Kích Hoạt</a>
                </li>
                <li className='pointer' onClick={ () => this.onClick('status',-1) }>
                    <a 
                        role="button"
                        className={
                            (this.props.sort.sortBy==='status'&&this.props.sort.sortValue===-1)
                            ? 'sort_selected' : '' }  
                    >Trạng Thái Ẩn</a>
                </li>
            </ul>
        </div>
    </div>
  );
  }
}

/* Chuyen state cua reducer thanh props cua component nay */
const mapStateToProps = (state) => {  //state nay la state cua reducer
    return { 
        sort: state.sort
    };
  }
/* Chuyen action thanh props cua component nay */
const mapDispatchToProps = (dispatch, props) => {
    return {
        onSort: (sort) => {
            dispatch(actions.sortTask(sort));
          }
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Sort);