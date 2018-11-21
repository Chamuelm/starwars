import React from 'react';
import categories from '../categories.js'

const CategoriesList = (props) => {
	const categoriesBottons = categories.map((category, i) => {
			return 	<button className='ttc f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-black' 
							onClick= {()=> props.fetchFunction(category)}
							key={i}>
						{category}
					</button>
	});

	return (
	<div>
		{categoriesBottons}
	</div>
	);
}

export default CategoriesList;