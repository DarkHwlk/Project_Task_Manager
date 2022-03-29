import React,{Component} from 'react';

import {connect} from 'react-redux';
import * as actions from '../actions/index';

import Search from './Search';
import Sort from './Sort';

class Control extends React.Component {
  render(){
  return (
    <div className="row mt-15">
        <Search />
        <Sort />
    </div>
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
      
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Control);