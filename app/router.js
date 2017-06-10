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
      this.route('gross-income', function() {
        this.route('intro');
        this.route('enter-income');
        this.route('income-periods');
        this.route('payroll-period');
      });
    });
  });
  this.route('localStorage');
});

export default Router;
