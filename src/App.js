import React from 'react';
import CardList from './components/CardList';
import SearchBox from './components/SearchBox';
import CategoriesList from './components/CategoriesList';
import Popup from './components/Popup';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      items: [],
      searchfield: '',
      categories: null,
      category: 'none',
      showPopup: false,
      popupElement: null
    }

    this.fetchCategory = this.fetchCategory.bind(this);
    this.fetchDataFromAPI = this.fetchDataFromAPI.bind(this);
    this.rerender = this.forceUpdate.bind(this);
  }

  closePopup = () => {
    this.setState({
      showPopup: false
    });
  }

  popupFill = (name, item) => {
    this.setState({
      popupElement: <Popup name={name} item={item} closePopupFunc={this.closePopup} />,
      showPopup: true
    });
  }

  fetchCategory(category) {
    var url = this.state.categories[category];
    this.setState({
      items: [],
      category: category
    });
    this.fetchDataFromAPI(url);
  }

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

  fetchCategoriesList() {
    fetch('https://swapi.co/api/')
    .then(response => {
          return response.json();
        })
    .then(data => {
      this.setState({categories : data});
    });
  }

  componentDidMount() {
    this.fetchCategoriesList();
  }

  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value })
  }

  render() {
    const { items, searchfield, categories, category } = this.state;
    const filteredItems = items.filter(item => {
      if (category === "films")
        return item.title.toLowerCase().includes(searchfield.toLowerCase());
      else
        return item.name.toLowerCase().includes(searchfield.toLowerCase());
    });

    let pageData, showCategories = true;
    let categoryElement = <CategoriesList categories={this.state.categories} fetchFunction={this.fetchCategory} />;    ;
    
    if (!categories) {
      pageData = (<div><h3 className='f3'>Loading categories...</h3></div>);
      showCategories = false;
    } else if (category === 'none') {
      pageData = (<div><h3 className='f3'>Please select a category of item</h3></div>);
    } else if (items.length) {
      pageData = (
        <div>
          <SearchBox searchChange={this.onSearchChange} />
          <CardList items={filteredItems} cat={category} popupFillFunc={this.popupFill} />
        </div>
        );
    } else {
      pageData = (<div><h3 className='f3'>Loading...</h3></div>);
    }

    if (!showCategories)
      categoryElement = null;

    return (
      <div>
        <div className='tc'>
          <h1 className='f1'>StarWars Library</h1>
          {categoryElement}
          {pageData}
        </div>
        {this.state.showPopup ? this.state.popupElement : null}
      </div>
    )
  }
}

export default App;
