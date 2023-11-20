import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as Plus} from '../../assets/img/plus.svg';
import {
    selectors as listsSelectors
} from "../../redux/listsSlice";

import List from "../List";
import Badge from "../Badge";
import closeSvg from '../../assets/img/close.svg';

import isValidName from "../../utils/isValidName";
import { postList } from "../../redux/fetchData";

const AddListForm = () => {
    const [visiblePopup, setVisiblePopup] = React.useState(false);
    const [selectedColor, selectColor] = React.useState(1);
    const [isloading, setIsLoading] = React.useState(false);
    const [inputValue, setInputValue] = React.useState('');
    const colors = useSelector((state) => state.lists.colors);
    const dispatch = useDispatch();
    const lists = useSelector(listsSelectors.selectAll);

    React.useEffect(() => {
        if (colors.lenght > 0) {
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
       
        const data = {
            name: inputValue, 
            colorId: selectedColor,
        };
        dispatch(postList(data));
        setIsLoading(false);
            onClose();
    };

    return (
        <div className="add-list">
            <List 
            onClickItem={() => setVisiblePopup(true)}
                items={[
                {
                    className: 'list__add-button',
                    color: null,
                    name: "Добавить список",
                    icon: <Plus />
                },
            ]}
            />
            {visiblePopup && <div className="add-list__popup">
                <img 
                    src={closeSvg} 
                    alt="button close" 
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