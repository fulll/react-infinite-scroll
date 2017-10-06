'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

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

var InfiniteScrollContainer = function InfiniteScrollContainer(props) {
  return _react2.default.createElement('div', props);
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

      var CustomReloader = customs.Reloader || InfiniteScrollReloader;
      var CustomSpinner = customs.Spinner || InfiniteScrollSpinner;
      var CustomContainer = customs.Container || InfiniteScrollContainer;

      return _react2.default.createElement(
        CustomContainer,
        {
          ref: function ref(_ref2) {
            _this.container = _ref2;
          },
          innerRef: function innerRef(ref) {
            _this.container = ref;
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
  Header: _propTypes2.default.func,
  Row: _propTypes2.default.func.isRequired,
  data: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    key: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]).isRequired
  })),
  style: _propTypes2.default.shape({}),
  options: _propTypes2.default.shape({
    threshold: _propTypes2.default.number
  }),
  actions: _propTypes2.default.shape({
    loadMore: _propTypes2.default.func.isRequired
  }).isRequired,
  state: _propTypes2.default.shape({
    hasMore: _propTypes2.default.bool.isRequired,
    error: _propTypes2.default.bool.isRequired
  }).isRequired,
  customs: _propTypes2.default.shape({
    Container: _propTypes2.default.func,
    Spinner: _propTypes2.default.func,
    Reloader: _propTypes2.default.func
  }),
  infiniteId: _propTypes2.default.string
};

InfiniteScroll.defaultProps = {
  Header: undefined,
  style: undefined,
  options: undefined,
  customs: {
    Container: InfiniteScrollContainer,
    Spinner: InfiniteScrollSpinner,
    Reloader: InfiniteScrollReloader
  },
  infiniteId: (0, _uuid.v4)(),
  data: []
};

exports.default = InfiniteScroll;
