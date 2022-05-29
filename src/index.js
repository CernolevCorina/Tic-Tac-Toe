import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const calculateWinner = (squares) => {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

const Square = (props) => {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}
  
class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square 
                value={this.props.squares[i]}
                onClick={()=> this.props.onClick(i)}
            />
        );
    }
  
    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}
  
class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if(calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ? 
                `Go to move # ${move}`:
                `Go to game start`;
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        let status;
        if(winner) {
            status = `Winner: ${winner}`;
        } else {
            status = `Next player: ${(this.state.xIsNext ? 'X' : 'O')}`
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board 
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>           
        );
    }
}




class Clock extends React.Component {
    constructor(props) {
      super(props);
      this.state = {date: new Date()};
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }

    render() {
        return(
            <div className='clock'>
                <div>Clock</div>
                <div>It is: {this.state.date.toLocaleTimeString()}</div>
            </div>
            
        );
    }
}




class Toggle extends React.Component {
    constructor(props){
        super(props);
        this.state = {isToggleOn: true};
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState(prevState => ({
            isToggleOn : !prevState.isToggleOn
        }));
    }

    render() {
        return (
            <button onClick={this.handleClick}>
                {this.state.isToggleOn ? "On" : "Off"}
            </button>
        );
    }
}





const LoginButton = (props) => {
    return(
        <button onClick={props.onClick} id="loginBtn">
            Login
        </button>
    );
}

const LogoutButton = (props) => {
    return(
        <button onClick={props.onClick} id="logoutBtn">
            Logout
        </button>
    );
}

const UserGreeting = () => {
    return <h1>Welcome back!</h1>
}

const GuestGreeting = () => {
    return <h1>Please sign up.</h1>
}

const Greeting = (props) => {
    const isLoggedIn = props.isLoggedIn;
    if(isLoggedIn) {
        return <UserGreeting />
    }

    return <GuestGreeting />
}

class LoginControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isLoggedIn: false};
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
    }

    handleLoginClick() {
        this.setState({isLoggedIn: true});
    }

    handleLogoutClick() {
        this.setState({isLoggedIn: false});
    }

    render() {
        const isLoggedIn = this.state.isLoggedIn;
        let button;

        if (isLoggedIn) {
            button = <LogoutButton onClick={this.handleLogoutClick} />;
        } else {
            button = <LoginButton onClick={this.handleLoginClick} />;
        }

        return(
            <div>
                <Greeting isLoggedIn={isLoggedIn} />
                {button}
            </div>
        )
    }
}





const WarningBanner = (props) => {
    if(!props.warn) {
        return null;
    }

    return (
        <div className='warning'>
            Warning!
        </div>
    );
}

class Page extends React.Component {
    constructor (props) {
        super(props);
        this.state = {showWarning: true};
        this.handleToggleClick = this.handleToggleClick.bind(this);
    }

    handleToggleClick() {
        this.setState(state => ({
            showWarning: !state.showWarning
        }));
    }

    render() {
        return(
            <div>
                <WarningBanner warn={this.state.showWarning} />
                <button onClick={this.handleToggleClick}>
                    {this.state.showWarning ? 'Hide' : 'Show'}
                </button>
            </div>
        )
    }
}

//List
const ListItem = (props) => {
    return <li>{props.value}</li>
}

const numbers = [1, 2, 3, 4, 5];

const NumberList = (props) => {
    const numbers = props.numbers;
    const listItems = numbers.map((number) =>
    <ListItem key={number.toString()} value={number} />
    )

    return (
        <ul>
            {listItems}
        </ul>
    )
}

//Blog
const Blog = (props) => {
    const sidebar = (
        <ul>
            {props.posts.map((post) =>
            <li key={post.id}>
                {post.title}
            </li>
            )}
        </ul>
    );

    const content = props.posts.map((post) =>
        <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
        </div>
    );

    return (
        <div>
            {sidebar}
            <hr />
            {content}
        </div>
    )
}

