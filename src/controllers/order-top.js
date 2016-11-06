import ordersModel from '../models/orders';

export default (req, res) => {
  const agg = [
    { $group: {
      _id: '$orderedItem',
      timesOrdered: { $sum: 1 },
    } },
    { $sort: {
      timesOrdered: -1,
    } },
  ];

  ordersModel.aggregate(agg, (err, orders) => {
    if (err) {
      throw err;
    } else {
      res.json(orders.map((order) => {
        const orderCopy = order;
        /* eslint-disable */
        orderCopy.orderedItem = order._id;
        delete orderCopy._id;
        /* eslint-enable */
        return orderCopy;
      }));
    }
  });
};
