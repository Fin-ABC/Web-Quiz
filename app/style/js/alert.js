// Alert & Notification
function showAlertSuccess(message) {
  showAlert(
    "bg-green-200 text-green-800",
    `<svg viewBox="0 0 24 24" class="text-green-600 w-5 h-5 sm:w-5 sm:h-5 mr-3"><path fill="currentColor" d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"></path></svg>`,
    message,
  );
}

function showAlertError(message) {
  showAlert(
    "bg-red-200 text-red-800",
    `<svg viewBox="0 0 24 24" class="text-red-600 w-5 h-5 sm:w-5 sm:h-5 mr-3"><path fill="currentColor" d="M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z"></path></svg>`,
    message,
  );
}

function showAlertWarning(message) {
  showAlert(
    "bg-orange-200 text-yellow-800",
    `<svg viewBox="0 0 24 24" class="text-yellow-600 w-5 h-5 sm:w-5 sm:h-5 mr-3"><path fill="currentColor" d="M23.119,20,13.772,2.15h0a2,2,0,0,0-3.543,0L.881,20a2,2,0,0,0,1.772,2.928H21.347A2,2,0,0,0,23.119,20ZM11,8.423a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Zm1.05,11.51h-.028a1.528,1.528,0,0,1-1.522-1.47,1.476,1.476,0,0,1,1.448-1.53h.028A1.527,1.527,0,0,1,13.5,18.4,1.475,1.475,0,0,1,12.05,19.933Z"></path></svg>`,
    message,
  );
}

function showAlertInfo(message) {
  showAlert(
    "bg-blue-200 text-blue-800",
    `<svg viewBox="0 0 24 24" class="text-blue-600 w-5 h-5 sm:w-5 sm:h-5 mr-3"><path fill="currentColor" d="M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm.25,5a1.5,1.5,0,1,1-1.5,1.5A1.5,1.5,0,0,1,12.25,5ZM14.5,18.5h-4a1,1,0,0,1,0-2h.75a.25.25,0,0,0,.25-.25v-4.5a.25.25,0,0,0-.25-.25H10.5a1,1,0,0,1,0-2h1a2,2,0,0,1,2,2v4.75a.25.25,0,0,0,.25.25h.75a1,1,0,1,1,0,2Z"></path></svg>`,
    message,
  );
}

// Fungsi helper untuk menampilkan alert
function showAlert(bgClass, iconSvg, message) {
  // Hapus alert lama jika ada
  const oldAlert = document.getElementById("custom-alert");
  if (oldAlert) oldAlert.remove();

  // Buat elemen alert
  const alertDiv = document.createElement("div");
  alertDiv.id = "custom-alert";
  alertDiv.className = `fixed left-1/2 top-8 z-50 px-2 w-full max-w-lg -translate-x-1/2 animate-fadeIn ${bgClass}`;
  alertDiv.innerHTML = `
    <div class="px-6 py-4 rounded-md text-lg flex items-center shadow-lg">
      ${iconSvg}
      <span class="flex-1">${message}</span>
      <button onclick="document.getElementById('custom-alert').remove()" class="ml-4 text-xl font-bold text-gray-500 hover:text-gray-700 focus:outline-none">&times;</button>
    </div>
  `;

  document.body.appendChild(alertDiv);

  setTimeout(() => {
    if (alertDiv) alertDiv.classList.add("animate-fadeOut");
    setTimeout(() => {
      if (alertDiv) alertDiv.remove();
    }, 500);
  }, 30000);
}

const style = document.createElement("style");
style.innerHTML = `
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-20px);}
  to { opacity: 1; transform: translateY(0);}
}
@keyframes fadeOut {
  from { opacity: 1; transform: translateY(0);}
  to { opacity: 0; transform: translateY(-20px);}
}
.animate-fadeIn { animation: fadeIn 0.4s ease;}
.animate-fadeOut { animation: fadeOut 0.5s ease;}
`;
document.head.appendChild(style);
// Alert & Notification End
