// // Vanilla JS for OPDP — cleaned and modular
// document.addEventListener('DOMContentLoaded', ()=>{
//   // Views
//   const loginView = id('loginView'), patientsView = id('patientsView'), assessmentView = id('assessmentView');
//   const topHeader = id('topHeader'), headerUsername = id('headerUsername');

//   // Auth buttons
//   id('btnLogin').addEventListener('click', ()=>{
//     const name = id('username').value.trim() || 'User';
//     loginView.classList.add('hidden');
//     patientsView.classList.remove('hidden');
//     topHeader.classList.remove('hidden');
//     headerUsername.textContent = name;
//   });
//   id('btnLogout').addEventListener('click', ()=>{
//     topHeader.classList.add('hidden');
//     patientsView.classList.add('hidden');
//     assessmentView.classList.add('hidden');
//     loginView.classList.remove('hidden');
//   });
//   $(document).ready(function () {
//     const tabs = $(".tabs .tab");
//     const contents = $(".tabcontent");

//     // Save & Next Button
//     $("#saveNextBtn").on("click", function () {
//       validateSaveDetail()      
//       let currentIndex = tabs.index($(".tab.active"));
//       if (currentIndex < tabs.length -1 ) {
//         let nextIndex = currentIndex + 1;
//         tabs.removeClass("active").eq(nextIndex).addClass("active");
//         contents.addClass("hidden").eq(nextIndex).removeClass("hidden");
//         if($(".tab.active").attr('data-target') == 'billing'){

//         }
//       }
//     });

//     // Previous Button
//     $("#prevBtn").on("click", function () {
//       let currentIndex = tabs.index($(".tab.active"));
//       if (currentIndex > 0) {
//         let prevIndex = currentIndex - 1;
//         tabs.removeClass("active").eq(prevIndex).addClass("active");
//         contents.addClass("hidden").eq(prevIndex).removeClass("hidden");
//       }
//     });
//   });
//   // Patient list (sample data)
//   const patients = [
//     {sl:1,SlotTime:'08:00 Am (I)', uhid:48554, name:'Sathish', bill:34445},
//     {sl:2,SlotTime:'08:10 Am (p)', uhid:63254, name:'Sugumar', bill:36521},
//     {sl:3,SlotTime:'11:10 Am (p)', uhid:45468, name:'Ramesh', bill:36542},
//     {sl:4,SlotTime:'03:10 pm (p)', uhid:25468, name:'Devi', bill:36542},
//     {sl:5,SlotTime:'04:10 pm (p)', uhid:484918, name:'Tamil', bill:36582}
//   ];
//   const patientsTbody = id('patientsTbody');
//   function renderPatients(){
//     patientsTbody.innerHTML = '';
//     patients.forEach(p=>{
//       const tr = elt('tr');
//       tr.innerHTML = `<td>${p.sl}</td><td>${p.SlotTime}</td><td>${p.uhid}</td><td>${p.name}</td><td>${p.bill} <img src="./Images/icn_edit.png"id=""  /></td>
//         <td class="actions"><div class="actions-row">
//           <button id='Arrbtn' class="btn ghost" onclick="$(this).next().show();$(this).hide()" data-action="view">Arrived</button>
//           <img src="./Images/tick.png"id="arrivedtick" style="display: none;" />
//           <button class="btn ghost" data-action="assess">Assess</button>
//         </div></td>`;
//       tr.querySelector('[data-action="assess"]').addEventListener('click', ()=>openAssessment(p));
//       // tr.querySelector('[data-action="view"]').addEventListener('click', ()=>$('#arrivedtick').show() & $('#Arrbtn').hide()
//       // );
//       patientsTbody.appendChild(tr);
//     });
//   }
//   renderPatients();

//   function openAssessment(patient){
//     patientsView.classList.add('hidden');
//     assessmentView.classList.remove('hidden');
//   }

//   id('backToPatients').addEventListener('click', ()=>{
//     assessmentView.classList.add('hidden');
//     patientsView.classList.remove('hidden');
//   });

//   // Tabs
//   document.querySelectorAll('.tab').forEach(t=>t.addEventListener('click', (e)=>{
//     const target = e.currentTarget.dataset.target;
//     document.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));
//     e.currentTarget.classList.add('active');
//     document.querySelectorAll('.tabcontent').forEach(tc=>tc.classList.add('hidden'));
//     id(target).classList.remove('hidden');
//   }));

//   // Toggle surgery field
//   id('adviceType') && id('adviceType').addEventListener('change', (e)=>{
//     const show = e.target.value === 'Surgery';
//     toggleClass(id('surgeryLabel'), 'hidden', !show);
//   });

