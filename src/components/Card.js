import React from 'react';

const Card = (props) => {
	return (
		<button className='tc ttc ba bg-black dib br3 pa3 ma2 grow bw2 yellow shadow-5 b--yellow' 
				onClick={()=> props.popupFillFunc(props.name, props.item)}>
			<h2>{props.name}</h2>
		</button>
	);

	// let configPopup = (name, item) => {
	// 	popupFillFunc(name, item);
	// }
}

export default Card;