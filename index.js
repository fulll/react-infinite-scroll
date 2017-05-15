'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

var infiniteId = 'infinite-scroll';

var InfiniteScroll = function (_React$Component) {
  _inherits(InfiniteScroll, _React$Component);

  function InfiniteScroll() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, InfiniteScroll);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = InfiniteScroll.__proto__ || Object.getPrototypeOf(InfiniteScroll)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      displaySpinner: _this.props.state.loading
    }, _this.componentWillReceiveProps = function (nP) {
      if (nP.state.loading && !_this.state.displaySpinner) {
        _this.setState({ displaySpinner: true });
      } else if (!nP.state.loading && _this.state.displaySpinner && !nP.state.hasMore) {
        _this.setState({ displaySpinner: false });
      }
    }, _this.getStyle = function () {
      return _extends({
        height: '100%'
      }, _this.props.style, {
        overflowX: 'hidden',
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch'
      });
    }, _this.showSpinner = function (e) {
      if (!_this.state.displaySpinner) {
        if (e.deltaY > 0 && _this.props.state.hasMore) {
          _this.setState({ displaySpinner: true });
        }
      }
    }, _this.loadMoreElements = function (e) {
      if (e.target.id === infiniteId) {
        var _this$props = _this.props,
            actions = _this$props.actions,
            state = _this$props.state,
            options = _this$props.options;

        var threshold = 0;
        if (options && options.threshold) threshold = options.threshold;
        var componentHeight = e.target.scrollHeight - threshold - 1;
        var currentPosition = e.target.offsetHeight + e.target.scrollTop;

        var loadMore = currentPosition >= componentHeight && state.hasMore && !state.loading && !state.error;

        if (loadMore) actions.loadMore();
      }
    }, _this.render = function () {
      var _this$props2 = _this.props,
          children = _this$props2.children,
          actions = _this$props2.actions,
          state = _this$props2.state,
          customs = _this$props2.customs;

      var CustomReloader = InfiniteScrollReloader;
      var CustomSpinner = InfiniteScrollSpinner;

      if (customs) {
        if (customs.reloader) CustomReloader = customs.reloader;
        if (customs.spinner) CustomSpinner = customs.spinner;
      }

      return _react2.default.createElement(
        'div',
        {
          ref: function ref(_ref2) {
            return _this.container = _ref2;
          },
          id: infiniteId,
          style: _this.getStyle(),
          onScroll: _this.loadMoreElements,
          onWheel: _this.showSpinner
        },
        children,
        state.error ? _react2.default.createElement(
          'div',
          { onClick: actions.loadMore },
          _react2.default.createElement(CustomReloader, null),
          '}'
        ) : _this.state.displaySpinner ? _react2.default.createElement(CustomSpinner, null) : null
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  /* eslint-disable */


  return InfiniteScroll;
}(_react2.default.Component);

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
    spinner: _react2.default.PropTypes.func,
    reloader: _react2.default.PropTypes.func
  })
};

exports.default = InfiniteScroll;
