import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Moment from 'react-moment';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
		<Body />
		<Footer />
	</div>
    );
  }
}

export default App;

class Header extends Component {
  render() {
    return (
        <div className="App-header">
			<div className="myname" style={{flexDirection:'row'}}>
				<img src={ require('./profile.jpg') } style={{height:130, width:130}}/>
			</div>
				<div style={{flexDirection:'row'}}>
						<div style={{fontSize:28}}>일병 <strong>도정근</strong></div>
						<div style={{fontSize:14}}><br/>입대일 2020.02.24<br/>전역일 2021.09.02</div>
				</div>

        </div>
    );
  }
}

class Body extends Component {
	render() {
		return (
			<div className="App-body">
				<span className="Text-body">전역 D-{RestDays()}</span>
				<span>{RestPercent()}%</span>
				<div style={{height:10, width:320, backgroundColor:'white'}}>
					<div style={{height:10, width:30, backgroundColor:'lightgreen'}}>
					</div>
				</div>
				<Holiday />
			</div>
		)
	}
}

class Holiday extends Component {
	render(){
		return (
				<div className="holiday">
					<div style={{width:'50%'}}>다음 출타<br/>2020.08.08 외출</div>
					<div style={{width:'50%', marginTop:10}}>다음 출타 with 예린<br/>2020.08.08 외출</div>
				</div>
		)
	}
}

class Footer extends Component {
	render() {
		const date = new Date();
		return (
			<div className="App-footer">
				<Plan />
				<Days />
			</div>		
		)
	}
}

class Plan extends Component {
	render() {
		return (
		<div style={{width:'100%', justifyContent:'center'}}>
			<a href="https://www.notion.so/dojunggeun/45bb492763b446ef901d16d52a6425fb" style={{color:'rgb(70,61,62)',textDecoration:'none', fontWeight:900, flex:1}}>출타 계획 보기</a>
			<button onClick={() => window.open('https://www.notion.so/dojunggeun/45bb492763b446ef901d16d52a6425fb')} style={{marginTop:15}}>출타 계획 보기</button>
		</div>
		)
	}
}

class Days extends Component {
	render() {
		return (
		<div style={{flexDirection:'column', width:'100%', alignItems:'center'}}>
			<p>전체 복무일 : 557</p>
			<p style={{marginTop:5}}>현재 복무일 : {UntilNow()}</p>
			<p style={{marginTop:5}}>남은 복무일 : {RestDays()}</p>				
		</div>
		)
	}
}



function UntilNow() {
	const date = new Date();
	return <Moment diff="2020-02-23T14:00" unit="days">{date}</Moment>;
}
function RestDays() {
	const date = new Date();
	return <Moment diff={date} unit="days">2021-09-03T00:00</Moment>
}
function RestPercent() {
	const today = new Date();
	const start = new Date('2020-02-24T00:00:00');
	const end = new Date('2021-09-03T00:00:00');
	let per = ((today.getTime()-start.getTime())/(end.getTime()-start.getTime())*100).toFixed(2);
	return per
}