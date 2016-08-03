'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InfiniteScrollSpinner = function InfiniteScrollSpinner() {

  var style = {
    width: '100%',
    fontSize: 12,
    textAlign: 'center',
    padding: '0 0 10px 0'
  };

  return _react2.default.createElement(
    'div',
    { style: style },
    'Loading ...'
  );
};

var InfiniteScrollReloader = function InfiniteScrollReloader() {

  var style = {
    width: '100%',
    fontSize: 12,
    textAlign: 'center',
    cursor: 'pointer',
    padding: '10px 0'
  };

  return _react2.default.createElement(
    'div',
    { style: style },
    'Error loading data, click to try again'
  );
};

var InfiniteScroll = function InfiniteScroll(props) {
  var height = props.height;
  var items = props.items;
  var loadMore = props.loadMore;
  var hasMore = props.hasMore;
  var loading = props.loading;
  var error = props.error;
  var spinner = props.spinner;
  var reloader = props.reloader;


  var style = {
    div: {
      overflowX: 'hidden',
      overflowY: 'auto',
      WebkitOverflowScrolling: 'touch',
      height: height
    }
  };

  var customReloader = reloader ? reloader : _react2.default.createElement(InfiniteScrollReloader, null);

  var customSpinner = spinner ? spinner : _react2.default.createElement(InfiniteScrollSpinner, null);
  var displaySpinner = hasMore ? true : false;

  var loadMoreElements = function loadMoreElements(e) {

    var componentHeight = e.target.scrollHeight - 1;
    var currentPosition = style.div.height + e.target.scrollTop;

    if (currentPosition >= componentHeight && hasMore == true && loading == false && error == false) {
      setTimeout(function () {
        loadMore();
      }, 500);
    }
  };

  var tryAgain = function tryAgain() {
    loadMore();
  };

  return _react2.default.createElement(
    'div',
    { style: style.div, onScroll: loadMoreElements },
    items,
    error ? _react2.default.createElement(
      'div',
      { onClick: tryAgain },
      customReloader
    ) : displaySpinner ? customSpinner : null
  );
};

exports.default = InfiniteScroll;
