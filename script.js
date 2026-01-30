let users = JSON.parse(localStorage.getItem("users")) || {};
const savedUser = localStorage.getItem("loggedUser");

if (savedUser && users[savedUser]) loginSuccess(savedUser);

function openLogin(){ loginPopup.style.display="flex"; }
function closeLogin(){ loginPopup.style.display="none"; }
function openRegister(){ registerPopup.style.display="flex"; }
function closeRegister(){ registerPopup.style.display="none"; }

function register(){
  if(users[newUsername.value]) return registerMessage.innerText="User exists";
  users[newUsername.value]=newPassword.value;
  localStorage.setItem("users", JSON.stringify(users));
  registerMessage.innerText="Account created";
}

function login(){
  if(!users[username.value]) return loginMessage.innerText="User not found";
  if(users[username.value]!==password.value) return loginMessage.innerText="Wrong password";
  if(stayLogged.checked) localStorage.setItem("loggedUser", username.value);
  loginSuccess(username.value);
  closeLogin();
}

function loginSuccess(u){
  welcomeMessage.innerText=`Welcome ${u}`;
  document.querySelector(".login-btn").style.display="none";
  document.querySelector(".register-btn").style.display="none";
  logoutBtn.style.display="block";
  tree.classList.add("lit");
  document.querySelector(".lights").style.display="flex";
  garland.style.display="flex";
}

function logout(){
  localStorage.removeItem("loggedUser");
  welcomeMessage.innerText="";
  logoutBtn.style.display="none";
  document.querySelector(".login-btn").style.display="block";
  document.querySelector(".register-btn").style.display="block";
  tree.classList.remove("lit");
  document.querySelector(".lights").style.display="none";
  garland.style.display="none";
}

function handleSearch(e){
  if(e.key==="Enter"){
    musicResult.style.display =
      e.target.value.toLowerCase()==="christmas songs" ? "block" : "none";
  }
}

function playMusic(){
  document.getElementById("christmasAudio").play();
}

function pauseMusic(){
  document.getElementById("christmasAudio").pause();
}

/* Snow */
const canvas=snow,ctx=canvas.getContext("2d");
canvas.width=innerWidth;canvas.height=innerHeight;
let flakes=Array.from({length:120},()=>({x:Math.random()*canvas.width,y:Math.random()*canvas.height,r:Math.random()*3+1,d:Math.random()+1}));
(function snowAnim(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle="white";
  ctx.beginPath();
  flakes.forEach(f=>{
    ctx.moveTo(f.x,f.y);
    ctx.arc(f.x,f.y,f.r,0,Math.PI*2);
    f.y+=f.d;if(f.y>canvas.height){f.y=0;f.x=Math.random()*canvas.width;}
  });
  ctx.fill();
  requestAnimationFrame(snowAnim);
})();
