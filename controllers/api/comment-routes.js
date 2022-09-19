const router = require('express').Router();
const { Comment } = require('../../models/');
// const withAuth = require('../../utils/auth');
//add withAuth on line 26, 42

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
      .then(dbCommentData => res.json(dbCommentData))
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});

//NEW COMMENT
router.post('/', (req, res) => {
  if (req.session.loggedIn) {
      Comment.create({
          content: req.body.content,
          postID: req.body.postID,
          userID: req.session.userID
      })
          .then(dbCommentData => res.json(dbCommentData))
          .catch(err => {
              console.log(err);
              res.status(400).json(err);
          });
  }
});

// DELETE COMMENT
router.delete('/:id', (req, res) => {
  Comment.destroy({
      where: {
          id: req.params.id
      }
  })
      .then(dbCommentData => {
          if (!dbCommentData) {
              res.status(404).json({ message: 'Comment ID not found' });
              return;
          }
          res.json(dbCommentData);
      })
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});

module.exports = router;