const isValidName = (text, array) => {
    return array.find((i) => i.name === text);
}

export default isValidName;