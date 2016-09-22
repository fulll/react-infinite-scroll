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
  var threshold = props.threshold;
  var items = props.items;
  var loadMore = props.loadMore;
  var loading = props.loading;
  var spinner = props.spinner;
  var error = props.error;
  var hasMore = props.hasMore;
  var reloader = props.reloader;


  height = height || '100%';
  threshold = threshold || 0;

  var style = {
    div: {
      overflowX: 'hidden',
      overflowY: 'auto',
      WebkitOverflowScrolling: 'touch',
      height: height
    }
  };

  var customReloader = reloader || _react2.default.createElement(InfiniteScrollReloader, null);

  var customSpinner = spinner || _react2.default.createElement(InfiniteScrollSpinner, null);
  var displaySpinner = hasMore;

  var loadMoreElements = function loadMoreElements(e) {
    var componentHeight = e.target.scrollHeight - threshold - 1;
    var currentPosition = e.target.offsetHeight + e.target.scrollTop;

    if (currentPosition >= componentHeight && hasMore && loading === false && error === false) {
      loadMore();
    }
  };

  var tryAgain = function tryAgain() {
    loadMore();
  };

  var showSpinner = displaySpinner ? customSpinner : null;

  return _react2.default.createElement(
    'div',
    { style: style.div, onScroll: loadMoreElements },
    items,
    error ? _react2.default.createElement(
      'div',
      { onClick: tryAgain },
      customReloader
    ) : showSpinner
  );
};

InfiniteScroll.propTypes = {
  height: _react2.default.PropTypes.oneOf([_react2.default.PropTypes.number, _react2.default.PropTypes.string]),
  threshold: _react2.default.PropTypes.number,
  items: _react2.default.PropTypes.node,
  loadMore: _react2.default.PropTypes.func.isRequired,
  loading: _react2.default.PropTypes.bool.isRequired,
  error: _react2.default.PropTypes.bool.isRequired,
  spinner: _react2.default.PropTypes.node,
  reloader: _react2.default.PropTypes.node
};

exports.default = InfiniteScroll;
