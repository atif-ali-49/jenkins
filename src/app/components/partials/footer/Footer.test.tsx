import React from 'react';
import { render } from '@testing-library/react';
import Header from './Header';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <Router>
      <Header />
    </Router>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
