import React, {useState} from "react";
import { Button } from 'react-bootstrap';
import { Request, Globals } from '../../constants';
import * as alertify from 'alertifyjs';

const LogoutButton = ({logoutCallback}) => {
  const [isLoading, setIsLoading] = useState(false);
  const logout = () => {
    const token = localStorage.getItem('logout-token');

    setIsLoading(true);
    Request(Globals.route.logout, {}, {token}, 'POST', (data) => {
      setIsLoading(false);
      alertify.success('Logged out');
      localStorage.removeItem('xcsrf-token');
      localStorage.removeItem('logout-token');
      logoutCallback(false);
    },
    (error) => {
      setIsLoading(false);
    });
  }
  return (
    <Button variant="primary" onClick={logout} disabled={isLoading}>
      Logout
    </Button>
    );
}

export default LogoutButton;
