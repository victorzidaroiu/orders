import ordersModel from '../models/orders';

export default (req, res) => {
  ordersModel.find({ }, (err, orders) => {
    if (err) {
      res.json(false);
    } else {
      res.json(orders);
    }
  });
};
