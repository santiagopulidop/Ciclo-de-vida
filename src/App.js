import React, { Component } from 'react';
import axios from 'axios'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
        data: undefined,
        error: null,
        aux: undefined
     }

     console.log('1.Constructor')
  }

  //3.componentDidMount: Ideal para hacer peticiones
  //Es asincrono .... peticion no se puede bloquer el hilo de peticion

_fetchData(){
  axios.get('https://rickandmortyapi.com/api/character/')
  .then(res =>{
    const characters = res.data.results;
    this.setState({
      data:characters,
      aux:characters,
      loading:false
    })
   // console.log(this.state.data)
  })
 // console.log('3.componentDidMount')
}

  componentDidMount(){
    this._fetchData();
   
  }


  componentDidUpdate(prevProps,prevState){
      console.log('Estado previo',prevState)
      console.log('Estado actual',this.state)
  }


  
  human(){
    const human = this.state.data.filter(hum=> hum.species==='Human')
    this.setState({
      aux:human
    })
  }

  alien(){
    const alien = this.state.data.filter(hum=> hum.species==='Alien');
    this.setState({
      aux:alien
    })
    
    
  }





  render() { 

    if(this.state.loading===true && 
      this.state.data === undefined){
      return(
        <h1>Cargando...</h1>
      )
    }


    return(
      <>
        {this.state.aux.map(char =>{
          return(
          <h3 key={char.id}>{`${char.name} is ${char.species}`}</h3>
          )
        })}

        <button onClick={this.human.bind(this)}>Human</button>
        <button onClick={this._fetchData.bind(this)}>All</button>
        <button onClick={this.alien.bind(this)}>Alien</button>
      </>

      
    )

    
  }
}
 

export default App;



/* 1.Constructor
2.Render
3.componentDidMount
4.contructor
5.Render */
