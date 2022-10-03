let url = "http://numbersapi.com"

let favNumber = 4;

// for(let i = 0; i < 10; i++) {
//     firstTenNumbers.push(
//         axios.get(`http://numbersapi.com/${i}`)
//     );
// }

// Promise.all(firstTenNumbers)
//     .then(numArr => (
//         numArr.forEach(p => console.log(p))
//     ))
//     .catch(err => console.log(err));

// 1.
async function numFacts() {
    let data = await $.getJSON(`${url}/${favNumber}?json`);
    console.log(data);
}
numFacts();

// 2. 
const multipleNums = [420, 69, 1000];
async function multipleNumFacts() {
    let data = await $.getJSON(`${url}/${multipleNums}?json`);
    console.log(data);
}
multipleNumFacts();

// 3. 
async function multipleFacts() {
    let facts = await Promise.all(
        Array.from({length: 4}, () => $.getJSON(`${url}/${favNumber}?json`))
    );
    facts.forEach(data => {
        $('body').append(`<p>${data.text}</p>`)
    });
}
multipleFacts();