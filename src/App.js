import React, { Component } from 'react';

import './App.css';
import Moment from 'react-moment';
import facebook from './facebook.png';
import instagram from './instagram.png';
import github from './github.png';
import email from './gmail.png';
import linkedin from './linkedin.png';
import coke from './coke.png';

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
                <div className="myname" style={{ flexDirection: 'row' }}>
                    <img
                        alt="my pic"
                        src={require('./profile.jpg')}
                        style={{ height: 140, ratio: 1 }}
                    />
                </div>
                <div style={{ flexDirection: 'row', position: 'relative' }}>
                    <div
                        style={{
                            display: 'flex',
                            width: 88.5,
                            height: 32,
                            backgroundColor: '#C0C0C0',
                            border: '#C0C0C0 1px soild',
                            borderRadius: 6,
                            position: 'absolute',
                            top: -35,
                            right: 0,
                        }}
                        onClick={() =>
                            window.open(
                                'supertoss://send?bank=국민&accountNo=59730204202313&origin=linkgen&amount=1000&msg=%EC%BD%9C%EB%9D%BC%EC%82%AC%EC%A3%BC%EA%B8%B0'
                            )
                        }
                    >
                        <div
                            style={{
                                marginLeft: 'auto',
                                marginRight: 0,
                                marginBottom: 'auto',
                                marginTop: 'auto',
                            }}
                        >
                            give me{' '}
                        </div>
                        <img
                            alt="coke"
                            src={coke}
                            style={{ width: 18, height: 18, margin: 'auto', marginLeft: 0 }}
                        />
                    </div>
                    <div style={{ fontSize: 32, marginBottom: '7%' }}>
                        {level()} <strong>도정근</strong>
                    </div>
                    <div
                        style={{
                            fontSize: 16,
                            display: 'flex',
                            justifyContent: 'space-evenly',
                            alignItems: 'center',
                        }}
                    >
                        <span>입대일</span> <span>2020.02.24</span>
                    </div>
                    <div
                        style={{
                            fontSize: 16,
                            display: 'flex',
                            justifyContent: 'space-evenly',
                            alignItems: 'center',
                        }}
                    >
                        <span>전역일</span> <span>2021.09.02</span>
                    </div>
                </div>
            </div>
        );
    }
}

