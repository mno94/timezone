// script.js
function updateTimeAndStatus() {
    const now = new Date();
    const argentinaOffset = -3 * 3600 * 1000; // Argentina (UTC-3)
    const argentinaTime = new Date(now.getTime() + argentinaOffset);

    function getTime(offset) {
        const localTime = new Date(now.getTime() + offset * 3600 * 1000);
        return localTime.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    }

    function getDifference(offset) {
        const difference = offset + 3; // Argentina is UTC-3
        return (difference >= 0 ? '+' : '') + difference + ' horas';
    }

    function isOfficeHours(offset) {
        const localTime = new Date(now.getTime() + offset * 3600 * 1000);
        const localHours = localTime.getHours();
        const localDay = localTime.getDay();
        const isWeekday = localDay >= 1 && localDay <= 5; // Lunes a viernes
        return isWeekday && localHours >= 9 && localHours < 17;
    }

    const brasilOffset = -3;  // Brasil - Brasilia (UTC-3)
    const usOffset = -4;  // Estados Unidos - Nueva York (UTC-4)
    const mexicoOffset = -6;  // México - CDMX (UTC-6)

    // Brasil
    document.getElementById('time-brasil').textContent = 'Hora: ' + getTime(brasilOffset);
    document.getElementById('status-brasil').textContent = isOfficeHours(brasilOffset) ? 'Okay to call' : 'Not okay to call';
    document.getElementById('status-brasil').className = isOfficeHours(brasilOffset) ? 'status okay' : 'status not-okay';
    document.getElementById('difference-brasil').textContent = 'Diferencia con Argentina: ' + getDifference(brasilOffset);

    // Estados Unidos
    document.getElementById('time-estados-unidos').textContent = 'Hora: ' + getTime(usOffset);
    document.getElementById('status-estados-unidos').textContent = isOfficeHours(usOffset) ? 'Okay to call' : 'Not okay to call';
    document.getElementById('status-estados-unidos').className = isOfficeHours(usOffset) ? 'status okay' : 'status not-okay';
    document.getElementById('difference-estados-unidos').textContent = 'Diferencia con Argentina: ' + getDifference(usOffset);

    // México
    document.getElementById('time-mexico').textContent = 'Hora: ' + getTime(mexicoOffset);
    document.getElementById('status-mexico').textContent = isOfficeHours(mexicoOffset) ? 'Okay to call' : 'Not okay to call';
    document.getElementById('status-mexico').className = isOfficeHours(mexicoOffset) ? 'status okay' : 'status not-okay';
    document.getElementById('difference-mexico').textContent = 'Diferencia con Argentina: ' + getDifference(mexicoOffset);

    // Argentina
    document.getElementById('time-argentina').textContent = 'Hora: ' + argentinaTime.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    document.getElementById('status-argentina').textContent = isOfficeHours(0) ? 'Okay to call' : 'Not okay to call';
    document.getElementById('status-argentina').className = isOfficeHours(0) ? 'status okay' : 'status not-okay';
    document.getElementById('difference-argentina').textContent = 'Diferencia con Argentina: 0 horas';
}

setInterval(updateTimeAndStatus, 1000);
updateTimeAndStatus();
