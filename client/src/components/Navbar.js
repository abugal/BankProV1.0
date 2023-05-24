import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
//import { useLogout } from "../hooks/useLogout";
import Container from "react-bootstrap/Container";
//import Navbar from "react-bootstrap/Navbar";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  }

    return (
      <>
        <Container bg="primary" variant="dark">
          <header bg="primary" variant="dark">
            <div className="container">
              <Link to="/">
                <h3>AbuBank</h3>
              </Link>
              <Link to="/deposit">
                <h3>deposit</h3>
              </Link>
              <nav>
                {user && (
                  <div>
                    <span>{user.email}</span>
                    <button onClick={handleClick}>Log out</button>
                  </div>
                )}

                {!user && (
                  <div>
                    <Link to="/login">Login</Link>
                    <Link to="/signup">SignUp</Link>
                  </div>
                )}
              </nav>
            </div>
          </header>
        </Container>
      </>
    );
  };

export default Navbar;
