import axios from "axios";
import {
    logOutStart,
    logOutSuccess,
    loginError,
    loginStart,
    loginSuccess,
    registerError,
    registerStart,
    registerSuccess,
} from "./authSlice";

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await axios.post(
            "http://localhost:3055/v1/api/shop/login",
            user,
            {
                headers: {
                    x_api_key:
                        "613b818f4ed80f72a257645e7b315282d7f85d4ddec4eba84a8e33fa5bc40143f14dc453e1145787aaf9ad62e6147e7d5c8fbe64f7592c126befc8b3d65bdf8a",
                },
            }
        );
        dispatch(loginSuccess(res.data));
        navigate("/");
    } catch (error) {
        dispatch(loginError());
        navigate("/register");
    }
};

export const registerUser = async (user, dispatch, navigate) => {
    dispatch(registerStart());
    try {
        await axios.post("http://localhost:3055/v1/api/shop/register", user, {
            headers: {
                x_api_key:
                    "613b818f4ed80f72a257645e7b315282d7f85d4ddec4eba84a8e33fa5bc40143f14dc453e1145787aaf9ad62e6147e7d5c8fbe64f7592c126befc8b3d65bdf8a",
            },
        });
        dispatch(registerSuccess());
        navigate("/login");
    } catch (error) {
        dispatch(registerError());
    }
};

export const logOut = async (dispatch, userId, accessToken, navigate) => {
    dispatch(logOutStart());
    try {
        const res = await axios.post(
            "http://localhost:3055/v1/api/shop/logout",
            {
                add: "1+1=2",
            },
            {
                headers: {
                    x_api_key:
                        "613b818f4ed80f72a257645e7b315282d7f85d4ddec4eba84a8e33fa5bc40143f14dc453e1145787aaf9ad62e6147e7d5c8fbe64f7592c126befc8b3d65bdf8a",
                    x_client_id: userId,
                    authenzication: accessToken,
                },
            }
        );
        console.log("🚀 ~ logOut ~ res:", res);
        dispatch(logOutSuccess());
        navigate("/login");
    } catch (error) {
        dispatch(loginError());
    }
};

export const handleRefreshToken = async (refreshToken, userId, accessToken) => {
    try {
        const res = await axios.post(
            "http://localhost:3055/v1/api/shop/handleRefreshToken",
            {
                refreshToken,
            },
            {
                x_api_key:
                    "613b818f4ed80f72a257645e7b315282d7f85d4ddec4eba84a8e33fa5bc40143f14dc453e1145787aaf9ad62e6147e7d5c8fbe64f7592c126befc8b3d65bdf8a",
                x_client_id: userId,
                authenzication: accessToken,
            }
        );

        return res.data;
    } catch (error) {
        console.log(error);
    }
};
