import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/apiRequest";
const NavBar = () => {
    // const [user, setUSer] = useState(null);
    // setUSer;
    const user = useSelector((state) => state.authUser.login.currentUser);
    console.log("🚀 ~ NavBar ~ user:", user?.metaData?.data?.name);

    const userId = user?.metaData?.data?._id;

    const accessToken = user?.metaData?.tokens?.accessToken;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        // dispatch, userId, accessToken, navigate
        console.log("🚀 ~ NavBar ~ userId:", userId);
        console.log("🚀 ~ NavBar ~ accessToken:", accessToken);

        logOut(dispatch, userId, accessToken, navigate);
    };

    const nameUser = user?.metaData?.data?.name;
    return (
        <nav className="navbar-container">
            <Link to="/" className="navbar-home">
                Home
            </Link>
            {user ? (
                <>
                    <p className="navbar-user">
                        Hi, <span> {nameUser} </span>
                    </p>
                    <Link
                        onClick={handleLogout}
                        to="/logout"
                        className="navbar-logout"
                    >
                        Log out
                    </Link>
                </>
            ) : (
                <>
                    <Link to="/login" className="navbar-login">
                        Login
                    </Link>
                    <Link to="/register" className="navbar-register">
                        Register
                    </Link>
                </>
            )}
        </nav>
    );
};

export default NavBar;
