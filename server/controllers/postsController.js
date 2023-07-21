// const Post = require('../models/Post');
const { validationResult } = require('express-validator');
const { addPostValidators } = require('../middlewares/inputValidators');
const { fetchPosts, addPost, fetchPostById } = require('../services/postService');
const tokenStorage = require('../tokens/tokens');
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
    console.log(tokenStorage);

    res.json('Ok');
    res.end();

    // const errors = validationResult(req);

    // if (!errors.isEmpty()) {
    //     return res.status(400).json({ errors: errors.array() });
    // }

    // try {
    //     await addPost({ ...req.body });

    //     res.json('All good');
    //     res.end();
    // } catch (error) {
    //     res.status(400).json('Unable to add your form, please try again later');
    //     res.end();
    // }
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