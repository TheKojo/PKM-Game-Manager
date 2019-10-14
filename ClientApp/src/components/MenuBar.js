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
                <Button href="/">Home</Button>
                <Button href="/import">Import</Button>
                <Button href="/gallery">Gallery</Button>
            </div>

        );
    }
}