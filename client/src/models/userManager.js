import * as Cookies from 'es-cookie';

const USER_SIGNIN_URL = '/users/signin';
const USER_AUTH_URL = '/users/auth';

export const userSignIn = function(email, password, cb) {
  console.log('signing in');
  fetch(USER_SIGNIN_URL, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      {
        "email": email,
        "password": password
      }
    )
  })
    .then(response => response.json())
    .then(data => {
      if (data.token) {
        Cookies.set('lt',data.token, 14);
        console.log(data)
        cb({user: data.user, success: true});
      }
    })
};

export const userSignOut = function() {
  Cookies.remove('lt');
};

export const userAuthenticate = function(token, cb) {
  console.log('user authenticating');
  fetch(USER_AUTH_URL, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `JWT ${token}`
    }
  })
    .then(response => response.json())
    .then(data => {
      if (data.user) {
        cb({user: {userName: data.user.userName, email: data.user.email}, success: true})
      }
    })
};

