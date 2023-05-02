import { createContext, useCallback, useState } from 'react';

interface IUserPriorityContext {
  userPriority: string | null;
  setPriority: (priority) => void;
}

export const UserPriorityContext = createContext<IUserPriorityContext>({
  userPriority: null,
  setPriority: () => {}
});

const UserPriorityProvider = ({ children }) => {

  const [userPriority, setUserPriority] = useState<string | null>(null);

  const setPriority = useCallback((priority) => {
    setUserPriority(priority);
  }, [])


  // console.log("chainId = ", chainId);

  return (
    <UserPriorityContext.Provider 
      value={{ 
        userPriority,
        setPriority
      }}>
      {children}
    </UserPriorityContext.Provider>
  )
}

export default UserPriorityProvider;