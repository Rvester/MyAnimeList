import { Link } from "react-router-dom";

function Navbar({ user, setUser }) {
  const logout = () => {
    setUser({});
    localStorage.removeItem("token");
  };

  if (user) {
    return (
      <ul className="navBar">
        <li className="luffy">
          <Link to="/" style={{ textDecoration: "none" }}>
            <img className="Goku" src="./Goku.png" alt="Luffy Icon" id="icon" />
          </Link>
        </li>
        <li>
          <Link to="/profile" style={{ textDecoration: "none" }}>
            Profile
          </Link>
        </li>
        <li onClick={logout}>
          <Link style={{ textDecoration: "none" }}>Logout</Link>
        </li>
      </ul>
    );
  } else {
    return (
      <ul className="navBar">
        <li>
          <Link to="/">
            <img className="Goku" src="./Goku.png" alt="Luffy Icon" id="icon" />
          </Link>
        </li>
        <li className="navBar">
          <Link to="/login" style={{ textDecoration: "none" }}>
            Login
          </Link>
        </li>
        <li className="navBar">
          <Link to="/register" style={{ textDecoration: "none" }}>
            Register
          </Link>
        </li>
      </ul>
    );
  }
}

export default Navbar;
