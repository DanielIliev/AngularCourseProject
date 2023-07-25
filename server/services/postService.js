const Post = require('../models/Post.js');
const authService = require('./authService.js');

exports.fetchPosts = async () => await Post.find().lean();

exports.fetchPostById = async (id) => {
    const post = await Post.findOne({ '_id': id }).lean();
    const authorId = String(post.author);
    const author = await authService.findById(authorId);

    const data = Object.assign({}, post);
    data.authorName = author.username;

    return data;
}

exports.addPost = async (data) => await Post.create({ ...data });

exports.deletePost = async (id) => await Post.findOneAndDelete({ '_id': id });