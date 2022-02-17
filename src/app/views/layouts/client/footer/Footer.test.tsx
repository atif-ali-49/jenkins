import React from 'react';
import { render } from '@testing-library/react';
import Page404 from '../../../page-404/Page404';

test('renders learn react link', () => {
  const { getByText } = render(<Page404 />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
