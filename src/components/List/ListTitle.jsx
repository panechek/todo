import React from 'react';
import { ReactComponent as Burger } from '../../assets/img/burger.svg';
import { changeCurrentList } from '../../redux/listsSlice';
import { useDispatch } from 'react-redux';


const ListTitle = ({setOpenMenu}) => {
  const dispatch = useDispatch();
  return (
    <ul className="list todo__sidebar_list">
      <li className='active'>
        <i>
          <Burger onClick={setOpenMenu}/>
        </i>
        <span onClick={() => dispatch(changeCurrentList(null))}>
          Все задачи
        </span>
      </li>
    </ul>
  )
};

export default ListTitle;
