const BASE_TIMEZONE = "Australia/Sydney"; //change this to your desired base timezone

const scheduleData = [
  {
    day: "Monday", 
    title: "Ranked Grind: Mishima Only", //Change the title of the stream here, this is what will be displayed on the schedule
    game: "Tekken 8", //Change the game being played here, this is what will be displayed on the schedule
    start: "20:00", //Change the start time of the stream here, this is what will be displayed on the schedule in the format of HH:MM (24-hour format), if you don't want to display a start time, set this to null.
    end: "22:00", //Change the end time of the stream here, this is what will be displayed on the schedule in the format of HH:MM (24-hour format), if you don't want to display an end time, set this to null.
    status: "live" //Change the status of the stream here, this is what will be displayed on the schedule. Options are: "live"(red), "heat"(blue), "offline"
  },
  {
    day: "Tuesday",
    title: "Yahkooza Tuesday",
    game: "Yakuza Kiwami 3",
    start: "20:00",
    end: "00:30",
    status: "heat"
  },
  {
    day: "Wednesday",
    title: "Onimusha then Crimson Moon Lessgo!",
    game: "Onimusha then Crimson Moon",
    start: "20:00",
    end: "00:30",
    status: "heat"
  },
  {
    day: "Thursday",
    title: "Yahkooza Thursday",
    game: "Yakuza Kiwami 3",
    start: "20:00",
    end: "00:30",
    status: "live"
  },
  {
    day: "Friday",
    title: "Roger Jr Legacy LESGO! Then some T8 ranked ",
    game: "Tekken 2 then Tekken 8",
    start: "21:00",
    end: "00:30",
    status: "heat"
  },
  {
    day: "Saturday",
    title: "Break / Busy",
    game: "",
    start: null ,
    end: null ,
    status: "offline"
  },
  {
    day: "Sunday",
    title: "Break / Busy",
    game: "Variety",
    start: null ,
    end: null ,
    status: "offline"
  }
];


// DO NOT TOUCH BELOW THIS LINE UNLESS YOU KNOW WHAT YOU'RE DOING


function getUtcOffset(timeZone, date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    timeZoneName: "longOffset"
  }).formatToParts(date);

  const raw = parts.find(p => p.type === "timeZoneName")?.value || "GMT+00:00";
  return raw.replace("GMT", "") || "+00:00";
}

function convertBroadcastTimeToLocal(timeStr) {
  if (!timeStr) return null;

  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");

  const offset = getUtcOffset(BASE_TIMEZONE, now);
  const utcInstant = new Date(`${y}-${m}-${d}T${timeStr}:00${offset}`);

  const localTimeStr = new Intl.DateTimeFormat(navigator.language || "en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  }).format(utcInstant);

  const tzName = new Intl.DateTimeFormat(navigator.language || "en-US", {
    timeZoneName: "short"
  }).formatToParts(utcInstant).find(p => p.type === "timeZoneName")?.value || "";

  return { time: localTimeStr, tz: tzName };
}

function formatLocalTimeRange(startStr, endStr) {
  if (!startStr || !endStr) return "--:--";

  const startObj = convertBroadcastTimeToLocal(startStr);
  const endObj = convertBroadcastTimeToLocal(endStr);

  return `${startObj.time} – ${endObj.time} ${startObj.tz}`.trim();
}

const container = document.getElementById('scheduleContainer');

if (container) {
  container.innerHTML = scheduleData.map(item => {
    const displayTime = formatLocalTimeRange(item.start, item.end);

    return `
      <div class="day-row ${item.status}">
        <div class="day-label">${item.day}</div>
        <div class="stream-details">
          <span class="stream-title">${item.title}</span>
          <span class="stream-game">${item.game}</span>
        </div>
        <div class="time-slot">${displayTime}</div>
      </div>
    `;
  }).join('');
}
