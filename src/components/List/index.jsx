import React from "react";
import classNames from "classnames";

import removeSvg from '../../assets/img/remove.svg';
import './List.scss'
import Badge from "../Badge";

const List = ({ items, isRemovable, onClick, onRemove }) => {
    const removeList = (item) => {
        if (window.confirm('Вы уверены, что хотите удалить?')) {
            onRemove(item);
        }
    };

    return (
        <ul className="list" onClick={onClick}>
            {items.map((item, index) => (
                <li 
                    key={index} 
                    className={classNames(item.className, {'active': item.active})}
                >
                    <i>
                        {item.icon ? (item.icon) : (<Badge color={item.color} />)}
                    </i>
                    <span>{item.name}</span>
                    {isRemovable && 
                        <img
                            src={removeSvg}
                            alt="remove list" 
                            className="list__remove-icon"
                            onClick={() => removeList(item)}
                        />}
                </li>
            ))}
        
         </ul>
    )
};

export default List;