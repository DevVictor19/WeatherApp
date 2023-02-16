import { it, describe, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import ResultsList from '../../components/Search/ResultsList';

describe('<ResultsList />', () => {
  it('should render the result items with the provided results props', () => {
    render(
      <ResultsList
        results={[
          {
            id: 1,
            name: 'Salvador',
            city: 'Salvador',
            latitude: 1323,
            longitude: 3123,
          },
        ]}
      />
    );

    const listItem = screen.getByRole('listitem');

    expect(listItem.textContent).toBe('Salvador');
  });
});
