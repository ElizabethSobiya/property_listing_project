import React from 'react';
import { render, screen} from '@testing-library/react';
import PropertyDetails from '../components/propertyDetails/PropertyDetails';

jest.mock('../propertyContext', () => ({
  usePropertyContext: () => ({
    state: {},
    dispatch: jest.fn(),
  }),
}));

describe('PropertyDetails', () => {
  it('renders the component without errors', () => {
    render(<PropertyDetails />);
    expect(screen.getByText('Property Details')).toBeInTheDocument();
  });
});
