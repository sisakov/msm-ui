import React from 'react';
import { render } from '@testing-library/react';
import LandingPage from './LandingPage';

it('Renders Landing page', () => {
  const { getByText } = render(<LandingPage />);
  const linkElement = getByText('Cisco Systems, 2021');
  expect(linkElement).toBeInTheDocument();
});
