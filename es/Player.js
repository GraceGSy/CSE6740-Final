export var Player = function Player(_ref) {
  var _ref$filepath = _ref.filepath,
      filepath = _ref$filepath === void 0 ? './Despacito.wav' : _ref$filepath,
      _ref$filename = _ref.filename,
      filename = _ref$filename === void 0 ? '' : _ref$filename;
  var audioInstance = {};
  var audioList1 = [{
    name: filename,
    singer: '',
    musicSrc: filepath // support async fetch music src. eg.
    // musicSrc: async () => {
    //   return await fetch('/api')
    // },

  }];
  var options = {
    // audio lists model
    audioLists: audioList1,
    mode: "full",
    toggleMode: false
  };
  return /*#__PURE__*/React.createElement("div", null);
};