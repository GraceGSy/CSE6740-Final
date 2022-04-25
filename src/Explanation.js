import React, {useRef, useEffect} from 'react'

import * as d3 from "d3"

export const Explanation = ({features={}, model='knn', index=0}) => {

	console.log(features)
	const ref = useRef('explanation' + index)

	const layout = {"height": 480, "width": 200, "margin": 20}

	// const [selected, setSelected] = React.useState({})

	// console.log(features)

	const all_genres = ['pop', 'metal', 'disco', 'blues', 'reggae', 'classical', 'rock', 'hiphop', 'country', 'jazz']

	function convertData(d) {
		let converted = []

		for (const [key, value] of Object.entries(d)) {
			if (['index','genre', 'x', 'y', 'filename', 'filepath'].includes(key) || key.includes("predicted")) {
				continue
			}
			converted.push({'name': key, 'weight': value})
		}

		// for (let i = 0; i < d.length; i++) {
		// 	let item = d[i]
		// 	converted.push({'name': item[0], 'weight': item[1]})
		// }

		// console.log(converted)

		return converted
	}

	useEffect(() => {
		let converted = convertData(features)

		// console.log('rendering explanation', converted)

		let svgElement = d3.select(ref.current)

		// console.log(svgElement)

		let g = svgElement.select("#exp-vis")

		var xScale = d3.scaleLinear()
						.domain(d3.extent(converted, d => d.weight))
						.range([layout.margin, layout.width - layout.margin])

		var unique = Array.from(new Set(converted.map(d => d.name)))

		var yScale = d3.scaleBand()
						.domain(converted.map(d => d.name))
						.range([layout.height - layout.margin, layout.margin])

		var colorScale = d3.scaleOrdinal(d3.schemeTableau10)
                         .domain(unique)

        var opacityScale = d3.scaleLinear()
						.domain(d3.extent(converted, d => Math.abs(d.weight)))
						.range([0.25, 0.8])

		svgElement.selectAll('.exp')
			.data(converted)
			.join('rect')
			.attr('class', 'exp')
			.attr('x', d => d.weight > 0 ? xScale(0) : xScale(d.weight))
			.attr('height', yScale.bandwidth() - 10)
			.attr('fill',  "steelblue")
			.attr('opacity', d => opacityScale(Math.abs(d.weight)))

		svgElement.selectAll('.exp')
			.transition()
            .duration(500)
            .ease(d3.easeLinear)
			.attr('y', d => yScale(d.name) + 5)
			.attr('width', d => d.weight > 0 ? xScale(d.weight) - xScale(0) : xScale(0) - xScale(d.weight))

		// svgElement.append('g')
	 //        .attr('transform', `translate(0, ${layout.height - layout.margin})`)
	 //        .call(d3.axisBottom(xScale).tickSize(3).ticks(5))

    	// svgElement.append('g')
     //          .attr('transform', `translate(${xScale(0)}, 0)`)
     //          .attr("id", "y-axis")
     //          .call(d3.axisLeft(yScale).tickSize(3).ticks(5))

        svgElement.select('#y-axis')
        	.transition()
        	.attr('transform', `translate(${xScale(0)}, 0)`)
        	.call(d3.axisRight(yScale).tickSize(3).ticks(5))

	}, [features])

	const titleStyle = {"fontFamily": "helvetica", "fontSize": "0.8em", "marginBottom": "0px", "marginLeft":"15px"}

	return (
	  <div>
	  	<p style={titleStyle}><b>Song: </b>{features['filename']}</p>
	  	<p style={titleStyle}><b>Predicted genre: </b>{typeof features[model+'_predicted'] === 'string' ? features[model+'_predicted'] : all_genres[features[model+'_predicted']]}</p>
	    <svg width={layout.width} height={layout.height} ref={ref}>
	      <g id='exp-vis' />
	      <g id='y-axis' />
	    </svg>
	  </div>
)}