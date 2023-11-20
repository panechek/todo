import React from "react";
import classNames from "classnames";
import { deleteList } from "../../redux/fetchData";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import removeSvg from '../../assets/img/remove.svg';
import Badge from "./Badge";
import Sceleton from "./Sceletons";
import { changeCurrentList } from "../../redux/listsSlice";
import { selectors as listsSelectors } from "../../redux/listsSlice";
import { selectors as tasksSelectors } from "../../redux/tasksSlice";

const List = ({ openMenu, setOpenMenu }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const colors = useSelector((state) => state.lists.colors);
    const getColor = (id) => colors.find((i) => i.id === id).name;
    const lists = useSelector(listsSelectors.selectAll);
    const tasks = useSelector(tasksSelectors.selectAll);
    const currentList = useSelector((state) => state.lists.currentList);
    const sceletons = [...new Array(6)].map((_, index) => <Sceleton key={index} />);

    const onRemoveList = (id) => {
        if (window.confirm('Вы уверены, что хотите удалить?')) {
            dispatch(deleteList(id));
            navigate('/');
        }
    };
    return (
        <ul className="list todo__sidebar_list">
            {lists.length > 0 ? lists.map((list, index) => (
                <li 
                    key={index} 
                    className={classNames(list.className, {
                        active: list.active 
                            ? list.active 
                            : currentList === list.id,
                            hidden: openMenu
                        })}
                >
                    <i>
                        <Badge color={getColor(list.colorId)} />
                    </i>
                    <span
                        onClick={() => {
                            dispatch(changeCurrentList(list.id));
                            setOpenMenu(!openMenu);
                        }}
                    >
                        {list.name}
                        {` (${tasks.filter((i) => i.listId === list.id).length})`}
                    </span>
                        <img
                            src={removeSvg}
                            alt="remove list" 
                            className="list__remove-icon"
                            onClick={() => onRemoveList(list.id)}
                            />
                </li>
            )) : sceletons}
        
         </ul>
    )
};

export default List;