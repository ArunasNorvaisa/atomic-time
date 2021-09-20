import React from 'react';
import Loader from 'react-loader-spinner';

import './Spinner.css';

type SpinnerType = 'Watch' | 'Audio' | 'BallTriangle' | 'Bars' | 'Circles' | 'Grid' | 'Hearts' | 'Oval' | 'Puff' | 'Rings' | 'TailSpin' | 'ThreeDots' | 'RevolvingDot' | 'Triangle' | 'Plane' | 'MutatingDots';

interface Props {
  type: SpinnerType;
  color?: string;
}

const Spinner: React.FC<Props> = ({ type, color = '#fff' }) => (
  <div className="spinnerContainer">
    <Loader type={type} color={color} width={264} height={264} />
  </div>
);

export default Spinner;
