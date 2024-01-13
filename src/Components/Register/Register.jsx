import { useState } from "react";
import "./register.css";
import { registerUser } from "../../redux/apiRequest";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const Register = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newUser = {
            email,
            name,
            password,
        };
        registerUser(newUser, dispatch, navigate);
    };
    return (
        <section className="register-container">
            <div className="register-title"> Sign up </div>
            <form onSubmit={handleSubmit}>
                <label>EMAIL</label>
                <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    placeholder="Enter your email"
                />
                <label>USERNAME</label>
                <input
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="Enter your username"
                />
                <label>PASSWORD</label>
                <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="text"
                    placeholder="Enter your password"
                />
                <button> Create account </button>
            </form>
        </section>
    );
};

export default Register;
