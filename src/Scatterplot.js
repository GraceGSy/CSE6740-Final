import React, {useRef, useEffect} from 'react'
import {Explanation} from './Explanation'

import * as d3 from "d3"

export const Scatterplot = ({dataset=[], model='knn'}) => {
	const ref = useRef('scatterplot')

	const layout = {"height": 600, "width": 600, "margin": 60}

	const [selected, setSelected] = React.useState([])

	const unique = []

	const all_genres = ['pop', 'metal', 'disco', 'blues', 'reggae', 'classical', 'rock', 'hiphop', 'country', 'jazz']

	const genres_map = {'pop':0, 'metal':1, 'disco':2, 'blues':3, 'reggae':4, 'classical':5, 'rock':6, 'hiphop':7, 'country':8, 'jazz':9}

	useEffect(() => {
		const zoom = d3.zoom()
			.scaleExtent([1, 8])
			.on("zoom", zoomed);

		let svgElement = d3.select(ref.current)

		svgElement.on('click', function(e) {
			
			svgElement.transition()
				.duration(750)
				.call(zoom.transform, d3.zoomIdentity);

			e.stopPropagation()
				
		})

		// console.log(svgElement)

		let g = svgElement.select("g")

		var xScale = d3.scaleLinear()
						.domain(d3.extent(dataset, d => d.x))
						.range([layout.margin, layout.width - layout.margin])

		var yScale = d3.scaleLinear()
						.domain(d3.extent(dataset, d => d.y))
						.range([layout.height - layout.margin, layout.margin])

		var unique = Array.from(new Set(dataset.map(d => d.genre))).filter(i => i != -1)
		let selectedGenres = new Set(unique)

		var colorScale = d3.scaleOrdinal(d3.schemeTableau10)
                         .domain(unique)


        // Some voodoo to get d3 to play nice with react
        var selectedCopy = []

		let points = g.selectAll('.point')
			.data(dataset)
			.join('circle')
			.attr('class', 'point')
			.attr('cx', d => xScale(d.x))
			.attr('cy', d => yScale(d.y))
			.attr('r', 5)
			.attr('fill',  d => d.genre == -1 ? "white" : colorScale(d.genre))
			.attr('stroke', d => typeof d[model+'_predicted'] === 'string' ? colorScale(genres_map[d[model+'_predicted']]) : colorScale(d[model+'_predicted']))
			.attr('stroke-width', '2')
			.attr('cursor', 'pointer')
			// .on('mouseover', function(e, d){
			// 	d3.select(this)
			// 		.attr('r', 6)
			// 		.attr('fill', colorScale(d.category)) 

			// 	setSelected(d) })
			// .on('mouseout', function(e, d){
			// 	d3.select(this)
			// 		.attr('r', 3)
			// 		.attr('fill', 'none') 

			// 	setSelected({}) })
			.on('click', function(e, d){

				// console.log(e)

				selectedGenres = new Set(unique)

				d3.selectAll('.genre')
					.attr('fill', dg => colorScale(dg))

				// let currentSelect = d3.selectAll('.current-select')

				let currentIndices = selectedCopy.map(s => s['index'])

				if (currentIndices.includes(d.index)) {

					// Remove from selected

					let getIndex = currentIndices.findIndex(s => s == d.index)
					selectedCopy.splice(getIndex, 1)

					// selectedCopy = newSelected
					setSelected(JSON.parse(JSON.stringify(selectedCopy)))

					// console.log(newSelected.length)

					if (selectedCopy.length == 0) {
						d3.selectAll('.point')
							.attr('opacity', 1)

						d3.select(this)
							.attr('opacity', 1)
							.attr('id', 'none')
					} else {
						d3.select(this)
							.attr('opacity', 0.15)
							.attr('id', 'none')
					}
					
				} else {

					// Add to selected

					d3.selectAll('.point')
						.attr('opacity', d => currentIndices.includes(d.index) ? 1 : 0.15)

					d3.select(this)
						.attr('opacity', 1)
						.attr('id', 'current-select')

					let newSelected = selectedCopy.concat([d])

					selectedCopy = newSelected

					console.log("adding new selected", newSelected)

					setSelected(newSelected);
				}

				e.stopPropagation()
				
				})

		// Add x-axis
		var gx = svgElement.select('#x-axis')
		var xAxis = d3.axisBottom(xScale).tickSize(3).ticks(5)    
	    gx.attr('transform', `translate(0, ${layout.height - layout.margin})`)
	        .call(xAxis)

	    // Add y-axis
    	var gy = svgElement.select('#y-axis')
    	var yAxis = d3.axisLeft(yScale).tickSize(3).ticks(5)     
        gy.attr('transform', `translate(${layout.margin}, 0)`)
            .call(yAxis)

        // Add legend
        var legend = svgElement.append('g')
        			.attr('id', 'legend')
        			.attr('transform', `translate(${layout.width - layout.margin}, ${layout.margin})`)

        function toggleLegend(e, d) {

        	// console.log('here')

        	
        }

        legend.selectAll('.genre')
        	.data(unique)
        	.join('rect')
        	.attr('class', 'genre')
        	.attr('x', 0)
        	.attr('y', (d, i) => i*20)
        	.attr('width', 15)
        	.attr('height', 15)
        	.attr('stroke', d => colorScale(d))
        	.attr('stroke-width', 3)
        	.attr('fill', d => colorScale(d))
        	.on('click', function (e, d) {

        		e.stopPropagation()

        		if (selectedGenres.has(d)) {
	        		selectedGenres.delete(d)

	        		d3.selectAll('.point')
	        			.attr('opacity', dp => selectedGenres.has(dp.genre) ? 1 : 0.15)

	        		d3.select("#current-select")
	        			.attr('id', 'none')

	        		setSelected([])

	        		d3.select(this)
        				.attr('fill', 'white')

	        	} else {
	        		selectedGenres.add(d)

	        		d3.selectAll('.point')
	        			.attr('opacity', dp => selectedGenres.has(dp.genre) ? 1 : 0.15)

	        		d3.select("#current-select")
	        			.attr('id', 'none')

	        		setSelected([])

	        		d3.select(this)
        				.attr('fill', colorScale(d))
	        	}
        	})

        legend.selectAll('.genre-text')
        	.data(unique)
        	.join('text')
        	.attr('class', 'genre-text')
        	.text(d => all_genres[d])
        	.attr('x', 20)
        	.attr('y', (d, i) => i * 20 + 10)
        	.attr('alignment-baseline', 'middle')
        	.attr('font-family', 'sans-serif')
        	.attr('font-size', 10)

       	svgElement.call(zoom).call(zoom.transform, d3.zoomIdentity);

		function zoomed({transform}) {
			const zx = transform.rescaleX(xScale).interpolate(d3.interpolateRound);
			const zy = transform.rescaleY(yScale).interpolate(d3.interpolateRound);
			g.attr("transform", transform).attr("stroke-width", 5 / transform.k);
			gx.call(xAxis.scale(transform.rescaleX(xScale)))
			// gx.call(xAxis, zx);
			gy.call(yAxis.scale(transform.rescaleX(yScale)));
			// gGrid.call(grid, zx, zy);
  }

	}, [dataset, model])

	// useEffect(() => {
	// 	console.log(selected)
	// }, [selected])

	const divStyle = {"display": "flex"}
	const titleStyle = {"font-family": "helvetica"}
	const inspectStyle = {"display": "flex", "overflow": "scroll", "maxWidth": "250px", "minHeight": "620px"}
	const visContainer = {"minWidth": "620px"}

	return (
	  <div style={divStyle}>
	  	<div style={visContainer}>
		    <svg width={layout.width} height={layout.height} ref={ref}>
		      <g />
		      <g id="x-axis" />
		      <g id="y-axis" />
		    </svg>
	    </div>
	    <div>
	    	<div style={inspectStyle}>
	    		{selected.map(s => <Explanation features={s} model={model} key={model + s['index']} />)}
	    	</div>
	    	{/* <Explanation features={selected} /> */}
	    </div>
	  </div>
)}