//   // ICD table
//   id('addIcd').addEventListener('click', ()=>{
//     const val = id('icdInput').value.trim();
//     if(!val) return;
//     const tbody = id('icdTable').querySelector('tbody');
//     const tr = elt('tr');
//     tr.innerHTML = `<td>${val}</td><td>Definition</td><td><img class="icon-btn" id="deletebtn"src="./Images/icn_trash.png"></td>`;
//     tr.querySelector('img').addEventListener('click', ()=>tr.remove());
//     tbody.appendChild(tr);
//     id('icdInput').value='';
//   });

  // // Prescriptions — Medicine
  // const freqMap = { 'OD':1,'BD':2,'TDS':3,'QID':4,'HS':1,'SOS':1 };
  // const freqs = ['OD','BD','TDS','QID','HS','SOS'];

  // const tbodyMed = id('tbodyMed');
  // id('btnAddMed').addEventListener('click', ()=>createMedRow());
  // function createMedRow(data={}){
  //   const tr = elt('tr');
  //   tr.innerHTML = `
  //     <td><input list="meds" style="Width:100%" class="medname" placeholder="Medicine" value="${escapeHtml(data.name||'')}"></td>
  //     <td><select class="freq" style="Width:100%">${freqs.map(f=>`<option ${data.frequency===f?'selected':''}>${f}</option>`).join('')}</select></td>
  //     <td><input  class="small days"style="Width:100%" type="text" min="1" value="${data.days||1}"></td>
  //     <td><input class="qty" type="text"  style="Width:100%" value="${data.quantity||''}"></td>
  //     <td><select  class="timing" style="Width:100%"><option ${data.timing==='After Food'?'selected':''}>After Food</option><option ${data.timing==='Before Food'?'selected':''}>Before Food</option></select></td>
  //     <td><button class="btn ghost remove">Remove</button></td>`;
  //   const freqEl = tr.querySelector('.freq');
  //   const daysEl = tr.querySelector('.days');
  //   const qtyEl = tr.querySelector('.qty');
  //   tr.querySelector('.remove').addEventListener('click', ()=>tr.remove());
  //   function recalc(){ const f=freqEl.value||'OD'; const d=Number(daysEl.value)||1; if(!qtyEl.dataset.manual){qtyEl.value = (freqMap[f]||1)*d; } }
  //   freqEl.addEventListener('change', recalc);
  //   daysEl.addEventListener('input', recalc);
  //   qtyEl.addEventListener('input', ()=>qtyEl.dataset.manual='1');
  //   tbodyMed.appendChild(tr); recalc();
  // }
  // // seed medicine row
  // createMedRow({name:'Paracetamol',form:'Tablet',strength:'500 mg',route:'Oral',frequency:'BD',days:5,timing:'After Food',quantity:10,refill:'No'});

  // // Lab tests
  // const tbodyLab = id('tbodyLab');
  // const categories = ['Blood','Urine','Imaging','Pathology','Cardiology','Other'];
  // const priority = ['Routine','Urgent','STAT'];
  // id('btnAddLab') && id('btnAddLab').addEventListener('click', ()=>createLabRow());
  // function createLabRow(data={}){
  //   const tr = elt('tr');
  //   tr.innerHTML = `<td><input style="Width:100%" list="tests" class="testname" value="${escapeHtml(data.name||'')}" placeholder="Test"></td>
  //     <td><select class="category" style="Width:100%">${categories.map(c=>`<option ${data.category===c?'selected':''}>${c}</option>`).join('')}</select></td>
  //     <td><select class="priority" style="Width:100%">${priority.map(p=>`<option ${data.priority===p?'selected':''}>${p}</option>`).join('')}</select></td>
  //     <td><input class="instructions"style="Width:100%" type="text" value="${escapeHtml(data.instructions||'')}"></td>
  //     <td><input type="date" class="date"style="Width:100%" value="${data.date||new Date().toISOString().substring(0,10)}"></td>
  //     <td><button class="btn ghost remove">Remove</button></td>`;
  //   tr.querySelector('.remove').addEventListener('click', ()=>tr.remove());
  //   tbodyLab.appendChild(tr);
  // }
  // createLabRow({name:'Complete Blood Count (CBC)',category:'Blood',priority:'Routine',instructions:'No fasting needed'});

  // // Referral doctors
  // const tbodyRD = id('tbodyRD');
  // id('btnAddRD') && id('btnAddRD').addEventListener('click', ()=>createRDRow());
  // const RDpriority = ['Routine','Urgent','STAT'];
  // const RDspeciality = ['Emergency medicine','Pediatrics','Cardiology','Family medicine','Pathology','Psychiatry','Dermatology','Gastroenterology','Hematology'];
  // const RDnames = ['DR.PILLAI C.V.','DR.R VIDYACHAYA','DR.DIVYA PRIYADARSHINI.N','Dr.BALARAMAN R','DR.AKSHAYA KEERTHIKHA'];
  // function createRDRow(data={}){
  //   const tr = elt('tr');
  //   tr.innerHTML = `<td><select class="rd-speciality">${RDspeciality.map(s=>`<option ${data.Specialityy===s?'selected':''}>${s}</option>`).join('')}</select></td>
  //     <td><select class="rd-doctor" style="Width:100%">${RDnames.map(d=>`<option ${data.Dname===d?'selected':''}>${d}</option>`).join('')}</select></td>
  //     <td><select class="rd-priority" style="Width:100%">${RDpriority.map(p=>`<option ${data.priority===p?'selected':''}>${p}</option>`).join('')}</select></td>
  //     <td><input class="instructions" style="Width:100%" type="text" value="${escapeHtml(data.instructions||'')}"></td>
  //     <td><input type="date" class="date" style="Width:100%" value="${data.date||new Date().toISOString().substring(0,10)}"></td>
  //     <td><button class="btn ghost remove">Remove</button></td>`;
  //   tr.querySelector('.remove').addEventListener('click', ()=>tr.remove());
  //   tbodyRD.appendChild(tr);
  // }
  // createRDRow({Specialityy:'Cardiology',Dname:'DR.PILLAI C.V.',priority:'Urgent',instructions:'Need heart test'});
  // id('today') && (id('today').textContent = new Date().toLocaleDateString());

  // // History filters
  // id('applyFilters') && id('applyFilters').addEventListener('click', ()=>{
  //   const from = id('filterFromDate').value;
  //   const to = id('filterToDate').value;
  //   const spec = id('filterSpec').value;
  //   const visit = id('filterVisit').value;
  //   const doctor = id('filterDoctor').value;
  //   document.querySelectorAll('#historyTable tbody tr').forEach(tr=>{
  //     const date = tr.cells[0].innerText;
  //     const s = tr.cells[1].innerText;
  //     const v = tr.cells[3].innerText;
  //     const d = tr.cells[4].innerText;
  //     let show = true;
  //     if(from && date < from) show = false;
  //     if(to && date > to) show = false;
  //     if(spec && s !== spec) show = false;
  //     if(visit && !v.includes(visit)) show = false;
  //     if(doctor && d !== doctor) show = false;
  //     tr.style.display = show ? '' : 'none';
  //   });
  // });
  // id('resetFilters') && id('resetFilters').addEventListener('click', ()=>{
  //   id('filterFromDate').value=''; id('filterToDate').value=''; id('filterSpec').value=''; id('filterVisit').value=''; id('filterDoctor').value='';
  //   document.querySelectorAll('#historyTable tbody tr').forEach(tr=>tr.style.display='');
  // });

  // // Summary generator (simulated typing)
  // id('generateSummary') && id('generateSummary').addEventListener('click', ()=>{
  //   const lines = [
  //     "Patient presented with complaints of headache and fever.",
  //     "Vitals were stable. Further investigations advised.",
  //     "Prescribed Paracetamol and advised follow-up in 5 days."
  //   ];
  //   const box = id('summaryBox'), ta = id('summaryTextarea');
  //   box.classList.remove('hidden'); ta.value='';
  //   let i = 0, j = 0;
  //   function typeChar(){
  //     if(i < lines.length){
  //       if(j < lines[i].length){ ta.value += lines[i][j++]; setTimeout(typeChar, 20); }
  //       else { ta.value += "\n"; i++; j=0; setTimeout(typeChar, 120); }
  //     }
  //   }
  //   typeChar();
  // });

//   // Appointment booking
//   const doctorsData = {
//     "Cardiology": ["Dr. Mehta", "Dr. Rao"],
//     "Orthopedics": ["Dr. Sharma", "Dr. Iyer"],
//     "Dermatology": ["Dr. Gupta", "Dr. Nair"],
//     "General Medicine": ["Dr. Singh", "Dr. Verma"]
//   };
//   id('speciality') && id('speciality').addEventListener('change', (e)=>{
//     const sel = id('doctor'); sel.innerHTML = '<option value="">--Select Doctor--</option>';
//     const arr = doctorsData[e.target.value] || [];
//     arr.forEach(d=>{ const opt = document.createElement('option'); opt.value = d; opt.text = d; sel.appendChild(opt); });
//   });
//   id('bookBtn') && id('bookBtn').addEventListener('click', ()=>{
//     const form = id('appointmentForm');
//     if(!form.checkValidity()){ alert('Please fill all fields'); return; }
//     const data = {date:id('date').value, speciality:id('speciality').value, doctor:id('doctor').value, schedule:id('schedule').value, slot:id('slot').value};
//     const tr = elt('tr'); tr.innerHTML = `<td>${data.date}</td><td>${data.speciality}</td><td>${data.doctor}</td><td>${data.schedule}</td><td>${data.slot}</td>`;
//     id('appointmentsTbody').appendChild(tr);
//     alert(`Appointment booked for ${data.doctor} on ${data.date} at ${data.slot}`);
//     form.reset();
//     id('doctor').innerHTML = '<option value="">--Select Doctor--</option>';
//   });
//   id('clearBtn') && id('clearBtn').addEventListener('click', ()=>{ id('appointmentForm').reset(); id('doctor').innerHTML = '<option value="">--Select Doctor--</option>'; });

//   // small helpers
//   function id(i){ return document.getElementById(i); }
//   function elt(tag){ return document.createElement(tag); }
//   function toggleClass(el, cls, condition){ if(condition) el.classList.add(cls); else el.classList.remove(cls); }
//   function escapeHtml(str){ return String(str).replace(/[&<>"']/g, s=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' })[s]); }
// });


