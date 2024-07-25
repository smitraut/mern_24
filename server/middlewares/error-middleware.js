const errorMiddleware = (err, req, res, next) => {
   
    const status = err.status || 500;
    const message = err.message || "BACKEND ERROR";
    const extraDetails = err.extraDetails || "Error from backend";

    if (typeof res.status === 'function') {
        return res.status(status).json({ message, extraDetails });
    } else {
        console.error('res.status is not a function');
        next(err);
    }
};

export default errorMiddleware;
