const mongoose = require('mongoose');
const Posts = require('../models/Posts');
const UserSchema = require('../models/User');

//@@ Method         GET
//@@ Endpoint       /posts
//@@ Description    Gets all the posts from the database
exports.getPosts = async (req, res, next) => {
    try {
        const posts = await Posts.find().select('-user.email -user._id -user.createdAt');

        res.status(200).json({
            success: true,
            data: posts
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            data: error
        })
    }
}

//@@ Method         GET
//@@ Endpoint       /posts/:id
//@@ Description    Gets a single post by it's ID
exports.getSinglePost = async (req, res, next) => {
    try {
        const posts = await Posts.findById(req.params.id);
        res.status(200).json({
            success: true,
            data: posts
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            data: error
        })
    }
}

//@@ Method         POST
//@@ Endpoint       /posts
//@@ Description    Create a new post into the database
exports.postPosts = async (req, res, next) => {
    const { userBody } = req.body;
    try {
        //userBody = req.user;

        req.body.user = await UserSchema.findById(req.user.id);
        const post = await Posts.create(req.body);
        
        res.status(200).json({
            success: true,
            data: post
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            data: error
        })
    }
}

exports.getPersonalPosts = async (req, res, next) => {
    try {

        const user = req.user;

        const posts = await Posts.find({user: user});

        res.status(200).json({
            data: posts
        });

    } catch (error) {
        
    }
}