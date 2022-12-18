import React from "react";
import classNames from "classnames";
import axios from "axios";

import removeSvg from '../../assets/img/remove.svg';
import './List.scss'
import Badge from "../Badge";

const List = ({ 
    items, 
    isRemovable, 
    onClick, 
    onRemove, 
    onClickItem, 
    activeItem 
}) => {
    const removeList = (item) => {
        if (window.confirm('Вы уверены, что хотите удалить?')) {
            axios.delete('http://localhost:3001/lists/' + item.id).then(() => {
                onRemove(item.id);
            })
        }
    };

    return (
        <ul className="list" onClick={onClick}>
            {items.map((item, index) => (
                <li 
                    key={index} 
                    className={classNames(item.className, {
                        active: item.active 
                            ? item.active 
                            : activeItem && activeItem.id === item.id})}
                    onClick={onClickItem ? () => onClickItem(item) : null}
                >
                    <i>
                        {item.icon ? (item.icon) : (<Badge color={item.color.name} />)}
                    </i>
                    <span>
                        {item.name}
                        {item.tasks && ` (${item.tasks.length})`}
                    </span>
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