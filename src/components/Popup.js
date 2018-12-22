import React from 'react';
import './Popup.css';
import CardList from './CardList';

class Popup extends React.Component {
	constructor(props) {
		super();
		this.state = {
		  table: [],            // Table of popup content
		  item: props.item,
		  keys: Object.keys(props.item),
		  props: props,
		  dataToSkip: ['url', 'edited', 'created'],
		  popupFillFunc: props.popupFillFunc
		}
	}

	componentDidMount() {
		this.state.keys.forEach(async (keyName, index) => {
			let data = this.state.item[keyName];
			let temp;

			console.log("data", data);

			for (let i=0; i<this.state.dataToSkip.length; i++){
				if (keyName == this.state.dataToSkip[i])
					return;
			}
				
			
			if (Array.isArray(data) || data.startsWith("http")) {
				temp = await fetchDataFromURL(data, this.state.popupFillFunc);
				console.log("in fetch of", keyName);
				data = (<CardList items={temp} cat={keyName} popupFillFunc={this.state.popupFillFunc} type="small" />)
			}

			let updatedTable = this.state.table;
			updatedTable.push(
				<tr key={index} className='dt-ro tl'>
					<td className='dtc ttc'>{ this.state.keys[index].replace('_', ' ') }</td>
					<td className='dtc' data-th='{thie.state.keys[index]}'>{ data }</td>
				</tr>
			);
			this.setState({table : updatedTable});
		});
	}


	render() {
		return (
			<div className='popup'>
				<div className='popup_inner tc ttc ba bg-black dib br3 pa3 ma2 bw2 yellow shadow-5 flex flex-column items-center'>
					<h1 className='f1'>{this.props.name}</h1>
					<table className='dt scroll-y w-90'>
						<tbody>
							{this.state.table}
						</tbody>
					</table>
					<button 
						className='ttc f6 no-underline br-pill ph3 pv2 mt4 mb2 dib yellow bg-black b--yellow' 
						onClick={() => this.state.props.closePopupFunc()}>Close</button>
				</div>
			</div>
		)
	}
}

// If data is URL reference to another object, get card link to it
const fetchDataFromURL = async (data) => {
	let items = [];
	if (Array.isArray(data)) {
		for(let i=0; i<data.length; i++) {
			await fetch(data[i]).then(response => {
				return response.json();
			}).then((object) => {
				items.push(object);
			});
		}
	} else { // Not array
		await fetch(data).then(response => {
			return response.json();
		}).then((object) => {
			items.push(object);
		});
	}

	return items;
}

export default Popup;