import ordersModel from '../models/orders';

export default (req, res) => {
  ordersModel.findByIdAndRemove(req.params.id, req.body, (err, data) => {
    if (err) {
      res.json(false);
    } else {
      res.json(data);
    }
  });
};
