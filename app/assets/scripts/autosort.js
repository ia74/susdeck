// Page sorter! No more manual pages!
let Pages = {};
let countOnEachPage = 8
let pagesAmount = Sounds.length/countOnEachPage;
for (let i = 0; i < pagesAmount; i++) {
    Pages[i] = [];
}
let pageCounter = 0;
let index = 0;
Sounds.forEach(sound => {
    Pages[pageCounter].push(sound)
    if(index == countOnEachPage) {
        pageCounter++;
        index = 0;
    }
    index++;
});