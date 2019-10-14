import React, { Component } from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import { NavMenu } from './NavMenu';
import { MenuBar } from './MenuBar';

export class Layout extends Component {
  displayName = Layout.name

  render() {
    return (
      <Grid fluid>
        <Row>
            <MenuBar />
        </Row>
        <Row>
            {this.props.children}
        </Row>
      </Grid>
    );
  }
}
