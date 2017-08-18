import Ember from 'ember';

export default Ember.Route.extend({
  cards: [
          {
            name: 'Chase Checking Account',
            // notes: 'You landed a job and know how much money you\'ll make. But how much will actually hit your bank account after taxes and retirement savings?',
            lastVisited: '3 days ago',
            link: 'https://www.chase.com/',
            autoPay: true,
          },
          {
            name: 'Chase Checking Account',
            // notes: 'You landed a job and know how much money you\'ll make. But how much will actually hit your bank account after taxes and retirement savings?',
            lastVisited: '3 days ago',
            link: 'https://www.chase.com/',
            autoPay: false,
          },
          {
            name: 'Chase Checking Account is the best account in the world I cant freaking believe how good it is',
            // notes: 'You landed a job and know how much money you\'ll make. But how much will actually hit your bank account after taxes and retirement savings?',
            lastVisited: '3 days ago',
            link: 'https://www.chase.com/',
            autoPay: true,
          },
          {
            name: 'Chase Checking Account',
            // notes: 'You landed a job and know how much money you\'ll make. But how much will actually hit your bank account after taxes and retirement savings?',
            lastVisited: '3 days ago',
            link: 'https://www.chase.com/',
            autoPay: false,
          },
          {
            name: 'Chase Checking Account',
            // notes: 'You landed a job and know how much money you\'ll make. But how much will actually hit your bank account after taxes and retirement savings?',
            lastVisited: '3 days ago',
            link: 'https://www.chase.com/',
            autoPay: true,
          },
          {
            name: 'Chase Checking Account',
            // notes: 'You landed a job and know how much money you\'ll make. But how much will actually hit your bank account after taxes and retirement savings?',
            lastVisited: '3 days ago',
            link: 'https://www.chase.com/',
            autoPay: true,
          },
  ],

  actions: {
    addPortal(){
      alert('hey there')
      return 2;
    }
  },

  model(){
    return Ember.RSVP.hash({
      cards: this.get('cards')
    })
  }
});
