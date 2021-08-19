/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.


import { Environment } from '@abp/ng.core';

export const baseUrl = 'localhost:4200';

export const environment = {
  production: false,
  application: {
    baseUrl,
    name: 'SiPM',
    logoUrl: '',
  },
  oAuthConfig: {
    issuer: 'https://apisipm.cagt.top',
    redirectUri: baseUrl,
    clientId: 'SiPM_App',
    responseType: 'code',
    scope: 'offline_access openid profile role email phone SiPM',
  },
  apis: {
    default: {
      url: 'https://apisipm.cagt.top',
      rootNamespace: 'SiPM',
    },
  },
} as Environment;


// export const environment = {
//   production: false,
//   apiUrl:'https://apisipm.migroup.asia/api/app',
// };



