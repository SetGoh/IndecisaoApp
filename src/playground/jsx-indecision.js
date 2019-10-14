//console.log('App.js está rodando!');
//
//JSX - JavaScript XML
//
//const user = {
//    name: 'Georg Augusto',
//    age: '17',
//    location: 'Assis'
//};
//
//function getLocation(location) {
//    if (location) {
//        {/*
//            Se o usuário tem uma localização mostrar a mesma dentro da tag p
//            caso não tenha retorar vazia, não preciso fazer o else, ele entede
//            que tem e é nulo
//        */}
//        return <p>Localização: {location}</p>;
//    }     
//};
//
//const templateTwo = (
//    <div>
//        {/*
//            Se o usuário possuir nome, mostrar esse nome dentro da tag h1
//            caso ele não tenho mostrar 'Anónimo' na tag h1
//        */}
//        <h1>{user.name ? user.name : 'Anónimo'}</h1>
//        {/*
//            Se o primeiro e o segundo argumento for verdadeiro, o terceiro é gerado 
//            exemplo: Se possuir idade e ela for maior que 18, adicionar um paragrafo
//        */}
//        {(user.name && user.age >= 18) && <p>age: {user.age}</p>}
//        {/*
//            Posso colocar a função direto, e gerar a tag dentro dela
//        */}
//        {getLocation(user.location)}
//    </div>
//);
//
//Criar um TemplateTwo var JSX expression
// div
// h1 -> Georg Augusto
// p -> age: 27
// p -> Location: Assis
//
//let count = 0;
//const addOne = () => {
//    count++;
//    renderCounterApp();
//};
//
//const minusOne = () => {
//    count--;
//    renderCounterApp();
//};
//
//const reset = () => {
//    count=0;
//    renderCounterApp();
//};
//
//
//const appRoot = document.getElementById('app');
//
//const renderCounterApp = () => {
//    const templateTwo = (
//        <div>
//            <h1>Contador: {count}</h1>
//            <button onClick={addOne}>+1</button>
//            <button onClick={minusOne}>-1</button>
//            <button onClick={reset}>Resetar</button>
//        </div>
//    );
//    ReactDOM.render(templateTwo, appRoot);
//};
//
//renderCounterApp();

const app = {
    title: 'Indecisão App',
    subtitle: 'Coloque a sua vida nas mãos do computador',
    options: []
};

const onFormSubmit = (e) => {
    e.preventDefault();

    //Pega o valor do evento do elemento alvo com nome de "option" 
    const option = e.target.elements.option.value;

    if (option) {
        //Adiciona ao elemento que foi digitado noinput em option
        app.options.push(option);
        //Limpa o campo do input
        e.target.elements.option.value = '';
        renderFormApp();
    }
};

const OnRemoveAll = () => {
    app.options = [];
    renderFormApp();
};

const onMakeDecision = () => {
    const randomNum = Math.floor(Math.random() * app.options.length);
    const option = app.options[randomNum];
    alert(option);
}

const renderFormApp = () => {
    const template = (
        <div>
            <h1>{app.title}</h1>
            {app.subtitle && <p>{app.subtitle}</p>}
            <p>{app.options.length > 0 ? "Aqui estão suas opções: " : "Não tem opções"}</p>
            <button disabled={app.options.length === 0} onClick={onMakeDecision}>O que devo fazer?</button>
            <ol>
                {
                    app.options.map((option) => <li key={option}>{option}</li>)
                }
            </ol>
            <form onSubmit={onFormSubmit}>
                <input type="text" name="option"></input>
                <button>Add Opção</button>
                <button onClick={OnRemoveAll}>Remover todos</button>
            </form>
        </div>
    );
    ReactDOM.render(template, appRoot);
};

const appRoot = document.getElementById('app');

renderFormApp();