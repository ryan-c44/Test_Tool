import React from 'react';
import '../App.css';

import fs from 'fs';

import generateWords from "../Functions/generateWords";
import oracle from "../Functions/oracle";
import makeDict from "../Functions/makeDict";
import AVL from "../Components/AVL_sort_count";
import lStorage from "../Functions/localStorage";
import 'bootstrap/dist/css/bootstrap.min.css';

const Main = () => {
   

    //Declare global variables for result checking later on
    var avlArray = new Array(10);
    var dictArray = new Array(10);
    var sc = 0;
    var uc = 0;

    let dictRun = () => {

        //Get document elements to render content to
        let dictTxtArea = document.getElementById("txtArea2"),
            cCounter2 = document.getElementById('cCounter2'),
            wCounter2 = document.getElementById('wCounter2'),
            wordListUL = document.getElementById('wordList');


        let txt = dictTxtArea.value
        
        // Set up regex 
        // see: http://www.mediacollege.com/internet/javascript/text/count-words.html
        let val = txt
                    .replace(/(^\s*)|(\s*$)/gi,'') // exclude start and end white-space
                    .replace(/\n/gi,' ') // convert newline to space
                    .replace(/[ ]{2,}/gi,' ') // 2 or more space to 1
                    .replace(/[.,!?/]{1,}/gi,' ') // remove special chars

        let wordList = val.split(' '); // split the value in the text area by spaces

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

    let generateText = () => {
        let avlTxt = document.getElementById("txtArea1");
        let dictTxt = document.getElementById("txtArea2");
        let numWords = parseInt(document.getElementById("words").value);

        let words = generateWords(numWords);
 
        //set the textarea values to the words that were generated
        avlTxt.value = words;
        dictTxt.value = words;

        //Running both algorithms and logging their performance to console
        console.time("countChars");
        dictRun();
        console.timeEnd("countChars");

        console.time("avlRun");
        avlRun();
        console.timeEnd("avlRun");

        compareArrays();
        
    }

    var runTests = () => {

        // Get input from the user for amount of tests to run
        let amountTests = parseInt(document.getElementById('numTest').value);
        let testsRun = document.getElementById('testsRun');
        var timesRun = 0;

        // Run test using an interval of 1.5 seconds between test cases
        var interval = setInterval(function() {

            generateText();

            timesRun+=1;
            testsRun.innerHTML = " " + timesRun;
            if(timesRun == amountTests) { clearInterval(interval); } //stop tests once it reaches the amount of tests required to run
                

        }, 1500);

    }

    var avlRun = () => {
        //Create AVL object
        var tree = new AVL();

        //Get document elements to render content to
        let AVLTxtArea = document.getElementById("txtArea1");
        let wordlistUL2 = document.getElementById('wordList1');
        let cCounter2 = document.getElementById('cCounter'),
            wCounter2 = document.getElementById('wCounter');

        //Setup regex
        let txt = AVLTxtArea.value
        let val = txt
                    .replace(/(^\s*)|(\s*$)/gi,'') // exclude start and end white-space
                    .replace(/\n/gi,' ') // convert newline to space
                    .replace(/[ ]{2,}/gi,' ') // 2 or more space to 1
                    .replace(/[.,!?/]{1,}/gi,' ') // remove special chars

        let wordList = val.split(' '); 

        cCounter2.innerHTML = val.length
        wCounter2.innerHTML = val.length !== 0 ? wordList.length : 0;

        //Run the avl functions
        tree.treeins(wordList);
        tree.inorderRec(tree.root);
        tree.mergesort(tree.nodes, 0, tree.node_count - 1);

        let frag = document.createDocumentFragment()

        for (var i = 0; i < 10; i++) {
            let li = document.createElement('li')
            let span = document.createElement('span')
            li.className = 'list-group-item';
            span.className = 'badge'
            span.appendChild(document.createTextNode(tree.nodes[i].count))
            li.appendChild(document.createTextNode(tree.nodes[i].key))
            li.appendChild(span)
            frag.appendChild(li)

            //add nodes to the avl array for comparing 
            avlArray[i] = {
                val: tree.nodes[i].key,
                count: tree.nodes[i].count
            }
        }

        wordlistUL2.innerHTML = '';
        wordlistUL2.appendChild(frag);
    
    }

    var compareArrays = () => {

        // get document elements for rendering successful and unsuccessful counts to
        var successCount = document.getElementById("successful");
        var unsuccessCount = document.getElementById("unsuccessful");

        var arraysEqual = oracle(avlArray, dictArray);

        
        if (arraysEqual != 0) {
            // If oracle returns true
            if(arraysEqual) {
                sc += 1;
                successCount.innerHTML = " " + sc;
            } else { // if oracle returns false
                uc += 1;
                unsuccessCount.innerHTML = " " + uc;
            }
        } else {
            console.error("Oracle received wrong inputs");
        }

    }

    
    //return the html
    return (
        <div>
            <div>
                <div className="input_container">
                    <span>
                        Enter number of tests: 
                        <input type='number' id="numTest"></input>
                    </span>
                    <span>
                        Number of words:
                        <input type='number' id='words'></input> 
                    </span>
                    <button onClick={runTests}>Run Tests</button>
                    <hr></hr>
                    <span>
                        Tests Run:
                        <span id="testsRun"> 0</span> 
                    </span>
                    <span>
                        Successful:
                        <span id="successful"> 0</span> 
                    </span>
                    <span>
                        Unsuccessful:
                        <span id="unsuccessful"> 0</span> 
                    </span>
                </div>
            <hr></hr>
            <div>
                <div className="ta_container">
                    <div className="ta_container_left">
                        <h3>AVL Tree Algorithm</h3>
                        <textarea id="txtArea1" placeholder="Enter text in here"></textarea>
                    </div>
                    <div className="ta_container_right">
                        <h3>JS Dictionary</h3>
                        <textarea id="txtArea2" placeholder="Enter text in here"></textarea>
                    </div>

                </div>
                
                <div className="ta_container">
                    <div className="ta_container_left">
                        <h3>Word Count</h3>
                        <p>
                            <span>Characters: </span><b id="cCounter" className="badge">0</b> <br />
                            <span>Words: </span><b id="wCounter" className="badge">0</b>
                        </p>
                        <h3>Word Ranks</h3>
                        <ul id="wordList1"></ul>
                    </div>
                    <div className="ta_container_right">
                        <h3>Word Count</h3>
                        <p>
                            <span>Characters: </span><b id="cCounter2" className="badge">0</b> <br />
                            <span>Words: </span><b id="wCounter2" className="badge">0</b>
                        </p>
                        <h3>Word Ranks</h3>
                        <ul id="wordList"></ul>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
}               


export default Main;


// 