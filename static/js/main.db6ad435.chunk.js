(this["webpackJsonpr-time-managment"]=this["webpackJsonpr-time-managment"]||[]).push([[0],[,,,,,,,,,function(t,e,n){},function(t,e,n){},function(t,e,n){},,function(t,e,n){},function(t,e,n){},function(t,e,n){"use strict";n.r(e);var a=n(1),i=n.n(a),c=n(4),s=n.n(c),r=(n(9),n(2)),u=(n(10),n(11),n(0));function o(){var t=Object(a.useState)(Object(u.jsx)("div",{className:"name-form",children:Object(u.jsxs)("form",{onSubmit:function(t){t.preventDefault(),i(Object(u.jsxs)("div",{id:"name",children:[" ",t.target[0].value," "]}))},children:[Object(u.jsx)("label",{className:"blink_me",children:"PLEASE FIRST TYPE YOUR NAME"}),Object(u.jsx)("input",{id:"name-input",type:"text"}),Object(u.jsx)("input",{className:"button form-button5",type:"submit",value:"Send"})]})})),e=Object(r.a)(t,2),n=e[0],i=e[1];return n}n(13);function l(t){return Object(u.jsxs)("div",{className:"tasks",children:[Object(u.jsx)("p",{children:"time to work"}),Object(u.jsxs)("form",{className:"task-form",onSubmit:t.taskAdder,children:[Object(u.jsx)("input",{id:"task-input",type:"text",defaultValue:"add new task"}),Object(u.jsx)("input",{className:"add-button",type:"submit",value:"Add"})]}),t.taskState,Object(u.jsx)("br",{}),Object(u.jsx)("br",{})]})}n(14);function d(t){return Object(u.jsx)("div",{children:Object(u.jsxs)("div",{className:"timer",children:[Object(u.jsx)("div",{className:"time",children:t.time}),Object(u.jsx)("div",{id:"time-buttons",children:t.stateBtn})]})})}var j=[],b=1,f=0;var m=function(){var t=Object(a.useState)(""),e=Object(r.a)(t,2),n=e[0],i=e[1],c=0;function s(t){p((function(){return"stopBtn"===t.target.id?Object(u.jsx)("button",{id:"srtBtn",className:"button form-button5 time-button",onClick:m,children:"Start"}):"srtBtn"===t.target.id?Object(u.jsx)("button",{id:"stopBtn",className:"button form-button5 time-button",onClick:h,children:"Stop"}):void 0}))}var m=function(t){B(C),s(t),c=Date.now()},h=function(t){var e=Date.now()-c;j.forEach((function(t){if("active"===t.status)return t.period+=e,B(C),null})),s(t)},O=Object(a.useState)(Object(u.jsx)("button",{id:"srtBtn",className:"button form-button5 time-button",onClick:m,children:"Start"})),v=Object(r.a)(O,2),x=v[0],p=v[1],k=function(t){B(C),j.forEach((function(t){if("active"===t.status)return t.status="",null})),j.forEach((function(e){if(e.id===t.target.id)return e.status="active",console.log("statusChanger-task",j),null})),i(g)},g=function(){return j.map((function(t){return f++,"active"===t.status?Object(u.jsx)("div",{className:"task active",onClick:k,id:t.id,children:Object(u.jsx)("p",{children:t.title})},f):Object(u.jsx)("div",{className:"task",onClick:k,children:Object(u.jsx)("p",{id:t.id,children:t.title})},f)}))},N=Object(a.useState)("0d 0h 0m 0s"),S=Object(r.a)(N,2),E=S[0],B=S[1],C=function(){var t=0;j.forEach((function(e){if("active"===e.status)return t=e.period,null}));var e=Math.floor(t/864e5),n=Math.floor(t%864e5/36e5),a=Math.floor(t%36e5/6e4),i=Math.floor(t%6e4/1e3);return t>0?e+"d "+n+"h "+a+"m "+i+"s ":"0d 0h 0m 0s"};return Object(u.jsxs)("div",{className:"main",children:[Object(u.jsx)(o,{}),Object(u.jsx)(d,{time:E,stateBtn:x}),Object(u.jsx)(l,{taskAdder:function(t){t.preventDefault();var e=t.target[0].value,n=e+Math.floor(Math.random()*Math.floor(1e4));j.forEach((function(t){if("active"===t.status)return t.status="",null}));var a={title:e,id:n,status:"active",period:0};0!==e.length&&"add new task"!==e||(a.title="NewTask-"+b,b+=1),j.push(a),i(g)},taskState:n})]})},h=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,16)).then((function(e){var n=e.getCLS,a=e.getFID,i=e.getFCP,c=e.getLCP,s=e.getTTFB;n(t),a(t),i(t),c(t),s(t)}))};s.a.render(Object(u.jsx)(i.a.StrictMode,{children:Object(u.jsx)(m,{})}),document.getElementById("root")),h()}],[[15,1,2]]]);
//# sourceMappingURL=main.db6ad435.chunk.js.map