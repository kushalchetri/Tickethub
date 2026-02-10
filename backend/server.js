import express from 'express';
import cors from 'cors';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Load tickets data
const ticketsData = JSON.parse(
    readFileSync(join(__dirname, 'data', 'tickets.json'), 'utf-8')
);

// Routes
app.get('/api/tickets', (req, res) => {
    try {
        res.json(ticketsData);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch tickets' });
    }
});

app.get('/api/tickets/:id', (req, res) => {
    try {
        const ticketId = parseInt(req.params.id);
        const ticket = ticketsData.find(t => t.id === ticketId);

        if (!ticket) {
            return res.status(404).json({ error: 'Ticket not found' });
        }

        res.json(ticket);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch ticket' });
    }
});

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'TicketHub API is running' });
});

app.listen(PORT, () => {
    console.log(`🎫 TicketHub API running on http://localhost:${PORT}`);
    console.log(`📊 Serving ${ticketsData.length} tickets`);
});
