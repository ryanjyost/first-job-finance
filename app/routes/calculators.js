import Ember from 'ember';

export default Ember.Route.extend({
  cards: [
    {
      id:1,
      title: "Card",
      description: "desc",
      comingSoon: false,
      link: 'portals',
    },
    {
      id:1,
      title: "Card",
      description: "desc",
      comingSoon: false,
      link: 'portals',
    },
    {
      id:1,
      title: "Card",
      description: "desc",
      comingSoon: false,
      link: 'portals',
    },
    {
      id:1,
      title: "Card",
      description: "desc",
      comingSoon: false,
      link: 'portals',
    }
  ],

  model(){
    return this.get('cards');
  }




});
