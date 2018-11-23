import React from 'react';

const CategoriesList = (props) => {
	let categories = Object.keys(props.categories);
	let categoriesBottons = categories.map((category, i) => {
		return (<button className='ttc f6 grow no-underline br-pill ph3 pv2 ma2 mb2 dib yellow bg-black b--yellow' 
						onClick= {()=> props.fetchFunction(category)}
						key={i}>
					{category}
				</button>);
	});

	return (
				<div className='mb2'>
					{ categoriesBottons }
				</div>
		);
}

export default CategoriesList;