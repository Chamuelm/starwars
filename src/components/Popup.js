import React from 'react';

const Popup = (props) => {
	let table = [];
	let keys = Object.keys(props.item);
	
	for (let i=0; i< keys.length; i++) {
		let keyName = keys[i];
		table += (
			<div className='row' key={i}>
				<div className='key_col dib ttc'>{ keyName }</div>
				<div className='key_col dib'>{ props.item[keyName] }</div><br />
			</div>
		)
	}

	return (
		<div className='popup'>
        	<div className='popup_inner tc ttc ba bg-black dib br3 pa3 ma2 bw2 yellow shadow-5'>
          		<h1 className='f1'>{props.name}</h1>

          		{table}

        		<button 
        			className='ttc f6 no-underline br-pill ph3 pv2 mb2 dib yellow bg-black b--yellow' 
        			onClick={() => props.closePopupFunc()}>Close</button>
        	</div>
    	</div>
	)
}

export default Popup;