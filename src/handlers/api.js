import { forceSignout } from '../reducers/authen';

export const handleError = error => {
  const { response: { status } } = error;
  console.log('error: ', error);

  switch (status) {
    case 401:
      forceSignout();
      break;

    default:
      break;
  }
};
