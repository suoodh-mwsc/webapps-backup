export const environment = {
  production: false,
  api_url: 'https://yoda-dev.mwsc.com.mv/',
  api_server: 'localhost',

  yodaBase: 'https://yoda-dev.mwsc.com.mv/',
  // yodaBase: 'https://yoda-demo.mwsc.com.mv/',
  // yodaBase: 'https://yoda-dev.mwsc.com.mv/',
  // yodaBase: 'https://yoda-dev-01.mwsc.com.mv/',
  // yodaBase: 'https://yoda-dev-02.mwsc.com.mv/',
  // yodaBase: 'http://localhost/Yoda/',
  yodaServer: 'localhost',

  adalConfig: {
    tenant: 'mwscnet.onmicrosoft.com',
    clientId: 'e325cce5-05cc-40c0-a528-46c4dbccff6b',
    popUp: false,
    // redirectUri: window.location.href.substring(0, window.location.href.lastIndexOf("/")+1), //window.location.origin + '/',
    postLogoutRedirectUri: 'https://login.microsoftonline.com/e325cce5-05cc-40c0-a528-46c4dbccff6b/oauth2/logout?post_logout_redirect_uri=https://localhost:4200/login',
    navigateToLoginRequestUrl: true,
  }

};
