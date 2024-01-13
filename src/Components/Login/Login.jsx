import { useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/apiRequest";
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newUser = {
            email,
            password,
        };
        loginUser(newUser, dispatch, navigate);
    };

    return (
        <section className="login-container">
            <div className="login-title">Log in</div>
            <form onSubmit={handleSubmit}>
                <label>EMAIL</label>
                <input
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    placeholder="Enter your username"
                />
                <label>PASSWORD</label>
                <input
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Enter your password"
                />
                <button>LOGIN</button>
            </form>
            <div className="login-register"> Dont have an account yet? </div>
            <Link className="login-register-link" to="/register">
                Register one for free
            </Link>
        </section>
    );
};

export default Login;
