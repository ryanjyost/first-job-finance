import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('budget');
  this.route('guides', function() {
    this.route('estimate-take-home-pay', function() {
      this.route('module1', function() {
        this.route('section1');
        this.route('section2');
        this.route('section3');
        this.route('section4');
      });
      this.route('module2', function() {
        this.route('section1');
        this.route('section2');
      });
    });
  });
  this.route('localStorage');
  this.route('concepts', function() {
    this.route('pre-tax');
    this.route('gross-income');
  });
  this.route('calculators', function() {
    this.route('estimate-take-home-pay');
  });
  this.route('tools', function() {
    this.route('budget');
  });
});

export default Router;
