import $ from 'jquery';

export const Globals = {
   baseUrl: 'http://l.d8',
   sessionUrl: '/session/token',
   username: 'admin',
   password: 'admin'
}

export const TodoDataConfig = {
  "name": "",
  "description": "",
  "done": true
}


const GetCsrfToken = (callback) => {
  $
    .get(`http://l.d8/session/token`)
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
      url: `${Globals.baseUrl}/${url}?_format=hal_json`,
      method,
      headers: {
        'Content-Type': 'application/hal+json',
        'X-CSRF-Token': csrfToken,
        'Authorization': FormatBasicAuth()
      },
      data: JSON.stringify(data),
      success: (data) => {
        successCallback(data);
      },
      error: (error) => {
        errorCallback(error);
      }
    });
  });
}
