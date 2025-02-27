# Video Platform API & Frontend

## Features
- Fetch latest videos from the backend
- Pagination for video listing (8 per page)
- Real-time updates for new videos using WebSockets
- Advanced Searchbar(Debounce)
- Simple and user-friendly interface


## Setup Instructions

### Backend Setup

1. Navigate to the backend folder:
   ```sh
   cd server
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the server:
   ```sh
   node server.js
   ```
3. The backend runs on `http://localhost:3000`

### Frontend Setup
1. Navigate to the frontend folder:
   ```sh
   cd client
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend:
   ```sh
   npm run dev
   ```
4. The frontend runs on `http://localhost:5173`

## API Endpoints
- `GET /api/videos?page=1&limit=10&search=keyword` - Fetch paginated videos
- WebSocket event `new_video` - Receives real-time new video updates

## Pagination Logic
- The frontend sends a request with `page` and `limit` parameters
- The backend responds with `totalPages` to track available pages
- Users can navigate to the next or previous page without refreshing

## Contributing
1. Fork the repository
2. Create a new branch
3. Commit changes
4. Push to your fork and create a pull request

