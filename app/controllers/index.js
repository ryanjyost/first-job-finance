import Ember from 'ember';

export default Ember.Controller.extend({
  repo: Ember.inject.service(),

  filterButtons: [{label: 'Everything', value: null},{label: 'Calculators', value: 'calculator'},{label: 'Guides', value: 'guide'},{label: 'Tools', value: 'tool'},{label: 'Links', value: 'links'},],

  cards: [
          {
            title: 'Estimate Your Take-Home Pay',
            description: 'You landed a job and know how much money you\'ll make. But how much will actually hit your bank account after taxes and retirement savings?',
            comingSoon: false,
            link: 'calculators.estimate-take-home-pay',
            type: 'calculator'
          },
          {
            title: 'Estimate Your Take-Home Pay',
            description: 'This is a step-by-step guide for estimating your take home pay.',
            comingSoon: true,
            link: 'calculators.estimate-take-home-pay',
            type: 'guide'
          },
          {
            title: 'Create a Budget',
            description: 'This is a tool to create a budget.',
            comingSoon: true,
            link: 'tools.budget',
            type: 'tool'
          },
  ],

});
