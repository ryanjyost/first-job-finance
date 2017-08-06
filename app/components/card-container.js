import Ember from 'ember';

export default Ember.Component.extend({
  cardList: null,
  filteredCardList: null,
  filter: null,

  init(){
    this._super(...arguments);

    let cards = this.get('cards');
    this.set('cardList', cards)
    this.set('filteredCardList', cards)
  },

  filterCards(filter){
    this.set('filter', filter);

    let cardList = this.get('cardList');

    let filteredCardList = cardList;

    if(filter){
      filteredCardList = cardList.filter((card)=>{
        return card.type == filter;
      })
    }

    this.set('filteredCardList', filteredCardList);

  },

});
