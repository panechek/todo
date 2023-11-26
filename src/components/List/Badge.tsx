import React from "react";
import classNames from "classnames";

type ColorProps = {
    color: string,
    className?: false | 'active',
    onClick: () => void
}

const Badge: React.FunctionComponent<ColorProps> = ({color, onClick, className}) => (
    <i
        onClick={onClick}
        className={classNames('badge', { [`badge--${color}`]: color }, className)}
    ></i>
);

export default Badge;