class Body extends Component {
    render() {
        const per = RestPercent('2020-02-24T00:00:00+09:00', '2021-09-02T00:00:00+09:00');
        return (
            <div className="App-body">
                <div
                    style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    <span className="Text-body" style={{ alignSelf: 'flex-start' }}>
                        전역 D-{RestDays('2021-09-03T00:00+09:00')}
                    </span>
                    <span className="Text-body" style={{ alignSelf: 'flex-end' }}>
                        2021.09.02
                    </span>
                </div>
                <div
                    style={{
                        height: 15,
                        width: '100%',
                        backgroundColor: 'white',
                        position: 'relative',
                    }}
                >
                    <div
                        style={{
                            height: 15,
                            width: per + '%',
                            backgroundColor: 'lightgreen',
                            textAlign: 'center',
                            position: 'absolute',
                        }}
                    >
                        <span
                            style={{
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                color: 'black',
                                fontSize: 13,
                                fontWeight: 500,
                                position: 'absolute',
                            }}
                        >
                            {per}%
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

class Holiday extends Component {
    render() {
        let preholi;
        let preyerin;
        let prehg;

        for (let i = holidays.length - 1; i >= 0; i--) {
            if (isAfterNow(holidays[i][0]) === false) {
                preholi = holidays[i][0];
                break;
            }
        }
        for (let i = holidays.length - 1; i >= 0; i--) {
            if (isAfterNow(holidays[i][0]) === false && holidays[i][2] === true) {
                preyerin = holidays[i][0];
                break;
            }
        }
        for (let i = holidays.length - 1; i >= 0; i--) {
            if (isAfterNow(holidays[i][0]) === false && holidays[i][1] === '휴가') {
                prehg = holidays[i][0];
                break;
            }
        }

        const nextholi = holidays.find((day) => isAfterNow(day[0]) === true);
        const nextyerin = holidays.find((day) => isAfterNow(day[0]) === true && day[2] === true);
        const nexthg = holidays.find((day) => isAfterNow(day[0]) === true && day[1] === '휴가');
        const perholi = RestPercent(preholi, nextholi[0]);
        const peryerin = RestPercent(preyerin, nextyerin[0]);
        const perhg = RestPercent(prehg, nexthg[0]);

        return (
            <div className="App-Holiday">
                <div style={{ flex: 1, justifyContent: 'center' }}>
                    <EachHoliday desc="다음 출타" date={nextholi} percent={perholi} />
                    <EachHoliday desc="다음 휴가" date={nexthg} percent={perhg} />
                </div>
                <div style={{ flex: 1 }}>
                    <EachHoliday desc="예린이 만나는 날" date={nextyerin} percent={peryerin} />
                    <div style={{ width: '100%' }}>
                        <Plan />
                    </div>
                </div>
            </div>
        );
    }
}

function EachHoliday(props) {
    return (
        <div style={{ marginBottom: '22%' }}>
            <div
                style={{
                    width: '80%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingLeft: '10%',
                }}
            >
                <span style={{ alignSelf: 'flex-start', fontSize: 12, fontWeight: 500 }}>
                    {props.desc}
                </span>
                <span style={{ alignSelf: 'flex-end', fontSize: 11 }}>
                    {new Date(props.date[0]).format('yyyy.MM.dd')}
                </span>
            </div>
            <div
                style={{
                    height: 5,
                    width: '80%',
                    backgroundColor: 'white',
                    marginBottom: 12,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    textAlign: 'right',
                }}
            >
                <div
                    style={{ height: 5, width: props.percent + '%', backgroundColor: 'lightgreen' }}
                ></div>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        position: 'relative',
                        top: 3,
                    }}
                >
                    <span style={{ fontSize: 11, position: 'relative', color: 'white' }}>
                        {props.percent}%
                    </span>
                    <span style={{ fontSize: 11, position: 'relative', color: 'white' }}>
                        D-{RestDays(props.date[3])}
                    </span>
                </div>
            </div>
        </div>
    );
}

class Footer extends Component {
    render() {
        return (
            <div className="App-footer">
                <Days />
                <Contact />
            </div>
        );
    }
}

function Contact() {
    return (
        <div className="App-Contact">
            <img
                alt="mail"
                style={{ width: 38, height: 38 }}
                src={email}
                onClick={() => window.open('mailto:jg.do@snu.ac.kr')}
            />
            <img
                alt="facebook"
                style={{ width: 38, height: 38 }}
                src={facebook}
                onClick={() => window.open('https://www.facebook.com/gs12049')}
            />
            <img
                alt="instagram"
                style={{ width: 38, height: 38 }}
                src={instagram}
                onClick={() => window.open('https://www.instagram.com/dojunggeun/')}
            />
            <img
                alt="github"
                style={{ width: 38, height: 38 }}
                src={github}
                onClick={() => window.open('https://github.com/dojunggeun')}
            />
            <img
                alt="linkedin"
                style={{ width: 38, height: 38 }}
                src={linkedin}
                onClick={() => window.open('https://kr.linkedin.com/in/dojunggeun')}
            />
        </div>
    );
}

class Plan extends Component {
    render() {
        return (
            <div style={{ width: '100%', justifyContent: 'center' }}>
                <button
                    onClick={() =>
                        window.open(
                            'https://www.notion.so/dojunggeun/45bb492763b446ef901d16d52a6425fb'
                        )
                    }
                    id="plans"
                >
                    출타 계획 보기
                </button>
            </div>
        );
    }
}

class Days extends Component {
    render() {
        return (
            <div style={{ flexDirection: 'column', width: '100%', alignItems: 'center' }}>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '1% 6% 1% 6%',
                    }}
                >
                    <span>전체 복무일</span>
                    <span>557</span>
                </div>
                <hr
                    style={{
                        margin: '0 5% 1% 5%',
                        border: 'solid 1px lightgray',
                        borderRadius: '1px',
                    }}
                />
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '1% 6% 1% 6%',
                    }}
                >
                    <span>현재 복무일</span>
                    <span>{UntilNow()}</span>
                </div>
                <hr
                    style={{
                        margin: '0 5% 1% 5%',
                        border: 'solid 1px lightgray',
                        borderRadius: '1px',
                    }}
                />
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '1% 6% 1% 6%',
                    }}
                >
                    <span>남은 복무일</span>
                    <span>{RestDays('2021-09-03T00:00+09:00')}</span>
                </div>
                <hr
                    style={{
                        margin: '0 5% 1% 5%',
                        border: 'solid 1px lightgray',
                        borderRadius: '1px',
                    }}
                />
            </div>
        );
    }
}

