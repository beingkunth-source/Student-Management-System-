// app.js - SMS v4 common utilities (robust, defensive)
const STORAGE_KEY = 'sms_v4';
const SESSION_KEY = 'sms_v4_current';

function seedIfNeeded(){
  if(!localStorage.getItem(STORAGE_KEY)){
    const data = {
      students: [
        { name: 'Om Gupta', roll: '0905CS241183', password: '1234567890', phone:'', address:'', subjects:['CS-303-T','CS-303-P'] }
      ],
      faculty: [
        { username: 'xyz', password: '1234567890', name: 'Faculty XYZ' }
      ],
      subjects: [
        { id:'ES-301-T', title:'Energy & Environmental Engineering [ES-301 B3] [T] 2025', intro:'Intro: energy sources, sustainability, environmental impact.' },
        { id:'CS-302-T', title:'Discrete Structure [CS-302 B3] [T] 2025', intro:'Logic, sets, relations, combinatorics, graphs.' },
        { id:'CS-303-T', title:'Data Structure [CS-303 B3] [T] 2025', intro:'Arrays, lists, stacks, queues, trees, graphs.' },
        { id:'CS-303-P', title:'Data Structure [CS-303 B3] [P] 2025', intro:'Lab: implement data structures in Java/C++.' },
        { id:'CS-304-T', title:'Digital Systems [CS-304 B3] [T] 2025', intro:'Boolean algebra, combinational and sequential logic.' },
        { id:'CS-304-P', title:'Digital Systems [CS-304 B3] [P] 2025', intro:'Practical circuits and simulations.' },
        { id:'CS-305-T', title:'Object Oriented Programming & Methodology [CS-305 B3] [T] 2025', intro:'OOP concepts and design principles.' },
        { id:'CS-305-P', title:'Object Oriented Programming & Methodology [CS-305 B3] [P] 2025', intro:'Practical OOP labs in Java.' },
        { id:'CS-306-P', title:'Computer Workshop-Java [CS-306 B3] [P] 2025', intro:'Java workshop and small projects.' }
      ],
      announcements: {},
      marks: {},
      attendance: {}
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }
}

function getData(){ seedIfNeeded(); return JSON.parse(localStorage.getItem(STORAGE_KEY)); }
function saveData(d){ localStorage.setItem(STORAGE_KEY, JSON.stringify(d)); }
function getCurrent(){ const s = sessionStorage.getItem(SESSION_KEY); return s?JSON.parse(s):null; }
function setCurrent(u){ sessionStorage.setItem(SESSION_KEY, JSON.stringify(u)); }
function logout(){ sessionStorage.removeItem(SESSION_KEY); location.href='index.html'; }

function findSubject(ref){
  if(!ref) return null;
  const data = getData();
  const subjects = data.subjects || [];
  let s = subjects.find(x => x.id === ref || x.title === ref);
  if(s) return s;
  s = subjects.find(x => x.id && x.id.toLowerCase().includes(ref.toLowerCase()));
  if(s) return s;
  s = subjects.find(x => x.title && x.title.toLowerCase().includes(ref.toLowerCase()));
  return s || null;
}

function formatDate(d){ return (new Date(d)).toLocaleString(); }
function elt(tag, cls, txt){ const e = document.createElement(tag); if(cls) e.className = cls; if(txt!==undefined) e.textContent = txt; return e; }

window.SMSV4 = { getData, saveData, getCurrent, setCurrent, logout, findSubject, formatDate, STORAGE_KEY, SESSION_KEY };
