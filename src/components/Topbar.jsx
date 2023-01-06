import { Box} from "@mui/material";
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import { logout } from "../Redux/authSlice";
import { useDispatch, useSelector } from "react-redux";

const Topbar = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  return (
    <Box display="flex" justifyContent="flex-end" p={2}>
      <Box display="flex">
      {user || isAuthenticated === false ? // user && isAuthenticated
      (
        <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Tài khoản
        </Dropdown.Toggle>
  
        <Dropdown.Menu>
          <Dropdown.Item href="/change-password">Đổi mật khẩu</Dropdown.Item>
          <Dropdown.Item>
          <span onClick={() => dispatch(logout())}>Đăng xuất</span>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      ): (
        <Link to="/login" className="nav-link">Login
        </Link>
      )}
      </Box>
    </Box>
  );
};

export default Topbar;
