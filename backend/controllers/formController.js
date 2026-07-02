const formRepository = require("../repositories/formRepository");

const submitForm = async (req, res) => {
    try {
        const {
            gender,
            bodyFatPercent,
            BMI,
            calorieTarget,
            waterIntake,
            weightLossRate,
            seeResultsDays,
        } = req.body;

        if (
            !gender ||
            bodyFatPercent == null ||
            BMI == null ||
            calorieTarget == null ||
            waterIntake == null ||
            weightLossRate == null ||
            seeResultsDays == null
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required.",
            });
        }

        const insertedForm = await formRepository.createForm({
            gender,
            bodyFatPercent,
            BMI,
            calorieTarget,
            waterIntake,
            weightLossRate,
            seeResultsDays,
        });

        res.status(201).json({
            success: true,
            message: "Form submitted successfully.",
            id: insertedForm.id,
        });
    } catch (error) {
        console.error("Error submitting form:", error);
        res.status(500).json({
            success: false,
            message: "An error occurred while submitting the form.",
        });
    }
};

const getFormData = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "ID parameter is required.",
            });
        }

        const form = await formRepository.getFormById(id);

        if (!form) {
            return res.status(404).json({
                success: false,
                message: "Form Data not found.",
            });
        }

        res.status(200).json({
            success: true,
            data: form,
        });
    } catch (error) {
        console.error("Error fetching Form Data:", error);
        res.status(500).json({
            success: false,
            message: "An error occurred while fetching the Form Data.",
        });
    }
};

const deleteFormData = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "ID parameter is required.",
            });
        }

        const deletedForm = await formRepository.deleteFormById(id);

        if (!deletedForm) {
            return res.status(404).json({
                success: false,
                message: "Form Data not found.",
            });
        }

        res.status(200).json({
            success: true,
            message: "Form Data deleted successfully.",
        });
    } catch (error) {
        console.error("Error deleting Form Data:", error);
        res.status(500).json({
            success: false,
            message: "An error occurred while deleting the Form Data.",
        });
    }
};

module.exports = {
    submitForm,
    getFormData,
    deleteFormData,
};