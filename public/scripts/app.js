'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IndecisionApp = function (_React$Component) {
    _inherits(IndecisionApp, _React$Component);

    function IndecisionApp(props) {
        _classCallCheck(this, IndecisionApp);

        var _this = _possibleConstructorReturn(this, (IndecisionApp.__proto__ || Object.getPrototypeOf(IndecisionApp)).call(this, props));

        _this.handleRemoveAll = _this.handleRemoveAll.bind(_this);
        _this.handleRemoveOne = _this.handleRemoveOne.bind(_this);
        _this.handlePick = _this.handlePick.bind(_this);
        _this.handleAddOption = _this.handleAddOption.bind(_this);
        _this.state = {
            options: []
        };
        return _this;
    }

    _createClass(IndecisionApp, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            try {
                var json = localStorage.getItem('options');
                var options = JSON.parse(json);

                if (options) {
                    this.setState(function () {
                        return { options: options };
                    });
                }
            } catch (e) {
                // Do nothing at all
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            if (prevState.options.length !== this.state.options.length) {
                var json = JSON.stringify(this.state.options);
                localStorage.setItem('options', json);
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            console.log('componentWillUnmount');
        }
    }, {
        key: 'handleRemoveAll',
        value: function handleRemoveAll() {
            this.setState(function () {
                return { options: [] };
            });
            {/*
                       Mesma coisa que isso
                       this.setState(() => {
                           return {
                               options: []
                           };
                       })
                */}
        }
    }, {
        key: 'handleRemoveOne',
        value: function handleRemoveOne(optionToRemove) {
            this.setState(function (prevState) {
                return {
                    options: prevState.options.filter(function (option) {
                        return optionToRemove !== option;
                    })
                };
            });
        }
    }, {
        key: 'handlePick',
        value: function handlePick() {
            var randomNum = Math.floor(Math.random() * this.state.options.length);
            var option = this.state.options[randomNum];
            alert(option);
        }
    }, {
        key: 'handleAddOption',
        value: function handleAddOption(option) {
            if (!option) {
                //Se o valor do campo for falso é porque não tem valor nele
                return 'Erro - Digite algum valor no campo';
            } else if (this.state.options.indexOf(option) > -1) {
                //Compara se existe algum campo com o mesmo valor
                return 'Erro - Esse item já existe';
            }
            //Não preciso de um else, porque essa parte de baixo é como se fosse o else 
            this.setState(function (prevState) {
                return { options: prevState.options.concat(option) };
            }); //forma abreviada
            //this.setState((prevState) => {
            //    return {
            //        //Adiciona o elemento na lista
            //        options: prevState.options.concat(option)
            //    }
            //});
        }
    }, {
        key: 'render',
        value: function render() {
            var subtitle = 'Coloque a sua vida nas mãos do computador';
            return React.createElement(
                'div',
                null,
                React.createElement(Header, { subtitle: subtitle }),
                React.createElement(Action, {
                    hasOptions: this.state.options.length > 0,
                    handlePick: this.handlePick
                }),
                React.createElement(Options, {
                    options: this.state.options,
                    handleRemoveAll: this.handleRemoveAll,
                    handleRemoveOne: this.handleRemoveOne
                }),
                React.createElement(AddOption, { handleAddOption: this.handleAddOption })
            );
        }
    }]);

    return IndecisionApp;
}(React.Component);

var Header = function Header(props) {
    return React.createElement(
        'div',
        null,
        React.createElement(
            'h1',
            null,
            props.title
        ),
        props.subtitle && React.createElement(
            'h2',
            null,
            props.subtitle
        )
    );
};

Header.defaultProps = {
    title: 'Indecisão App'

    //class Header extends React.Component {
    //    render() {
    //        return (
    //            <div>
    //                <h1>{this.props.title}</h1>
    //                <h2>{this.props.subtitle}</h2>
    //            </div>
    //        );
    //    }
    //}

};var Action = function Action(props) {
    return React.createElement(
        'div',
        null,
        React.createElement(
            'button',
            {
                onClick: props.handlePick,
                disabled: !props.hasOptions
            },
            'O que devo fazer?'
        )
    );
};

//class Action extends React.Component {
//    render () {
//        return (
//            <div>
//                <button
//                    onClick={this.props.handlePick}
//                    disabled={!this.props.hasOptions}
//                    >O que devo fazer?
//                </button>
//            </div>
//        );
//    }
//}

var Options = function Options(props) {
    return React.createElement(
        'div',
        null,
        React.createElement(
            'button',
            { onClick: props.handleRemoveAll },
            'Remover todos'
        ),
        props.options.length === 0 && React.createElement(
            'p',
            null,
            'Por favor adicione algo para come\xE7ar'
        ),
        props.options.map(function (option) {
            return React.createElement(Option, {
                key: option,
                optionText: option,
                handleRemoveOne: props.handleRemoveOne
            });
        })
    );
};

//class Options extends React.Component {
//    render () {
//        return (
//            <div>
//                <button onClick={this.props.handleRemoveAll}>Remover todos</button>
//                {
//                    this.props.options.map((option) => <Option key={option} optionText={option}/>)
//                }
//                <Option />
//            </div>
//        );
//    }
//}

var Option = function Option(props) {
    return React.createElement(
        'div',
        null,
        props.optionText,
        React.createElement(
            'button',
            {
                onClick: function onClick(e) {
                    props.handleRemoveOne(props.optionText);
                }
            },
            'Remover'
        )
    );
};

//class Option extends React.Component {
//    render () {
//        return (
//            <div>
//                {this.props.optionText}
//            </div>
//        );
//    }
//}

var AddOption = function (_React$Component2) {
    _inherits(AddOption, _React$Component2);

    function AddOption(props) {
        _classCallCheck(this, AddOption);

        var _this2 = _possibleConstructorReturn(this, (AddOption.__proto__ || Object.getPrototypeOf(AddOption)).call(this, props));

        _this2.handleAddOption = _this2.handleAddOption.bind(_this2);
        _this2.state = {
            error: undefined
        };
        return _this2;
    }

    _createClass(AddOption, [{
        key: 'handleAddOption',
        value: function handleAddOption(e) {
            e.preventDefault();

            var option = e.target.elements.option.value.trim();
            var error = this.props.handleAddOption(option);

            this.setState(function () {
                return { error: error };
            });
            //        this.setState(() => {
            //            return {
            //                error
            //                //É a mesma coisa que
            //                //error: error
            //            }
            //        })
            if (!error) {
                e.target.elements.option.value = '';
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                this.state.error && React.createElement(
                    'p',
                    null,
                    this.state.error
                ),
                React.createElement(
                    'form',
                    { onSubmit: this.handleAddOption },
                    React.createElement('input', { type: 'text', name: 'option' }),
                    React.createElement(
                        'button',
                        null,
                        'Add op\xE7\xE3o'
                    )
                )
            );
        }
    }]);

    return AddOption;
}(React.Component);

//Stateless Functional Components
//É mais rapido que as classes padroes
//const User = (props) => {
//    return (
//        <div>
//            <p>Nome: {props.name}</p>
//            <p>Idade: {props.age}</p>
//        </div>
//    );
//};
//
//ReactDOM.render(<User name="Georg" age={27} />, document.getElementById('app'));

//Por causa do defaultprosp, conseguimos adicionar dados por aqui
//ReactDOM.render(<IndecisionApp options={['Georg']} />, document.getElementById('app'));

ReactDOM.render(React.createElement(IndecisionApp, null), document.getElementById('app'));
