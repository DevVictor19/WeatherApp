export type UserLocation = null | { lat: number; lon: number };

const getUserLocation = () =>
  new Promise<UserLocation>((resolve, reject) => {
    if (!navigator.geolocation) {
      resolve(null);
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        resolve({ lat, lon });
      },
      (error) => {
        reject(error.message);
      }
    );
  });

export default getUserLocation;