// ///// op timer
//  let elapsedTime = 0; // seconds
//     let timerInterval = null;
//     let isPaused = false;
//     let isRunning = false;

//     const timeDisplay = document.getElementById("time-display");
//     const startBtn = document.getElementById("start-btn");
//     const pauseBtn = document.getElementById("pause-btn");
//     const resumeBtn = document.getElementById("resume-btn");
//     const stopBtn = document.getElementById("stop-btn");

//    function updateDisplay() {
//   const hours = Math.floor(elapsedTime / 3600).toString().padStart(2, "0");
//   const minutes = Math.floor((elapsedTime % 3600) / 60).toString().padStart(2, "0");
//   const seconds = (elapsedTime % 60).toString().padStart(2, "0");
//   timeDisplay.textContent = `${hours}:${minutes}:${seconds}`;
// }

//     function startTimer() {
//       if (isRunning) {
//         if (!confirm("Timer is already stopped. Start new timer from 00:00?")) return;
//         elapsedTime = 0;
//         updateDisplay();
//       } else {
//         if (!confirm("Start the timer?")) return;
//       }

//       isRunning = true;
//       isPaused = false;

//       startBtn.style.display = "none";
//       pauseBtn.style.display = "inline-block";
//       stopBtn.style.display = "inline-block";
//       resumeBtn.style.display = "none";
//       timeDisplay.classList.remove("blink");

//       timerInterval = setInterval(() => {
//         if (!isPaused) {
//           elapsedTime++;
//           updateDisplay();
//         }
//       }, 1000);
//     }

//     function pauseTimer() {
//       if (!confirm("Pause the timer?")) return;

//       isPaused = true;
//       pauseBtn.style.display = "none";
//       resumeBtn.style.display = "inline-block";
//       timeDisplay.classList.add("blink");
//     }

//     function resumeTimer() {
//       if (!confirm("Resume the timer?")) return;

//       isPaused = false;
//       resumeBtn.style.display = "none";
//       pauseBtn.style.display = "inline-block";
//       timeDisplay.classList.remove("blink");
//     }

//     function stopTimer() {
//       if (!confirm("Stop the timer?")) return;

//       clearInterval(timerInterval);
//       timerInterval = null;
//       isPaused = true;
//       isRunning = true; // mark as stopped but not reset
//       pauseBtn.style.display = "none";
//       resumeBtn.style.display = "none";
//       stopBtn.style.display = "none";
//       startBtn.style.display = "inline-block";
//       timeDisplay.classList.remove("blink");
//     }

//     updateDisplay();

//     startBtn.addEventListener("click", startTimer);
//     pauseBtn.addEventListener("click", pauseTimer);
//     resumeBtn.addEventListener("click", resumeTimer);
//     stopBtn.addEventListener("click", stopTimer);

// var alertarr = new Array();


//     function validateSaveDetail() {
//     var success = true;
//     console.clear();
//     if ($(".tab.active").attr('data-target') == 'triage') {
      
//      if ($('#pr').val()=='') {
//         alertarr.push("Enter PR value /value must be > 0 ");
//         success = false;
//     }

//     if ($('#rr').val()=='') {
//         alertarr.push("Enter RR value / value must be > 0");
//         success = false;
//     }

//     if ($('#bps').val()=='' || $('#bpd').val()=='') {
//         alertarr.push("Enter BP systolic and diastolic value / value must be > 0");
//         success = false;
//     }

//     if ($('#spo').val()=='') {
//         alertarr.push("Enter Spo2 value / value must be > 0");
//         success = false;
//     }
//            if ($('#chief').val()=='') {
//                 alertarr.push("Enter chief Complaints");
//                 success = false;
//             }
//             if ($('#history').val()=='') {
//                 alertarr.push("Enter History");
//                 success = false;
//             }
//             if ($('#examination').val()=='') {
//                 alertarr.push("Enter Examination");
//                 success = false;
//             }
//     }
//    if ($(".tab.active").attr('data-target') == 'clinical') {

//    }
//     if ($(".tab.active").attr('data-target') == 'diagnosis') {
//     if ($('#DoctorNotes').val()=='') {
//                 alertarr.push("Enter Doctor Notes");
//                 success = false;
//             }
//             if ($('#PainAssessment').val()=='') {
//                 alertarr.push("Enter Pain Assessment");
//                 success = false;
//             }
//    }
//       if ($(".tab.active").attr('data-target') == 'prescription') {
    
//    }
//     if ($(".tab.active").attr('data-target') == 'lab') {
//        if ($('#adviceType :selected').val() == 'Select') {
//                 alertarr.push("Select Admission Type");
//                 success = false;
//             }
//       if ($('#adviceType :selected').val() == 'MedicalManagement' || $('#adviceType :selected').val() == 'Surgery') {
//                 if ($('#doctorAdvice').val()=='') {
//                 alertarr.push("Enter Doctor Advice");
//                 success = false;
//             }
//             }     
//    }   
//       if ($(".tab.active").attr('data-target') == 'pharmacy') {
//           if ($('#summaryTextarea').val() == '') {
//                 alertarr.push("Enter visit summary");
//                 success = false;
//             }
//    }
//       if ($(".tab.active").attr('data-target') == 'billing') {
    
//    }
//     if (alertarr.length > 0) {
//         var msg = '';
//         $.each(alertarr, function (i, v) {
//             msg += `${i + 1}.${v}\n`
//         });
//         alertarr = new Array();
//         alert(msg)
//     }
//     return success;
//   }
//     let timerIntervall = null;

// function Startcheckin() {
//     try {       
//           timerIntervall = setInterval(() => {
//         if (!isPaused) {
//           elapsedTime++;
//           startcheckintimer();
//         }
//       }, 1000);

// }  
//     catch (err) {
//         console.error(err);
//     }
// }


// function startcheckintimer(){  
//    $('#CheckIn').hide()
//   $('#CheckOut').show()
//   const hours = Math.floor(elapsedTime / 3600).toString().padStart(2, "0");
//   const minutes = Math.floor((elapsedTime % 3600) / 60).toString().padStart(2, "0");
//   const seconds = (elapsedTime % 60).toString().padStart(2, "0");
//   $('#timeshower').html(`${hours}:${minutes}:${seconds}`)
// }
// function validateCheckoutDetail(){
//  var success = true;
//     console.clear();
    
      
//      if ($('#pr').val()=='') {
//         alertarr.push("Enter PR value /value must be > 0 ");
//         success = false;
//     }

//     if ($('#rr').val()=='') {
//         alertarr.push("Enter RR value / value must be > 0");
//         success = false;
//     }

//     if ($('#bps').val()=='' || $('#bpd').val()=='') {
//         alertarr.push("Enter BP systolic and diastolic value / value must be > 0");
//         success = false;
//     }

//     if ($('#spo').val()=='') {
//         alertarr.push("Enter Spo2 value / value must be > 0");
//         success = false;
//     }
//            if ($('#chief').val()=='') {
//                 alertarr.push("Enter chief Complaints");
//                 success = false;
//             }
//             if ($('#history').val()=='') {
//                 alertarr.push("Enter History");
//                 success = false;
//             }
//             if ($('#examination').val()=='') {
//                 alertarr.push("Enter Examination");
//                 success = false;
//             }
 
   
    
//     if ($('#DoctorNotes').val()=='') {
//                 alertarr.push("Enter Doctor Notes");
//                 success = false;
//             }
//             if ($('#PainAssessment').val()=='') {
//                 alertarr.push("Enter Pain Assessment");
//                 success = false;
//             }
 
