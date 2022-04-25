"use strict";

exports.__esModule = true;
exports.Explanation = void 0;

var _react = _interopRequireWildcard(require("react"));

var d3 = _interopRequireWildcard(require("d3"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var Explanation = function Explanation(_ref) {
  var _ref$features = _ref.features,
      features = _ref$features === void 0 ? {} : _ref$features,
      _ref$model = _ref.model,
      model = _ref$model === void 0 ? 'knn' : _ref$model,
      _ref$index = _ref.index,
      index = _ref$index === void 0 ? 0 : _ref$index;
  console.log(features);
  var ref = (0, _react.useRef)('explanation' + index);
  var layout = {
    "height": 480,
    "width": 200,
    "margin": 20
  }; // const [selected, setSelected] = React.useState({})
  // console.log(features)

  var all_genres = ['pop', 'metal', 'disco', 'blues', 'reggae', 'classical', 'rock', 'hiphop', 'country', 'jazz'];

  function convertData(d) {
    var converted = [];

    for (var _i = 0, _Object$entries = Object.entries(d); _i < _Object$entries.length; _i++) {
      var _Object$entries$_i = _Object$entries[_i],
          key = _Object$entries$_i[0],
          value = _Object$entries$_i[1];

      if (['index', 'genre', 'x', 'y', 'filename', 'filepath'].includes(key) || key.includes("predicted")) {
        continue;
      }

      converted.push({
        'name': key,
        'weight': value
      });
    } // for (let i = 0; i < d.length; i++) {
    // 	let item = d[i]
    // 	converted.push({'name': item[0], 'weight': item[1]})
    // }
    // console.log(converted)


    return converted;
  }

  (0, _react.useEffect)(function () {
    var converted = convertData(features); // console.log('rendering explanation', converted)

    var svgElement = d3.select(ref.current); // console.log(svgElement)

    var g = svgElement.select("#exp-vis");
    var xScale = d3.scaleLinear().domain(d3.extent(converted, function (d) {
      return d.weight;
    })).range([layout.margin, layout.width - layout.margin]);
    var unique = Array.from(new Set(converted.map(function (d) {
      return d.name;
    })));
    var yScale = d3.scaleBand().domain(converted.map(function (d) {
      return d.name;
    })).range([layout.height - layout.margin, layout.margin]);
    var colorScale = d3.scaleOrdinal(d3.schemeTableau10).domain(unique);
    var opacityScale = d3.scaleLinear().domain(d3.extent(converted, function (d) {
      return Math.abs(d.weight);
    })).range([0.25, 0.8]);
    svgElement.selectAll('.exp').data(converted).join('rect').attr('class', 'exp').attr('x', function (d) {
      return d.weight > 0 ? xScale(0) : xScale(d.weight);
    }).attr('height', yScale.bandwidth() - 10).attr('fill', "steelblue").attr('opacity', function (d) {
      return opacityScale(Math.abs(d.weight));
    });
    svgElement.selectAll('.exp').transition().duration(500).ease(d3.easeLinear).attr('y', function (d) {
      return yScale(d.name) + 5;
    }).attr('width', function (d) {
      return d.weight > 0 ? xScale(d.weight) - xScale(0) : xScale(0) - xScale(d.weight);
    }); // svgElement.append('g')
    //        .attr('transform', `translate(0, ${layout.height - layout.margin})`)
    //        .call(d3.axisBottom(xScale).tickSize(3).ticks(5))
    // svgElement.append('g')
    //          .attr('transform', `translate(${xScale(0)}, 0)`)
    //          .attr("id", "y-axis")
    //          .call(d3.axisLeft(yScale).tickSize(3).ticks(5))

    svgElement.select('#y-axis').transition().attr('transform', "translate(" + xScale(0) + ", 0)").call(d3.axisRight(yScale).tickSize(3).ticks(5));
  }, [features]);
  var titleStyle = {
    "fontFamily": "helvetica",
    "fontSize": "0.8em",
    "marginBottom": "0px",
    "marginLeft": "15px"
  };
  return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("p", {
    style: titleStyle
  }, /*#__PURE__*/_react["default"].createElement("b", null, "Song: "), features['filename']), /*#__PURE__*/_react["default"].createElement("p", {
    style: titleStyle
  }, /*#__PURE__*/_react["default"].createElement("b", null, "Predicted genre: "), typeof features[model + '_predicted'] === 'string' ? features[model + '_predicted'] : all_genres[features[model + '_predicted']]), /*#__PURE__*/_react["default"].createElement("svg", {
    width: layout.width,
    height: layout.height,
    ref: ref
  }, /*#__PURE__*/_react["default"].createElement("g", {
    id: "exp-vis"
  }), /*#__PURE__*/_react["default"].createElement("g", {
    id: "y-axis"
  })));
};

exports.Explanation = Explanation;