import React from 'react';
import categories from '../categories.js'

const CategoriesList = () => {
	const categoriesBottons = categories.map((category) => {
			return 	<button className='ttc f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-black' onClick='fetchDataFromAPI(category)'>
						{category}
					</button>
	})

	return (
	<div>
		{categoriesBottons}
	</div>
	);
}

export default CategoriesList;