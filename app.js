// Focus Flow Backend (Node.js + Express + MongoDB)
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/focusflow', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Schemas
const SubtaskSchema = new mongoose.Schema({
    title: String,
    timeSpent: Number,
    isTimerRunning: Boolean,
    isExpanded: Boolean,
    isCompleted: Boolean,
    inToday: Boolean,
    inWeek: Boolean,
    dailyGoal: Number,
    dailyProgress: Number,
    timeEntries: Array,
    start: String,
    end: String,
    progress: Number,
});

const TaskSchema = new mongoose.Schema({
    title: String,
    timeSpent: Number,
    isTimerRunning: Boolean,
    isExpanded: Boolean,
    isCompleted: Boolean,
    inToday: Boolean,
    inWeek: Boolean,
    dailyGoal: Number,
    dailyProgress: Number,
    isBillable: Boolean,
    hourlyRate: Number,
    pomodoroDuration: Number,
    timeEntries: Array,
    start: String,
    end: String,
    progress: Number,
    subtasks: [SubtaskSchema],
});

const ProjectSchema = new mongoose.Schema({
    name: String,
    tasks: [TaskSchema],
});

const Project = mongoose.model('Project', ProjectSchema);

// API Endpoints
app.get('/api/projects', async (req, res) => {
    const projects = await Project.find();
    res.json(projects);
});

app.post('/api/projects', async (req, res) => {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
});

app.put('/api/projects/:id', async (req, res) => {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(project);
});

app.delete('/api/projects/:id', async (req, res) => {
    await Project.findByIdAndDelete(req.params.id);
    res.status(204).end();
});

// Add more endpoints for tasks, subtasks, time entries as needed

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
