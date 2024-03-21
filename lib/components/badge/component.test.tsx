import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import PokemonBadge from './index';

describe('PokemonBadge', () => {
  it('renders the badge with the correct background color and id', () => {
    const { getByText } = render(<PokemonBadge type="fire" id="001" />);
    const badgeElement = getByText(/#001/i);
    expect(badgeElement).toBeInTheDocument();
    expect(badgeElement).toHaveClass('bg-red-500');
  });

  it('renders the badge with a default background color when type is unknown', () => {
    const { getByText } = render(<PokemonBadge type="dark" id="999" />);
    const badgeElement = getByText(/#999/i);
    expect(badgeElement).toBeInTheDocument();
    expect(badgeElement).toHaveClass('bg-gray-800');
  });
});
