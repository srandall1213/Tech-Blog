const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

//All Users
router.get('/', (req, res) => {
  User.findAll({
      attributes: { exclude: ['password'] }
  })
      .then(userData => res.json(userData))
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});

//Single User
router.get('/:id', (req, res) => {
  User.findOne({
      attributes: { exclude: ['password'] },
      where: {
          id: req.params.id
      },
      include: [
          {
              model: Post,
              attributes: ['id', 'title', 'content', 'postDate']
          },
          {
              model: Comment,
              attributes: ['id', 'commentText', 'commentDate'],
              include: {
                  model: Post,
                  attributes: ['title']
              }
          }
      ]
  })
      .then(userData => {
          if (!userData) {
              res.status(404).json({ message: 'User ID not found' });
              return;
          }
          res.json(userData);
      })
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});


//Sign-up
router.post('/', async (req, res) => {
    User.create({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
      })
  
      .then(userData => {
        req.session.save(() => {
          req.session.userID = userData.id;
          req.session.username = userData.username;
          req.session.loggedIn = true;
          res.status(200).json(userData);
        });
      })
});


// Log-in
router.post('/login', async (req, res) => {
    try {
      const userData = await User.findOne({
        where: {
          username: req.body.username,
        },
      });
  
      if (!userData) {
        res
          .status(400)
          .json({ message: 'Incorrect username or password' });
        return;
      }
  
      const validPassword = await userData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect username or password' });
        return;
      }
  
      req.session.save(() => {
        req.session.userID = userData.id;
        req.session.username = userData.username;
        req.session.loggedIn = true;
        console.log(
          'file: user-routes.js ~ req.session.save ~ req.session.cookie 🚀',
          req.session.cookie
        );
  
        res
          .status(200)
          .json({ user: userData, message: 'Success!' });
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
  
// Log-out
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
        res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;