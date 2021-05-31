module.exports = function (avlArray, dictArray) {
    var successCount = 0;
    var result;
    
    if (avlArray != undefined && dictArray != undefined) {

        // Compare each list of words and their rankings; if all 10 are equal then the test is successful.
        for (var i = 0; i < 10; i++) {
            if ((avlArray[i].val == dictArray[i].val) && (dictArray[i].count == avlArray[i].count)) {
                successCount += 1;
            }
        }

        // If all 10 words in the list are equal return true
        if (successCount == 10) {
            result = true;
        } else { // else return false
            result = false;
        }

        return result;
    } else {
        return 0;
    }
}
