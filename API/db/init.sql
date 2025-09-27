CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO tasks (title, description, status) VALUES
('Task 1', 'Description for Task 1', 'pending'),
('Task 2', 'Description for Task 2', 'in_progress'),
('Task 3', 'Description for Task 3', 'completed') ON CONFLICT DO NOTHING;