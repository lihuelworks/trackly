const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const userController = require('./controllers/user');
const exerciseController = require('./controllers/exercise');

const app = express();

app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect(process.env['MONGO_URI'], {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.post('/api/users', async (req, res) => {
  try {
    const { username } = req.body;
    const result = await userController.createAndSaveUser(username);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating user' });
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const result = await userController.findAllUsers();
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error retrieving users' });
  }
});

app.post('/api/users/:_id/exercises', async (req, res) => {
  try {
    const { _id } = req.params;
    const { description, duration, date } = req.body;
    const formattedDate = date ? new Date(date) : new Date();
    const data = { _id, description, duration, date: formattedDate };

    console.log("gotten data", data)

    const result = await exerciseController.createAndSaveExercise(data);

    if (result.error) {
      return res.status(400).json({ error: result.error });  // Return error if present
    }

    res.json(result);  // Otherwise, return the result
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error saving exercise' });
  }
});


app.get('/api/users/:_id/logs', async (req, res) => {
  try {
    const { _id: userId } = req.params;
    let { from, to, limit } = req.query;

    if (to) to = new Date(to);
    if (from) from = new Date(from);
    if (limit) limit = parseInt(limit);

    const queryParams = { from, to, limit };

    const result = await exerciseController.retrieveExercisesLog(userId, queryParams);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error retrieving exercise logs' });
  }
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});
