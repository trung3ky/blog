import React from 'react';
import PropTypes from 'prop-types';

import logo from '../../../media/logo.png'
import './header.scss'


const header = () => {
    return (
        <header>
            <div className="header__left">
                <a id="header__search-logo-link" href="#" className="header__search-container-image">
                    <img className="image header__search-image" src={logo} alt="Logo" />
                </a>
                <div className="header__search-container-input">
                    <input id="header__search-input" className="input header__search-input" type="text" placeholder="Tìm kiếm trên Facebook" />
                    <i className="fas fa-search header__search-icon"></i>
                </div>
            </div>
            <div className="header__right"></div>
        </header>
    );
};


header.propTypes = {

};


export default header;
