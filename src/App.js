import React, { Component, Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import Moment from 'react-moment';
import facebook from './facebook.png';
import instagram from './instagram.png';
import github from './github.png';
import email from './gmail.png';
import linkedin from './linkedin.png';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
		<Body />
		<Holiday />
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
						<div style={{fontSize:30, marginBottom:'7%'}}>{level()} <strong>도정근</strong></div>
						<div style={{fontSize:15}}><span>입대일</span> <span>2020.02.24</span></div>
						<div style={{fontSize:15}}><span>전역일</span> <span>2021.09.02</span></div>
				</div>

        </div>
    );
  }
}

class Body extends Component {
	render() {
		const per = RestPercent('2020-02-24T00:00:00','2021-09-02T00:00:00');
		return (
			<div className="App-body">
				<div style={{width:'100%', display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
					<span className="Text-body" style={{alignSelf:'flex-start'}}>전역 D-{RestDays()}</span>
					<span className="Text-body" style={{alignSelf:'flex-end'}}>2021.09.02</span>
				</div>
				<div style={{height:13, width:'100%', backgroundColor:'white', position:'relative'}}>
					<div style={{height:13, width:per+'%', backgroundColor:'lightgreen', textAlign:'center', position:'absolute'}}><span style={{marginLeft:'auto', marginRight:'auto', color:'black', fontSize:11, fontWeight:700, position:'absolute', }}>{per}%</span>
					</div>
				</div>
			</div>
		)
	}
}

class Holiday extends Component {
	render(){
		let preholi;
		let preyerin;
		let prehg;

		for (let i = holidays.length-1 ; i >= 0  ; i-- ) {
			if (isAfterNow(holidays[i][0]) === false) {
				preholi = holidays[i][0];
				break;
			};
		}
		for (let i = holidays.length-1 ; i >= 0  ; i-- ) {
			if (isAfterNow(holidays[i][0]) === false && holidays[i][2] === true) {
				preyerin = holidays[i][0];
				break;
			};
		}
		for (let i = holidays.length-1 ; i >= 0  ; i-- ) {
			if (isAfterNow(holidays[i][0]) === false && holidays[i][1] === '휴가') {
				prehg = holidays[i][0];
				break;
			};
		}
		
		const nextholi = holidays.find(day => isAfterNow(day[0]) === true)[0];
		const nextyerin = holidays.find(day => isAfterNow(day[0]) === true && day[2] === true)[0];
		const nexthg = holidays.find(day => isAfterNow(day[0]) === true && day[1] === '휴가')[0];
		const perholi = RestPercent(preholi,nextholi);
		const peryerin = RestPercent(preyerin,nextyerin);
		const perhg = RestPercent(prehg,nexthg);
		const perend = RestPercent('2020-02-24T00:00:00','2021-09-02T00:00:00');
		
		return (
				<div className="App-Holiday">
					<div style={{flex:1, justifyContent:'center'}}>
						<EachHoliday desc='다음 출타' date={nextholi} percent={perholi} />
						<EachHoliday desc='다음 휴가' date={nexthg} percent={perhg} />
					</div>
					<div style={{flex:1}}>
						<EachHoliday desc='예린이 만나는 날' date={nextyerin} percent={peryerin} />
						<div style={{width:'100%'}}><Plan /></div>
					</div>
				</div>
		)
	}
}

function EachHoliday(props) {
	return (
		<div style={{marginBottom:'22%'}}>
			<div style={{width:'80%', display:'flex', flexDirection:'row', justifyContent:'space-between', paddingLeft:'10%'}}>
				<span className="Text-body" style={{alignSelf:'flex-start', fontSize:12}}>{props.desc}</span>
				<span className="Text-body" style={{alignSelf:'flex-end', fontSize:12}}>{new Date(props.date).format('yyyy.MM.dd')}</span>
			</div>
			<div style={{height:10, width:'80%', backgroundColor:'white', marginBottom:12, marginLeft:'auto', marginRight:'auto', textAlign:'right'}}>
				<div style={{height:10, width:props.percent+'%', backgroundColor:'lightgreen'}}></div>
				<span style={{fontSize:11, color:'black', position:'relative', color:'white'}}>{props.percent}%</span>
			</div>

		</div>
	)
}

class Footer extends Component {
	render() {
		const date = new Date();
		return (
			<div className="App-footer">
				<Days />
				<Contact />
			</div>		
		)
	}
}

function Contact() {
	return (
		<div className="App-Contact">
			<img style={{width:40, ratio:1}} src={email} onClick={() => window.open('mailto:jg.do@snu.ac.kr')}/>
			<img style={{width:40, ratio:1}} src={facebook} onClick={() => window.open('https://www.facebook.com/gs12049')}/>
			<img style={{width:40, ratio:1}} src={instagram} onClick={() => window.open('https://www.instagram.com/dojunggeun/')}/>
			<img style={{width:40, ratio:1}} src={github} onClick={() => window.open('https://github.com/dojunggeun')}/>
			<img style={{width:40, ratio:1}} src={linkedin} onClick={() => window.open('https://kr.linkedin.com/in/dojunggeun')}/>
		</div>
	)
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
			<div style={{display:'flex',justifyContent:'space-between', padding:'1% 5% 1% 5%'}}><span>전체 복무일</span><span>557</span></div><hr style={{margin:'0 5% 0 5%', border:'solid 1px lightgray', borderRadius:'1px'}}/>
			<div style={{display:'flex',justifyContent:'space-between', padding:'1% 5% 1% 5%'}}><span>현재 복무일</span><span>{UntilNow()}</span></div><hr style={{margin:'0 5% 0 5%', border:'solid 1px lightgray', borderRadius:'1px'}}/>
			<div style={{display:'flex',justifyContent:'space-between', padding:'1% 5% 1% 5%'}}><span>남은 복무일</span><span>{RestDays()}</span></div><hr style={{margin:'0 5% 0 5%', border:'solid 1px lightgray', borderRadius:'1px'}}/>
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
	if (per < 0) return 0;
	if (per > 100) return 100;
	return per
}

function isAfterNow(date) {
	const now = new Date();
	const some = new Date(date);
	if (now.getTime() < some.getTime()) return true;
	return false;
}

function level() {
	let level3 = '2020-11-01T00:00:00'
	let level4 = '2021-05-01T00:00:00'
	if (!isAfterNow(level4)) return '병장';
	if (!isAfterNow(level3)) return '상병';
	return '일병'	
}

const holidays = [
	['2020-06-01T20:00:00','휴가',true],
	['2020-06-27T20:00:00','주말외출',true],
	['2020-07-15T21:00:00','평일외출',false],
	['2020-07-21T21:00:00','평일외출',false],
	['2020-07-26T20:00:00','주말외출',true],
	['2020-08-08T08:00:00','주말외출',true],
	['2020-08-14T17:30:00','평일외출',false],
	['2020-08-31T17:30:00','평일외출',true],
	['2020-09-04T17:30:00','평일외출',false],
	['2020-09-09T08:00:00','휴가',false]
]


Date.prototype.format = function (f) {
    if (!this.valueOf()) return " ";
    var weekKorName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    var weekKorShortName = ["일", "월", "화", "수", "목", "금", "토"];
    var weekEngName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var weekEngShortName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var d = this;

    return f.replace(/(yyyy|yy|MM|dd|KS|KL|ES|EL|HH|hh|mm|ss|a\/p)/gi, function ($1) {
        switch ($1) {
            case "yyyy": return d.getFullYear(); // 년 (4자리)
            case "yy": return (d.getFullYear() % 1000).zf(2); // 년 (2자리)
            case "MM": return (d.getMonth() + 1).zf(2); // 월 (2자리)
            case "dd": return d.getDate().zf(2); // 일 (2자리)
            case "KS": return weekKorShortName[d.getDay()]; // 요일 (짧은 한글)
            case "KL": return weekKorName[d.getDay()]; // 요일 (긴 한글)
            case "ES": return weekEngShortName[d.getDay()]; // 요일 (짧은 영어)
            case "EL": return weekEngName[d.getDay()]; // 요일 (긴 영어)
            case "HH": return d.getHours().zf(2); // 시간 (24시간 기준, 2자리)
            default: return $1;
        }
    });
};

String.prototype.string = function (len) { var s = '', i = 0; while (i++ < len) { s += this; } return s; };
String.prototype.zf = function (len) { return "0".string(len - this.length) + this; };
Number.prototype.zf = function (len) { return this.toString().zf(len); };