const createElements = (arr) => {
    const htmlElements = arr.map(el => `<span>${el}</span>`);
    console.log(...htmlElements);
    console.log(htmlElements.join(" "));
}
const synonyms = ["hello", "hi", "konichiwa"];
createElements(synonyms);
