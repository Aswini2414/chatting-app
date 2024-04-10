import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { URL } from "../helper/helper";
import { useAuthContext } from "../context/AuthContext";

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const login = async (username,password) => {
        const success = handleInputErrors(username, password);
        if (!success) return;
        setLoading(true);
        try {
            const config = {
                headers: {
                    "Content-type": "application/json"
                }
            }
            const res = await axios.post(`${URL}/api/auth/login`, { username, password }, config);
            if (res.error) {
                throw new Error(res.error);
            }
            localStorage.setItem("chat-user", res.data);
            setAuthUser(res.data);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return { loading, login };
};

export default useLogin;

const handleInputErrors = (username,password) => {
    if (!username || !password) {
        toast.error("Please fill in all fields");
        return false;
    }
    return true;
}