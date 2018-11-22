import React from 'react';
import Card from './Card';


const CardList = (props) => {
	let items = props.items;
	let category = props.cat;
	const cardComponent = items.map((item, i) => {
		let name = (category === "films" ? item.title : item.name);
		return <Card key={i} name={name} item={item} popupFillFunc={props.popupFillFunc} />
	})
	return (
	<div>
		{cardComponent}
	</div>
	);
}

function fetchSchema(category) {
	let url = 'https://swapi.co/api/' + category + '/schema'
	let schema = fetch(url)
      .then(response => {
        return response.json();
      })
      .then((data) => {
        return data.required;
      })

    return schema
}

export default CardList;