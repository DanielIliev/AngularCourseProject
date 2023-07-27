const router = require('express').Router();
const { validationResult } = require('express-validator');
const { registerValidators } = require('../middlewares/inputValidators.js');
const authService = require('../services/authService.js');

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const token = await authService.login(username, password);
        await authService.login(username, password);

        res.json(token);
        res.end();
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
        res.end();
    }
});

router.post('/register', registerValidators, async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    if (req.body.password !== req.body.repass) {
        return res.status(400).json('Passwords must match');
    }

    try {
        const { username, email, password} = req.body;

        await authService.register(username, email, password);

        res.json({ message: 'Registered!' });
        res.end();
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'We are unable to register account, please try again later'
        });
        res.end();
    }
});

router.get('/logout', (req, res) => {
    res.json({ message: 'Logged out' });
    res.end();
    // TODO: Remove JWT token ?
});

module.exports = router;