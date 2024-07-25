import React from "react";
import "../index.css";
import { useAuth } from "../store/auth";

export const About = () => {
    
        const { user } = useAuth();


        return (
        <section className="about-section">
            <div className="container">
                <div className="about-content">
                    <h1 className="about-heading">
                        Welcome, 
                        { user ? ` ${user.username}  to our website` : `to our website` } </h1>
                    <p className="about-description">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla convallis libero quis enim congue feugiat. 
                        Sed tincidunt sed nisi ac consectetur. Integer gravida semper felis vel aliquam. Sed dapibus et odio non 
                        malesuada. Integer vulputate congue imperdiet. Aliquam erat volutpat. Suspendisse auctor posuere velit 
                        aliquet pellentesque. Quisque tempor et metus sed convallis. Nulla tempus quam vitae velit lobortis tempor. 
                        Nullam pretium rutrum nulla, nec eleifend enim. Nullam et magna congue, molestie turpis sit amet, dapibus 
                        ligula. Curabitur suscipit lacus a orci egestas varius. Fusce at orci in neque rutrum tincidunt a at elit. 
                        Nam iaculis malesuada est id sagittis.
                    </p>
                    <p className="about-description">
                        In ultricies, est vel suscipit fermentum, metus orci rutrum urna, sit amet cursus ipsum massa nec arcu. 
                        Suspendisse potenti. Phasellus et tortor sed leo lobortis gravida. Quisque rhoncus laoreet tellus non 
                        ullamcorper. Etiam sollicitudin ultrices dolor, nec condimentum quam finibus nec. Morbi pellentesque 
                        volutpat pretium. Integer imperdiet risus vitae accumsan efficitur. Donec nec justo purus. Proin 
                        fringilla nisl at ante blandit, ut dapibus sapien interdum. Aenean ultrices pretium ultricies. In 
                        fringilla nunc nec nunc accumsan volutpat. Proin sit amet nulla a nulla sodales blandit.
                    </p>
                </div>
            </div>
        </section>
    );
};

