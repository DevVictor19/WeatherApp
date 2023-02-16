import { it, vi, describe, expect, beforeEach, Mock } from 'vitest';

import debounce from '../../utils/debounce';

describe('debounce()', () => {
  let mockFn: Mock;

  beforeEach(() => {
    mockFn = vi.fn();
  });

  it('should run the provided callback just once', () => {
    vi.useFakeTimers();

    for (let i = 0; i < 100; i += 1) {
      debounce(mockFn, 1000);
    }

    vi.runAllTimers();

    expect(mockFn).toBeCalledTimes(1);
  });
});
