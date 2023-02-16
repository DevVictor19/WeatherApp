import { it, vi, describe, expect, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Input from '../../components/Search/Input';

describe('<Input />', () => {
  const user = userEvent.setup({ delay: null });
  const mockFn = vi.fn();

  beforeEach(() => {
    render(
      <Input
        placeholder="test placeholder"
        onClick={() => {}}
        onChange={mockFn}
      />
    );
  });

  afterEach(() => {
    mockFn.mockReset();
    mockFn.mockClear();
    vi.clearAllTimers();
  });

  it('should execute onSubmit just once when user stops typing', async () => {
    vi.useFakeTimers();

    await user.type(
      screen.getByPlaceholderText<HTMLInputElement>('test placeholder'),
      '123456'
    );

    await vi.runAllTimersAsync();

    expect(mockFn).toBeCalledTimes(1);
  });

  it('should show the provided placeholder text', () => {
    const input =
      screen.getByPlaceholderText<HTMLInputElement>('test placeholder');

    expect(input.placeholder).toBe('test placeholder');
  });
});
