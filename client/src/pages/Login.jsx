import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../index.css';
import { useAuth } from "../store/auth";
import { toast } from 'react-toastify';

export const Login = () => {
    const [authUser, setAuthUser] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate();
    const { storeTokenInLS, API } = useAuth();   

    const URL = `${API}/api/auth/login`;

    const handleInput = (e) => {
        const { name, value } = e.target;
        setAuthUser({
            ...authUser,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(authUser)
            });
    
            const res_data = await response.json();

            if (response.ok) {
                storeTokenInLS(res_data.token);
                toast.success("Login Successful");

                // Check if the user is an admin and navigate accordingly
                if (res_data.isAdmin) {
                    navigate("/admin/users"); // Redirect to admin users if admin
                } else {
                    navigate("/"); // Redirect to home otherwise
                }
                
                setAuthUser({ email: "", password: "" }); // Clear form fields
            } else {
                toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
            }
        } catch (error) {
            console.log("login error", error);
            toast.error("An error occurred while logging in.");
        }
    };

    return (
        <section>
            <main>
                <div className="section-login">
                    <div className="container grid grid-two-columns">
                        <div className="login-form">
                            <h1 className="main-heading mb-3">Login</h1>
                            <br />
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    id="email"
                                    required
                                    autoComplete="off"
                                    value={authUser.email}
                                    onChange={handleInput}
                                />
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    id="password"
                                    required
                                    autoComplete="off"
                                    value={authUser.password}
                                    onChange={handleInput}
                                />
                                <button type="submit" className="btn btn-submit">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </section>
    );
};