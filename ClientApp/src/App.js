import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Import } from './components/Import';
import { Gallery } from './components/Gallery';
import { GalleryTwo } from './components/GalleryTwo';
import { Info } from './components/Info';

export default class App extends Component {
  displayName = App.name

  render() {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/import' component={Import} />
        <Route path='/gallery' component={Gallery} />
        <Route path='/gallery2' component={GalleryTwo} />
        <Route path='/info/:pokeIndex' component={Info} />
      </Layout>
    );
  }
}
