import jwt from 'jsonwebtoken';

export const getToken = async () => {
    return !validToken()
    ? fetch('/rest/v0/auth/token', {
      method: 'get',
      credentials: 'include',
    })
      .then(res => res.json())
      .then(res => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('refreshToken', res.refreshToken);
      })
      .catch(error => {
        console.error(`Error in method that handles get session token: `, error);
      })
    : null;
};

const validToken = () => {
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');
  if (!token || !refreshToken) {
    return false;
  }

  try {
    const { exp } = jwt.decode(refreshToken);

    if (exp < new Date().getTime() / 1000) {
      return false;
    }
  } catch (e) {
    return false;
  }

  return true;
};
