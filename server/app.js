const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const tasksRouter = require('./routes/tarefas');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/tasks', tasksRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});