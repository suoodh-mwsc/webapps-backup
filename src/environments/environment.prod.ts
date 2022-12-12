export const environment = {
  production: true,
  api_url: 'https://yoda.mwsc.com.mv/',
  api_server: 'yoda',

  yodaBase: 'https://yoda.mwsc.com.mv/',
  yodaServer: 'yoda-live',

  adalConfig: {
    tenant: 'mwscnet.onmicrosoft.com',
    clientId: 'e325cce5-05cc-40c0-a528-46c4dbccff6b',
    popUp: false,
    // redirectUri: window.location.href.substring(0, window.location.href.lastIndexOf("/")+1), //window.location.origin + '/',
    postLogoutRedirectUri: 'https://login.microsoftonline.com/e325cce5-05cc-40c0-a528-46c4dbccff6b/oauth2/logout?post_logout_redirect_uri=https://webapps.mwsc.com.mv',
    navigateToLoginRequestUrl: true,
  }

};
