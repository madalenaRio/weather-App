
const createAddElement = (elementType, className, text, parentElement) => {
    constX = document.createElement(elementType);
    constX.classList.add(className);
    constX.innerHTML = text;
    parentElement.appendChild(constX); 
}

// const createAddElement = (elementType, className, text, parentElement) => {
//     className = document.createElement(elementType);
//     className.classList.add(className);
//     className.innerHTML = text;
//     parentElement.appendChild(className);
// }



const createElementData = (constX, elementType, className, dataIcon) => {
    constX = document.createElement(elementType);
    constX.classList.add(className);
    constX.src = "http://openweathermap.org/img/wn/" + dataIcon + "@2x.png";;
    appendto.appendChild(constX); 

}



export {

    createAddElement,
    createElementData,

}