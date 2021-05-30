import React from 'react';
import '../App.css';

import TextBox from './Main';

const Input = () => {

    return (
        <div>
            <div className="input_container">
                <span>
                    Enter number of tests: 
                    <input type='number'></input>
                </span>
                <span>
                    Number of words:
                    <input type='number' id='words'></input> 
                </span>
                <button>
                    Run Tests
                </button>
            </div>
        <hr></hr>

            <div>
                <TextBox />
            </div>
        </div>
    );
}

export default Input;