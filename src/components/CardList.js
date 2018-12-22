import React from 'react';
import Card from './Card';


const CardList = (props) => {
	let items = props.items;
	let category = props.cat;
	let type;
	if ("type" in props)
		type = props.type;
	else
		type = "regular";
	const cardComponent = items.map((item, i) => {
		let name = (category === "films" ? item.title : item.name);
		return <Card key={i} name={name} item={item} popupFillFunc={props.popupFillFunc} type={type} />
	})
	return (
	<div>
		{cardComponent}
	</div>
	);
}

export default CardList;