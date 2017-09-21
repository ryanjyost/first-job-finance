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
    const defaultPortal =
      {
        "id":"portal_0",
        "name":"Visit your most important personal finance sites",
        "lastVisited": Date.now(),
        "link":"https://www.youtube.com/watch?v=dQw4w9WgXcQ"
      };

    const portals = this.get('repo').findAll('portals');

    if(portals.length < 1){
      portals.push(defaultPortal);
    }



    const defaultWebsites = [
      {
        "id":"0",
        "name":"First Job Finance Blog",
        "portalInfo": "Not so shameless plug for our blog." ,
        "link":"https://medium.com/first-job-finance"
      },
      {
        "id":"1",
        "name":"Free Annual Credit Reports",
        "portalInfo": "You get one free report from Equifax, Experian and TransUnion every year." ,
        "link":"https://www.annualcreditreport.com/index.action"
      },
      {
        "id":"2",
        "name":"IRS.gov",
        "portalInfo": "Everything about taxes you could possibly need." ,
        "link":"https://www.irs.gov/"
      },
      {
        "id":"3",
        "name":"NerdWallet",
        "portalInfo": "Articles and information about personal finance." ,
        "link":"https://www.nerdwallet.com/"
      },
      {
        "id":"4",
        "name":"Bankrate",
        "portalInfo": "Articles and information about personal finance." ,
        "link":"http://www.bankrate.com/"
      },
      {
        "id":"5",
        "name":"DMV.org",
        "portalInfo": "All the car information." ,
        "link":"http://www.dmv.org/"
      },
      {
        "id":"6",
        "name":"The Balance",
        "portalInfo": "Articles and information about personal finance." ,
        "link":"https://www.thebalance.com/"
      },
    ];

    return Ember.RSVP.hash({
      userPortals: portals,
      defaultWebsites
    });

  }
});
