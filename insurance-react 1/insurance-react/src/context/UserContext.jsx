import { createContext, useContext, useState } from 'react';
 
const UserContext = createContext();
 
export const UserProvider = ({ children }) => {
    const [userId, setUserId] = useState(null);
    const [userName, setUserName] = useState(null);
    const [userEmail, setUserEmail] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [authToken, setAuthToken] = useState(null);
    const [policyId, setPolicyId] = useState(null);
 
    return (
        <UserContext.Provider value={{ userId, setUserId, userName, setUserName, userEmail, setUserEmail, userRole, setUserRole, authToken, setAuthToken,policyId, setPolicyId }}>
            {children}
        </UserContext.Provider>
    );
};
 
export const useUserContext = () => useContext(UserContext);