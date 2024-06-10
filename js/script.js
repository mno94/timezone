function updateTimeAndStatus() {
    const now = new Date();

    // Time zones with their respective difference from UTC
    const timeZones = {
        "argentina": { timeZone: "America/Argentina/Buenos_Aires", elementId: "argentina" },
        "brasil": { timeZone: "America/Sao_Paulo", elementId: "brasil" },
        "estados-unidos": { timeZone: "America/New_York", elementId: "estados-unidos" },
        "mexico": { timeZone: "America/Mexico_City", elementId: "mexico" }
    };

    // Function to get the local time based on the time zone
    function getLocalTime(timeZone) {
        return new Intl.DateTimeFormat('es-AR', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZone: timeZone
        }).format(now);
    }

    // Function to calculate the time difference with Argentina
    function getDifferenceWithArgentina(timeZone) {
        const argentinaTime = new Date(now.toLocaleString('en-US', { timeZone: "America/Argentina/Buenos_Aires" }));
        const localTime = new Date(now.toLocaleString('en-US', { timeZone: timeZone }));

        const differenceInMilliseconds = localTime - argentinaTime;
        const differenceInHours = differenceInMilliseconds / (1000 * 60 * 60);

        return (differenceInHours > 0 ? '+' : '') + Math.round(differenceInHours) + ' horas';
    }

    // Function to determine if it's within office hours
    function isOfficeHours(timeZone) {
        const localTime = new Date(now.toLocaleString('en-US', { timeZone: timeZone }));
        const localHours = localTime.getHours();
        const localDay = localTime.getDay();
        const isWeekday = localDay >= 1 && localDay <= 5; // Monday to Friday
        return isWeekday && localHours >= 9 && localHours < 17;
    }

    // Function to update the information on the interface
    function updateTimeZoneInfo(timeZone) {
        const zone = timeZone.timeZone;
        const elementId = timeZone.elementId;

        const localTime = getLocalTime(zone);
        const difference = getDifferenceWithArgentina(zone);
        const status = isOfficeHours(zone) ? 'Okay to call' : 'Not okay to call';
        const statusClass = isOfficeHours(zone) ? 'status okay' : 'status not-okay';

        document.getElementById(`time-${elementId}`).textContent = `Hora: ${localTime}`;
        document.getElementById(`status-${elementId}`).textContent = status;
        document.getElementById(`status-${elementId}`).className = statusClass;
        document.getElementById(`difference-${elementId}`).textContent = `Diferencia con Argentina: ${difference}`;
    }

    // Update information for each time zone
    for (const zone in timeZones) {
        updateTimeZoneInfo(timeZones[zone]);
    }
}

// Execute every second
setInterval(updateTimeAndStatus, 1000);
updateTimeAndStatus();
