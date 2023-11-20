import classNames from "classnames";
import React from "react";

const Badge = ({color, onClick, className}) => (
    <i
        onClick={onClick}
        className={classNames('badge', { [`badge--${color}`]: color }, className)}
    ></i>
);

export default Badge;
