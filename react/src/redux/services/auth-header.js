export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.accessToken) {
      return { Authorization: 'Bearer ' + user.accessToken };
    } else {
      return {};
    }
  }



  //checks localStorage for user item  
  //if there is a loggedIn user with access token (jwt), return http authorization header
  //otherwise it returns an empty object 