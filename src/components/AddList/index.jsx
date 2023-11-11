import React from "react";
import axios from "axios";

import List from "../List";
import Badge from "../Badge";

import closeSvg from '../../assets/img/close.svg';

import './AddListButton.scss';
import { JSON_API } from "../../assets/Constants";

const AddList = ({ colors, onAddList }) => {
    const [visiblePopup, setVisiblePopup] = React.useState(false);
    const [selectedColor, selectColor] = React.useState(1);
    const [isloading, setIsLoading] = React.useState(false);
    const [inputValue, setInputValue] = React.useState('');

    React.useEffect(() => {
        if (Array.isArray(colors)) {
            selectColor(colors[0].id)
        }
    }, [colors]);

    const onClose = () => {
        setVisiblePopup(false);
        selectColor(colors[0].id);
        setInputValue('');
    };

    const addList = () => {
        if (!inputValue) {
            alert('Введите название списка');
            return;
        }
        setIsLoading(true);
        axios.post(`${JSON_API}/lists`, { 
            name: inputValue, 
            colorId: selectedColor 
        }).then(({ data }) => {
        const color = colors.filter(i => i.id === selectedColor)[0].name;
        const listObj = { ...data, color: {name: color}};
        onAddList(listObj);
        onClose();
        })
        .catch(() => {
            alert('Ошибка при добавлении списка')
        })
        .finally(() => {
            setIsLoading(false);
        });
    };

    return (
        <div className="add-list">
            <List 
            onClick={() => setVisiblePopup(true)}
                items={[
                {
                    className: 'list__add-button',
                    color: null,
                    name: "Добавить список",
                    icon: (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="currentColor"
                            className="bi bi-plus"
                            viewBox="0 0 16 16"
                        >
                            <path
                                d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
                            />
                        </svg>)
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
                    onClick={addList}
                >
                    {isloading ? 'Добавление...' : 'Добавить'}
                </button>
            </div>}
        </div>
    )
};

export default AddList;