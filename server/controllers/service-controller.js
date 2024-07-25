import Service from "../models/service-model.js";

export const services = async (req, res) => {
    try {
        const response = await Service.find();
        if (!response || response.length === 0) {
            return res.status(404).json({ msg: "No services found" });
        }
        res.status(200).json({ msg: response });
    } catch (error) {
        console.error(`services error: ${error}`);
        res.status(500).json({ msg: "Server error" });
    }
};
