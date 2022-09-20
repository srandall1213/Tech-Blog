const router = require('express').Router();
const { User, Post, Comment } = require('../models');

//ALL POSTS (homepage)
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            attributes: [
                'id',
                'title',
                'content',
                'postDate'
            ],
            include: [
                {
                    model: Comment, 
                    attributes: ['id', 'commentText', 'commentDate', 'userID', 'postID'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ],
        });

        const posts = postData.map((post) => post.get({ plain: true }));
        res.render('homepage', { posts, loggedIn: req.session.loggedIn });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


//SINGLE POST
router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findOne({
            where: {
                  id: req.params.id
                },
                attributes: [
                    'id',
                    'title',
                    'content',
                    'postDate'
                ],
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'commentText', 'commentDate', 'userID', 'postID'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        });

        if (!postData) {
            res.status(404).json({ message: 'Post ID not found' });
            return;
        }
        const posts = postData.get({ plain: true });
        console.log(posts)
        res.render('singlepost', { posts , loggedIn: req.session.loggedIn });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//LOGIN PAGE
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

module.exports = router;