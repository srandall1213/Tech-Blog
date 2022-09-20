const router = require('express').Router();
const { Comment } = require('../../models/');
const withAuth = require('../../utils/auth');

//ALL COMMENTS
router.get('/', (req, res) => {
    Comment.findAll({
        attributes: [
            'id',
            'commentText',
            'userID',
            'postID',
            'commentDate'
        ],
        order: [['commentDate', 'DESC']]
    })
    .then(commentData => res.json(commentData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//NEW COMMENT
router.post('/', withAuth, (req, res) => {
    if (req.session.loggedIn) {
        Comment.create({
            commentText: req.body.commentText,
            postID: req.body.postID,
            userID: req.session.userID
        })
        .then(commentData => res.json(commentData))
        
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    }
});

// DELETE COMMENT (future development)

module.exports = router;