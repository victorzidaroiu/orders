import ordersModel from '../models/orders';

export default(req, res) => {
  ordersModel.create(req.body, (err, data) => {
    if (err) {
      res.json(false);
    } else {
      res.json(data);
    }
  });
};
