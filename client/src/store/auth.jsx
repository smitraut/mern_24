import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(null);
    const [services, setServices] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const authorizationToken = `Bearer ${token}`;


    const API = import.meta.env.VITE_API;

    const storeTokenInLS = (serverToken) => {
        setToken(serverToken);
        localStorage.setItem('token', serverToken);
    };

    const isLoggedIn = !!token;

    const LogoutUser = () => {
        setToken("");
        setUser(null);
        localStorage.removeItem("token");
    };

    // JWT authentication to get currently logged-in user data
    const userAuthentication = async () => {
        setIsLoading(true);
        try {
            if (!token) {
                setIsLoading(false);
                return;
            }
            setIsLoading(true);
            const response = await fetch(`${API}/api/auth/user`, {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data.userData);
                setIsLoading(true);
            } else {
                // If the token is invalid, clear it
                LogoutUser();
            }
        } catch (error) {
            console.log("Error fetching user data", error);
        } finally {
            setIsLoading(false);
        }
    };

    //to fetch services  data from database
    const getServices = async() => {
        try {
            const response = await fetch(`${API}/api/data/service`, {
                method: "GET",
            });
            if(response.ok) {
                const data = await response.json();
                setServices(data.msg)
            } else {
                console.error('Service fetch failed:', response.status, response.statusText);
                const text = await response.text();
                console.error('Response:', text);
            }
        } catch (error) {
            console.log(`services frontend error: ${error}`);
        }
    }

    useEffect(() => {
        getServices();
        userAuthentication();
    }, []);

    return (
        <AuthContext.Provider value={{ 
            isLoggedIn, 
            storeTokenInLS, 
            LogoutUser, 
            user, 
            isLoading, 
            services, 
            authorizationToken,
            API,
             }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    if (!authContextValue) {
        throw new Error("useAuth used outside of the provider");
    }
    return authContextValue;
}

