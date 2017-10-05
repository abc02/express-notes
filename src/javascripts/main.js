require('normalize.css')
require('scss/fonts.scss')
require('scss/reset.scss')


require('app/index.js')

var Toast = require('modules/toast.js').Toast

Toast('hello, word')
