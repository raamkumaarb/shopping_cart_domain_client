/*global shipit*/

var process_name = 'index'
var deployPath = '/home/blake/public_html'
var currentPath = deployPath + '/current'
module.exports = function (shipit) {
  require('shipit-deploy')(shipit)
  require('shipit-shared')(shipit)

  shipit.initConfig({
    default: {
      workspace: '/tmp/sesprout-web-server',
      deployTo: '~/public_html',
      repositoryUrl: 'git@bitbucket.org:bmills22/sesprout-client.git',
      ignores: ['.git', 'node_modules'],
      branch: 'master',
      rsync: ['--del'],
      keepReleases: 2,
      key: '~/.ssh/id_rsa.pub',
      shallowClone: false
    },    
    staging: {
      servers: 'blake@sesprout-test-web-server'
    },
    production: {
      servers: 'blake@sesprout-web-server'
    }
  })

shipit.blTask('install', function () {
  return shipit.remote("cd " + currentPath + " && npm install &> /dev/null")
})

shipit.blTask('build', function () {
  return shipit.remote("cd " + currentPath + " && npm run build &> /dev/null")
})

shipit.on('deployed', function () {
  shipit.start( 'install', 'build')
})

}