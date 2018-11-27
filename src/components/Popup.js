import React from 'react';
import './Popup.css';
import Scroll from './Scroll';

const Popup = (props) => {
	let table = [];
	let item = props.item;
	let keys = Object.keys(item);

	console.log("item", item);
	console.log("keys", keys);

	let dataToSkip = ['films', 'url'];

	
	for (let i=0; i< keys.length; i++) {
		let keyName = keys[i];
		if (keyName.toLowerCase() in dataToSkip)
			continue;
		table.push(
			<tr key={i} className='dt-ro tl'>
				<td className='dtc ttc'>{ keys[i].replace('_', ' ') }</td>
	 			<td className='dtc' data-th='{keys[i]}'>{ item[keys[i]] }</td><br />
			</tr>
		)
	}

	return (
		<div className='popup'>
        	<div className='popup_inner tc ttc ba bg-black dib br3 pa3 ma2 bw2 yellow shadow-5 flex flex-column items-center'>
          		<h1 className='f1'>{props.name}</h1>
          		<div className='dt scroll-y w-90'>
          			{table}
          		</div>
        		<button 
        			className='ttc f6 no-underline br-pill ph3 pv2 mt4 mb2 dib yellow bg-black b--yellow' 
        			onClick={() => props.closePopupFunc()}>Close</button>
        	</div>
    	</div>
	)
}

export default Popup;