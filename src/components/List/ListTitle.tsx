import React from 'react';
import { changeCurrentList } from '../../redux/lists/listsSlice';
import { useDispatch } from 'react-redux';

const burger: string= require("../../assets/img/burger.svg").default;

type ListTitleProps = {
  setOpenMenu: () => void,
}

const ListTitle: React.FC<ListTitleProps> = ({setOpenMenu}) => {
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
