import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Glyphicon, Nav, Navbar, NavItem, Form, FormControl, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './MenuBar.css';

export class MenuBar extends Component {
    displayName = MenuBar.name

    render() {
        return (
            <div className="menuBar">
                <Link to="/">
                    <button className="menuButton">Home</button>
                </Link>
                <Link to="/import">
                    <button className="menuButton">Import</button>
                </Link>
                <Link to="/gallery">
                    <button className="menuButton">Gallery</button>
                </Link>
            </div>

        );
    }
}