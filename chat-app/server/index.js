const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 5000;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/chat-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define Models (User, Chat, Reel, News)
const ChatSchema = new mongoose.Schema({
  sender: String,
  message: String,
  timestamp: { type: Date, default: Date.now },
});

const Chat = mongoose.model('Chat', ChatSchema);

app.use(express.json());

// Chat route
app.post('/chat', async (req, res) => {
  const chat = new Chat(req.body);
  await chat.save();
  res.status(200).json(chat);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


// Update index.js

const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: { origin: "*" },
});

io.on('connection', (socket) => {
  console.log('New user connected');
  
  socket.on('sendMessage', (message) => {
    io.emit('receiveMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
