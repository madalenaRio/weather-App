
const addElementInnerHtml = (parentElement, element, text) => {
    const childElement = document.createElement(element);
    childElement.innerHTML = text;
    parentElement.appendChild(childElement);
}

const addElementDiv = (parentElement, element, className) => {
    const tempX = document.createElement(element);
    tempX.classList.add(className);
    parentElement.appendChild(tempX);

    return tempX
}

const addElementSpan = (parentElement, element, className, text) => {
    const tempX = document.createElement(element);
    tempX.classList.add(className);
    tempX.innerHTML = text;
    parentElement.appendChild(tempX);
}


export {

    addElementInnerHtml,
    addElementDiv,
    addElementSpan
}

