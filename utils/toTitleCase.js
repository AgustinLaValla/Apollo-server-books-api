function toTitleCase(title) {
    const array = title.split(' ');

    array.map((word, index) => array[index] = word[0].toUpperCase() + word.slice(1).toLowerCase());

    return array.join(' ');
}

module.exports = { toTitleCase };