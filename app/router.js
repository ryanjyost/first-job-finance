import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('budget');
  this.route('guides', function() {
    this.route('estimate-take-home-pay', function() {});
  });
});

export default Router;
