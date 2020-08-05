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
				<img src={ require('./profile.jpg') } style={{height:140, ratio:1}}/>
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
		let per = RestPercent('2020-02-24T14:00:00','2021-09-02T00:00:00');
		return (
			<div className="App-body">
				<span className="Text-body">전역 D-{RestDays()}</span>
				<div style={{height:13, width:'90%', backgroundColor:'white', marginBottom:'30px'}}>
					<div style={{height:13, width:per+'%', backgroundColor:'lightgreen', alignItems:'center'}}><span style={{fontSize:13, color:'black', position:'absolute'}}>{per}%</span>
					</div>
				</div>
				<Holiday />
			</div>
		)
	}
}

class Holiday extends Component {
	render(){
		let perholi = RestPercent('2020-07-26T20:00:00','2020-08-08T08:00:00');;
		let peryerin = RestPercent('2020-07-26T20:00:00','2020-08-08T08:00:00');;
		let perhg = RestPercent('2020-06-01T20:00:00','2020-09-09T08:00:00');;
		let perend = RestPercent('2020-02-24T00:00:00','2021-09-02T00:00:00');
		return (
				<div className="holiday">
					<div style={{flex:1, justifyContent:'center'}}>
						<div style={{width:'100%'}}><b>다음 출타</b><br/>2020.08.08</div>
						<div style={{height:13, width:'80%', backgroundColor:'white', marginBottom:12, marginLeft:'auto', marginRight:'auto'}}>
							<div style={{height:13, width:perholi+'%', backgroundColor:'lightgreen'}}><span style={{fontSize:13, color:'black'}}>{perholi}%</span>
							</div>
						</div>
						<div style={{width:'100%'}}><b>예린이 만나는 날</b><br/>2020.08.08</div>
						<div style={{height:13, width:'80%', backgroundColor:'white', marginLeft:'auto', marginRight:'auto'}}>
							<div style={{height:13, width:peryerin+'%', backgroundColor:'lightgreen'}}><span style={{fontSize:13, color:'black'}}>{peryerin}%</span>
							</div>
						</div>

				</div>
					<div style={{flex:1}}>
						<div style={{width:'100%'}}><b>다음 휴가</b><br/>2020.09.09</div>
						<div style={{height:13, width:'80%', backgroundColor:'white', marginBottom:12, marginLeft:'auto', marginRight:'auto'}}>
							<div style={{height:13, width:perhg+'%', backgroundColor:'lightgreen'}}><span style={{fontSize:13, color:'black'}}>{perhg}%</span>
							</div>
						</div>	
						<div style={{width:'100%'}}><Plan /></div>

					</div>
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
		<div style={{width:'100%', justifyContent:'center', color:'white'}}>
			<button id="plans" onClick={() => window.open('https://www.notion.so/dojunggeun/45bb492763b446ef901d16d52a6425fb')}>출타 계획 보기</button>
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
function RestPercent(_start, _end) {
	const today = new Date();
	const start = new Date(_start);
	const end = new Date(_end);
	let per = ((today.getTime()-start.getTime())/(end.getTime()-start.getTime())*100).toFixed(2);
	return per
}
let holidays = [
	['2020-08-08T08:00:00','주말외출',true],
	['2020-08-14T17:30:00','평일외출',false],
	['2020-08-31T17:30:00','평일외출',true],
	['2020-09-04T17:30:00','평일외출',false],
	['2020-09-09T08:00:00','휴가',false]
]