// Focus Flow Backend (Node.js + Express + MongoDB)
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const path = require('path');
const app = express();
app.use(express.json());
app.use(cors({
    origin: ['http://127.0.0.1:5000', 'http://localhost:5000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
// Serve static files from the root directory
app.use(express.static(path.join(__dirname)));

// Serve index.html for root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

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

const HabitSchema = new mongoose.Schema({
    name: String,
    type: String,
    target: mongoose.Schema.Types.Mixed,
    earlierIsBetter: Boolean,
    note: String,
    history: mongoose.Schema.Types.Mixed,
});

const Project = mongoose.model('Project', ProjectSchema);
const Habit = mongoose.model('Habit', HabitSchema);

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

// Habits API
app.get('/api/habits', async (req, res) => {
    try {
        const habits = await Habit.find();
        res.json(habits);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/habits', async (req, res) => {
    try {
        const habit = new Habit(req.body);
        await habit.save();
        res.status(201).json(habit);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/habits/:id', async (req, res) => {
    try {
        const habit = await Habit.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!habit) {
            return res.status(404).json({ error: 'Habit not found' });
        }
        res.json(habit);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/habits/:id', async (req, res) => {
    try {
        const habit = await Habit.findByIdAndDelete(req.params.id);
        if (!habit) {
            return res.status(404).json({ error: 'Habit not found' });
        }
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
