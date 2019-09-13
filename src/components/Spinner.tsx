import React from 'react';
import ReactLoading from 'react-loading';

import './Spinner.css';

const Spinner = (props: any) => (
  <div className='spinnerContainer'>
    <ReactLoading
      type={props.type}
      color={props.color}
      width={'10%'}
      height={'10%'}
    />
  </div>
);

export default Spinner;
