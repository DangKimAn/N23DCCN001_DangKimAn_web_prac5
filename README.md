# Student API

REST API for managing student records with MongoDB.

## Features

- Create student: `POST /api/students`
- List students with pagination and major filtering: `GET /api/students`
- Get student details: `GET /api/students/:id`
- Update student: `PUT /api/students/:id`
- Soft delete student: `DELETE /api/students/:id`
- Update score only: `PATCH /api/students/:id/score`
- Get top students: `GET /api/students/top?limit=5`
- Get average score: `GET /api/students/stats/avg`
- Search by name: `GET /api/students/search?q=keyword`

## Model

- `studentId` (String, unique, required)
- `name` (String, required)
- `email` (String, required, unique)
- `score` (Number, min 0, max 100, default 0)
- `major` (String, enum: IT, Business, Design, Marketing)
- `enrollmentDate` (Date, default Date.now)
- `isActive` (Boolean, default true)

## Setup

1. Copy `.env.example` to `.env`
2. Install dependencies:

```bash
npm install
```

3. Start development server:

```bash
npm run dev
```

4. Open API at `http://localhost:3000`
