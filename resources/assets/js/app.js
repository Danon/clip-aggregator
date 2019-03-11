/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap')

window.Vue = require('vue')

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.component('featured-clip', require('./components/FeaturedClip.vue'))
Vue.component('comments-manager', require('./components/CommentsManager.vue'))
Vue.component('search', require('./components/Search.vue'))
Vue.component('search-results', require('./components/SearchResults.vue'))
Vue.component('front-page', require('./components/FrontPage.vue'))
//Vue.component('thumb-ratings', require('./components/ThumbRatings.vue'))

const app = new Vue({
	el: '#app'
})

module.exports = app
