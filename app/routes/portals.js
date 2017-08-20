import Ember from 'ember';

const { inject } = Ember;

export default Ember.Route.extend({
  repo: inject.service(),

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
    addPortal(newPortalObj){ //name, link
      this.get('repo').addPortal(newPortalObj);
    },

  },

  model(){
    const portals = this.get('repo').findAll('portals');

    const portalsSortedByID = portals.sort((a,b) => {
      return a.id.slice(7) > b.id.slice(7) ? 1 : -1;
    });


    return portalsSortedByID;

  }
});
