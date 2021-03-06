/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
// export const environment = {
//   production: true,
// };
import { Environment } from '@abp/ng.core';
import { baseUrl } from '../environments/environment';

export const environment = {
  production: true,
  application: {
    baseUrl: baseUrl,
    name: 'SiPM',
    logoUrl: '',
  },
  oAuthConfig: {
    issuer: 'https://apisipm.cagt.top',
    redirectUri: baseUrl,
    clientId: 'SiPM_Web',
    responseType: 'code',
    scope: 'offline_access SiPM',
  },
  apis: {
    default: {
      url: 'https://apisipm.cagt.top',
      rootNamespace: 'SiPM',
    },
  },
} as Environment;
