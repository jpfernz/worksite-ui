import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';

import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      webServerCommands: {
        default: 'nx run worksite-ui:serve:development',
        production: 'nx run worksite-ui:serve:production',
      },
      ciWebServerCommand: 'nx run worksite-ui:serve-static',
    }),
    baseUrl: 'http://localhost:4200',
    setupNodeEvents(on, config) {
      on('before:browser:launch', (browser, launchOptions) => {
        if (browser.name === 'chrome') {
          launchOptions.args.push('--window-size=1920,1080');
          return launchOptions;
        }
      });
    },
  },
});
