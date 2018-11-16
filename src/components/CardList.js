import React from 'react';
import Card from './Card';


const CardList = ({ items }) => {
	const cardComponent = items.map((user, i) => {
		return <Card key={i} id={items[i].id} name={items[i].name} email={items[i].email} />
	})
	return (
	<div>
		{cardComponent}
	</div>
	);
}

export default CardList;