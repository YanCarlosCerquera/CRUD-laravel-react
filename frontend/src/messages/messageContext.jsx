import { createContext, useContext, useReducer, useCallback } from "react";
import { messageService } from "messages/messageService";


const MessageContext = createContext('');

const useMessage = () => {
  return useContext(MessageContext); 
}

const messageReducer = (message, action) => {
  switch (action.type) {
    case 'set' : {
      // Add a new message with a specified key and value
      return [
        ...message, {
          // Add new key-value pair to messages
          [action.key]: action.message,
        }

      ]
    }

    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

const MessageProvider = (props) => {
  // Initialize state and dispatch with useReducer
  const [message, dispatch] = useReducer(messageReducer, messageService)

  // Wrapper function to dispatch messages, used by components
  const messageDispatch = useCallback(async (key, value) => {
    if (key && value) {
      dispatch({
        type: 'set',
        key: key,
        message: value,
      })
    }
  }, [dispatch]);

  return (
    <MessageContext.Provider
      value={{message, messageDispatch}}
    >
      {props.children}
    </ MessageContext.Provider>
  )
}

export { MessageProvider, useMessage };