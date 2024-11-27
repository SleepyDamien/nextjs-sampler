Project Plan: Idle RPG Browser Game Sample

Project Overview:
	Build a simple idle RPG using Next.js.
	Core features: fighting monsters, looting, and purchasing items.
	Utilize API calls for game functionality.
	Phase 1: Basic Functionality
	Tasks & Deliverables
	Gold Over Time (Idle Mechanic):
	
	Implement a backend service to calculate gold accumulation.
	Create a simple UI element displaying current gold.
	Gold accumulates based on a fixed interval (e.g., every 10 seconds).
	Formula: gold gain = base_rate + (player_level × multiplier).
	Monster Fight with Output:
	
	Design a "Fight Monster" button for manual combat.
	Create an "Auto-Fight" toggle for continuous fighting.
	Backend logic:
	Randomly determine the outcome of fights.
	Award experience points and loot for victories.
	Placeholder visuals for combat logs (e.g., "You dealt 10 damage, monster defeated!").
	Player Levels & Scaling:
	
	Implement player levels, experience points (EXP), and HP.
	Create EXP scaling:
	Formula: EXP required = base_exp × (player_level ^ multiplier).
	Design simple UI for player stats:
	Current level.
	Total EXP and progress to next level.
	Current HP.
	API Restriction/Throttling:
	
	Set rate limits for API endpoints (e.g., max 1 fight request per second).
	Prevent abuse with simple cooldown timers on the client.
	Monitor usage metrics for scalability.
Technology Stack
	Frontend:
	
	Framework: Next.js
	State management: React Context or Zustand (lightweight for this project)
	Styling: CSS Modules or Tailwind CSS
	Backend:
	
	API: Next.js API Routes
	Database: SQLite or a simple JSON-based structure (for prototyping)
	Rate Limiting: Middleware (e.g., express-rate-limit or next-rate-limit)
	Hosting:
	
	Vercel for deployment (Next.js optimized).
	Database hosting (if required): Supabase or AWS RDS for small-scale use.
Development Workflow
	Set Up Project:
	
	Initialize Next.js project.
	Create API routes for core functionality (/api/gold, /api/fight, etc.).
	Gold Accumulation:
	
	Build an idle timer system using setInterval or browser storage.
	Sync client gold with the server every X seconds.
	Combat Mechanics:
	
	Implement backend combat logic (player HP, monster damage, EXP).
	Store fight results and rewards in the database.
	Player Stats & Scaling:
	
	Design level and EXP systems on the backend.
	Develop UI components for displaying stats.
	API Rate Limiting:
	
	Implement server-side rate-limiting middleware.
	Add cooldown visual indicators on the frontend.
	Testing & Debugging:
	
	Ensure all features work across devices and browsers.
	Test for security (e.g., API misuse).