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

    const defaultWebsites = [
      {
        "id":"portal_0",
        "name":"First Job Finance Blog",
        "portalInfo": "Not so shameless plug for our blog." ,
        "link":"https://medium.com/first-job-finance"
      },
      {
        "id":"portal_1",
        "name":"Free Annual Credit Reports",
        "portalInfo": "You get one free report from Equifax, Experian and TransUnion every year." ,
        "link":"https://www.annualcreditreport.com/index.action"
      },
      {
        "id":"portal_2",
        "name":"IRS.gov",
        "portalInfo": "Everything about taxes you could possibly need." ,
        "link":"https://www.irs.gov/"
      },
      {
        "id":"portal_3",
        "name":"NerdWallet",
        "portalInfo": "Articles and information about personal finance." ,
        "link":"https://www.nerdwallet.com/"
      },
      {
        "id":"portal_4",
        "name":"Bankrate",
        "portalInfo": "Articles and information about personal finance." ,
        "link":"http://www.bankrate.com/"
      },
      {
        "id":"portal_5",
        "name":"DMV.org",
        "portalInfo": "All the car information." ,
        "link":"http://www.dmv.org/"
      },
      {
        "id":"portal_6",
        "name":"The Balance",
        "portalInfo": "Articles and information about personal finance." ,
        "link":"https://www.thebalance.com/"
      },
    ];

    return Ember.RSVP.hash({
      userPortals: portalsSortedByID,
      defaultWebsites
    });

  }
});
