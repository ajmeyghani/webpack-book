console.log('mod loaded');
require.ensure([], function (require) {
  require('dependent');
});
module.exports = 'mod';
