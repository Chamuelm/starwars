import React from 'react';
import CardList from './components/CardList';
import SearchBox from './components/SearchBox';
import CategoriesList from './components/CategoriesList';
import Popup from './components/Popup';
import Scroll from './components/Scroll';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      items: [],            // Items received from server
      searchfield: '',      // Current content in search box
      categories: null,     // List of categories and their url
      category: 'none',     // Current selected category
      showPopup: false,     // Show popup of card
      popupElement: null    // Element to popup
    }

    this.fetchCategory = this.fetchCategory.bind(this);
    this.fetchDataFromAPI = this.fetchDataFromAPI.bind(this);
  }

  // Method to close popup if opened
  closePopup = () => {
    this.setState({
      showPopup: false
    });
  }

  // Fill popupElement in app's state with relevant data of choosen item
  //  this function is beeing passed to CardsList and then to Card 
  //  to the onClick attribute to use it
  popupFill = (name, item) => {
    this.setState({
      popupElement: <Popup name={name} item={item} closePopupFunc={this.closePopup} />,
      showPopup: true
    });
  }

  showPopupOnStart = () => {
    let item = {
      "name": "Luke Skywalker", 
      "height": "172", 
      "mass": "77", 
      "hair_color": "blond", 
      "skin_color": "fair", 
      "eye_color": "blue", 
      "birth_year": "19BBY", 
      "gender": "male", 
      "homeworld": "https://swapi.co/api/planets/1/", 
      "films": [
          "https://swapi.co/api/films/2/", 
          "https://swapi.co/api/films/6/", 
          "https://swapi.co/api/films/3/", 
          "https://swapi.co/api/films/1/", 
          "https://swapi.co/api/films/7/"
      ], 
      "species": [
          "https://swapi.co/api/species/1/"
      ], 
      "vehicles": [
          "https://swapi.co/api/vehicles/14/", 
          "https://swapi.co/api/vehicles/30/"
      ], 
      "starships": [
          "https://swapi.co/api/starships/12/", 
          "https://swapi.co/api/starships/22/"
      ], 
      "created": "2014-12-09T13:50:51.644000Z", 
      "edited": "2014-12-20T21:17:56.891000Z", 
      "url": "https://swapi.co/api/people/1/"
    }

    this.popupFill(item.name, item);
  }

  // Fetch data from API of specific category to item list
  // the data is saved in state.items and the chosen category is saved in state.category
  // This method set state.items to empty list and uses helper method fetchDataFromAPI 
  // to actually fetch data from API.
  fetchCategory(category) {
    var url = this.state.categories[category];
    this.setState({
      items: [],
      category: category
    });
    this.fetchDataFromAPI(url);
  }

  // Helper method to fetch data.
  // Fetch data from next pages recursivly
  fetchDataFromAPI(url) {
    fetch(url)
      .then(response => {
        return response.json();
      }).then((data) => {
        var itemsList = this.state.items;
        for (var i=0; i<data.results.length; i++)
          itemsList.push(data.results[i]);
        this.setState({items: itemsList});
        if (data.next)
          this.fetchDataFromAPI(data.next)
      })
  }

  // Fetch data about available categories from API
  // Put this data in state.categories
  fetchCategoriesList() {
    fetch('https://swapi.co/api/')
    .then(response => {
          return response.json();
        })
    .then(data => {
      this.setState({categories : data});
    });
  }

  // lifeCycle method.
  // feching categories list after loaded
  componentDidMount() {
    this.fetchCategoriesList();
    //this.showPopupOnStart();
  }

  // change state.searcField when user types
  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value })
  }

  render() {
    const { items, searchfield, categories, category } = this.state;

    // filteredItems is items filtered after user used the search function
    const filteredItems = items.filter(item => {
      if (category === "films") // "films" category don't have name key, but title
        return item.title.toLowerCase().includes(searchfield.toLowerCase());
      else
        return item.name.toLowerCase().includes(searchfield.toLowerCase());
    });

    let pageData; // Will hold dynamically relevant data (Loading messages/items list&search)
    let showCategories = true; // Dynamically show categories if loaded
    let showSearchbox = false;
    let categoryElement = <CategoriesList className='header-data'categories={this.state.categories} fetchFunction={this.fetchCategory} />; // Categories list element
    let searchboxElement = <SearchBox searchChange={this.onSearchChange} />;
    
    if (!categories) { // Not yet loaded than show loading message
      pageData = (<div><h3 className='f3'>Loading categories...</h3></div>);
      showCategories = false;
    } else if (category === 'none') { // Categories has been loaded but user didn't chose one
      pageData = (<div><h3 className='f3'>Please select a category of item</h3></div>);
    } else if (items.length) { // User chose category so display items if has been loaded
      showSearchbox = true;
      pageData = (
        <div class='scroll-y'>
          <CardList items={filteredItems} cat={category} popupFillFunc={this.popupFill} />
        </div>
        );
    } else { // User chose category but not yet loaded so display loading message
      pageData = (<div><h3 className='f3'>Loading...</h3></div>);
    }

    if (!showCategories) // Dont show categories if not loaded yet
      categoryElement = null;
    if (!showSearchbox)
      searchboxElement = null;

    return (
      <div className='flex flex-column justify-around tc'>
        <h1 className='f1 flex header-data'>StarWars Library</h1>
        {categoryElement}
        {searchboxElement}
        {pageData}
        {this.state.showPopup ? this.state.popupElement : null}
      </div>
    )
  }
}

export default App;
