import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// appbar
import AppBar from 'material-ui/AppBar';
// drawer
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
// card
import {Card, CardMedia, CardTitle, CardText} from 'material-ui/Card';
// aframe
import 'aframe';
import 'aframe-particle-system-component';
import {Entity, Scene} from 'aframe-react';

import './App.css';

const content = [
  {
    name: 'Что такое куб',
    theme: 'Куб',
    content: 'Куб (гексаедр) — это трехмерная фигура, которая состоит из шести одинаковых квадратов так, что каждый квадрат полностью соприкасается своими четырьмя сторонами к сторонам остальных четырех квадратов под прямым углом. Куб является правильным многогранником, у которого грани образованы из квадратов. Также кубом можно назвать прямоугольный параллелепипед, у которого все ребра равны.',
    scene: (
      <Scene embedded="true" className="scene">
        <Entity primitive="a-box" position="0 1 -4" rotation="0 30 0" scale="2 2 2" color="#4CC3D9"/>
        <Entity primitive="a-plane" position="0 0 -4" rotation="-90 0 0" width="4" height="4" color="#8e878a"/>
        <Entity primitive="a-sky" color="#ECECEC"/>
      </Scene>
    )
  },
  {
    name: 'Грань куба',
    theme: 'Куб',
    content: <span>Грань куба - это часть плоскости, ограниченная сторонами квадрата.<br/>
    - куб имеет шесть граней;<br/>
    - каждая грань куба пересекается с четырьмя другими гранями под прямым углом и параллельная шестой грани;<br/>
    - грани имеют одинаковую площадь, которую можно найти, используя формулы для вычисления площади квадрата.
    `</span>,
    scene: (
      <Scene embedded="true" className="scene">
        <Entity primitive="a-box" position="0 1 -4" rotation="0 30 0" scale="2 2 2" color="#4CC3D9"/>
        <Entity primitive="a-box" position="0.5 1 -3.1" rotation="0 30 0" scale="2 2 0.01" color="#F2E646"/>
        <Entity primitive="a-plane" position="0 0 -4" rotation="-90 0 0" width="4" height="4" color="#8e878a"/>
        <Entity primitive="a-sky" color="#ECECEC"/>
      </Scene>
    )
  },
  {
    name: 'Ребро куба',
    theme: 'Куб',
    content: <span>Ребро куба - это отрезок, образованный пересечением двух граней куба.<br/>
    - куб имеет двенадцать ребер;<br/>
    - каждый конец ребра соединен с двумя соседними ребрами под прямым углом;<br/>
    - ребра куба имеют одинаковую длину.
    </span>,
    scene: (
      <Scene embedded="true" className="scene">
        <Entity primitive="a-box" position="0 1 -4" rotation="0 30 0" scale="2 2 2" color="#4CC3D9"/>
        <Entity primitive="a-box" position="-0.36 1 -2.63" rotation="0 30 0" scale="0.01 2 0.01" color="#F2E646"/>
        <Entity primitive="a-plane" position="0 0 -4" rotation="-90 0 0" width="4" height="4" color="#8e878a"/>
        <Entity primitive="a-sky" color="#ECECEC"/>
      </Scene>
    )
  }
];

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: content[0]
    }

    this.changeCurrentPage = this.changeCurrentPage.bind(this);
  }

  changeCurrentPage(index) {
    this.setState({currentPage: content[index]});
  }

  render() {
    return (
      <MuiThemeProvider>
        <Header onActiveChange={this.changeCurrentPage}/>
        <Content current_page={this.state.currentPage}/>
      </MuiThemeProvider>
    );
  }
}

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {open: false};

    this.handleCloseGenerator = this.handleCloseGenerator.bind(this);
  }

  generateMenu(content) {
    
    return content.map((element, index) => {
      return <MenuItem onClick={this.handleCloseGenerator(index)}>{element.name}</MenuItem>
    });

  }

  handleToggle = () => this.setState({open: !this.state.open});

  handleCloseGenerator(index) {
    let self = this;
    return function() {
      self.setState({open: false});
      self.props.onActiveChange(index);
    }
  }

  render() {
    return (
      <div>
        <AppBar
          title="3D Geometry"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          onLeftIconButtonClick={this.handleToggle}
        />
        <Drawer
          docked={false}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
          {this.generateMenu(content)}
        </Drawer>
      </div>
    );
  }
}

class Content extends Component {
  render() {
    return (
      <div className="content">
        <div className="content__inner">
          <Card>
            <CardTitle title={this.props.current_page.name} className="card__title"/>
            <CardText className="card__text">{this.props.current_page.content}</CardText>
            <CardMedia className="card__media">
            {this.props.current_page.scene}
            </CardMedia>
          </Card>
        </div>
      </div>
    );
  };

  componentDidMount() {
    this.buildCssVars();
    window.addEventListener("resize", this.buildCssVars);
    window.addEventListener("orientationchange", this.buildCssVars);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.buildCssVars);
    window.removeEventListener("orientationchange", this.buildCssVars);
  }

  buildCssVars() {
    let body = document.querySelector('body'),
      content = document.querySelector('.content'),
      title = document.querySelector('.card__title'),
      text = document.querySelector('.card__text'),
      contentHeight = content.offsetHeight,
      titleHeight = title.offsetHeight,
      textHeight = text.offsetHeight,
      sceneHeight = contentHeight - titleHeight - textHeight;
    body.style.setProperty('--scene-height', sceneHeight + 'px');
  }

}


export default App;