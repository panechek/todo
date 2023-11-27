import React from "react";
import classNames from "classnames";
import { deleteList } from "../../redux/fetchData";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import Badge from "./Badge";
import Sceleton from "./Sceletons";
import { changeCurrentList, colorsSelectors, currentListSelector } from "../../redux/lists/listsSlice";
import { listsSelectors } from "../../redux/lists/listsSlice";
import { tasksSelectors } from "../../redux/tasks/tasksSlice";
import { Color as ColorType} from "../../redux/lists/types";
import { useAppDispatch } from "../../redux/store";


type ListProps = {
    openMenu: boolean,
    setOpenMenu: (openMenu: boolean) => void
}

const List: React.FC<ListProps> = ({ openMenu, setOpenMenu }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const colors: ColorType[] = useSelector(colorsSelectors);
    const getColor = (id: number):string | undefined => colors.find((i) => i?.id === id)?.name;
    const lists = useSelector(listsSelectors.selectAll);
    const tasks = useSelector(tasksSelectors.selectAll);
    const currentList = useSelector(currentListSelector);
    const sceletons = [...new Array(6)].map((_, index) => <Sceleton key={index} />);
    const removeSvg: string = React.useMemo(() => require("../../assets/img/remove.svg").default, []);

    const onRemoveList = (id: number) => {
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
                    className={classNames({
                        active: currentList === list.id,
                            hidden: openMenu
                        })}
                >
                    <i>
                        <Badge
                            color={getColor(list?.colorId) ?? 'white'}
                            onClick={() => null}
                            />
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