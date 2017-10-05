import { forceSignout } from '../reducers/authen';

export const handleError = error => {
  console.log('error: ', error);

  if (error) {
    if (error.response && error.response.status) {
      const { response: { status } } = error;
      // console.log('error: ', error);

      switch (status) {
        case 401:
          forceSignout();
          break;

        default:
          break;
      }
    }
  }
};
