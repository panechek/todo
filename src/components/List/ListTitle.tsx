import React from 'react';
import { changeCurrentList } from '../../redux/lists/listsSlice';
import { useDispatch } from 'react-redux';


type ListTitleProps = {
  setOpenMenu: () => void,
}

const ListTitle: React.FC<ListTitleProps> = ({setOpenMenu}) => {
  const burger: string= React.useMemo(() => require("../../assets/img/burger.svg").default, []);

  const dispatch = useDispatch();
  return (
    <ul className="list todo__sidebar_list">
      <li className='active'>
        <i onClick={setOpenMenu}>
          <img src={burger} alt="Open lists" />
        </i>
        <span onClick={() => dispatch(changeCurrentList(null))}>
          Все задачи
        </span>
      </li>
    </ul>
  )
};

export default ListTitle;
