import $ from 'jquery';
import * as alertify from 'alertifyjs';

export const Globals = {
   baseUrl: 'http://l.d8',
   sessionUrl: '/session/token',
   username: 'admin',
   password: 'admin',
   route: {
     todoLists: 'list/todo',
     node: 'node',
     login: 'user/login',
     logout: 'user/logout',
     login_status: 'user/login_status',
     user: 'user'
   }
}

export const TodoDataConfig = {
  "name": "",
  "description": "",
  "done": true
}


const GetCsrfToken = (callback) => {
  if(localStorage.getItem('xcsrf-token')) {
    callback(localStorage.getItem('xcsrf-token'));
  } else {
  $
    .get(`${Globals.baseUrl}/session/token`)
    .done(function (data) {
      const csrfToken = data;

      callback(csrfToken);
    });
  }
}


export const Request = (url, data, query, method, successCallback, errorCallback) => {
  query['_format'] = 'json';
  const params = Object.keys(query).map((param) => (param + '=' + query[param])).join('&');

  GetCsrfToken((csrfToken) => {
    $.ajax({
      url: `${Globals.baseUrl}/${url}?${params}`,
      method,
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken
      },
      credentials: 'same-origin',
      xhrFields: {
        'withCredentials': true
     },
      data: method === 'GET' ? null: JSON.stringify(data),
      success: (data) => {
        successCallback(data);
      },
      error: (error) => {
        if(error.responseJSON) {
          alertify.error('ERROR: ' + error.responseJSON.message);
        }
        console.log('error', error);
        errorCallback(error);
      }
    });
  });
}
