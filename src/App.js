import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {value: '', valueDel: '', list: []};
    this.handleTextAdd = this.handleTextAdd.bind(this);
    this.handleTextRemove = this.handleTextRemove.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeDel = this.handleChangeDel.bind(this);  
    this.handleCheck = this.handleCheck.bind(this);
  }
  handleChange(event) {
    this.setState({value: event.target.value})
  }
  handleChangeDel(event) {
    this.setState({valueDel: event.target.value})
  }
  handleTextAdd(event) {
    var fn = 0;
    for(var task of this.state.list) {
      if(this.state.value == task.name) {
        fn = 1;
      }
    }
    if(!fn) {
      this.setState({list: [...this.state.list, {name: this.state.value, checked: false}], value: ''});
    }
    event.preventDefault();
  }
  
  displayAdd() {
    return (
      <form className = "form" onSubmit = {this.handleTextAdd}>
        <label> 
          <input type="text" value = {this.state.value} 
            onChange = {this.handleChange}/>
        </label>
        <input type="submit" value="Add" className = "button"/>
      </form>
    );
  }

  handleTextRemove(event) {
    var ls = [];
    var fn = 0;
    for(var task of this.state.list) {
      if(task.name != this.state.valueDel) {
        ls.push(task);
      } else {
        fn = 1;
      }
    }
    if(fn) {
      this.setState({list: ls, valueDel: ''});
    } else {
      alert('Value not found');
    }
    event.preventDefault();
  }
  displayRemove() {
    return (
      <form className = "form" onSubmit = {this.handleTextRemove}>
        <label>
          <input type="text" value = {this.state.valueDel} 
            onChange = {this.handleChangeDel}/>
        </label>
        <input type="submit" value="Remove" className = "button"/>
      </form>
    );
  }
  handleCheck(event) {
    var ls = this.state.list;
    for(var u of ls) {
      if(u.name == event.target.id) {
        u.checked = event.target.checked;
      }
    }
    this.setState({list: ls});
  }
  displayAll() {
    return (
      this.state.list.map((task, index) => task.checked ? <><input id = {task.name} 
      onChange = {this.handleCheck} type = "checkbox" checked />{task.name} <br/></>
      : <><input id = {task.name} 
      onChange = {this.handleCheck} type = "checkbox" />{task.name} <br/></> 
      )
    );
  }
  render() {
    return (
      <div className = "myThing">
         {this.displayAdd()}
       {this.displayRemove()}
       <form>
            <label>
              {this.displayAll()}
            </label>
         </form>
      </div>
    );
  }
}

export default App;
