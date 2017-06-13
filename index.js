'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _uuid = require('uuid');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable no-nested-ternary */


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

var InfiniteScroll = function (_React$Component) {
  _inherits(InfiniteScroll, _React$Component);

  function InfiniteScroll() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, InfiniteScroll);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = InfiniteScroll.__proto__ || Object.getPrototypeOf(InfiniteScroll)).call.apply(_ref, [this].concat(args))), _this), _this.shouldComponentUpdate = function (nP) {
      if (nP.state.error !== _this.props.state.error) return true;
      if (nP.state.hasMore !== _this.props.state.hasMore) return true;
      if (JSON.stringify(nP.data) !== JSON.stringify(_this.props.data)) return true;
      return false;
    }, _this.getStyle = function () {
      return _extends({
        height: '100%'
      }, _this.props.style, {
        overflowX: 'hidden',
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch'
      });
    }, _this.loadMoreElements = function (e) {
      if (e.target.id === _this.props.infiniteId) {
        var _this$props = _this.props,
            actions = _this$props.actions,
            state = _this$props.state,
            options = _this$props.options;

        var threshold = 0;
        if (options && options.threshold) threshold = options.threshold;
        var componentHeight = e.target.scrollHeight - threshold - 1;
        var currentPosition = e.target.offsetHeight + e.target.scrollTop;

        var loadMore = currentPosition >= componentHeight && state.hasMore && !state.error;

        if (loadMore) {
          if (_this.timeoutLoadMore) clearTimeout(_this.timeoutLoadMore);
          _this.timeoutLoadMore = setTimeout(actions.loadMore, 200);
        }
      }
    }, _this.render = function () {
      var _this$props2 = _this.props,
          data = _this$props2.data,
          Row = _this$props2.Row,
          Header = _this$props2.Header,
          actions = _this$props2.actions,
          state = _this$props2.state,
          customs = _this$props2.customs;

      var CustomReloader = customs.reloader || InfiniteScrollReloader;
      var CustomSpinner = customs.spinner || InfiniteScrollSpinner;
      return _react2.default.createElement(
        'div',
        {
          ref: function ref(_ref2) {
            _this.container = _ref2;
          },
          id: _this.props.infiniteId,
          style: _this.getStyle(),
          onScroll: function onScroll(e) {
            _this.loadMoreElements(e);
          }
        },
        Header && _react2.default.createElement(Header, null),
        data.map(function (props) {
          return _react2.default.createElement(Row, _extends({ key: props.key }, props));
        }),
        state.error ? _react2.default.createElement(
          'div',
          { onClick: actions.loadMore },
          _react2.default.createElement(CustomReloader, null)
        ) : state.hasMore ? _react2.default.createElement(CustomSpinner, null) : null
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return InfiniteScroll;
}(_react2.default.Component);

InfiniteScroll.propTypes = {
  Header: _react2.default.PropTypes.func,
  Row: _react2.default.PropTypes.func.isRequired,
  data: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.shape({
    key: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number]).isRequired
  })),
  style: _react2.default.PropTypes.shape({}),
  options: _react2.default.PropTypes.shape({
    threshold: _react2.default.PropTypes.number
  }),
  actions: _react2.default.PropTypes.shape({
    loadMore: _react2.default.PropTypes.func.isRequired
  }).isRequired,
  state: _react2.default.PropTypes.shape({
    hasMore: _react2.default.PropTypes.bool.isRequired,
    error: _react2.default.PropTypes.bool.isRequired
  }).isRequired,
  customs: _react2.default.PropTypes.shape({
    spinner: _react2.default.PropTypes.func,
    reloader: _react2.default.PropTypes.func
  }),
  infiniteId: _react2.default.PropTypes.string
};

InfiniteScroll.defaultProps = {
  customs: {
    spinner: InfiniteScrollSpinner,
    reloader: InfiniteScrollReloader
  },
  infiniteId: (0, _uuid.v4)(),
  data: []
};

exports.default = InfiniteScroll;
