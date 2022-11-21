import { Link, NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useDispatch, useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import { logout } from "../Redux/authSlice";
import "./StyledNavbar.scss";

const NavHeader = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  console.log("user", user);
  return (
    <div className="nav-header">
      <Navbar bg="header" expand="lg">
        <Container>
          {user?.roleId === 1 ?
            <Navbar.Brand href="/" className="nav-branch">
              Nhóm 7
            </Navbar.Brand> :
            <></>
          }
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink to="/" exact className="nav-link">
                DashBoard
              </NavLink>
              <NavLink to="/demographic" exact className="nav-link">
                Nhân khẩu
              </NavLink>
              <NavLink to="/household" exact className="nav-link">
                Hộ khẩu
              </NavLink>
              <NavLink to="/tabernacle" exact className="nav-link">
                Tạm trú
              </NavLink>
              <NavLink to="/absent" exact className="nav-link">
                Tạm vắng
              </NavLink>
              <NavLink to="/about" exact className="nav-link">
                About
              </NavLink>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              {user && isAuthenticated === true ? (
                <>
                  <Nav.Item className="nav-link" href="#">
                    Xin chào, {user?.firstName + " " + user?.lastName}
                  </Nav.Item>
                  <NavDropdown title="Cài đặt" id="basic-nav-dropdown">
                    <NavDropdown.Item >
                      <Link to="/change-password" style={{textDecoration: 'none'}}>
                        Đổi mật khẩu
                      </Link>

                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <span onClick={() => dispatch(logout())}>Đăng xuất</span>
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};
export default NavHeader;
