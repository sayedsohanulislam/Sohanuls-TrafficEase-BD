# TrafficEase BD - CSE470 Software Engineering Project

## Project Title
TrafficEase BD: Intelligent Multi-Modal Urban Mobility and Traffic Management Platform

## Tech Stack
- Frontend: React.js + CSS + Leaflet.js
- Backend: Node.js + Express.js
- Database: MongoDB
- Authentication: JWT + bcrypt
- Architecture: MVC (strictly followed)

## Implemented Modules
- JWT login and registration with commuter, driver, admin, and authority roles
- Live traffic command center with congestion, speed, queue, signal, camera, transit, weather, dispatch, and route recommendation panels
- Live traffic map with incident markers, vehicle markers, and colored corridor pressure overlays
- Incident reporting and incident status management
- Vehicle registration, fleet status, and vehicle statistics
- Public alert publishing
- Parking lot capacity and availability tracking
- Traffic signal monitoring
- Public transit route management
- Operations summary dashboard
- 30-feature platform module showcase

## 30 Feature Modules
1. Live congestion index
2. Corridor speed monitor
3. Queue length estimator
4. Signal phase tracking
5. Adaptive signal timing
6. Signal failure alerts
7. Incident reporting
8. Incident verification queue
9. Emergency vehicle priority
10. School-zone safety mode
11. Weather impact scoring
12. Flood-prone road alerts
13. Air quality mobility note
14. Bus route status
15. Metro connection status
16. Transit delay prediction
17. Crowding level monitor
18. Parking availability
19. Parking demand forecast
20. Ride-share pickup zones
21. CNG stand availability
22. Pedestrian crossing load
23. Road work scheduling
24. Event traffic plan
25. Route recommendation
26. ETA comparison
27. Hotspot heat ranking
28. Authority dispatch board
29. Public alert broadcast
30. Audit-ready activity log

## Setup Instructions

### Backend
```bash
cd backend
npm install
# Optional: create .env file
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm start
```

### MongoDB
Use MongoDB Atlas or local MongoDB. Update MONGO_URI in backend/.env

## Environment Variables (backend/.env)
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/trafficease_bd
JWT_SECRET=your_super_secret_key
```

## Frontend Environment Variables
Create `frontend/.env` only if the backend is not running at `http://localhost:5000`.

```
REACT_APP_API_URL=http://localhost:5000/api
```

## Main API Routes
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/summary`
- `GET, POST /api/incidents`
- `GET, POST /api/vehicles`
- `GET, POST /api/alerts`
- `GET, POST /api/parking`
- `GET, POST /api/signals`
- `GET, POST /api/transit`
- `GET /api/live-traffic`
- `GET /api/live-traffic/features`

## Notes
- Login/Registration is mandatory but NOT part of the 20 features.
- Follow MVC strictly.
- Use GitHub and add faculty as collaborator.
