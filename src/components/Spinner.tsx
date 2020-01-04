import React from 'react';
import Loader from 'react-loader-spinner';

import './Spinner.css';

type SpinnerTypes = 'Watch' | 'Audio' | 'BallTriangle' | 'Bars' | 'Circles' | 'Grid' | 'Hearts' | 'Oval' | 'Puff' | 'Rings' | 'TailSpin' | 'ThreeDots' | 'RevolvingDot' | 'Triangle' | 'Plane' | 'MutatingDots' | 'None' | 'NotSpecified' | undefined;

interface Props {
  type: SpinnerTypes;
  color?: string;
}

const Spinner: React.FC<Props> = ({ type, color = '#fff' }) => (
  <div className="spinnerContainer">
    <Loader type={type} color={color} width={264} height={264} />
  </div>
);

export default Spinner;
