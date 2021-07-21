import React from 'react';
import { Container } from 'react-bootstrap';
import Header from './Header';


const Layout = props => (
  <div>
    <Header />
    {props.children}
  </div>
)

export default Layout
