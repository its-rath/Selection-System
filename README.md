# Recycling Production Line Manager Selection System
<img width="1919" height="940" alt="image" src="https://github.com/user-attachments/assets/49b4c117-48df-4e7c-8fb4-692c516eb31b" />


## Overview
This is a standalone system for ranking candidates for a Recycling Production Line Manager role.
It includes:
- **Database**: efficient SQL schema for candidates and evaluations.
- **AI Integration**: Prompts to evaluate Crisis Management, Sustainability, and Motivation.
- **Dashboard**: React + Vite + Mantine UI for visualizing candidate rankings.

<video src="https://github.com/user-attachments/assets/fedb5f15-71e1-4193-a33b-24c4cf6b9e2b"></video>

## Setup Instructions
1. **Database Setup**:
   - Import `database/schema.sql` into your MySQL database.
   - Run `node seed.js` to generate fresh data (already generated in `database/insert_data.sql`).
2. **Dashboard Setup**:
   - `cd dashboard`
   - `npm install`
   - `npm run dev`
   - Open `http://localhost:5173`

## Submission Details
- **Code**: GitHub Repository (Source code + SQL).
- **AI Prompts**: See `AI_PROMPTS.md`.
- **Database**: 
    - Schema: `database/schema.sql`
    - Data: `database/insert_data.sql`
- **Dashboard**: React + Vite + Mantine (Source in `dashboard/`).

## Project Structure
- `/database`: SQL files and JSON dump.
- `/dashboard`: Frontend application.
- `AI_PROMPTS.md`: Evaluation criteria prompts.
- `seed.js`: Data generator script.

