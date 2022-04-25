import React, {useRef, useEffect, useState} from 'react'

import Button from '@mui/material/Button';

export const CatFact = ({data}) => {

	const [currentFact, setCurrentFact] = useState("");

	const GetNewFact = () => {
		fetch('https://catfact.ninja/fact',
			{ headers: { 'Content-Type': 'application/json' }})
			.then(response => response.json())
			.then(data => {
				setCurrentFact(data.fact);
		});
	}


	return (
		<div style={{"margin-top": "25px"}}>
			<Button size="small" variant="outlined" onClick={() => GetNewFact()}>Click for New Fact</Button>
			<p>{currentFact}</p>
		</div>
	)
}