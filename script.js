"use strict";

import data from "./data.js";

const msgInput = document.getElementById("msg-input");
const sendBtn = document.getElementById("send-btn");
const msgContainer = document.getElementById("msg-container");
const friendsContainer = document.querySelector(".chat-users__friends");
const searchFriends = document.querySelector(".search-friends");
const profileName = document.querySelector(".profile-name");
const jobDesc = document.querySelector(".job-desc");
const editProfile = document.getElementById("edit-profile");
const userPic = document.querySelector(".chat-msgs__user-pic");
const userName = document.querySelector(".chat-msgs__user-name");
const sidebarName = document.querySelector(".chat-profile__user-name");
const jobDesignation = document.querySelector(".chat-profile__user-job");
const sidebarPic = document.querySelector(".chat-profile__user-pic");

editProfile.addEventListener("click", () => {
  profileName.setAttribute("contentEditable", "true");
  jobDesc.setAttribute("contentEditable", "true");
  jobDesc.focus();
  profileName.focus();
});

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

// const updateLS = function (key) {
//   setInterval(function () {
//     if (localStorage.getItem(key)) {
//       localStorage.removeItem(key);
//     }
//     const newItem = localStorage.setItem(key, msgContainer.innerHTML);
//     // console.log(localStorage.getItem(key));
//     return newItem;
//   }, 2000);
// };

function msgOutput(message, time, image) {
  const msg = document.createElement("div");
  msg.classList.add("msg-wrapper");
  msg.innerHTML = `
  <p class="msg-style">
    ${message}
    <span style="position: absolute; bottom: -18px; right: 0; color: rgba(84, 99, 255, 0.75); font-size: 10px;">
        ${time}
    </span>
  </p>
  <img src=${image} class="msg-user-pic"> 
  `;
  msgContainer.prepend(msg);

  const dateHtml = document.createElement("div");
  dateHtml.classList.add("msg-date-wrapper");
  dateHtml.innerHTML = `
        <div class="msg-date">${getDate()}</div>
        `;

  if (msgContainer.innerHTML.includes(`${getDate()}`)) return;

  msg.insertAdjacentHTML("afterend", dateHtml.outerHTML);
}
msgOutput(data[0].msg, data[0].time, data[0].img);

const msgDisplay = function () {
  if (!msgInput.value) return;
  msgOutput(msgInput.value, getTime(), "./images/1.jpg");
  msgInput.value = "";
  msgInput.focus();
  updateLS("key");
};
msgDisplay();

sendBtn.addEventListener("click", () => msgDisplay());

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    return msgDisplay();
  }
});

// msgContainer.innerHTML = localStorage.getItem("key");
// updateLS("key");

//friends data array
const friendsList = function (arr) {
  return arr.map((person) => {
    const { id, name, img, msg, time } = person;
    const html = `
    <div class="chat-users__friend ${id === 0 ? "active" : null}">
      <div class="chat-users__friend-img">
          <img src=${img} class="chat-users__friend-pic">
      </div>
      <div class="chat-users__friend-details">
          <h4 class="chat-users__friend-name">${name}</h4>
          <p>${msg}</p>
      </div>
      <div class="chat-users__updates">
          <p class="chat-users__time">${time}</p>
      </div>
    </div>
`;
    return html;
  });
};

const friendsHtml = friendsList(data);
friendsContainer.insertAdjacentHTML("afterbegin", friendsHtml.join(" "));

searchFriends.value = "";
searchFriends.addEventListener("input", (e) => {
  const filterFriends = data.filter(
    (person) =>
      person.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
      person.name.toUpperCase().includes(e.target.value.toUpperCase())
  );

  friendsContainer.innerHTML = friendsList(filterFriends).join(" ");
  if (friendsList(filterFriends).length === 0) {
    friendsContainer.innerHTML = `
    <div style="text-align: center; color:rgba(0, 0, 0, 0.5)">
      ---- No Results Found ----
    </div>
    `;
  }
});

friendsContainer.addEventListener("click", function (e) {
  const element = e.target.closest(".chat-users__friend");
  const friends = friendsContainer.querySelectorAll(".chat-users__friend");
  friends.forEach((friend) => friend.classList.remove("active"));
  const friendPic = element.querySelector(".chat-users__friend-pic");
  const friendName = element.querySelector(".chat-users__friend-name");

  userName.innerHTML = friendName.innerHTML;
  userPic.src = friendPic.src;
  sidebarName.innerHTML = friendName.innerHTML;
  sidebarPic.src = friendPic.src;

  data.forEach((friend) => {
    const { name, msg: chatMsg, job, img, time } = friend;
    if (name === friendName.innerHTML) {
      element.classList.add("active");
      jobDesignation.innerHTML = job;

      msgContainer.innerHTML = "";
      msgOutput(chatMsg, time, img);
    }
  });
});
