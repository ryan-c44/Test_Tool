let dictRun = () => {

    //Get document elements to render content to
    let dictTxtArea = document.getElementById("txtArea2"),
        cCounter2 = document.getElementById('cCounter2'),
        wCounter2 = document.getElementById('wCounter2'),
        wordListUL = document.getElementById('wordList');


    let txt = dictTxtArea.value
    
    // format text based upon regex
    let wordList = FormatText(txt)

    // collect data for character count and word count
    cCounter2.innerHTML = val.length 
    wCounter2.innerHTML = val.length !== 0 ? wordList.length : 0;

    // Create fragment for rendering the list of words that are ranked
    let frag = document.createDocumentFragment()

    // Create array of words using makeDict function 
    let dict = makeDict(wordList)

    for(var i = 0; i < 10; i++) {
        let li = document.createElement('li')
        let span = document.createElement('span')
        li.className = 'list-group-item';
        span.className = 'badge'
        span.appendChild(document.createTextNode(dict[i].count))
        li.appendChild(document.createTextNode(dict[i].val))
        li.appendChild(span)
        frag.appendChild(li)

        //Add all words and counts to the dictArray for comparison
        dictArray[i] = {
            val: dict[i].val,
            count: dict[i].count
        }
    }

    //Append the list elements to the ul
    wordListUL.innerHTML = '';
    wordListUL.appendChild(frag);

}


