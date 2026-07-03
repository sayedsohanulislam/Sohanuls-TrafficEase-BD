const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/trafficease_bd', {
  serverSelectionTimeoutMS: 5000
})
  .then(async () => {
    console.log('MongoDB Connected');
    try {
      const Incident = require('./models/Incident');
      const Vehicle = require('./models/Vehicle');
      const Alert = require('./models/Alert');
      const ParkingLot = require('./models/ParkingLot');
      const TrafficSignal = require('./models/TrafficSignal');
      const TransitRoute = require('./models/TransitRoute');
      const mockDb = require('./data/mockDatabase');

      if ((await Incident.countDocuments()) === 0) {
        await Incident.insertMany(mockDb.incidents.map(({ _id, ...rest }) => rest));
        console.log('Seeded incidents');
      }
      if ((await Vehicle.countDocuments()) === 0) {
        await Vehicle.insertMany(mockDb.vehicles.map(({ _id, ...rest }) => rest));
        console.log('Seeded vehicles');
      }
      if ((await Alert.countDocuments()) === 0) {
        await Alert.insertMany(mockDb.alerts.map(({ _id, ...rest }) => rest));
        console.log('Seeded alerts');
      }
      if ((await ParkingLot.countDocuments()) === 0) {
        await ParkingLot.insertMany(mockDb.parking.map(({ _id, ...rest }) => rest));
        console.log('Seeded parking');
      }
      if ((await TrafficSignal.countDocuments()) === 0) {
        await TrafficSignal.insertMany(mockDb.signals.map(({ _id, ...rest }) => rest));
        console.log('Seeded signals');
      }
      if ((await TransitRoute.countDocuments()) === 0) {
        await TransitRoute.insertMany(mockDb.transit.map(({ _id, ...rest }) => rest));
        console.log('Seeded transit');
      }
    } catch (err) {
      console.warn('Seeding skipped/failed:', err.message);
    }
  })
  .catch(err => console.error(err));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/vehicles', require('./routes/vehicleRoutes'));
app.use('/api/incidents', require('./routes/incidentRoutes'));
app.use('/api/alerts', require('./routes/alertRoutes'));
app.use('/api/parking', require('./routes/parkingRoutes'));
app.use('/api/signals', require('./routes/trafficSignalRoutes'));
app.use('/api/transit', require('./routes/transitRouteRoutes'));
app.use('/api/summary', require('./routes/summaryRoutes'));
app.use('/api/live-traffic', require('./routes/liveTrafficRoutes'));

app.get('/', (req, res) => {
  res.json({ message: 'TrafficEase BD API is running...' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
