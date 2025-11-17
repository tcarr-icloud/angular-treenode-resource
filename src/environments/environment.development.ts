export const environment = {
  production: false,
  apiUrl: 'http://localhost:8081/api',
  oidc: {
    realm: 'development',
    authority: 'http://localhost:9000/realms/development',
    clientId: 'spa-client',
    userinfo_endpoint: 'http://localhost:9000/realms/development/protocol/openid-connect/userinfo',
  }
};
