import { useAuth } from "../store/auth";
import "../Services.css";

export const Services = () => {
    const { services } = useAuth();
    return (
        <section className="section-services">
            <div className="container">
                <h1 className="main-heading">Services</h1>
            </div>

            <div className="container grid">
                {services.map((curElem, index) => {
                    const { price, description, provider, service } = curElem;

                    return (
                        <div className="card" key={index}>
                            <div className="card-img">
                                <img src="../src/assets/react.svg" alt="img" height={130} />
                            </div>
                            <div className="card-details">
                                <div className="card-header">
                                    <p className="provider">{provider}</p>
                                    <p className="price">{price}</p>
                                </div>
                                <h2 className="service-title">{service}</h2>
                                <p className="description">{description}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};
