import React from 'react';

const Card = (props) => {
	if (props.type === 'small') {
		return (
			<button className='tc ttc ba bg-black dib br3 pa1 ma1 grow bw1 yellow shadow-5 b--yellow' 
					onClick={()=> props.popupFillFunc(props.name, props.item)}>
				{props.name}
			</button>
		);
	} else {
		return (
			<button className='tc ttc ba bg-black dib br3 pa3 ma2 grow bw2 yellow shadow-5 b--yellow' 
					onClick={()=> props.popupFillFunc(props.name, props.item)}>
				<h2>{props.name}</h2>
			</button>
		);
	}
}

export default Card;