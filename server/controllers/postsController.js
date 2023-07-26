const { validationResult } = require('express-validator');
const { addPostValidators } = require('../middlewares/inputValidators');
const { fetchPosts, addPost, fetchPostById, deletePost } = require('../services/postService');
const { SECRET } = require('../constants');
const jwt = require('jsonwebtoken');
const authorizedUser = require('../middlewares/authorizationMiddleware');
const router = require('express').Router();

router.get('/posts', async (req, res) => {
    try {
        const posts = await fetchPosts();

        return res.json(posts);
    } catch (error) {
        return res.status(404).json('Unable to fetch posts, please try again later');
    }
});

router.post('/posts/add', authorizedUser, addPostValidators, async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        await addPost({ ...req.body });

        return res.end();
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: 'Unable to add your post, please try again later'
        });
    }
});

router.get('/post/:id', async (req, res) => {
    try {
        const post = await fetchPostById(req.params.id);

        return res.json(post);
    } catch (error) {
        return res.status(404).json('Unable to fetch post');
    }
});

router.get('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;

        await deletePost(id);

        return res.json({
            success: true
        });

    } catch (error) {
        return res.status(400).json('Unable to delete the post');
    }
});

module.exports = router;