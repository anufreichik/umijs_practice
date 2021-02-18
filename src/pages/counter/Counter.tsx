import React, { useState } from "react";
import { connect } from 'umi';

interface IProps {
 counter:Number;
 addOne:any;
  minusOne:any;
}


function Counter(props:IProps) {
  const addOne=()=>{
    props.addOne(1);

  }
  const minusOne=()=>{
    props.minusOne(1);

  }
  return (
    <div>
      <button onClick={addOne}>+</button>
     {props.counter}
      <button onClick={minusOne}>-</button>
    </div>
  );
}
const mapStateToProps = (state: any) => ({
  counter: state.Counter.counter,
});

const mapDispatchToProps = (dispatch: any) => ({
  addOne: (payload: Number) => dispatch({ type: 'Counter/addOne', payload }),
  minusOne: (payload: Number) => dispatch({ type: 'Counter/minusOne', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
