"use strict";

const msgInput = document.getElementById("msg-input");
const sendBtn = document.getElementById("send-btn");
const msgContainer = document.getElementById("msg-container");

const getTime = function () {
  const hrs = new Date().getHours();
  const mins = new Date().getMinutes();
  const newMins = mins > 9 ? mins : `0${mins}`;
  const ampm = hrs > 11 ? "PM" : "AM";
  return `${hrs}:${newMins} ${ampm}`;
};

const getDate = function () {
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const d = new Date();
  const weekday = weekdays[d.getDay()];
  const month = months[d.getMonth()];
  const date = d.getDate();
  const newDate = date > 9 ? date : `0${date}`;
  const year = d.getFullYear();
  return `${weekday}, ${newDate} ${month} ${year}`;
};

const msgDisplay = function () {
  if (!msgInput.value) return;
  const msg = document.createElement("div");
  msg.classList.add("msg-wrapper");
  msg.innerHTML = `
    <p class="msg-style">
        ${msgInput.value}
        <span style="position: absolute; bottom: -18px; right: 0; color: rgba(84, 99, 255, 0.75); font-size: 10px;">
            ${getTime()}
        </span>
    </p>
    <img src="./images/1.jpg" class="msg-user-pic"> 
  `;
  msgInput.value = "";
  msgInput.focus();

  const dateHtml = document.createElement("div");
  dateHtml.classList.add("msg-date-wrapper");
  dateHtml.innerHTML = `
        <div class="msg-date">${getDate()}</div>
        `;
  msgContainer.prepend(msg);
  if (msgContainer.innerHTML.includes(`${getDate()}`)) return;
  msgContainer.append(dateHtml);

  localStorage.setItem("key", msgContainer.innerHTML);
  console.log(localStorage.getItem("key"));
};

msgDisplay();

sendBtn.addEventListener("click", () => msgDisplay());

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    return msgDisplay();
  }
});

msgContainer.innerHTML = localStorage.getItem("key");
