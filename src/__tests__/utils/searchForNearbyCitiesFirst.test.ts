import { it, describe, vi, expect, Mock, afterEach } from 'vitest';

import { City } from '../../models/City';
import getCities from '../../services/getCities';
import getNearbyCities from '../../services/getNearbyCities';
import searchForNearbyCitiesFirst from '../../utils/searchForNearbyCitiesFirst';

vi.mock('../../services/getCities');
vi.mock('../../services/getNearbyCities');

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

const getCitiesMock = getCities as Mock;
const getNearbyCitiesMock = getNearbyCities as Mock;

describe('searchForNearbyCitiesFirst()', () => {
  afterEach(() => {
    vi.resetAllMocks();
    vi.clearAllMocks();
    vi.clearAllTimers();
  });

  it('should search for nearby cities first', () => {
    getNearbyCitiesMock.mockImplementation(citiesMockFn(testCities));

    searchForNearbyCitiesFirst('test', { lat: 1, lon: 2 });

    expect(getNearbyCitiesMock).toBeCalledTimes(1);
  });

  it('should search for global cities when nearby search has no results', async () => {
    getNearbyCitiesMock.mockImplementation(citiesMockFn([]));
    getCitiesMock.mockImplementation(citiesMockFn([]));

    vi.useFakeTimers();
    searchForNearbyCitiesFirst('test', { lat: 1, lon: 2 });
    await vi.runAllTimersAsync();

    expect(getNearbyCitiesMock).toBeCalledTimes(1);
    expect(getCitiesMock).toBeCalledTimes(1);
  });

  it('should return cities for a successful nearby search', async () => {
    getNearbyCitiesMock.mockImplementation(citiesMockFn(testCities));
    getCitiesMock.mockImplementation(citiesMockFn([]));

    const result = await searchForNearbyCitiesFirst('test', { lat: 1, lon: 2 });

    expect(result).toEqual(testCities);
    expect(getCitiesMock).not.toBeCalled();
  });

  it('should return cities for a successful global search', async () => {
    getNearbyCitiesMock.mockImplementation(citiesMockFn([]));
    getCitiesMock.mockImplementation(citiesMockFn(testCities));

    vi.useFakeTimers();
    const promise = searchForNearbyCitiesFirst('test', { lat: 1, lon: 2 });
    await vi.runAllTimersAsync();
    const result = await promise;

    expect(result).toEqual(testCities);
  });

  it('should return an empty array for a unsuccessful search', async () => {
    getNearbyCitiesMock.mockImplementation(citiesMockFn([]));
    getCitiesMock.mockImplementation(citiesMockFn([]));

    vi.useFakeTimers();
    const promise = searchForNearbyCitiesFirst('test', { lat: 1, lon: 2 });
    await vi.runAllTimersAsync();
    const result = await promise;

    expect(result).toEqual([]);
  });
});
