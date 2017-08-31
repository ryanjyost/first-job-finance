import Ember from 'ember';

const { inject } = Ember;

export default Ember.Route.extend({
  repo: inject.service(),

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
