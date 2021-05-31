function FormatText(txt) {

    let val = txt
        .replace(/(^\s*)|(\s*$)/gi,'') // exclude start and end white-space
        .replace(/\n/gi,'') // convert newline to space
        .replace(/[ ]{2,}/gi,' ') // 2 or more space to 1
        .replace(/[.,!?/]{1,}/gi,'') // remove special chars

    console.log(val)
    
    let wordList = val.split(' '); // split the value in the text area by spaces

    return wordList
}
