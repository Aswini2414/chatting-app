import { useState, useEffect } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import axios from "axios";
import { URL } from "../helper/helper";
import { useAuthContext } from "../context/AuthContext";

const useGetMessages = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();
    const { authUser } = useAuthContext();

    useEffect(() => {
      const getMessages = async () => {
          try {
              const config = {
                headers: {
                  Authorization: `Bearer ${authUser.token}`,
                },
              };
          const res = await axios.get(
            `${URL}/api/messages/${selectedConversation._id}`,config
          );
          if (res.error) {
            throw new Error(res.error);
          }
          setMessages(res.data);
        } catch (error) {
          toast.error(error.message);
        } finally {
          setLoading(false);
        }
      };

        if (selectedConversation?._id) {
          getMessages();
      }
      
    }, [selectedConversation?._id,setMessages]);

    return {messages,loading}
}

export default useGetMessages;