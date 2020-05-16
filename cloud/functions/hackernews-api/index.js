// 云函数入口文件
const cloud = require("tcb-admin-node");

cloud.init({
  env: cloud.getCurrentEnv(),
});

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database({
    env: cloud.getCurrentEnv(),
  });

  const {
    type,
    page = 1,
    perPage = 10,
    orderField = "time",
    order = "desc",
  } = event;

  const collection = db.collection("hackernews");

  let query = collection.where({
    type,
  });

  const countRes = await query.count();
  const getRes = await query
    .skip((page - 1) * perPage)
    .limit(perPage)
    .orderBy(orderField, order)
    .get();

  if (getRes.code) {
    return getRes;
  }

  const result = {
    data: getRes.data,
    total: countRes.total,
  };

  return result;
};
