import { useState } from 'react'
import toast from "react-hot-toast";
import axios from "axios";
import { URL } from "../helper/helper.js"
import { useAuthContext } from '../context/AuthContext.jsx';

const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const signup = async ({ fullName, username, password, confirmPassword, gender }) => {
        const success = handleInputErrors({ fullName, username, password, confirmPassword,gender });
        if (!success) return;
        setLoading(true);
        try {
            const config = {
      headers: {
         "Content-type": "application/json"
      },
    };
            
            const res = await axios.post(`${URL}/api/auth/signup`,
                {fullName,username,password,confirmPassword,gender},config);
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
    return { loading, signup };
}

export default useSignup;

function handleInputErrors({ fullName, username, password, confirmPassword, gender }) {
    if (!fullName || !username || !password || !confirmPassword || !gender) {
        toast.error("Please fill all the fields");
        return false;
    }

    if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return false;
    }

    if (password.length < 6) {
        toast.error("Password must be at least 6 characters");
        return false;
    }

    return true;
}