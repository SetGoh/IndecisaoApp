class IndecisionApp extends React.Component {
    constructor(props) {
        super(props);
        this.handleRemoveAll = this.handleRemoveAll.bind(this);
        this.handleRemoveOne = this.handleRemoveOne.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.state = {
            options: []
        }
    }
    componentDidMount() {
        try {
          const json = localStorage.getItem('options');
          const options = JSON.parse(json);
    
          if (options) {
            this.setState(() => ({ options }));
          }
        } catch (e) {
          // Do nothing at all
        }
      }
      componentDidUpdate(prevProps, prevState) {
        if (prevState.options.length !== this.state.options.length) {
          const json = JSON.stringify(this.state.options);
          localStorage.setItem('options', json);
        }
      }
      componentWillUnmount() {
        console.log('componentWillUnmount');
      }
    handleRemoveAll() {
        this.setState(() => ({ options: [] }));
{/*
        Mesma coisa que isso
        this.setState(() => {
            return {
                options: []
            };
        })
*/}
    }
    handleRemoveOne(optionToRemove) {
        this.setState((prevState) => ({
            options: prevState.options.filter((option) => optionToRemove !== option)
        }));
    }
    handlePick() {
        const randomNum = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randomNum];
        alert(option);
    }
    handleAddOption(option) {
        if (!option) {
            //Se o valor do campo for falso é porque não tem valor nele
            return 'Erro - Digite algum valor no campo';
        } else if (this.state.options.indexOf(option) > -1) {
            //Compara se existe algum campo com o mesmo valor
            return 'Erro - Esse item já existe'
        }
        //Não preciso de um else, porque essa parte de baixo é como se fosse o else 
        this.setState((prevState) => ({ options: prevState.options.concat(option) })) //forma abreviada
        //this.setState((prevState) => {
        //    return {
        //        //Adiciona o elemento na lista
        //        options: prevState.options.concat(option)
        //    }
        //});
    }
    render() {
    const subtitle = 'Coloque a sua vida nas mãos do computador'
        return (
            <div>
                <Header subtitle={subtitle}/>
                <Action
                    hasOptions={this.state.options.length > 0}
                    handlePick={this.handlePick}
                />
                <Options
                    options={this.state.options}
                    handleRemoveAll={this.handleRemoveAll}
                    handleRemoveOne={this.handleRemoveOne}
                />
                <AddOption handleAddOption={this.handleAddOption}/>
            </div>
        );
    }
}

const Header = (props) => {
    return (
        <div>
            <h1>{props.title}</h1>
            {props.subtitle && <h2>{props.subtitle}</h2>}
        </div>
    );
};

Header.defaultProps = {
    title: 'Indecisão App'
}

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

const Action = (props) => {
    return (
        <div>
            <button
                onClick={props.handlePick}
                disabled={!props.hasOptions}
                >O que devo fazer?
            </button>
        </div>
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

const Options = (props) => {
    return (
        <div>
            <button onClick={props.handleRemoveAll}>Remover todos</button>
            {props.options.length === 0 && <p>Por favor adicione algo para começar</p>}
            {
                props.options.map((option) => (
                    <Option 
                        key={option} 
                        optionText={option}
                        handleRemoveOne={props.handleRemoveOne}
                    />
                ))
            }
        </div>
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

const Option = (props) => {
    return (
        <div>
            {props.optionText}
            <button
                onClick={(e) => {
                    props.handleRemoveOne(props.optionText);
                }}
            >
                Remover
            </button>
        </div>
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

class AddOption extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.state = {
            error: undefined
        }
    }
    handleAddOption(e) {
        e.preventDefault();

        const option = e.target.elements.option.value.trim();
        const error = this.props.handleAddOption(option);

        this.setState(() => ({error}));
//        this.setState(() => {
//            return {
//                error
//                //É a mesma coisa que
//                //error: error
//            }
//        })
        if(!error) {
            e.target.elements.option.value = '';
        }
    }
    render() {
        return (
            <div>
                {/* Se o state do erro for falso é porque tem algum erro 
                então, então gerar um paragrafo com o erro */}
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.handleAddOption}>
                    <input type="text" name="option" />
                    <button>Add opção</button>
                </form>
            </div>
        );
    }
}

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

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));