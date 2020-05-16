const envId = process.env.ENV_ID

export default async function () {
  return {
    callFunction({
      name,
      data
    }) {
      return wx.cloud.callFunction({
        name,
        data,
        config: {
          env: envId
        }
      })
    }
  }
}
