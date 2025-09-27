require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.json());

// Endpoint to get all tasks
app.get('/tasks', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM tasks ORDER BY id');
        res.json(result.rows); 
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Endpoint to create a new task
app.post('/tasks', async (req, res) => {
    const { title, description } = req.body;
    if (!title) return res.status(400).json({ error: 'Title is required' });
    const { rows } = await db.query(
        'INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *',
        [title, description || '']
    );
    res.status(201).json(rows[0]);
});

// Endpoint to update a task
app.put('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, status } = req.body;
    const { rows } = await db.query(
        'UPDATE tasks SET title = $1, description = $2, status = $3 WHERE id = $4 RETURNING *',
        [title, description, status, id]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'Task not found' });
    res.json(rows[0]);
});

// Endpoint to delete a task
app.delete('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const { rowCount } = await db.query('DELETE FROM tasks WHERE id = $1', [id]);
    if (rowCount === 0) return res.status(404).json({ error: 'Task not found' });
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});