const posts = [
    {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
    {id: 2, title: 'Installation', content: 'You can install React from npm.'}
];

//NameForm
class NameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        alert(`A name was submitted: ${this.state.value}`);
        event.preventDefault();
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        )
    }
}

class FlavorForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: 'coconut'};
  
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
        this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
        alert('Your favorite flavor is: ' + this.state.value);
        event.preventDefault();
    }
  
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Pick your favorite flavor:
                    <select value={this.state.value} onChange={this.handleChange}>
                        <option value="grapefruit">Grapefruit</option>
                        <option value="lime">Lime</option>
                        <option value="coconut">Coconut</option>
                        <option value="mango">Mango</option>
                    </select>
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}



//Lifting State Up
const BoilingVerdict = (props) => {
    if (props.celsius >= 100) {
        return <p>The water would boil.</p>
    }
    return <p>The water would not boil.</p>
}

const scaleNames = {
    c: 'Celsius',
    f: 'Fahrenheit'
}

const toCelsius = (fahrenheit) => {
    return (fahrenheit-32) * 5 / 9;
}

const toFahrenheit = (celsius) => {
    return (celsius * 9 / 5) + 32;
}

const tryConvert = (temperature, convert) => {
    const input = parseFloat(temperature);
    if (Number.isNaN(input)) {
        return "";
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
}

class TemmperatureInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        //Before: this.setState({temperature: e.target.value});
        this.props.onTemperatureChange(e.target.value);
    }

    render() {
        // Before: const temperature = this.state.temperature;
        const temperature = this.props.temperature;
        const scale = this.props.scale;
        return(
            <fieldset>
                <legend>
                    Enter temperature in {scaleNames[scale]}:
                </legend>
                <input
                    value = {temperature}
                    onChange={this.handleChange}
                />
            </fieldset>
        );
    }
}

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
        this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
        this.state = {temperature: "", scale: 'c'};
    }

    handleCelsiusChange(temperature) {
        this.setState({scale: 'c', temperature});
    }

    handleFahrenheitChange(temperature) {
        this.setState({scale: 'f', temperature});
    }

    render() {
        const scale = this.state.scale;
        const temperature = this.state.temperature;
        const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
        const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;
        return (
            <div>
                <TemmperatureInput 
                    scale="c" 
                    temperature={celsius}
                    onTemperatureChange={this.handleCelsiusChange}
                />
                <TemmperatureInput
                    scale='f'
                    temperature={fahrenheit}
                    onTemperatureChange={this.handleFahrenheitChange}
                />
                <BoilingVerdict
                    celsius={parseFloat(celsius)}
                />
            </div>
        )
    }
}



//Composition vs Inheritance
const FancyBorder = (props) => {
    return (
        <div className={`fancyBorder fancyBorder${props.color}`}>
            {props.children}
        </div>
    );
}

const Dialog = (props) => {
    return (
        <FancyBorder color="blue">
            <h1 className='dialogTitle'>
                {props.title}
            </h1>
            <p className='dialogMessage'>
                {props.message}
            </p>
            {props.children}
        </FancyBorder>
    )
}

class SignUpDialog extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange=this.handleChange.bind(this);
        this.handleSignUp=this.handleSignUp.bind(this);
        this.state = {login: ''};
    }

    handleChange(e) {
        this.setState({login: e.target.value});
    }

    handleSignUp() {
        alert(`Welcome aboard, ${this.state.login}!`);
    }

    render() {
        return (
            <Dialog
                title='Mars Exploration Program'
                message='How should we refer to you?'
            >
                <input
                    value={this.state.login}
                    onChange={this.handleChange}
                />
                <button onClick={this.handleSignUp}>
                    Sign Me Up!
                </button>
            </Dialog>
        );
    }
}

const Content = () => {
    return(
        <div>
            <Page />
            <LoginControl />
            <Game />
            <Clock />
            <Toggle />
            <NumberList numbers={numbers}/>
            <Blog posts={posts} />
            <NameForm/>
            <FlavorForm/>
            <Calculator/>
            <SignUpDialog/>
        </div>
    )
}
  
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Content />);