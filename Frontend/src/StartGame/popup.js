import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {Container} from 'react-bootstrap';

import './page.js';

function Popup2() {
    return(
        <div>
            hi
            <form>
                <label htmlFor='name'>Name</label>
                <input type='text' name='name2' id='name' autoComplete='off'></input>
            </form>
        </div>
    );
}
export default Popup2;