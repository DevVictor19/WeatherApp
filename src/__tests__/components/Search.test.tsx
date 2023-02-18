import { it, describe, expect, vi, beforeEach, Mock, afterEach } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { City } from '../../models/City';
import getCities from '../../services/getCities';
import searchForNearbyCitiesFirst from '../../utils/searchForNearbyCitiesFirst';
import getUserLocation, { UserLocation } from '../../utils/getUserLocation';
import Search from '../../components/Search';

vi.mock('../../services/getCities');
vi.mock('../../utils/searchForNearbyCitiesFirst');
vi.mock('../../utils/getUserLocation');

const testCities = [
  {
    id: 1,
    city: 'test city',
    name: 'test name',
    latitude: 123,
    longitude: 123,
  },
];

function citiesMockFn(result: City[]) {
  return () => Promise.resolve(result);
}

function locationMockFn(result: UserLocation) {
  return () => Promise.resolve(result);
}

const getCitiesMock = getCities as Mock;
const searchForNearbyCitiesFirstMock = searchForNearbyCitiesFirst as Mock;
const getUserLocationMock = getUserLocation as Mock;

describe('<Search />', () => {
  const user = userEvent.setup({ delay: null });

  beforeEach(() => {
    render(<Search />);
  });

  afterEach(() => {
    vi.resetAllMocks();
    vi.clearAllMocks();
    vi.clearAllTimers();
  });

  it('should try get user location if the input is clicked', async () => {
    getUserLocationMock.mockImplementation(locationMockFn(null));

    const input = screen.getByPlaceholderText('Digite o nome da cidade');

    await act(async () => {
      vi.useFakeTimers();
      await user.click(input);
      await vi.runAllTimersAsync();
    });

    expect(getUserLocationMock).toBeCalledTimes(1);
  });

  it('should not search if the input has empty strings', async () => {
    searchForNearbyCitiesFirstMock.mockImplementation(citiesMockFn([]));
    getCitiesMock.mockImplementation(citiesMockFn([]));
    getUserLocationMock.mockImplementation(locationMockFn({ lat: 1, lon: 1 }));

    const input = screen.getByPlaceholderText('Digite o nome da cidade');

    await act(async () => {
      vi.useFakeTimers();
      await user.type(input, ' ');
      await vi.runAllTimersAsync();
    });

    expect(searchForNearbyCitiesFirstMock).not.toBeCalled();
    expect(getCitiesMock).not.toBeCalled();
  });

  it('should search for nearby first cities if location is provided', async () => {
    searchForNearbyCitiesFirstMock.mockImplementation(citiesMockFn([]));
    getCitiesMock.mockImplementation(citiesMockFn([]));
    getUserLocationMock.mockImplementation(locationMockFn({ lat: 1, lon: 1 }));

    const input = screen.getByPlaceholderText('Digite o nome da cidade');

    await act(async () => {
      vi.useFakeTimers();
      await user.type(input, 'test');
      await vi.runAllTimersAsync();
    });

    expect(searchForNearbyCitiesFirstMock).toBeCalledTimes(1);
    expect(getCitiesMock).not.toBeCalled();
  });

  it('should search for global cities if location is not provided', async () => {
    searchForNearbyCitiesFirstMock.mockImplementation(citiesMockFn([]));
    getCitiesMock.mockImplementation(citiesMockFn([]));
    getUserLocationMock.mockImplementation(locationMockFn(null));

    const input = screen.getByPlaceholderText('Digite o nome da cidade');

    await act(async () => {
      vi.useFakeTimers();
      await user.type(input, 'test');
      await vi.runAllTimersAsync();
    });

    expect(searchForNearbyCitiesFirstMock).not.toBeCalled();
    expect(getCitiesMock).toBeCalledTimes(1);
  });

  it('should show the results list after a successful search', async () => {
    getCitiesMock.mockImplementation(citiesMockFn(testCities));
    getUserLocationMock.mockImplementation(locationMockFn(null));

    const input = screen.getByPlaceholderText('Digite o nome da cidade');

    await act(async () => {
      vi.useFakeTimers();
      await user.type(input, 'test');
      await vi.runAllTimersAsync();
    });

    expect(screen.queryByRole('list')).toBeInTheDocument();
  });

  it('should not show the results list after an unsuccessful search', async () => {
    getCitiesMock.mockImplementation(citiesMockFn([]));
    getUserLocationMock.mockImplementation(locationMockFn(null));

    const input = screen.getByPlaceholderText('Digite o nome da cidade');

    await act(async () => {
      vi.useFakeTimers();
      await user.type(input, 'test');
      await vi.runAllTimersAsync();
    });

    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });
});
