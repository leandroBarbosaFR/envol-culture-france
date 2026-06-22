import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'yrndrbta',
    dataset: 'production'
  },
  deployment: {
    appId: 'pdmw9ojwlevruwsxn0l2r04m',
    autoUpdates: true,
  }
})
