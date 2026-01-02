# Champ Code Academy - Tutor Portal Frontend Implementation

## Project Overview
This project is a frontend system for Champ Code Academy's tutor portal, designed to provide tutors with core functions including login, schedule viewing, and available class claiming. The system adheres to modern UI/UX design standards and combines a high-performance frontend technology stack to achieve a smooth interactive experience and complete business functions.

## Online Preview
✅ Deployed to GitHub Pages: [https://coder-dmcqt.github.io/ui-frontend-test_champcodeacademy888/](https://coder-dmcqt.github.io/ui-frontend-test_champcodeacademy888/)

## Core Functionality Implementation
### 1. Basic Features (Meeting All Core Requirements)
- **Login Page**: Simulated login authentication with automatic redirection to the tutor dashboard after login
- **Dashboard Core Modules**:
    - Historic Lessons (Completed)
    - Upcoming Lessons
    - Available Lessons (with "Take Class" action button)
    - Today’s Lessons
- **Lesson Card Display**: Fully displays date, time, student list, subject, lesson type, and other information
- **Date Filter Function**: Lessons are grouped by month by default, supporting date range filtering with dynamic re-rendering of the lesson list after filtering

### 2. Technical Implementation Highlights
- **API Interaction Layer**: Uses ServiceWorker + MSW for request interception, with a clear request structure based on native Fetch for elegant request/response handling
- **Data Persistence**: Implements lesson data and user state persistence based on IndexedDB to enhance offline experience
- **State Management**: Integrates Zustand for state management with persistence support, ensuring predictable data flow
- **Styling Implementation**: Fully developed with Styled Components without third-party UI library dependencies, with an interface that meets Western aesthetic standards and clear visual hierarchy
- **Interactive Experience**:
    - Implemented light/dark mode toggle
    - Added smooth animation transitions for route navigation/loading/lesson cards
    - Custom Message/Notification components for friendly operation feedback

### 3. Technology Stack
- Framework: Next.js + TypeScript
- Styling: Styled Components
- State Management: Zustand (with persistence)
- API Mocking: MSW + ServiceWorker
- Data Persistence: IndexedDB
- Animation: CSS Transitions + Keyframe Animations

## Project Deployment & Running
### Environment Requirements
- Node.js >= 16.x
- npm/yarn/pnpm

### Installation & Startup
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build production version
npm run build:inner

# Preview production version
npm run start