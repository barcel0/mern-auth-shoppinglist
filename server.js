const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');
const port = process.env.PORT || 5000;

//Routes
const itemRoutes = require('./routes/api/items');
const userRoutes = require('./routes/api/users');
const authRoutes = require('./routes/api/auth');

//Server Config
app.use(express.json());
app.use('/api/items', itemRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

//DB Config
const db = config.get('mongoURI');
mongoose.connect(process.env.MONGODB_URI || db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => console.log('MongoDB connected.'))
  .catch(err => console.log(err));

//Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  //set static folder
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

//Listen
app.listen(port, () => console.log('Server listening on port ' + port + '...'));