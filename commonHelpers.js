import"./assets/modulepreload-polyfill-3cfb730f.js";/* empty css                      */import{f as y,i as s}from"./assets/vendor-77e16229.js";const d=document.querySelector("#datetime-picker"),e=document.querySelector("[data-start]"),n=document.querySelector(".timer");let i;const g={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(t){if(t[0]<Date.now()){e.disabled=!0,l();return}i=t[0],e.disabled=!1}};y(d,g);e.addEventListener("click",()=>{if(Date.now()>i){e.disabled=!0,l();return}const t=setInterval(()=>{if(i-Date.now()<=0)return T(),b(t);const o=w(i-Date.now());S(o)},1e3);D(),e.disabled=!0,d.disabled=!0});function S(t){const{days:a,hours:o,minutes:u,seconds:c}=t;n.querySelector("[data-days]").textContent=r(a),n.querySelector("[data-hours]").textContent=r(o),n.querySelector("[data-minutes]").textContent=r(u),n.querySelector("[data-seconds]").textContent=r(c)}function b(t){clearInterval(t),e.disabled=!1,d.disabled=!1}function w(t){const f=Math.floor(t/864e5),m=Math.floor(t%864e5/36e5),h=Math.floor(t%864e5%36e5/6e4),p=Math.floor(t%864e5%36e5%6e4/1e3);return{days:f,hours:m,minutes:h,seconds:p}}function r(t){return String(t).padStart(2,"0")}function l(){s.warning({title:"Caution",message:"Please choose a date in the future",timeout:4e3,position:"topRight",color:"red"})}function D(){s.success({message:"The timer was started!",color:"green",position:"topRight",timeout:4e3})}function T(){s.info({message:"The timer was finished!",color:"green",position:"topRight",timeout:4e3})}
//# sourceMappingURL=commonHelpers.js.map