import React from "react";
import classNames from "classnames";
import { deleteList } from "../../redux/fetchData";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import removeSvg from '../../assets/img/remove.svg';
import Badge from "../Badge";
import Sceleton from "./Sceletons";
// import { selectors as listsSelectors } from "../../redux/listsSlice";

const List = ({ 
    items, 
    isRemovable, 
    onClickItem,
}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const colors = useSelector((state) => state.lists.colors);
    const getColor = (id) => colors.find((i) => i.id === id).name;
    const currentList = useSelector((state) => state.lists.currentList);
    const sceletons = [...new Array(6)].map((_, index) => <Sceleton key={index} />);

    const onRemoveList = async (item) => {
        if (window.confirm('Вы уверены, что хотите удалить?')) {
            dispatch(deleteList(item.id));
            navigate('/');
        }
    };
    return (
        <ul className="list todo__sidebar_list">
            {items.length > 0 ? items.map((item, index) => (
                <li 
                    key={index} 
                    className={classNames(item.className, {
                        active: item.active 
                            ? item.active 
                            : currentList === item.id})}
                >
                    <i>
                        {item.icon ? (item.icon) : (<Badge color={getColor(item.colorId)} />)}
                    </i>
                    <span
                        onClick={onClickItem ? () => onClickItem(item) : null}
                    >
                        {item.name}
                        {item.tasks && ` (${item.tasks.length})`}
                    </span>
                    {isRemovable && 
                        <img
                            src={removeSvg}
                            alt="remove list" 
                            className="list__remove-icon"
                            onClick={() => onRemoveList(item)}
                        />}
                </li>
            )) : sceletons}
        
         </ul>
    )
};

export default List;