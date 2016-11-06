import ordersModel from '../models/orders';

export default (req, res) => {
  ordersModel.find({
    $or: [
      { companyName: req.params.name },
      { customerAddress: req.params.name },
      { orderedItem: req.params.name },
    ],
  }, (err, data) => {
    if (err) {
      res.json(false);
    } else {
      res.json(data);
    }
  });
};