function UntilNow() {
    const date = new Date();
    return (
        <Moment diff="2020-02-23T00:00+09:00" unit="days">
            {date}
        </Moment>
    );
}
function RestDays(end) {
    const date = new Date();
    return (
        <Moment diff={date} unit="days">
            {end}
        </Moment>
    );
}
function RestPercent(_start, _end) {
    const today = new Date();
    const start = new Date(_start);
    const end = new Date(_end);
    let per = (
        ((today.getTime() - start.getTime()) / (end.getTime() - start.getTime())) *
        100
    ).toFixed(2);
    if (per < 0) return 0;
    if (per > 100) return 100;
    return per;
}

function isAfterNow(date) {
    const now = new Date();
    const some = new Date(date);
    if (now.getTime() < some.getTime()) return true;
    return false;
}

function level() {
    let level3 = '2020-11-01T00:00:00+09:00';
    let level4 = '2021-05-01T00:00:00+09:00';
    if (!isAfterNow(level4)) return '병장';
    if (!isAfterNow(level3)) return '상병';
    return '일병';
}

const holidays = [
    ['2020-06-01T20:00:00+09:00', '휴가', true],
    ['2020-06-27T20:00:00+09:00', '주말외출', true],
    ['2020-07-15T21:00:00+09:00', '평일외출', false],
    ['2020-07-21T21:00:00+09:00', '평일외출', false],
    ['2020-07-26T20:00:00+09:00', '주말외출', true],
    ['2020-08-08T08:00:00+09:00', '주말외출', true],

    ['2020-08-31T17:30:00+09:00', '평일외출', true, '2020-09-01T00:00:00+09:00'],
    ['2020-09-04T17:30:00+09:00', '평일외출', false, '2020-09-05T00:00:00+09:00'],
    ['2020-09-09T08:00:00+09:00', '휴가', true, '2020-09-10T00:00:00+09:00'],
    ['2020-10-03T08:00:00+09:00', '주말외출', true, '2020-10-04T00:00:00+09:00'],
    ['2020-10-31T08:00:00+09:00', '주말외출', true, '2020-11-01T00:00:00+09:00'],
    ['2020-11-05T08:00:00+09:00', '휴가', true, '2020-11-06T00:00:00+09:00'],
];

Date.prototype.format = function (f) {
    if (!this.valueOf()) return ' ';
    var weekKorName = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
    var weekKorShortName = ['일', '월', '화', '수', '목', '금', '토'];
    var weekEngName = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ];
    var weekEngShortName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var d = this;

    return f.replace(/(yyyy|yy|MM|dd|KS|KL|ES|EL|HH|hh|mm|ss|a\/p)/gi, function ($1) {
        switch ($1) {
            case 'yyyy':
                return d.getFullYear(); // 년 (4자리)
            case 'yy':
                return (d.getFullYear() % 1000).zf(2); // 년 (2자리)
            case 'MM':
                return (d.getMonth() + 1).zf(2); // 월 (2자리)
            case 'dd':
                return d.getDate().zf(2); // 일 (2자리)
            case 'KS':
                return weekKorShortName[d.getDay()]; // 요일 (짧은 한글)
            case 'KL':
                return weekKorName[d.getDay()]; // 요일 (긴 한글)
            case 'ES':
                return weekEngShortName[d.getDay()]; // 요일 (짧은 영어)
            case 'EL':
                return weekEngName[d.getDay()]; // 요일 (긴 영어)
            case 'HH':
                return d.getHours().zf(2); // 시간 (24시간 기준, 2자리)
            default:
                return $1;
        }
    });
};

String.prototype.string = function (len) {
    var s = '',
        i = 0;
    while (i++ < len) {
        s += this;
    }
    return s;
};
String.prototype.zf = function (len) {
    return '0'.string(len - this.length) + this;
};
Number.prototype.zf = function (len) {
    return this.toString().zf(len);
};