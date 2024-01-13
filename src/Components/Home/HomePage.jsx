import { useDispatch, useSelector } from "react-redux";
import "./home.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { handleRefreshToken } from "../../redux/apiRequest";
import { loginSuccess } from "../../redux/authSlice";

const HomePage = () => {
    const axiosJWT = axios.create();
    const user = useSelector((state) => state.authUser.login?.currentUser);
    const accessToken = user?.metaData?.tokens?.accessToken;
    const refreshToken = user?.metaData?.tokens?.refreshToken;
    const userId = user?.metaData?.data?._id;
    const dispatch = useDispatch();
    console.log("🚀 ~ HomePage ~ user:", user);
    // const dispatch = useDispatch();
    const navigate = useNavigate();
    //DUMMY DATA
    const userData = [
        {
            username: "anhduy1202",
        },
        {
            username: "kelly1234",
        },
        {
            username: "danny5678",
        },
        {
            username: "kenny1122",
        },
        {
            username: "jack1234",
        },
        {
            username: "loi1202",
        },
        {
            username: "nhinhi2009",
        },
        {
            username: "kellynguyen1122",
        },
    ];
    if (!user) {
        navigate("/login");
    }

    // Cần tokens thì dùng axiosJWT chứ không dùng dùng axios vì axiosJWT đã
    // được config để check trước khi gửi dữ liệu và hết hạn của accessToken
    axiosJWT.interceptors.request.use(
        async (config) => {
            const decodeToken = jwtDecode(accessToken);
            console.log(
                "🚀 ~ axiosJWT.interceptors.request.use ~ decodeToken:",
                decodeToken
            );
            const date = new Date();
            if (decodeToken.exp < date.getTime() / 1000) {
                // refreshToken, userId, accessToken
                const data = await handleRefreshToken(
                    refreshToken,
                    userId,
                    accessToken
                );

                const refreshUser = {
                    ...user,
                    accessToken: data.metaData.tokens.accessToken,
                    refreshToken: data.metaData.tokens.refreshToken,
                };

                dispatch(loginSuccess(refreshUser));
                // Khi hết hạn thì sẽ tự động thêm mới vào header
                config.headers["authenzication"] =
                    data.metaData.tokens.accessToken;
            }
            return config;
        },
        (err) => {
            return Promise.reject(err);
        }
    );

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [navigate, user]);

    return (
        <main className="home-container">
            <div className="home-title">User List</div>
            <div className="home-userlist">
                {userData.map((user, index) => {
                    return (
                        <div key={index + 3 + "abc"} className="user-container">
                            <div className="home-user">{user.username}</div>
                            <div className="delete-user"> Delete </div>
                        </div>
                    );
                })}
            </div>
        </main>
    );
};

export default HomePage;
