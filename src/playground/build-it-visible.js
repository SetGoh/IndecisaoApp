class VisibilityToggle extends React.Component {
    constructor(props) {
        super(props);
        this.showDetails = this.showDetails.bind(this);
        this.state = {
            visibility: false
        }
    }
    showDetails() {
        this.setState((prevState) => {
            return {
                visibility: !prevState.visibility
            }
        });
    }
    render() {
        return (
            <div>
                <h1>Alternância de visibilidade</h1>
                <button onClick={this.showDetails}>
                    {this.state.visibility ? 'Esconder detalhes' : 'Mostrar detalhes'}
                </button>
                {this.state.visibility && (
                    <div>
                        <p>Noissss!!!!</p>
                    </div>
                )}
            </div>
        );
    }
}

ReactDOM.render(<VisibilityToggle />, document.getElementById('app'));




/* let visibility = false;

const showDetails = () => {
    console.log('Click!')
    visibility=!visibility;
    render();
};

const render = () => {
    const template = (
        <div>
            <h1>Alternância de visibilidade</h1>
            <button onClick={showDetails}>
                {visibility ? 'Esconder detalhes' : 'Mostrar detalhes'}
            </button>
            {visibility && (
                <div>
                    <p>Deu certo!!!</p>
                </div>
            )}
        </div>
    );
    ReactDOM.render(template, document.getElementById('app'));
};

render(); */