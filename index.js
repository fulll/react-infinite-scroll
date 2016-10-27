'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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
  var children = props.children;
  var actions = props.actions;
  var state = props.state;
  var customs = props.customs;
  var options = props.options;
  var style = props.style;


  var threshold = 0;
  if (options) {
    if (options.threshold) threshold = options.threshold;
  }

  style = {
    div: _extends({
      height: '100%'
    }, style, {
      overflowX: 'hidden',
      overflowY: 'auto',
      WebkitOverflowScrolling: 'touch'
    })
  };

  var customReloader = _react2.default.createElement(InfiniteScrollReloader, null);
  var customSpinner = _react2.default.createElement(InfiniteScrollSpinner, null);

  if (customs) {
    if (customs.reloader) customReloader = customs.reloader;
    if (customs.spinner) customSpinner = customs.spinner;
  }

  var displaySpinner = state.loading;

  var loadMoreElements = function loadMoreElements(e) {
    var componentHeight = e.target.scrollHeight - threshold - 1;
    var currentPosition = e.target.offsetHeight + e.target.scrollTop;

    var loadMore = currentPosition >= componentHeight && state.hasMore && !state.loading && !state.error;

    if (loadMore) actions.loadMore();
  };

  var showSpinner = displaySpinner ? customSpinner : null;

  return _react2.default.createElement(
    'div',
    { style: style.div, onScroll: loadMoreElements },
    children,
    state.error ? _react2.default.createElement(
      'div',
      { onClick: actions.loadMore },
      customReloader
    ) : showSpinner
  );
};

InfiniteScroll.propTypes = {
  children: _react2.default.PropTypes.node,
  style: _react2.default.PropTypes.shape({}),
  options: _react2.default.PropTypes.shape({
    threshold: _react2.default.PropTypes.number
  }),
  actions: _react2.default.PropTypes.shape({
    loadMore: _react2.default.PropTypes.func.isRequired
  }).isRequired,
  state: _react2.default.PropTypes.shape({
    hasMore: _react2.default.PropTypes.bool.isRequired,
    loading: _react2.default.PropTypes.bool.isRequired,
    error: _react2.default.PropTypes.bool.isRequired
  }).isRequired,
  customs: _react2.default.PropTypes.shape({
    spinner: _react2.default.PropTypes.node,
    reloader: _react2.default.PropTypes.node
  })
};

exports.default = InfiniteScroll;
