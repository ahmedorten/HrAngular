// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  appVersion: 'v717demo2',
  apiUrl:'https://localhost:44328/api',
  serverURL:'https://localhost:44328',
  whitelistedDomains:["localhost:44328"],
  blacklistedRoutes:["localhost:44328/api/auth/login"]
};

