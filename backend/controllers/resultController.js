const resultRepository = require("../repositories/resultRepository");

const getResult = async (req, res) => {
    try {
        const { id } = req.params;

        const cards = await resultRepository.getResult(id);

        if (!cards) {
            return res.status(404).json({
                success: false,
                message: "Result not found.",
            });
        }

        res.status(200).json({
            success: true,
            data: cards,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
};

module.exports = {
    getResult,
};