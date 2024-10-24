const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000

const UserRoute = require('./Routes/userRoute');
const PostRoute = require('./Routes/postRoute');

mongoose.connect('mongodb://localhost:27017/github-mern').then(() => {
    console.log('Database Connection : Success')
}).catch(() => {
    console.log('Database Connection : Failed')
})

app.use(express.json());
app.use(cors());

app.use('/api/user', UserRoute);
app.use('/api/post', PostRoute);

app.listen(PORT, () => {
    console.log(`Node Server running on http://localhost:${PORT}`)
});

