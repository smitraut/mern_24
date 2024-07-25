import { useState } from "react";
import '../index.css';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from 'react-toastify';


export const Register = () => {
    const [user, setUser] = useState({
        username: "",
        email: "",
        phone: "",
        password: "",
    });

    const handleInput = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
        });
    };


    const navigate = useNavigate();

    const { storeTokenInLS, API } = useAuth();

    const URL = `${API}/api/auth/register`;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user)
            });
    
            const res_data = await response.json();
            toast(res_data);
    
            if (response.ok) {
                storeTokenInLS(res_data.token);
                toast.success("Registration Successful");
                setUser({ username: "", email: "", phone: "", password: "" });
                navigate("/");
            } else {
                toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
            }
        } catch (error) {
            console.log("register error", error);
        }
    };
    

    return (
        <>
            <section>
                <main>
                    <div className="section-registration">
                        <div className="container grid grid-two-columns">

                            <div className="registration-form">
                                <h1 className="main-heading mb-3">Registration Form</h1>
                                <br />
                                <form onSubmit={handleSubmit}>
                                    <input
                                        type="text"
                                        name="username"
                                        placeholder="Username"
                                        id="username"
                                        required
                                        autoComplete="off"
                                        value={user.username}
                                        onChange={handleInput}
                                    />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        id="email"
                                        required
                                        autoComplete="off"
                                        value={user.email}
                                        onChange={handleInput}
                                    />
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="Phone"
                                        id="phone"
                                        required
                                        autoComplete="off"
                                        value={user.phone}
                                        onChange={handleInput}
                                    />
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        id="password"
                                        required
                                        autoComplete="off"
                                        value={user.password}
                                        onChange={handleInput}
                                    />
                                    <button type="submit" className="btn btn-submit">Register</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>
            </section>
        </>
    );
};
