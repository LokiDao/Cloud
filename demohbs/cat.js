function getRandomCat (catsArr) {
    return catsArr[Math.floor(Math.random() * catsArr.length)];
}


function getRandomCat (dogsArr) {
    return dogArr[Math.floor(Math.random() * dogArr.length)];
}

module.exports = {
    getRandomCat: getRandomCat,
};
