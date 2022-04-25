import React, { useRef, useEffect } from 'react';
import { Explanation } from './Explanation';
import * as d3 from "d3";
export var Scatterplot = function Scatterplot(_ref) {
  var _ref$dataset = _ref.dataset,
      dataset = _ref$dataset === void 0 ? [] : _ref$dataset,
      _ref$model = _ref.model,
      model = _ref$model === void 0 ? 'knn' : _ref$model;
  var ref = useRef('scatterplot');
  var layout = {
    "height": 600,
    "width": 600,
    "margin": 60
  };

  var _React$useState = React.useState([]),
      selected = _React$useState[0],
      setSelected = _React$useState[1];

  var unique = [];
  var all_genres = ['pop', 'metal', 'disco', 'blues', 'reggae', 'classical', 'rock', 'hiphop', 'country', 'jazz'];
  var genres_map = {
    'pop': 0,
    'metal': 1,
    'disco': 2,
    'blues': 3,
    'reggae': 4,
    'classical': 5,
    'rock': 6,
    'hiphop': 7,
    'country': 8,
    'jazz': 9
  };
  useEffect(function () {
    var zoom = d3.zoom().scaleExtent([1, 8]).on("zoom", zoomed);
    var svgElement = d3.select(ref.current);
    svgElement.on('click', function (e) {
      svgElement.transition().duration(750).call(zoom.transform, d3.zoomIdentity);
      e.stopPropagation();
    }); // console.log(svgElement)

    var g = svgElement.select("g");
    var xScale = d3.scaleLinear().domain(d3.extent(dataset, function (d) {
      return d.x;
    })).range([layout.margin, layout.width - layout.margin]);
    var yScale = d3.scaleLinear().domain(d3.extent(dataset, function (d) {
      return d.y;
    })).range([layout.height - layout.margin, layout.margin]);
    var unique = Array.from(new Set(dataset.map(function (d) {
      return d.genre;
    }))).filter(function (i) {
      return i != -1;
    });
    var selectedGenres = new Set(unique);
    var colorScale = d3.scaleOrdinal(d3.schemeTableau10).domain(unique); // Some voodoo to get d3 to play nice with react

    var selectedCopy = [];
    var points = g.selectAll('.point').data(dataset).join('circle').attr('class', 'point').attr('cx', function (d) {
      return xScale(d.x);
    }).attr('cy', function (d) {
      return yScale(d.y);
    }).attr('r', 5).attr('fill', function (d) {
      return d.genre == -1 ? "white" : colorScale(d.genre);
    }).attr('stroke', function (d) {
      return typeof d[model + '_predicted'] === 'string' ? colorScale(genres_map[d[model + '_predicted']]) : colorScale(d[model + '_predicted']);
    }).attr('stroke-width', '2').attr('cursor', 'pointer') // .on('mouseover', function(e, d){
    // 	d3.select(this)
    // 		.attr('r', 6)
    // 		.attr('fill', colorScale(d.category)) 
    // 	setSelected(d) })
    // .on('mouseout', function(e, d){
    // 	d3.select(this)
    // 		.attr('r', 3)
    // 		.attr('fill', 'none') 
    // 	setSelected({}) })
    .on('click', function (e, d) {
      // console.log(e)
      selectedGenres = new Set(unique);
      d3.selectAll('.genre').attr('fill', function (dg) {
        return colorScale(dg);
      }); // let currentSelect = d3.selectAll('.current-select')

      var currentIndices = selectedCopy.map(function (s) {
        return s['index'];
      });

      if (currentIndices.includes(d.index)) {
        // Remove from selected
        var getIndex = currentIndices.findIndex(function (s) {
          return s == d.index;
        });
        selectedCopy.splice(getIndex, 1); // selectedCopy = newSelected

        setSelected(JSON.parse(JSON.stringify(selectedCopy))); // console.log(newSelected.length)

        if (selectedCopy.length == 0) {
          d3.selectAll('.point').attr('opacity', 1);
          d3.select(this).attr('opacity', 1).attr('id', 'none');
        } else {
          d3.select(this).attr('opacity', 0.15).attr('id', 'none');
        }
      } else {
        // Add to selected
        d3.selectAll('.point').attr('opacity', function (d) {
          return currentIndices.includes(d.index) ? 1 : 0.15;
        });
        d3.select(this).attr('opacity', 1).attr('id', 'current-select');
        var newSelected = selectedCopy.concat([d]);
        selectedCopy = newSelected;
        console.log("adding new selected", newSelected);
        setSelected(newSelected);
      }

      e.stopPropagation();
    }); // Add x-axis

    var gx = svgElement.select('#x-axis');
    var xAxis = d3.axisBottom(xScale).tickSize(3).ticks(5);
    gx.attr('transform', "translate(0, " + (layout.height - layout.margin) + ")").call(xAxis); // Add y-axis

    var gy = svgElement.select('#y-axis');
    var yAxis = d3.axisLeft(yScale).tickSize(3).ticks(5);
    gy.attr('transform', "translate(" + layout.margin + ", 0)").call(yAxis); // Add legend

    var legend = svgElement.append('g').attr('id', 'legend').attr('transform', "translate(" + (layout.width - layout.margin) + ", " + layout.margin + ")");

    function toggleLegend(e, d) {// console.log('here')
    }

    legend.selectAll('.genre').data(unique).join('rect').attr('class', 'genre').attr('x', 0).attr('y', function (d, i) {
      return i * 20;
    }).attr('width', 15).attr('height', 15).attr('stroke', function (d) {
      return colorScale(d);
    }).attr('stroke-width', 3).attr('fill', function (d) {
      return colorScale(d);
    }).on('click', function (e, d) {
      e.stopPropagation();

      if (selectedGenres.has(d)) {
        selectedGenres["delete"](d);
        d3.selectAll('.point').attr('opacity', function (dp) {
          return selectedGenres.has(dp.genre) ? 1 : 0.15;
        });
        d3.select("#current-select").attr('id', 'none');
        setSelected([]);
        d3.select(this).attr('fill', 'white');
      } else {
        selectedGenres.add(d);
        d3.selectAll('.point').attr('opacity', function (dp) {
          return selectedGenres.has(dp.genre) ? 1 : 0.15;
        });
        d3.select("#current-select").attr('id', 'none');
        setSelected([]);
        d3.select(this).attr('fill', colorScale(d));
      }
    });
    legend.selectAll('.genre-text').data(unique).join('text').attr('class', 'genre-text').text(function (d) {
      return all_genres[d];
    }).attr('x', 20).attr('y', function (d, i) {
      return i * 20 + 10;
    }).attr('alignment-baseline', 'middle').attr('font-family', 'sans-serif').attr('font-size', 10);
    svgElement.call(zoom).call(zoom.transform, d3.zoomIdentity);

    function zoomed(_ref2) {
      var transform = _ref2.transform;
      var zx = transform.rescaleX(xScale).interpolate(d3.interpolateRound);
      var zy = transform.rescaleY(yScale).interpolate(d3.interpolateRound);
      g.attr("transform", transform).attr("stroke-width", 5 / transform.k);
      gx.call(xAxis.scale(transform.rescaleX(xScale))); // gx.call(xAxis, zx);

      gy.call(yAxis.scale(transform.rescaleX(yScale))); // gGrid.call(grid, zx, zy);
    }
  }, [dataset, model]); // useEffect(() => {
  // 	console.log(selected)
  // }, [selected])

  var divStyle = {
    "display": "flex"
  };
  var titleStyle = {
    "font-family": "helvetica"
  };
  var inspectStyle = {
    "display": "flex",
    "overflow": "scroll",
    "maxWidth": "250px",
    "minHeight": "620px"
  };
  var visContainer = {
    "minWidth": "620px"
  };
  return /*#__PURE__*/React.createElement("div", {
    style: divStyle
  }, /*#__PURE__*/React.createElement("div", {
    style: visContainer
  }, /*#__PURE__*/React.createElement("svg", {
    width: layout.width,
    height: layout.height,
    ref: ref
  }, /*#__PURE__*/React.createElement("g", null), /*#__PURE__*/React.createElement("g", {
    id: "x-axis"
  }), /*#__PURE__*/React.createElement("g", {
    id: "y-axis"
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: inspectStyle
  }, selected.map(function (s) {
    return /*#__PURE__*/React.createElement(Explanation, {
      features: s,
      model: model,
      key: model + s['index']
    });
  }))));
};