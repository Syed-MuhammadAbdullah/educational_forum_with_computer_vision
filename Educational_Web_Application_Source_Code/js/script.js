let toggleBtn = document.getElementById('toggle-btn');
let body = document.body;
let darkMode = localStorage.getItem('dark-mode');

const enableDarkMode = () =>{
   toggleBtn.classList.replace('fa-sun', 'fa-moon');
   body.classList.add('dark');
   localStorage.setItem('dark-mode', 'enabled');
}

const disableDarkMode = () =>{
   toggleBtn.classList.replace('fa-moon', 'fa-sun');
   body.classList.remove('dark');
   localStorage.setItem('dark-mode', 'disabled');
}

if(darkMode === 'enabled'){
   enableDarkMode();
}

toggleBtn.onclick = (e) =>{
   darkMode = localStorage.getItem('dark-mode');
   if(darkMode === 'disabled'){
      enableDarkMode();
   }else{
      disableDarkMode();
   }
}

 function toggleChat() {
    const chatbot = document.getElementById('chatbot');
    if (chatbot.style.display === 'none' || chatbot.style.display === '') {
      chatbot.style.display = 'block'; // Show iframe
      chatbot.style.bottom = '20px';   // Move up the iframe smoothly
    } else {
      chatbot.style.display = 'none';  // Hide iframe
      chatbot.style.bottom = '-400px'; // Move iframe down smoothly
    }
  }

let profile = document.querySelector('.header .flex .profile');

document.querySelector('#user-btn').onclick = () =>{
   profile.classList.toggle('active');
   search.classList.remove('active');
}

let search = document.querySelector('.header .flex .search-form');

document.querySelector('#search-btn').onclick = () =>{
   search.classList.toggle('active');
   profile.classList.remove('active');
}

let sideBar = document.querySelector('.side-bar');

document.querySelector('#menu-btn').onclick = () =>{
   sideBar.classList.toggle('active');
   body.classList.toggle('active');
}

document.querySelector('#close-btn').onclick = () =>{
   sideBar.classList.remove('active');
   body.classList.remove('active');
}

window.onscroll = () =>{
   profile.classList.remove('active');
   search.classList.remove('active');

   if(window.innerWidth < 1200){
      sideBar.classList.remove('active');
      body.classList.remove('active');
   }
}

function openVideoPopup(videoUrl) {
   let iframe = document.getElementById('videoFrame');
   iframe.src = videoUrl + "?autoplay=1";
   document.getElementById('videoPopup').style.display = 'flex';

   // 👉 Start gesture volume control
   fetch('http://127.0.0.1:5000/start_volume_control', { method: 'POST' });
}


function closeVideoPopup() {
   // Clear the iframe source and hide the popup
   document.getElementById('videoFrame').src = "";
   document.getElementById('videoPopup').style.display = 'none';
}
