import React from 'react';
import { render } from '@testing-library/react';
import Dialer from '../Dialer.jsx';

describe('Dialer', () => {
  it('renders Dialer component', () => {
    const { container } = render(<Dialer />);
    const dialerContainer = container.querySelector('.dialer-container');

    // Add assertions
    expect(dialerContainer).toBeInTheDocument();
  });
});