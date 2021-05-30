  
let makeDict = wordList => {
  let dict = wordList.reduce((dict, word) => {
    // ditch short words
    if (!word || word.length < 1) { return dict; }

    word = word.toLowerCase()

    // if the word isnt in the dictionary then add an object of it, initialising its count to 1.
    if (!dict[word]) {
      dict[word] = {
        val: word,
        count: 1
      }
    } else { // if the word is already in the dictionary, increment its count by 1.
      dict[word].count = dict[word].count + 1
    }
    return dict;
  }, {});

  let arr = [];
  for (let word in dict) {
    // discard words used only once
    if (dict[word].count >= 1) {
      arr.push(dict[word]);
    }
  }
  // sort the array by count primarily then alphabetically if the count is the same.
  return arr.sort((w1,w2) => {
    // reverse sort so we can use a straight appendChild later on
    return w2.count - w1.count || w1.val.localeCompare(w2.val);
  })
}

export default makeDict