import { forceSignout } from '../reducers/authen';

export const handleError = ({ response: { status } }) => {
  switch (status) {
    case 401:
      forceSignout();
      break;

    default:
      break;
  }
};
