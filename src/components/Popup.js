import React from 'react';
import './Popup.css';
import Scroll from './Scroll';

const Popup = (props) => {
	let table = [];
	let item = props.item;
	let keys = Object.keys(item);

	console.log("item", item);
	console.log("keys", keys);

	
	for (let i=0; i< keys.length; i++) {
		let keyName = keys[i];
		if (keyName === 'films')
			continue;
		table.push(
			<tr key={i} className='dt-row'>
				<td className='dib ttc tl dtc'>{ keys[i] }</td>
	 			<td className='dib dtc' data-th='{keys[i]}'>{ item[keys[i]] }</td><br />
			</tr>
		)
	}

	return (
		<div className='popup'>
        	<div className='popup_inner tc ttc ba bg-black dib br3 pa3 ma2 bw2 yellow shadow-5'>
          		<h1 className='f1'>{props.name}</h1>
          		<Scroll className='popupScroll'>
	          		<div className='rwd-table dt'>
	          			{table}
	          		</div>
	          	</Scroll>
        		<button 
        			className='ttc f6 no-underline br-pill ph3 pv2 mb2 dib yellow bg-black b--yellow' 
        			onClick={() => props.closePopupFunc()}>Close</button>
        	</div>
    	</div>
	)
}

export default Popup;