//     if ($(".tab.active").attr('data-target') == 'lab') {
//        if ($('#adviceType :selected').val() == 'Select') {
//                 alertarr.push("Select Admission Type");
//                 success = false;
//             }
//       if ($('#adviceType :selected').val() == 'MedicalManagement' || $('#adviceType :selected').val() == 'Surgery') {
//                 if ($('#doctorAdvice').val()=='') {
//                 alertarr.push("Enter Doctor Advice");
//                 success = false;
//             }
//             }     
//    }   
//       if ($(".tab.active").attr('data-target') == 'pharmacy') {
//           if ($('#summaryTextarea').val() == '') {
//                 alertarr.push("Enter visit summary");
//                 success = false;
//             }
//    }

//     if (alertarr.length > 0) {
//         var msg = '';
//         $.each(alertarr, function (i, v) {
//             msg += `${i + 1}.${v}\n`
//         });
//         alertarr = new Array();
//         alert(msg)
//     }
//     return success;
// }

// function saveandcheckout(){
// if( validateCheckoutDetail() == true){
//   alert('Patient CheckOut Sucessfully')
//   clearInterval(timerIntervall);
// }
// }
// $(document).ready(function() {
//  // Show popup
//       $("#editBtn").click(function() {
//         $("#popupBox").fadeIn(200);
//       });

//       // Close popup when clicking X
//       $(".close").click(function() {
//         $("#popupBox").fadeOut(200);
//       });

