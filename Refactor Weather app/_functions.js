
const createElement = (containerType, element, className, text) => {
    const createX = document.createElement(element);
    createX.classList.add(className);
    createX.innerHTML = text;
    containerType.appendChild(createX);
}

         
const createElementImg = (containerType, element, className) => {
    const createX = document.createElement(element);
    createX.classList.add(className);
    containerType.appendChild(createX);
}

export {

    createElement,
    createElementImg,

}