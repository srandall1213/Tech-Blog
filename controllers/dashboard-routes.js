const router = require('express').Router();
const { Post, Comment, User } = require('../models/');
// const withAuth = require('../utils/auth');
//add withAuth on line 7 & 44

//ALL POSTS
router.get('/', (req, res) => {
  Post.findAll({
      where: {
          userID: req.session.userID
      },
      attributes: [
          'id',
          'title',
          'contents',
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
  .then(dbPostData => {
      const post = dbPostData.map(post => post.get({ plain: true }));
      res.render('dashboard', { post, loggedIn: true });
  })
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});

//EDIT POST
router.get('/edit/:id', (req, res) => {
  Post.findOne({
      where: {
          id: req.params.id
      },
      attributes: [
          'id',
          'title',
          'contents',
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
  .then(dbPostData => {
      if (!dbPostData) {
          res.status(404).json({ message: 'Post ID not found'});
          return;
      }

      const post = dbPostData.get({ plain: true });

      res.render('edit', { post, loggedIn: true });
  })
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});

module.exports = router;