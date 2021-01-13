import $ from 'jquery';
import * as alertify from 'alertifyjs';

export const Globals = {
   baseUrl: 'http://l.d8',
   sessionUrl: '/session/token',
   username: 'admin',
   password: 'admin',
   route: {
     todoLists: 'list/todo',
     node: 'node'
   }
}

export const TodoDataConfig = {
  "name": "",
  "description": "",
  "done": true
}


const GetCsrfToken = (callback) => {
  $
    .get(`${Globals.baseUrl}/session/token`)
    .done(function (data) {
      const csrfToken = data;

      callback(csrfToken);
    });
}

const FormatBasicAuth = () => {
  const basicAuthCredential = Globals.username + ":" + Globals.password;
  const base64 =  btoa(basicAuthCredential);

  return 'Basic ' + base64;
}


export const Request = (url, data, method, successCallback, errorCallback) => {
  GetCsrfToken((csrfToken) => {
    $.ajax({
      url: `${Globals.baseUrl}/${url}?_format=json`,
      method,
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken,
        'Authorization': FormatBasicAuth()
      },
      data: method === 'GET' ? null: JSON.stringify(data),
      success: (data) => {
        successCallback(data);
      },
      error: (error) => {
        alertify.error('ERROR: ' + error.responseJSON.message);
        console.log('error', error);
        errorCallback(error);
      }
    });
  });
}
