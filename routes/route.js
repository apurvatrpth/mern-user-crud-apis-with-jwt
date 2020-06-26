const router = require('express').Router();
const jwt = require('jsonwebtoken');
const user = require('../models/userModel');

function authenticateHeaders(req, res, next) {
  const authHeader = req.headers.authorization;
  const tokenFromBody = authHeader && authHeader.split(' ')[1];

  const data = jwt.verify(
    tokenFromBody,
    '539baf3eaa0c66ad5d10f4a58fe85c192e6c7a01cfdbec2ffe77cd7d7ab9f8b7ee2b377dc78ce20443671915f016a32f8f12fe1cfab7388a3b9c8429011e3808',
  );
  user.findOne({ name: data.name, password: data.pass }, (err, data2) => {
    console.log(data2);

    if (err) {
      res.status(401).send({ error: 'Not authorized to access this resource' });
    }

    req.user = data2;
    next();
  });
}

router.get('/', (req, res) => {
  user
    .find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json({ msg: `error displaying: ${err}` }));
});

router.post('/register', (req, res) => {
  const { name } = req.body;
  const { email } = req.body;
  const { phone } = req.body;
  const { password } = req.body;

  // creating new object for user

  const newUser = new user({
    name,
    email,
    phone,
    password,
  });

  // adding that object to db
  newUser
    .save()
    .then(() => res.json({ msg: 'User added successfully' }))
    .catch((err) => res.status(400).json({ msg: `Error adding user:  ${err}` }));
});

router.post('/login', (req, res) => {
  const { name } = req.body;
  const pass = req.body.password;

  const userObject = { name, pass };

  const accessToken = jwt.sign(
    userObject,
    '539baf3eaa0c66ad5d10f4a58fe85c192e6c7a01cfdbec2ffe77cd7d7ab9f8b7ee2b377dc78ce20443671915f016a32f8f12fe1cfab7388a3b9c8429011e3808',
  );

  res.json({ accessToken });
});

router.get('/user/me', authenticateHeaders, (req, res) => {
  console.log('inside user/me');

  console.log(req.user);
  res.send(req.user);
});

module.exports = router;