//       // Close popup when clicking outside
//       $(window).click(function(e) {
//         if ($(e.target).is("#popupBox")) {
//           $("#popupBox").fadeOut(200);
//         }
//       });    });
// OPDP — Full jQuery version
$(document).ready(function () {

    
  // --- VIEW SWITCHING ---
  const loginView = $("#loginView"),
        patientsView = $("#patientsView"),
        assessmentView = $("#assessmentView"),
        topHeader = $("#topHeader"),
        headerUsername = $("#headerUsername");

  // Login / Logout
  $("#btnLogin").on("click", function () {
    if($("#username").val() == '' || $("#password").val() == '' ){
      alert('Enter User name and password')
return
    }
    const name = $("#username").val().trim() || "User";
    loginView.addClass("hidden");
    patientsView.removeClass("hidden");
    topHeader.removeClass("hidden");
    headerUsername.text(name);
  });

  $("#btnLogout").on("click", function () {
    topHeader.addClass("hidden");
    patientsView.addClass("hidden");
    assessmentView.addClass("hidden");
    loginView.removeClass("hidden");
  });

  // --- PATIENT LIST ---
  const patients = [
    { sl: 1, SlotTime: "08:00 Am (I)", uhid: 48554, name: "Sathish", bill: 34445 },
    { sl: 2, SlotTime: "08:10 Am (p)", uhid: 63254, name: "Sugumar", bill: 36521 },
    { sl: 3, SlotTime: "11:10 Am (p)", uhid: 45468, name: "Ramesh", bill: 36542 },
    { sl: 4, SlotTime: "03:10 pm (p)", uhid: 25468, name: "Devi", bill: 36542 },
    { sl: 5, SlotTime: "04:10 pm (p)", uhid: 484918, name: "Tamil", bill: 36582 }
  ];

  function renderPatients() {
    const tbody = $("#patientsTbody").empty();
    $.each(patients, function (_, p) {
      const tr = $(`
        <tr>
          <td>${p.sl}</td>
          <td>${p.SlotTime}</td>
          <td>${p.uhid}</td>
          <td>${p.name}</td>
          <td>${p.bill} <img src="./Images/icn_edit.png" id="editbillbtn" onclick="showeditpopup('billlpopupBox')" class="editIcon" style="cursor:pointer;" /></td>
          <td>
            <div class="actions-row" style="display: flex;align-items: center;">
              <button class="btn ghost Arrbtn">Arrived</button>
              <img src="./Images/tick.png" class="arrivedtick" style="display:none;" />
              <button class="btn ghost assessBtn">Assess</button>
              <img src="./Images/ico_print.png" onclick="fnCallPrint(this,'finalprint',1)" /> 

            </div>
          </td>
        </tr>
      `);
      tr.find(".Arrbtn").on("click", function () {
        $(this).hide().siblings(".arrivedtick").show();
      });
      tr.find(".assessBtn").on("click", function () {
        openAssessment(p);
      });
      tbody.append(tr);
    });
  }
  renderPatients();

  function openAssessment(patient) {
    patientsView.addClass("hidden");
    assessmentView.removeClass("hidden");
  }

  $("#backToPatients").on("click", function () {
    assessmentView.addClass("hidden");
    patientsView.removeClass("hidden");
  });
});
  // --- TABS NAVIGATION ---
  const tabs = $(".tabs .tab");
  const contents = $(".tabcontent");

  $(".tab").on("click", function () {
    const target = $(this).data("target");
    tabs.removeClass("active");
    $(this).addClass("active");
    contents.addClass("hidden");
    $("#" + target).removeClass("hidden");
  });

  // Save & Next / Previous
  $("#saveNextBtn").on("click", function () {
    validateSaveDetail();
    let currentIndex = tabs.index($(".tab.active"));
    if (currentIndex < tabs.length - 1) {
      tabs.removeClass("active").eq(currentIndex + 1).addClass("active");
      contents.addClass("hidden").eq(currentIndex + 1).removeClass("hidden");
    }
     if (currentIndex == tabs.length - 1) {$('#printbtn').show()}
     else{$('#printbtn').hide()}
  });

  $("#prevBtn").on("click", function () {
    let currentIndex = tabs.index($(".tab.active"));
    if (currentIndex > 0) {
      $('#printbtn').hide()
      tabs.removeClass("active").eq(currentIndex - 1).addClass("active");
      contents.addClass("hidden").eq(currentIndex - 1).removeClass("hidden");
    }
  });


  // --- VALIDATION ---
  let alertarr = [];

  function validateSaveDetail() {
    let success = true;
    alertarr = [];

    const active = $(".tab.active").data("target");

    if (active === "triage") {
      if ($("#pr").val() === "") alertarr.push("Enter PR value /value must be > 0 ");
      if ($("#rr").val() === "") alertarr.push("Enter RR value /value must be > 0 ");
      if ($("#bps").val() === "" || $("#bpd").val() === "") alertarr.push("Enter BP values");
      if ($("#spo").val() === "") alertarr.push("Enter Spo2 value");
      if ($("#chief").val() === "") alertarr.push("Enter Chief Complaints");
      if ($("#history").val() === "") alertarr.push("Enter History");
      if ($("#examination").val() === "") alertarr.push("Enter Examination");
    }

    if (active === "diagnosis") {
      if ($("#DoctorNotes").val() === "") alertarr.push("Enter Doctor Notes");
      if ($("#PainAssessment").val() === "") alertarr.push("Enter Pain Assessment");
            if ($("#DietAdvice").val() === "") alertarr.push("Enter Diet Advice");

    }

    if (active === "lab") {
      const advice = $("#adviceType :selected").val();
      if (advice === "Select") alertarr.push("Select Admission Type");
      if (advice === "MedicalManagement" || advice === "Surgery") {
        if ($("#doctorAdvice").val() === "") alertarr.push("Enter Doctor Advice");
      }
    }

    if (active === "pharmacy") {
      if ($("#summaryTextarea").val() === "") alertarr.push("Enter visit summary");
    }

    if (alertarr.length > 0) {
      let msg = "";
      $.each(alertarr, function (i, v) {
        msg += `${i + 1}. ${v}\n`;
      });
      alert(msg);
      success = false;
    }
    return success;
  }

  // --- TIMER ---
  let elapsedTime = 0;
  let timerInterval = null;
  let isPaused = false;
  let isRunning = false;

  function updateDisplay() {
    const hours = String(Math.floor(elapsedTime / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((elapsedTime % 3600) / 60)).padStart(2, "0");
    const seconds = String(elapsedTime % 60).padStart(2, "0");
    $("#time-display").text(`${hours}:${minutes}:${seconds}`);
  }

  $("#start-btn").on("click", function () {
    if (isRunning) {
      if (!confirm("Timer already running. Restart?")) return;
      elapsedTime = 0;
    } else if (!confirm("Start the timer?")) return;

    isRunning = true;
    isPaused = false;
    $("#start-btn").hide();
    $("#pause-btn, #stop-btn").show();
    $("#resume-btn").hide();
    $("#time-display").removeClass("blink");

    timerInterval = setInterval(() => {
      if (!isPaused) {
        elapsedTime++;
        updateDisplay();
      }
    }, 1000);
  });

  $("#pause-btn").on("click", function () {
    if (!confirm("Pause the timer?")) return;
    isPaused = true;
    $("#pause-btn").hide();
    $("#resume-btn").show();
    $("#time-display").addClass("blink");
  });

  $("#resume-btn").on("click", function () {
    if (!confirm("Resume the timer?")) return;
    isPaused = false;
    $("#resume-btn").hide();
    $("#pause-btn").show();
    $("#time-display").removeClass("blink");
  });

  $("#stop-btn").on("click", function () {
    if (!confirm("Stop the timer?")) return;
    clearInterval(timerInterval);
    $("#pause-btn, #resume-btn, #stop-btn").hide();
    $("#start-btn").show();
    $("#time-display").removeClass("blink");
  });

  updateDisplay();

  // --- CHECKIN / CHECKOUT ---
  function startcheckintimer() {
    $("#CheckIn").hide();
    $("#CheckOut").show();
    const hours = String(Math.floor(elapsedTime / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((elapsedTime % 3600) / 60)).padStart(2, "0");
    const seconds = String(elapsedTime % 60).padStart(2, "0");
    $("#timeshower").text(`${hours}:${minutes}:${seconds}`);
  }

  let timerIntervall = null;
  window.Startcheckin = function () {
    try {
      timerIntervall = setInterval(() => {
        if (!isPaused) {
          elapsedTime++;
          startcheckintimer();
        }
      }, 1000);
    } catch (err) {
      console.error(err);
    }
  };

  window.saveandcheckout = function () {
    if (validateSaveDetail()) {
      alert("Patient Checkout Successfully");
      clearInterval(timerIntervall);
    }
  };
    //  // Show popup
    //   $("#editBtn").click(function() {
        
    //   });
    //  // Show popup
    //   $("#editbillbtn").click(function() {
       
    //   });
    //   // Close popup when clicking X
    //   $(".close").click(function() {
    //     $("#popupBox").fadeOut(200);
    //   });
    //   $("#billclose").click(function() {
    //     $("#billlpopupBox").fadeOut(200);
    //   });



     function showeditpopup(idname) { $(`#${idname}`).fadeIn(200); }
        function closeeditpopup(idname) { $(`#${idname}`).fadeOut(200); }
        // ---------- Prescriptions — Medicine ----------
const freqMap = { 'OD':1,'BD':2,'TDS':3,'QID':4,'HS':1,'SOS':1 };
const freqs = ['OD','BD','TDS','QID','HS','SOS'];

$("#btnAddMed").on("click", function() {
  createMedRow();
});

function createMedRow(data = {}) {
  const tr = $(`
    <tr>
      <td><input list="meds" class="medname" style="width:100%" placeholder="Medicine"></td>
      <td><select class="freq" style="width:100%">${freqs.map(f=>`<option>${f}</option>`).join('')}</select></td>
      <td><input class="small days" style="width:100%" type="text" min="1"></td>
      <td><input class="qty" type="text" style="width:100%"></td>
      <td>
        <select class="timing" style="width:100%">
          <option>After Food</option>
          <option>Before Food</option>
        </select>
      </td>
      <td><button class="btn ghost remove">Remove</button></td>
    </tr>
  `);

  tr.find('.medname').val(data.name || '');
  tr.find('.freq').val(data.frequency || 'OD');
  tr.find('.days').val((data.days ?? 1));
  tr.find('.qty').val(data.quantity || '');
  tr.find('.timing').val(data.timing || 'After Food');

  const freqEl = tr.find('.freq');
  const daysEl = tr.find('.days');
  const qtyEl  = tr.find('.qty');

  function recalc() {
    const f = freqEl.val() || 'OD';
    const d = Number(daysEl.val()) || 1;
    if (!qtyEl.data('manual')) qtyEl.val((freqMap[f] || 1) * d);
  }

  tr.on('click', '.remove', () => tr.remove());
  freqEl.on('change', recalc);
  daysEl.on('input', recalc);
  qtyEl.on('input', () => qtyEl.data('manual', true));

  $("#tbodyMed").append(tr);
  recalc();
}

// ---------- Lab Tests ----------
const categories = ['Blood','Urine','Imaging','Pathology','Cardiology','Other'];
const priority = ['Routine','Urgent','STAT'];

$("#btnAddLab").on("click", function() {
  createLabRow();
});

function createLabRow(data = {}) {
  const tr = $(`
    <tr>
      <td><input list="tests" class="testname" style="width:100%" placeholder="Test"></td>
      <td><select class="category" style="width:100%">${categories.map(c=>`<option>${c}</option>`).join('')}</select></td>
      <td><select class="priority" style="width:100%">${priority.map(p=>`<option>${p}</option>`).join('')}</select></td>
      <td><input class="instructions" style="width:100%" type="text"></td>
      <td><input type="date" class="date" style="width:100%"></td>
      <td><button class="btn ghost remove">Remove</button></td>
    </tr>
  `);

  // Set values safely via jQuery
  tr.find('.testname').val(data.name || '');
  tr.find('.category').val(data.category || 'Blood');
  tr.find('.priority').val(data.priority || 'Routine');
  tr.find('.instructions').val(data.instructions || '');
  tr.find('.date').val(data.date || new Date().toISOString().substring(0,10));

  tr.on("click", ".remove", function() {
    tr.remove();
  });

  $("#tbodyLab").append(tr);
}

// Example seed row
createLabRow({
  name: 'Complete Blood Count (CBC)',
  category: 'Blood',
  priority: 'Routine',
  instructions: 'No fasting needed'
});


// ---------- Referral Doctors ----------
const RDpriority = ['Routine','Urgent','STAT'];
const RDspeciality = ['Emergency medicine','Pediatrics','Cardiology','Family medicine','Pathology','Psychiatry','Dermatology','Gastroenterology','Hematology'];
const RDnames = ['DR.PILLAI C.V.','DR.R VIDYACHAYA','DR.DIVYA PRIYADARSHINI.N','Dr.BALARAMAN R','DR.AKSHAYA KEERTHIKHA'];

$("#btnAddRD").on("click", function() {
  createRDRow();
});

function createRDRow(data = {}) {
  const tr = $(`
    <tr>
      <td><select class="rd-speciality" style="width:100%">${RDspeciality.map(s=>`<option>${s}</option>`).join('')}</select></td>
      <td><select class="rd-doctor" style="width:100%">${RDnames.map(d=>`<option>${d}</option>`).join('')}</select></td>
      <td><select class="rd-priority" style="width:100%">${RDpriority.map(p=>`<option>${p}</option>`).join('')}</select></td>
      <td><input class="instructions" style="width:100%" type="text"></td>
      <td><input type="date" class="date" style="width:100%"></td>
      <td><button class="btn ghost remove">Remove</button></td>
    </tr>
  `);

  // Safely assign values
  tr.find('.rd-speciality').val(data.Specialityy || 'Cardiology');
  tr.find('.rd-doctor').val(data.Dname || 'DR.PILLAI C.V.');
  tr.find('.rd-priority').val(data.priority || 'Routine');
  tr.find('.instructions').val(data.instructions || '');
  tr.find('.date').val(data.date || new Date().toISOString().substring(0,10));

  tr.on("click", ".remove", function() {
    tr.remove();
  });

  $("#tbodyRD").append(tr);
}

// Example default row
createRDRow({
  Specialityy: 'Cardiology',
  Dname: 'DR.PILLAI C.V.',
  priority: 'Urgent',
  instructions: 'Need heart test'
});

$("#today").text(new Date().toLocaleDateString());

// // Summary generator (simulated typing)
  // id('generateSummary') && id('generateSummary').addEventListener('click', ()=>{
  //   const lines = [
  //     "Patient presented with complaints of headache and fever.",
  //     "Vitals were stable. Further investigations advised.",
  //     "Prescribed Paracetamol and advised follow-up in 5 days."
  //   ];
  //   const box = id('summaryBox'), ta = id('summaryTextarea');
  //   box.classList.remove('hidden'); ta.value='';
  //   let i = 0, j = 0;
  //   function typeChar(){
  //     if(i < lines.length){
  //       if(j < lines[i].length){ ta.value += lines[i][j++]; setTimeout(typeChar, 20); }
  //       else { ta.value += "\n"; i++; j=0; setTimeout(typeChar, 120); }
  //     }
  //   }
  //   typeChar();
  // });
  function generateSummary(summaryLines, summaryBoxId, summaryTextareaId) {
  const box = document.getElementById(summaryBoxId);
  const ta = document.getElementById(summaryTextareaId);

  if (!box || !ta) {
    console.error("Invalid element IDs provided.");
    return;
  }

  // Make box visible and clear previous text
  box.classList.remove('hidden');
  ta.value = '';

  let i = 0, j = 0;

  function typeChar() {
    if (i < summaryLines.length) {
      if (j < summaryLines[i].length) {
        ta.value += summaryLines[i][j++];
        setTimeout(typeChar, 20);
      } else {
        ta.value += "\n";
        i++;
        j = 0;
        setTimeout(typeChar, 120);
      }
    }
  }

  typeChar();
}
  document.getElementById('generateSummary').addEventListener('click', () => {
  const lines = [
    "Patient presented with complaints of headache and fever.",
    "Vitals were stable. Further investigations advised.",
    "Prescribed Paracetamol and advised follow-up in 5 days."
  ];
  generateSummary(lines, 'summaryBox', 'summaryTextarea');
});




 let recognition;
  let activeTextBox = null;

  function startRecording(textBoxId) {
    // Stop existing recognition if active
    if (recognition) recognition.stop();

    activeTextBox = document.getElementById(textBoxId);

    if (!('webkitSpeechRecognition' in window)) {
      alert('Sorry, your browser does not support speech recognition.');
      return;
    }

    recognition = new webkitSpeechRecognition();
    recognition.continuous = true; // Keep listening until stopped manually
    recognition.interimResults = true;
    recognition.lang = 'en-IN';

    let finalTranscript = '';

    recognition.onstart = () => {
      console.log(`🎙️ Listening... (${textBoxId})`);
      activeTextBox.placeholder = "Listening... please speak clearly 🎤";
    };

    recognition.onresult = (event) => {
      let interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript + ' ';
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      activeTextBox.value = finalTranscript + interimTranscript;
    };

    recognition.onerror = (event) => {
      console.warn("Speech recognition error:", event.error);

      switch (event.error) {
        case 'no-speech':
          alert("⚠️ No speech detected. Please speak louder or closer to the mic.");
          break;
        case 'audio-capture':
          alert("🎧 No microphone detected. Please connect one.");
          break;
        case 'not-allowed':
          alert("🚫 Microphone permission denied. Allow access to use voice input.");
          break;
        default:
          alert("⚠️ Speech recognition error: " + event.error);
      }
    };

    recognition.onend = () => {
      console.log("🎤 Recording stopped.");
      activeTextBox.placeholder = "";
    };

    recognition.start();
  }

  function stopRecording() {
    if (recognition) {
      recognition.stop();
      console.log("🛑 Recording manually stopped.");
    }
  }

  function clearText(textBoxId) {
    document.getElementById(textBoxId).value = '';
  }
prescriptionModal
function openModal(id) {
  document.getElementById(id).style.display = "block";
  document.body.style.overflow = "hidden";  // disable background scroll
}

function closeModal(id) {
  document.getElementById(id).style.display = "none";
  document.body.style.overflow = "auto";    // re-enable background scroll
}

// Import selected items into Medicine Table
function importSelected() {
  const checkboxes = document.querySelectorAll('.prescriptionItem');
  const medicineTable = document.querySelector('#rxTable tbody');

  checkboxes.forEach(chk => {
    if (chk.checked) {
      const row = chk.parentElement.parentElement;
      const cells = row.querySelectorAll('td');
      const newRow = document.createElement('tr');

      // Copy prescription data into medicine table
      newRow.innerHTML = `
        <td>${cells[1].innerText}</td>
        <td>${cells[2].innerText}</td>
        <td>${cells[3].innerText}</td>
        <td>${cells[4].innerText}</td>
        <td>${cells[5].innerText}</td>
        <td><button onclick="removeRow(this)">Remove</button></td>
      `;

      medicineTable.appendChild(newRow);
      chk.checked = false; // reset checkbox
    }
  });

  closeModal('prescriptionModal');
}

function removeRow(btn) {
  btn.closest('tr').remove();
}

function openPrintPage() {
    const printWindow = window.open("", "_blank");
    
    // If popup blocker stops new tab
    if (!printWindow) {
        alert("Please allow popups to view the print preview.");
    }}

//     function fnCallPrint(obj, place) {
//   try {
//     // Build header HTML (will be added into the printed body)
//     const headerHTML = `
//       <div class="print-header">
//         <div style="display:flex;align-items:center;justify-content:space-between;">
//           <div style="display:flex;align-items:center;">
//             <img src="./logo/drkmh.jpg" alt="KMH" class="print-logo" />
//             <div style="margin-left:10px;font-weight:700;font-size:18px;">
//               Dr.KAMAKSHI MEMORIAL HOSPITAL PVT LTD.
//             </div>
//           </div>
//           <div style="display:flex;gap:10px;align-items:center;">
//             <img src="./images/nabh-log.jpg" alt="NABH" class="print-logo" />
//             <img src="./images/nabllogo.jpg" alt="NABL" class="print-logo" />
//           </div>
//         </div>
//         <hr />
//       </div>
//     `;

//     // Build footer HTML
//     const footerHTML = `
//       <div class="print-footer">
//         <hr />
//         <div style="font-size:12px;text-align:center;">
//           Dr.KAMAKSHI MEMORIAL HOSPITAL PVT LTD. — Address line • Phone: 0000-000000
//         </div>
//       </div>
//     `;

//     // Clone the element to print and replace form controls with their values
//     const $orig = $(`#${place}`);
//     if ($orig.length === 0) {
//       console.error('fnCallPrint: element not found', place);
//       return false;
//     }
//     const $clone =  $(`#${place}`).clone(false);
    

//     // Optionally, if you want to keep some inline styles from the page, you can fetch computed styles.
//     // Prepare HTML for printing
//     const pageBase = location.href.substring(0, location.href.lastIndexOf('/') + 1);
//     const printBody = headerHTML + $clone + footerHTML;

//     // Open print window
//     const WinPrint = window.open('', '_blank', 'width=900,height=700,scrollbars=yes');
//     if (!WinPrint) {
//       alert('Popup blocked. Please allow popups for this site to print.');
//       return false;
//     }

//     // Write full HTML (include base tag so relative image paths resolve correctly)
//     const htmlToPrint = `
//       <!doctype html>
//       <html>
//         <head>
//           <meta charset="utf-8">
//           <base href="">
//           <title></title>
//           <!-- Option 1: include external stylesheet for print -->
//           <link rel="stylesheet" media="print" href="../css/print.css?">
//           <!-- Option 2: fallback inline print styles -->
//           <style>
//             /* header/footer fixed positioning for print */
//             @media print {
//               body { margin: 0.5in; }
//               .print-header { position: fixed; top: 0; left: 0; right: 0; }
//               .print-footer { position: fixed; bottom: 0; left: 0; right: 0; }
//               /* ensure content doesn't overlap header/footer */
//               .print-content { margin-top: 120px; margin-bottom: 60px; }
//               .print-logo { width: 90px; height: auto; vertical-align: middle; }
//               hr{border:0;border-top:1px solid #ccc;margin:8px 0;}
//               /* avoid page overflow issues */
//               img { max-width: 100%; height: auto; }
//               /* avoid weird font sizes */
//               body, div, span, table, th, td { font-family: Arial, sans-serif; font-size: 12px; }
//             }
//             /* on-screen styles if needed */
//             .print-header, .print-footer { display: none; }
//           </style>

//         </head>
//         <body>
//           <div class="print-wrapper">
//             ${printBody.replace('<body', '<div class="print-content"')}
//           </div>
//         </body>
//       </html>
//     `;

//     WinPrint.document.open();
//     WinPrint.document.write(htmlToPrint);
//     WinPrint.document.close();

//     // Wait for images to load in the print window before calling print()
//     const imgElements = WinPrint.document.images;
//     let imagesToLoad = imgElements.length;

//     if (imagesToLoad === 0) {
//       // nothing to wait for
//       WinPrint.focus();
//       WinPrint.print();
//       WinPrint.close();
//     } else {
//       // set up listeners
//       let loadedCount = 0;
//       for (let i = 0; i < imgElements.length; i++) {
//         const img = imgElements[i];
//         // if already complete, count it
//         if (img.complete) {
//           loadedCount++;
//         } else {
//           img.addEventListener('load', () => {
//             loadedCount++;
//             if (loadedCount === imagesToLoad) {
//               WinPrint.focus();
//               WinPrint.print();
//               WinPrint.close();
//             }
//           });
//           img.addEventListener('error', () => {
//             // treat error as loaded so it won't block forever
//             loadedCount++;
//             if (loadedCount === imagesToLoad) {
//               WinPrint.focus();
//               WinPrint.print();
//               WinPrint.close();
//             }
//           });
//         }
//       }
//       // if all were already complete
//       if (loadedCount === imagesToLoad) {
//         WinPrint.focus();
//         WinPrint.print();
//         WinPrint.close();
//       }
//       // safety fallback in case some image events never fire
//       setTimeout(() => {
//         if (!WinPrint.closed) {
//           WinPrint.focus();
//           WinPrint.print();
//           WinPrint.close();
//         }
//       }, 4000);
//     }
//   } catch (derr) {
//     console.error('fnCallPrint', derr);
//   }
//   return false;
// }/**

//  function fnCallPrint(obj,placeId,withheader) {
//   try {
//     // const includeHeaderFooter = document.getElementById('chkIncludeHeaderFooter')?.checked ?? true;
//     const container = document.getElementById(placeId);
//     if (!container) { console.error('Print element not found:', placeId); return false; }

//     // Header HTML (logos on left and right)
//     const headerHTML = `
//        <div class="print-header">
//          <div style="display:flex;align-items:center;justify-content:space-between;width:100%">
//           <div style="display:flex;align-items:center;width:70%">
//              <img src="./images/KMH_LOGO.webp" alt="KMH" class="print-logo" height: 100px; />
//              <div style="margin-left:10px;font-weight:200;font-size:16px;">
//                Dr.KAMAKSHI MEMORIAL HOSPITAL PVT LTD.</n>
//                Palikaranai, chennai, 600 100.
//              </div>
//           </div>
//            <div style="display:flex;gap:10px;align-items:center;width:30%">
//              <img src="./images/nabh-log.jpg" alt="NABH" class="print-logo"height: 100px; />
//              <img src="./images/nabllogo.jpg" alt="NABL" class="print-logo"height: 100px; />
//           </div>
//         </div>
//         <hr />
//       </div>
//     `;

//     // Footer HTML (hospital name centered)
//     const footerHTML = `
//       <div class="print-footer-inner" role="contentinfo">
// <div class="footerr">
//     <b>Dr.KAMAKSHI MEMORIAL HOSPITAL PVT LTD.,</b><br>    
//     No.1, Radial Road, Pallikaranai,Chennai – 600 100, Tamil Nadu, India<br>
//     Phone:+91 - 44 - 66 300 300 | 71 200 200 | Email: info@drkmh.in<br>
//     Whatsapp: +91 99627 25555<br>
//     Website: www.drkmh.in
// </div>      </div>
//     `;

//     // Clone the element and convert inputs to text so printed content matches
//     const clone = container.cloneNode(true);

//  var contentHTML=''
//     // Prepare final body content
//     if(withheader==1){
//       contentHTML=`
// <div class="print-header">
//   ${headerHTML}
// </div>

// <div class="print-footer">
//   ${footerHTML}
// </div>

// <div class="print-content">
//   ${clone.innerHTML}
// </div>
//     `;
//     }
//     else{
//      contentHTML= `
//       <div class="print-header">
// </div>

// <div class="print-footer">
//   ${footerHTML}
// </div>

// <div class="print-content">
//   ${clone.innerHTML}
// </div>
//     `;
//     }

//     // Ensure relative image paths resolve by using base href of current location
//     const pageBase = location.href.substring(0, location.href.lastIndexOf('/') + 1);

//     // Open print window
//     const printWindow = window.open('', '_blank', 'width=900,height=700,scrollbars=yes');
//     if (!printWindow) {
//       alert('Popup blocked. Allow popups for this site to print.');
//       return false;
//     }

//     // Build HTML for print window
//     const html = `
//       <!doctype html>
//       <html>
//         <head>
//           <meta charset="utf-8">
//           <base href="${pageBase}">
//           <title>Print Preview</title>
//           <style>
//             /* ---- Print styles ---- */
//             @media print {
//               body {  font-family: Arial, sans-serif; color: #000; }
//               .print-header-inner { position: fixed; top: 0; left: 0; right:0; background: white; padding: 6px 0; }
//               .print-footer-inner { position: fixed; bottom: 0; left: 0; right:0; background: white; padding: 6px 0; }
             
//               .print-logo { width: 90px; height: auto; vertical-align: middle; }
//               hr { border: 0; border-top: 1px solid #ccc; margin: 6px 0; }
//               .footer-text { text-align:center; font-size:13px; }
//               /* make sure images scale on page */
//               img { max-width: 100%; height: auto; }
//               /* avoid browser headers overlapping (not controllable) */
            

//             }

//             /* On-screen preview styles (optional) */
//             .print-header-inner, .print-footer-inner { display: block; color: #000; }
//             .print-content { color: #000; }
//       @page {
//   size: A4;
//   margin: 12mm;
// }

// body {
//   font-family: Arial, sans-serif;
//   margin: 0;
//   padding: 0;
// }

// /* ===========================
//    FIXED HEADER (EVERY PAGE)
// =========================== */
// .print-header {
//   position: fixed;
//   top: 0;
//   left: 0;
//   right: 0;
//   padding: 5px 0 5px 0;
//   background: white;
//   text-align: left;
//   z-index: 1000;
// }

// /* ===========================
//    FIXED FOOTER (EVERY PAGE)
// =========================== */
// .print-footer {
//   position: fixed;
//   bottom: 0;
//   left: 0;
//   right: 0;
//   padding: 5px 0 5px 0;
//   background: white;
//   text-align: center;
//   font-size: 14px;
//   z-index: 1000;
// }

// /* ===========================
//    CONTENT (SAFE AREA)
// =========================== */
// .print-content {
//   margin-top: 140px;   /* room for header */
//   margin-bottom: 140px; /* room for footer */
//   z-index: 1;
// }

// /* Avoid table row splitting */
// table { page-break-inside: auto; width: 100%; border-collapse: collapse; }
// tr { page-break-inside: avoid; }
//           </style>
//         </head>
//         <body>
//           ${contentHTML}
//         </body>
//       </html>
//     `;

//     // Write and close document
//     printWindow.document.open();
//     printWindow.document.write(html);
//     printWindow.document.close();

//     // Wait for images to load in the printWindow before calling print()
//     const imgs = printWindow.document.images;
//     let total = imgs.length;
//     if (total === 0) {
//       printWindow.focus();
//       printWindow.print();
//       printWindow.close();
//       return true;
//     }

//     let loaded = 0;
//     const finishIfDone = () => {
//       if (loaded >= total) {
//         printWindow.focus();
//         // Give a tiny delay to ensure layout stabilizes
//         setTimeout(() => {
//           printWindow.print();
//           printWindow.close();
//         }, 150);
//       }
//     };

//     for (let i = 0; i < imgs.length; i++) {
//       const im = imgs[i];
//       if (im.complete) {
//         loaded++;
//         finishIfDone();
//       } else {
//         im.addEventListener('load', () => { loaded++; finishIfDone(); });
//         im.addEventListener('error', () => { loaded++; finishIfDone(); });
//       }
//     }

//     // Safety fallback in case load events never fire
//     setTimeout(() => {
//       if (!printWindow.closed) {
//         printWindow.focus();
//         printWindow.print();
//         printWindow.close();
//       }
//     }, 5000);

//     return true;
//   } catch (err) {
//     console.error('fnCallPrint error:', err);
//     return false;
//   }
// }
function fnCallPrint(obj, placeId) {
    try {
        const container = document.getElementById(placeId);
        if (!container) return;

        const printWin = window.open("", "_blank", "width=900,height=700");

        printWin.document.open();
        printWin.document.write(`
        <html>
        <head>
            <style>

                @page { size: A4; margin: 0; }
                body { margin: 0; font-family: Arial; }
          
                .bodyprint {
                    font-family: Arial, Helvetica, sans-serif;
                    color: #000;
                    background: #fff;
                    margin: 0;
                    padding: 2mm;
                }

                .title { font-size: 22px; font-weight: bold; }
                .sub-title { font-size: 14px; margin-top: -6px; }

                .section-title {
                    margin-top: 10px;
                    font-size: 18px;
                    font-weight: bold;
                    border-bottom: 1px solid #000;
                    padding-bottom: 4px;
                }

                .info-row {
                    display: flex;
                    justify-content: space-between;
                    margin: 6px 0;
                    font-size: 14px;
                }
                .info-row div { width: 32%; }

                .textareaprint {
                    width: 98%;
                    border-radius: 5px;
                    padding: 8px;
                    margin-top: 5px;
                    font-size: 14px;
                    resize: none;
                    border: none;
                }

                .tableprint {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 10px;
                    font-size: 14px;
                }

                .tableprint th, .tableprint td {
                    border: 1px solid #000;
                    padding: 6px;
                    text-align: left;
                }

                .footerr {
                    margin-top: 25px;
                    border-top: 2px solid #000;
                    padding-top: 10px;
                    font-size: 13px;
                    text-align: center;
                    line-height: 18px;
                }

                .footer-sign {
                    margin-top: 15px;
                    font-size: 15px;
                    font-weight: bold;
                }


                .page {
                    display: grid;
                    grid-template-rows: 10% 80% 10%;
                    height: 100vh;
                    page-break-after: always;
                }

                .header {
                    padding: 10px;
                }

                .content {
                    padding: 20px;
                    overflow: hidden;

                    /* 4-side border */
                    // border: 5px solid black;

                    /* Prevent first page being empty */
                    min-height: 30px;
                }

                .footer {
                    padding: 10px;
                    text-align: center;
                    font-size: 13px;
                }

                tr { page-break-inside: avoid; }
                textarea { border: none; }

            </style>
        </head>

        <body>
            <div id="printRoot"></div>
        </body>
        </html>
        `);

        printWin.document.close();

        printWin.onload = function () {
            const doc = printWin.document;
            const printRoot = doc.getElementById("printRoot");

            doc.body.offsetHeight;
            const blocks = Array.from(container.querySelector(".bodyprint").children);

            let currentPage = createPage();
            let contentBox = currentPage.querySelector(".content");

            blocks.forEach(block => {

                const clone = block.cloneNode(true);
                contentBox.appendChild(clone);

                if (contentBox.scrollHeight > contentBox.clientHeight) {

                    contentBox.removeChild(contentBox.lastElementChild);

                    currentPage = createPage();
                    contentBox = currentPage.querySelector(".content");

                    contentBox.appendChild(block.cloneNode(true));
                }
            });

            function createPage() {
                const page = doc.createElement("div");
                page.className = "page";

                page.innerHTML = `
                    <div class="header">
                        <div style="display:flex;justify-content:space-between;align-items:center;">
                            <div style="display:flex;align-items:center;">
                                <img src="./images/KMH_LOGO.webp" style="width:90px;">
                                <div style="margin-left:10px;font-size:17px;font-weight:bold;">
                                    Dr.KAMAKSHI MEMORIAL HOSPITAL PVT LTD.<br>
                                    Pallikaranai, Chennai – 600 100.
                                </div>
                            </div>
                            <div style="display:flex;gap:10px;align-items:center;">
                                <img src="./images/nabh-log.jpg" style="width:55px;">
                                <img src="./images/nabllogo.jpg" style="width:55px;">
                            </div>
                        </div>
                        <hr>
                    </div>

                    <div class="content"></div>

                    <div class="footer" style=" border-top: 1px sold grey ! important; ">
                        <b>Dr.KAMAKSHI MEMORIAL HOSPITAL PVT LTD.</b><br>
                        No.1, Radial Road, Pallikaranai, Chennai – 600 100<br>
                        Phone:+91 - 44 - 66 300 300 | Email: info@drkmh.in<br>
                        Website: www.drkmh.in
                    </div>
                `;

                printRoot.appendChild(page);
                return page;
            }

            setTimeout(() => {
                printWin.print();
                printWin.close();
            }, 400);
        };

    } catch (err) {
        console.error(err);
    }
}

