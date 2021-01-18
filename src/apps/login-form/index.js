import React, {useState} from "react";
import { Button } from 'react-bootstrap';
import { Request, Globals } from '../../constants';
import * as alertify from 'alertifyjs';

function LoginForm({loginCallback}) {
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({name: '', pass: ''})

  const login = () => {
    setIsLoading(true);
    Request(Globals.route.login, userData, {}, 'POST', (data) => {
      setIsLoading(false);
      alertify.success('Logged in');
      localStorage.setItem('xcsrf-token', data.csrf_token);
      localStorage.setItem('logout-token', data.logout_token);
      localStorage.setItem('user_id', data.current_user.uid);
      loginCallback(true);
    },
    (error) => {
      setIsLoading(false);
    });
  }


  const onInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    setUserData({
      ...userData,
      [name]: value
    });
  }

  return (
    <div className="card mb-5">
      <div className="card-body">
      <h2 className="card-title">
        Login here
       </h2>
        <form>
          <div className="form-group">
            <label htmlFor="useNameElement">Username</label>
            <input
              type="text"
              className="form-control"
              id="useNameElement"
              aria-describedby="usernameHelp"
              placeholder="Enter username"
              name="name"
              value={userData.name}
              onChange={onInputChange}
            />
            <small id="usernameHelp" className="form-text text-muted">Provide username.</small>
          </div>
          <div className="form-group">
            <label htmlFor="userPassElement">Password</label>
            <input
              type="password"
              className="form-control"
              id="userPassElement"
              aria-describedby="userPassHelp"
              placeholder="Enter password"
              name="pass"
              value={userData.pass}
              onChange={onInputChange}
            />
            <small id="userPassHelp" className="form-text text-muted">Provide username.</small>
          </div>
          <Button variant="primary" onClick={login} disabled={isLoading}>
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
