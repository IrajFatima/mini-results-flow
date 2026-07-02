const express = require('express');
const router = express.Router();

const {
    submitForm,
    getFormData,
    deleteFormData
} = require('../controllers/formController');

router.post('/', submitForm);
router.get('/:id', getFormData);
router.delete('/:id', deleteFormData);

module.exports = router;