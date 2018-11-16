import React, { Component } from 'react';
import CardList from './components/CardList';
import SearchBox from './components/SearchBox';
import CategoriesList from './components/CategoriesList';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      items: [],
      searchfield: '',
      category: 'none'
    }
  }

  fetchDataFromAPI(url) {
    fetch(url)
      .then(response => {
        return response.json();
      }).then(users => {
        this.setState( {items: users});
      })
  }

  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value })
  }

  render() {
    const { items, searchfield, category } = this.state;
    const filteredItems = items.filter(item => {
      return item.name.toLowerCase().includes(searchfield.toLowerCase());
    });

    var pageData;
    if (category === 'none')
      pageData = (<div><h3 className='f3'>Please select a category of item</h3></div>);
    else
      pageData = (<div>
                  <SearchBox searchChange={this.onSearchChange} />
                  <CardList items={ filteredItems } />
                </div>);

    return (
      <div className='tc'>
        <h1 className='f1'>StarWars Library</h1>
        <CategoriesList />
        {pageData}
      </div>
      )
  }
}

export default App;
