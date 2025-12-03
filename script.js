
$(document).ready(function () {

    
  const loginView = $("#loginView"),
        patientsView = $("#patientsView"),
        assessmentView = $("#assessmentView"),
        topHeader = $("#topHeader"),
        headerUsername = $("#headerUsername");

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
      if ($("#POC").val() === "") alertarr.push("Enter Plan Of Cate");
      if ($("#PhysicialActivity").val() === "") alertarr.push("Enter Physicial Activity");
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
                        WhatsApp:+91 99627 25555<br>
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

