import ordersModel from '../models/orders';

export default (req, res) => {
  ordersModel.findById(req.params.id, (err, data) => {
    if (err) {
      res.json(false);
    } else {
      res.json(data);
    }
  });
};
