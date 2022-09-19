const router = require('express').Router();
const { Post, Comment, User } = require('../models/');
const withAuth = require('../utils/auth');

//ALL POSTS
router.get('/', withAuth, (req, res) => {
  Post.findAll({
      where: {
          userID: req.session.userID
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
              attributes: ['id', 'commentText', 'postID', 'userID', 'commentDate'],
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
  })
  .then(postData => {
      const post = postData.map(post => post.get({ plain: true }));
      console.log(post);
      res.render('dashboard', { post, loggedIn: true });
  })
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});

//EDIT POST
router.get('/edit/:id', withAuth, (req, res) => {
  Post.findOne({
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
              attributes: [
                'id',
                'commentText',
                'postID',
                'userID', 
                'commentDate'
              ],
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
  })
  .then(postData => {
      if (!postData) {
          res.status(404).json({ message: 'Post ID not found'});
          return;
      }

      const post = postData.get({ plain: true });

      res.render('edit', { post, loggedIn: true });
  })
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});

module.exports = router;