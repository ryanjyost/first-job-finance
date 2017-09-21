import Ember from 'ember';

export default Ember.Component.extend({
  cardList: null,
  filteredCardList: null,
  filter: null, //type of card to filter

  init(){
    this._super(...arguments);

    const cards = this.get('cards');
    this.set('cardList', cards)
    this.set('filteredCardList', cards)
  },

  filterCards(filter){
    this.set('filter', filter);

    const cardList = this.get('cardList');

    let filteredCardList = cardList;

    if(filter){
      filteredCardList = cardList.filter((card)=>{
        return card.type == filter;
      })
    }

    this.set('filteredCardList', filteredCardList);
  },

  handleAddPortal(){
    const name =  this.$('#inputPortalName').val(),
          link = this.$('#inputPortalLink').val();

    if(!name){
      alert("Please input a name for the portal you want to add.")
      return;
    }

    //from https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
    function isURL(str) {
      var pattern = new RegExp('^(https?:\\/\\/)'); // fragment locator
      return pattern.test(str);
    };

    if(!isURL(link)){
      alert("Please use a valid link for the portal you want to add. Be sure it starts with 'http' ")
      return;
    }

    const newPortalData = {name, link};
    this.get('addCard')(newPortalData);

    this.$('#inputPortalName').val('');
    this.$('#inputPortalLink').val('');
    return;
  }

});
