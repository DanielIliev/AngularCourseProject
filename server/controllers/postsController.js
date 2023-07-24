const { validationResult } = require('express-validator');
const { addPostValidators } = require('../middlewares/inputValidators');
const { fetchPosts, addPost, fetchPostById } = require('../services/postService');
const { SECRET } = require('../constants');
const jwt = require('jsonwebtoken');
const router = require('express').Router();

router.get('/posts', async (req, res) => {
    try {
        const posts = await fetchPosts();

        res.json(posts);
        res.end();
    } catch (error) {
        res.status(404).json('Unable to fetch posts, please try again later');
        res.end();
    }
});

router.post('/posts/add', addPostValidators, async (req, res) => {
    const token = req.headers['authorization'];

    if (!token) {
        res.status(401).json({
            success: false,
            message: 'Unauthorized operation'
        });
    }

    const tokenJWT = token.replace(/^Bearer\s+/, "");

    if (tokenJWT) {
        jwt.verify(tokenJWT, SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    success: false,
                    message: 'Token is not valid'
                });
            }
            req.decoded = decoded;
        });
    } else {
        return res.status(401).json({
            success: false,
            message: 'Token not provided'
        });
    }
    
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        req.body.author = req.decoded._id;
        await addPost({ ...req.body });

        res.json('All good');
        res.end();
    } catch (error) {
        res.status(400).json('Unable to add your post, please try again later');
        res.end();
    }
});

router.get('/post/:id', async (req, res) => {
    try {
        const post = await fetchPostById(req.params.id);

        res.json(post);
        res.end();
    } catch (error) {
        res.status(404).json('Unable to fetch post');
        res.end();
    }
});

module.exports = router;