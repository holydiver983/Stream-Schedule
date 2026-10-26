const BASE_TIMEZONE = "Australia/Sydney"; //change this to your desired base timezone

const scheduleData = [
  {
    day: "Monday", 
    title: "No streams on Monday from here on until I need to o7 ", //Change the title of the stream here, this is what will be displayed on the schedule
    game: " MAYBE NIGHTREIGN COZ FUCK YOU JSTN ", //Change the game being played here, this is what will be displayed on the schedule
    start: null , //Change the start time of the stream here, this is what will be displayed on the schedule in the format of HH:MM (24-hour format), if you don't want to display a start time, set this to null.
    end: null , //Change the end time of the stream here, this is what will be displayed on the schedule in the format of HH:MM (24-hour format), if you don't want to display an end time, set this to null.
    status: "offline" //Change the status of the stream here, this is what will be displayed on the schedule. Options are: "live"(red), "heat"(blue), "offline"
  },
  {
    day: "Tuesday",
    title: "STARTING SPOOKEM WEEK GAMES LETS GO!",
    game: "REANIMAL then maybe games with friendos COZ FUCK YOU JSTN ",
    start: "21:00",
    end: "00:30",
    status: "heat"
  },
  {
    day: "Wednesday",
    title: "Reanimal",
    game: "REANIMAL then maybe games with friendos COZ FUCK YOU JSTN ",
    start: "21:00",
    end: "01:00",
    status: "heat"
  },
  {
    day: "Thursday",
    title: "Phantom Donnie Yen Blade Zero",
    game: "Phantom Blade Zero also then maybe games with friendos COZ FUCK YOU JSTN ",
    start: "20:30",
    end: "01:00",
    status: "live"
  },
  {
    day: "Friday",
    title: "Triple Threat Maybe? Tekken PB0 and Reanimal? maybe something after? ",
    game: "Tekken 8 Ranked then maybe games with friendos COZ FUCK YOU JSTN  ",
    start: "21:00",
    end: "00:30",
    status: "live"
  },
  {
    day: "Saturday",
    title: "Spookems so we shall see.",
    game: "Whatevs on the day with friendos COZ FUCK YOU JSTN ",
    start: "21:00" ,
    end: "00:30",
    status: "live"
  },
  {
    day: "Sunday",
    title: "Just whatever?",
    game: " Something then maybe games with friendos COZ FUCK YOU JSTN ",
    start: "21:00" ,
    end: "00:30" ,
    status: "live"
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
