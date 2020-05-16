import tcb from 'tcb-js-sdk'

const envId = process.env.ENV_ID
let app = tcb.init({
  env: envId
});

async function checkAuth() {
  const loginState = app.auth().hasLoginState();

  if (!loginState) {
    return app.auth().anonymousAuthProvider()
      .signIn()
  }
}

export default async function () {
  await checkAuth()
  return app
}
