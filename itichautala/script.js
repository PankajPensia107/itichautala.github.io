import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword , createUserWithEmailAndPassword, deleteUser} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { getDatabase, ref, push, set, onValue, remove, update, onChildAdded } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";

let NewSection = document.getElementById("NewSection");
let TradeNoticeSection = document.getElementById("TradeNoticeSection");

const firebaseConfig = {
    apiKey: "AIzaSyDvP3XFTaQ4IjlfLWiyYWh6IPMmMt9MqFs",
    authDomain: "iti-chautala.firebaseapp.com",
    projectId: "iti-chautala",
    storageBucket: "iti-chautala.appspot.com",
    messagingSenderId: "991925093134",
    appId: "1:991925093134:web:a7c75bfea40cd0722b0d5f",
    measurementId: "G-6TFZPCKWSH"
  };

  const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase();




  addNewTradeNoticeBtn.addEventListener('click', async function(e){
    addNewTradeNoticeBtn.disabled = true;
    e.preventDefault();
    let NewTitle = document.getElementById("TradeTitle").value;
    let NewDesc = document.getElementById("TradeDesc").value;
    try {
        let time = new Date();
        let Day = time.getDate();
        let Month = time.getMonth() + 1;
        let Year = time.getFullYear();

        let UploadingDate = Day + "/" + Month + "/" + Year;

          const PersonalData = push(ref(database, "Notice"));
          set(PersonalData, {
            Title: NewTitle,
            Desc: NewDesc,
            Date: UploadingDate
          }).then(() => {
          alert("Notice Added Successfully");
          addNewTradeNoticeBtn.disabled = false;
          }).catch((error) => {
          alert("Notice Not Added. Error: " + error);
          addNewTradeNoticeBtn.disabled = false;
          });
      
          
        } catch(error){
           alert(error)
        }
})

let NoticeNum = 0;
onValue(ref(database,"Notice"), (snapshot) => {
  snapshot.forEach((childSnapshot) => {
    const childData = childSnapshot.val();
    const key = childSnapshot.key;
    NoticeNum = NoticeNum + 1;
    TradeNoticeSection.innerHTML += `
    <tr>
              <th scope="row">${NewNum}</th>
              <td>${childData.Title}</td>
              <td>${childData.Desc}</td>
              <td>${childData.Date}</td>
              <td>
                  <button class="btn btn-danger deleteNoticeBtn" data-key="${key}">Delete</button>
              </td>
            </tr>
    `;
    const DeleteAttendanceBtn = document.querySelectorAll(".deleteNoticeBtn");
    DeleteAttendanceBtn.forEach((btn) => {
    btn.addEventListener("click", (event) => {
    const documentIdToDelete = event.target.getAttribute("data-key");
    if (documentIdToDelete) {
    const documentRefToDelete = ref(database, `Notice/${documentIdToDelete}`);
      if(confirm("Are you sure you want to delete this Notice")){
        DeleteNotice(documentRefToDelete);
      }
    }
    });
    });
  });
});


async function DeleteNotice(docRef) {
  try {
  await remove(docRef);
  alert("Notice Deleted");
  location.reload();
  } catch (error) {
  console.error(error);
  
  }
  }