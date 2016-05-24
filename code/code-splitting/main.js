var a = require("./a"); /* nothing special, executed when index loads */

/* router */
function index() {
  document.querySelector('p').textContent = 'viewing index';
}

/* about function is executed when on the `about` page */
function about() {
  document.querySelector('p').textContent = 'viewing about';
    require.ensure(['./c', './d'], function(require) { /* `c, d` can be syncronously required in the callback */
        require('./c'); /* downloaded and executed on-demand syncronously */
        require('./d'); /* /* downloaded and executed on-demand syncronously */
    });
}


page.base('/basic');
page('/', index);
page('/about', about);
page();
