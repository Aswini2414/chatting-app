import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { URL } from "../helper/helper";
import { useAuthContext } from '../context/AuthContext.jsx';

const useGetConversations = () => {
    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState([]);
    const { authUser } = useAuthContext();

    useEffect(() => {
        const getConversations = async () => {
            setLoading(true);
            const config = {
                headers: {
                    Authorization : `Bearer ${authUser.token}`
                }
            }
            try {
                const res = await axios.get("http://localhost:5000/api/users",config);
                if (res.error) {
                    throw new Error(res.error);
                }
                setConversations(res.data);
                
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
    
        }
        getConversations();
    }, []);

    return { loading, conversations };

}

export default useGetConversations;