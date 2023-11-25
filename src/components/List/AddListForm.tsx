import React from "react";
import { useSelector } from "react-redux";
import { colorsSelectors, listsSelectors } from "../../redux/lists/listsSlice";
import { postList } from "../../redux/fetchData";
import { ListNew } from "../../redux/lists/types";

import Badge from "./Badge";

import isValidName from "../../utils/isValidName";
import { useAppDispatch } from "../../redux/store";

const plusSvg: string = require("../../assets/img/add.svg").default;
const closeSvg: string = require("../../assets/img/remove.svg").default;

const AddListForm: React.FC = () => {
  const [visiblePopup, setVisiblePopup] = React.useState(false);
  const [selectedColor, selectColor] = React.useState(1);
  const [isloading, setIsLoading] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');
  const colors = useSelector(colorsSelectors);
  const dispatch = useAppDispatch();
  const lists = useSelector(listsSelectors.selectAll);

  React.useEffect(() => {
    if (colors.length > 0) {
      selectColor(colors[0].id)
    }
  }, [colors]);

  const onClose = () => {
    setVisiblePopup(false);
    selectColor(colors[0].id);
    setInputValue('');
  };

  const onAddList = async () => {
    if (!inputValue) {
      alert('Введите название списка');
      return;
    }
    if (isValidName(inputValue, lists)) {
      alert('Список уже существует');
      return;
    }
    setIsLoading(true);
       
    const data: ListNew = {
      name: inputValue, 
      colorId: selectedColor,
    };

    dispatch(postList(data));
    setIsLoading(false);
    onClose();
  };

  return (
    <div className="add-list">
      <ul className="list todo__sidebar_list">
        <li className='list__add-button'>
          <i>
            <img src={plusSvg} alt="Add list" />
          </i>
          <span onClick={() => setVisiblePopup(true)}>
            Добавить список
          </span>
        </li>
      </ul>
      {visiblePopup && <div className="add-list__popup">
        <img
          src={closeSvg}
          alt="Close add form"
          className="add-list__popup-close-svg" 
          onClick={onClose}
        />
        <input 
          className="field" 
          type="text" 
          placeholder="Название списка"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
        />
        <div className="add-list__popup-colors">
          {colors.map(color => (
            <Badge 
              key={color.id} 
              color={color.name} 
              onClick={() => selectColor(color.id)} 
              className={selectedColor === color.id && 'active'}
            />))}
        </div>
        <button 
          className="button"
          onClick={onAddList}
        >
          {isloading ? 'Добавление...' : 'Добавить'}
        </button>
      </div>}
    </div>
  )
};

export default AddListForm;