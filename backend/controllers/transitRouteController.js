const TransitRoute = require('../models/TransitRoute');

exports.getTransitRoutes = async (req, res) => {
  try {
    const filter = {};
    if (req.query.mode) filter.mode = req.query.mode;
    if (req.query.status) filter.status = req.query.status;
    const items = await TransitRoute.find(filter).sort({ name: 1 }).limit(100);
    res.json({ count: items.length, items });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createTransitRoute = async (req, res) => {
  try {
    const route = await TransitRoute.create(req.body);
    res.status(201).json(route);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateTransitRoute = async (req, res) => {
  try {
    const route = await TransitRoute.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!route) return res.status(404).json({ message: 'Transit route not found' });
    return res.json(route);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.deleteTransitRoute = async (req, res) => {
  try {
    const route = await TransitRoute.findByIdAndDelete(req.params.id);
    if (!route) return res.status(404).json({ message: 'Transit route not found' });
    return res.json({ message: 'Transit route deleted' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
