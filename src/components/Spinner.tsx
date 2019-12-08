import React from "react";
import ReactLoading from "react-loading";

import "./Spinner.css";

interface Props {
  type: any;
  color: string;
}

const Spinner: React.FC<Props> = ({ type, color }) => (
  <div className="spinnerContainer">
    <ReactLoading type={type} color={color} width={"10%"} height={"10%"} />
  </div>
);

export default Spinner;
