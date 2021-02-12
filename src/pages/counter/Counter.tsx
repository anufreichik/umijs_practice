import React from 'react';
import { connect } from 'umi';

interface IProps {
 counter:Number;
 addOne:any;
}


function Counter(props:IProps) {
  const addOne=()=>{
    props.addOne(1);
  }
  return (
    <div>
      <h2>Counter</h2>
      <button onClick={addOne}>Add One</button>
    </div>
  );
}
const mapStateToProps = (state: any) => ({
  counter: state.counter,
});

const mapDispatchToProps = (dispatch: any) => ({
  addOne: (payload: Number) => dispatch({ type: 'Counter/addOne', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
