const datesContainer = document.getElementById("dates-container");
const addDateBtn = document.getElementById("add-date-btn");
const submitBtn = document.getElementById("submit-btn");
let dateCount = 0;

function createDatePicker() {
  const dateItem = document.createElement("div");
  dateItem.className = "date-item";

  const datePicker = document.createElement("input");
  datePicker.type = "date";
  datePicker.name = `date-${dateCount}`;
  datePicker.required = true;
  const today = new Date().toISOString().split("T")[0];
  datePicker.min = today;

  const startTimePicker = document.createElement("input");
  startTimePicker.type = "time";
  startTimePicker.name = `start-time-${dateCount}`;
  startTimePicker.required = true;
  startTimePicker.min = "09:00";
  startTimePicker.max = "19:00";
  startTimePicker.value = "09:00";

  const endTimePicker = document.createElement("input");
  endTimePicker.type = "time";
  endTimePicker.name = `end-time-${dateCount}`;
  endTimePicker.required = true;
  endTimePicker.min = "09:00";
  endTimePicker.max = "19:00";
  endTimePicker.value = "19:00";

  const locationSelect = document.createElement("select");
  locationSelect.name = `location-${dateCount}`;
  locationSelect.required = true;

  const locations = ["Miejsce A", "Miejsce B", "Miejsce C"];
  locations.forEach((location) => {
    const option = document.createElement("option");
    option.value = location;
    option.text = location;
    locationSelect.appendChild(option);
  });

  const startTimeValiditySpan = document.createElement("span");
  startTimeValiditySpan.className = "validity";

  const endTimeValiditySpan = document.createElement("span");
  endTimeValiditySpan.className = "validity";

  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Usuń";
  deleteBtn.style.backgroundColor = "red";
  deleteBtn.style.color = "white";
  deleteBtn.style.width = "15%";
  deleteBtn.addEventListener("click", () => {
    dateItem.remove();
    dateCount--;
    updateSubmitButtonState();
    updateAddDateButtonState();
  });

  startTimePicker.addEventListener("input", () => {
    endTimePicker.min = startTimePicker.value;
  });

  dateItem.appendChild(datePicker);
  dateItem.appendChild(startTimePicker);
  dateItem.appendChild(startTimeValiditySpan);
  dateItem.appendChild(endTimePicker);
  dateItem.appendChild(endTimeValiditySpan);
  dateItem.appendChild(locationSelect);
  dateItem.appendChild(deleteBtn);
  datesContainer.appendChild(dateItem);
  dateCount++;
  updateSubmitButtonState();
  updateAddDateButtonState();
  datePicker.style.marginRight = "10px"; // Adjust the right margin for the date picker
  locationSelect.style.marginRight = "10px";

  datePicker.style.marginLeft = "10px"; // Adjust the right margin for the date picker
  startTimePicker.style.marginLeft = "10px"; // Adjust the right margin for the start time picker
  endTimePicker.style.marginLeft = "10px"; // Adjust the right margin for the end time picker
  locationSelect.style.marginLeft = "10px";
  deleteBtn.style.marginLeft = "20px";
}

function updateAddDateButtonState() {
  const dateItems = document.querySelectorAll(".date-item");
  if (dateItems.length >= 5) {
    addDateBtn.disabled = true;
  } else {
    addDateBtn.disabled = false;
  }
}

function updateSubmitButtonState() {
  const invalidInputs = document.querySelectorAll(
    "input:invalid, select:invalid"
  );
  submitBtn.disabled = invalidInputs.length > 0;
}

addDateBtn.addEventListener("click", () => {
  const dateItems = document.querySelectorAll(".date-item");
  if (dateItems.length < 5) {
    createDatePicker();
  } else {
    alert("You can only add up to 5 dates.");
  }
});

datesContainer.addEventListener("input", () => {
  updateSubmitButtonState();
});

submitBtn.addEventListener("click", () => {
  const dates = [];
  const dateItems = document.querySelectorAll(".date-item");
  dateItems.forEach((dateItem) => {
    const datePicker = dateItem.querySelector("input[type='date']").value;
    const startTimePicker = dateItem.querySelector(
      "input[name^='start-time']"
    ).value;
    const endTimePicker = dateItem.querySelector(
      "input[name^='end-time']"
    ).value;
    const locationSelect = dateItem.querySelector(
      "select[name^='location']"
    ).value;
    dates.push({
      date: datePicker,
      startTime: startTimePicker,
      endTime: endTimePicker,
      location: locationSelect,
    });
  });

  console.log(dates); // You can send this data to your server or perform further actions
});
