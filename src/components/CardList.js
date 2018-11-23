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

export default CardList;