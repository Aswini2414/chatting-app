import { useState } from "react";
import { toast } from "react-hot-toast";
import useConversation from "../zustand/useConversation";
import { URL } from "../helper/helper";
import { useAuthContext } from "../context/AuthContext";
import axios from "axios";

const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();
    const { authUser } = useAuthContext();
    
    const sendMessage = async (message) => {
        setLoading(true);
        try {
          const config = {
            headers: {
              Authorization: `Bearer ${authUser.token}`,
            },
          };
          const res = await axios.post(
            `/api/messages/send/${selectedConversation._id}`,
            { message },config
            );
            if (res.error) {
                throw new Error(res.error);
            }
            setMessages([...messages, res.data]);
        } catch (error) {
          toast.error(error.message);
        } finally {
          setLoading(false);
        }
    }
    return { loading, sendMessage };
}
export default useSendMessage;