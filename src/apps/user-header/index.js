import React, {useState, useEffect} from "react";
import { Button } from 'react-bootstrap';
import { Request, Globals } from '../../constants';
import { useSelector, useDispatch } from 'react-redux';
import * as alertify from 'alertifyjs';
import { updateUserConfig, setListData, setLoadingState } from '../../actions/list';


const LogoutButton = ({logoutCallback}) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const userInfo = useSelector(state => state.user);
  const logout = () => {
    const token = localStorage.getItem('logout-token');

    setIsLoading(true);
    Request(Globals.route.logout, {}, {token}, 'POST', (data) => {
      setIsLoading(false);
      alertify.success('Logged out');
      localStorage.removeItem('xcsrf-token');
      localStorage.removeItem('logout-token');
      localStorage.removeItem('user_id');
      logoutCallback(false);
      dispatch(updateUserConfig({}));
      dispatch(setListData([]));
      dispatch(setLoadingState(false));
    },
    (error) => {
      setIsLoading(false);
    });
  }

  useEffect(() => {
    Request(`${Globals.route.user}/${localStorage.getItem('user_id')}` , {}, {}, 'GET', (data) => {
      dispatch(updateUserConfig(data));
    });
  }, [dispatch]);
  return (
    <div className="d-flex justify-content-end align-items-center">
      <div className="mr-4">
        Hi,
        <strong>{userInfo.name ? userInfo.name[0].value : '...'}</strong>
      </div>
      <Button variant="primary" onClick={logout} disabled={isLoading}>
        Logout
      </Button>
    </div>
    );
}

export default LogoutButton;
