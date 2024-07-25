import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../store/auth";
import '../AdminUpdate.css';
import { toast } from "react-toastify";

export const AdminUpdate = () => {
    const [data, setData] = useState({
        username: "",
        email: "",
        phone: "",
    });

    const params = useParams();
    const { authorizationToken, API } = useAuth(); 

    const getSingleUserData = async () => {
        try {
            const response = await fetch(`${API}/api/admin/users/${params.id}/edit`, {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const userData = await response.json();
            setData(userData);
        } catch (error) {
            console.log("Error fetching user data:", error);
        }
    };

    useEffect(() => {
        getSingleUserData();
    }, []);

    const handleInput = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API}/api/admin/users/update/${params.id}`, 
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: authorizationToken,
                    },
                    body: JSON.stringify(data)
                }
            );   

            if (response.ok) {
                toast.success("Updated Successfully");
                window.location.href = '/admin/users';
            } else {
                toast.error("Not Updated");
            }
        } catch (error) {
           console.log(error);
           toast.error("An error occurred");
        }        
        console.log("Form submitted:", data);
    };

    return (
        <div className="admin-update-container">
            <h1 className="admin-update-title">Update User</h1>
            <form className="admin-update-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={data.username}
                        onChange={handleInput}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={data.email}
                        onChange={handleInput}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone:</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={data.phone}
                        onChange={handleInput}
                    />
                </div>
                <button type="submit" className="submit-button">Update User</button>
            </form>
        </div>
    );
};