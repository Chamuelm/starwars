import React from 'react';
import CardList from './components/CardList';
import SearchBox from './components/SearchBox';
import CategoriesList from './components/CategoriesList';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      items: [],
      searchfield: '',
      category: 'none'
    }

    this.fetchCategory = this.fetchCategory.bind(this);
    this.fetchDataFromAPI = this.fetchDataFromAPI.bind(this);
  }

  fetchCategory(category) {
    var url = 'https://swapi.co/api/' + category
    console.log(url)
    this.setState({items: []});
    this.fetchDataFromAPI(url)
  }

  fetchDataFromAPI(url) {
    fetch(url)
      .then(response => {
        return response.json();
      }).then((data) => {
        var itemsList = this.state.items;
        console.log("data", data.results);
        for (var i=0; i<data.count; i++)
          itemsList.push(data.results[i]);
        console.log("itemsList", itemsList);
        this.setState({items: itemsList});
        if (data.next)
          this.fetchDataFromAPI(data.next)
      })
  }

  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value })
  }

  render() {
    const { items, searchfield, category } = this.state;
    const filteredItems = items.filter(item => {
      return item.title.toLowerCase().includes(searchfield.toLowerCase());
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
        <CategoriesList fetchFunction={this.fetchCategory} />
        {pageData}
      </div>
      )
  }
}

export default App;
