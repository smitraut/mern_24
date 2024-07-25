import { useState, useEffect } from "react";
import '../index.css';
import { useAuth } from "../store/auth";
import { toast } from 'react-toastify';

export const Contact = () => {
    const [contact, setContact] = useState({
        username: "",
        email: "",
        message: "",
    });

    const { user, API } = useAuth();

    const URL = `${API}/api/form/contact`;


    useEffect(() => {
        if (user) {
            setContact({
                username: user.username || "",
                email: user.email || "",
                message: "", // Reset message field if user changes
            });
        }
    }, [user]);

    const handleInput = (e) => {
        const { name, value } = e.target;
        setContact(prevContact => ({
            ...prevContact,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Contact:', contact);
        try {
            const response = await fetch(URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(contact)
            });
            if (response.ok) {
                toast.success("Message sent");
                setContact({ username: user.username, email: user.email, message: "" });
            } else {
                const res_data = await response.json();
                toast.error(res_data.message || "Failed to send message");
            }
            console.log(response);
        } catch (error) {
            console.log("Contact error", error);
        }
    };

    return (
        <section>
            <main>
                <div className="section-contact">
                    <div className="container grid grid-two-columns">
                        <div className="contact-form">
                            <h1 className="main-heading mb-3">Contact</h1>
                            <br />
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    id="username"
                                    required
                                    autoComplete="off"
                                    value={contact.username}
                                    onChange={handleInput}
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    id="email"
                                    required
                                    autoComplete="off"
                                    value={contact.email}
                                    onChange={handleInput}
                                />
                                <input
                                    type="text"
                                    name="message"
                                    placeholder="Message"
                                    id="message"
                                    required
                                    autoComplete="off"
                                    value={contact.message}
                                    onChange={handleInput}
                                />
                                <button type="submit" className="btn btn-submit">Send Message</button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </section>
    );
};
