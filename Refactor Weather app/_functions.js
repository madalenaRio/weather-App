
const AddElementInnerHtml = (parentElement, element, text) => {
    const childElement = document.createElement(element);
    childElement.innerHTML = text;
    parentElement.appendChild(childElement);
}

const AddElementDiv = (parentElement, element, className) => {
    const tempX = document.createElement(element);
    tempX.classList.add(className);
    parentElement.appendChild(tempX);

    return tempX
}

const AddElementSpan = (parentElement, element, className, text) => {
    const tempX = document.createElement(element);
    tempX.classList.add(className);
    tempX.innerHTML = text;
    parentElement.appendChild(tempX);
}


export {

    AddElementInnerHtml,
    AddElementDiv,
    AddElementSpan
}

