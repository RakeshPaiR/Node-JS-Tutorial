const Post = require('../models/post')

exports.getPosts = (req, res) => {
  const posts = Post.find()
    .select('title body _id')
    .then((posts) => {
        res.json({posts})
    })
    .catch(err => console.log(err));
};
exports.createPost = (req, res) => {
    const post = new Post(req.body);
    // console.log("CREATING POST: ", req.body);
    /* post.save((err, result) => {
        res.status(200).json({
            post: result
        });
    }); */
    post.save().then(result => {
        res.status(200).json({
            post: result
        });
    });
};