const { getDateRangeFilter } = require('../utils/dateRangeFilter');
const User = require('../models/user');
const Exercise = require('../models/exercise');

const { ObjectId } = require('mongoose').Types;

exports.createAndSaveExercise = async (data) => {
  console.log('entered');

  try {
    if (!ObjectId.isValid(data._id)) {
      console.log('Invalid _id');
      return { error: 'Invalid user ID' };
    }

    const user = await User.findById(data._id);
    console.log('past user', user);

    if (!user) {
      console.log('User not found');
      return { error: 'User not found' };
    }

    const exercise = new Exercise({
      userId: user._id,
      username: user.username,
      description: data.description,
      duration: data.duration,
      date: data.date,
    });

    console.log("gotten exercise", exercise);

    const savedExerciseObj = await exercise.save();
    
    return {
      username: savedExerciseObj.username,
      description: savedExerciseObj.description,
      duration: savedExerciseObj.duration,
      date: savedExerciseObj.date.toDateString(),
      _id: savedExerciseObj.userId,
    };
  } catch (err) {
    console.error(err);
    return { error: err.message };
  }
};

exports.retrieveExercisesLog = async (userId, queryParams) => {
  try {
    const dateQuerySettings = getDateRangeFilter(queryParams);
    const query = Object.keys(dateQuerySettings).length > 0 ? { userId: userId, date: dateQuerySettings } : { userId: userId };

    const exercises = await Exercise.find(query).limit(queryParams.limit);

    const count = exercises.length;

    const log = exercises.map((exercise) => ({
      description: exercise.description,
      duration: exercise.duration,
      date: exercise.date.toDateString(),
    }));

    const user = await User.findById(userId);
    const username = user.username;

    return {
      username,
      _id: userId,
      count,
      log,
    };
  } catch (err) {
    return { error: err };
  }
};
