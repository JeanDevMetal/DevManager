import { Component } from 'react';
class Saudacao extends Component {
    render() {
      return <h1>Olá, {this.props.nome}!</h1>;
    }
}
class App extends Component {
    render() {
      return (
        <div>
          <Saudacao nome="Maria" />
          <Saudacao nome="João" />
        </div>
      );
    }
}
export default App;
      