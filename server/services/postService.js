const Post = require('../models/Post.js');

exports.fetchPosts = async () => await Post.find().lean();

exports.fetchPostById = async(id) => await Post.findOne({'_id': id});

exports.addPost = async (data) => {
    const { title, content } = data;

    await Post.create({title, content});
}