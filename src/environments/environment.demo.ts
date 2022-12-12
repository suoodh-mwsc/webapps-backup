export const environment = {
  production: false,
  api_url: 'https://yoda-demo.mwsc.com.mv/',
  api_server: 'demo',

  yodaBase: 'https://yoda-demo.mwsc.com.mv/',
  yodaServer: 'yoda-demo',

  adalConfig: {
    tenant: 'mwscnet.onmicrosoft.com',
    clientId: 'e325cce5-05cc-40c0-a528-46c4dbccff6b',
    popUp: false,
    // redirectUri: window.location.href.substring(0, window.location.href.lastIndexOf("/")+1), //window.location.origin + '/',
    postLogoutRedirectUri: 'https://login.microsoftonline.com/e325cce5-05cc-40c0-a528-46c4dbccff6b/oauth2/logout?post_logout_redirect_uri=https://webapps-demo.mwsc.com.mv',
    navigateToLoginRequestUrl: true,
  }
};
