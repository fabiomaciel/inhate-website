(function () {
  var MONTHS = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
  var WEEKDAYS = ['Dom','Seg','Ter','Qua','Qui','Sex','Sab'];

  function parseDate(str) {
    var parts = str.split('-');
    return new Date(+parts[0], +parts[1] - 1, +parts[2]);
  }

  function isPast(dateStr) {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    return parseDate(dateStr) < today;
  }

  function renderShow(show) {
    var d = parseDate(show.date);
    var day = String(d.getDate()).padStart(2, '0');
    var month = MONTHS[d.getMonth()];
    var weekday = WEEKDAYS[d.getDay()];
    var past = isPast(show.date);
    var effectiveStatus = past ? 'realizado' : show.status;

    var action;
    if (effectiveStatus === 'realizado') {
      action = '<span class="date__status realizado">● Já Realizado</span>';
    } else if (effectiveStatus === 'sold') {
      action = '<span class="date__status sold">● Esgotado</span>';
    } else if (show.ticketUrl) {
      action = '<a class="date__cta" href="' + show.ticketUrl + '" target="_blank">Ingressos</a>';
    } else if(show.free) {
      action = '<span class="date__status free">Entrada Gratuita</span>';
    }else {
      action = '<span class="date__status open">Ingressos Abertos</span>';
    }

    return [
      '<div class="date' + (past ? ' date--past' : '') + '">',
      '  <div>',
      '    <div class="date__day">' + day + '</div>',
      '    <div class="date__month">' + month + ' · ' + weekday + '</div>',
      '  </div>',
      '  <div>',
      '    <div class="date__venue">' + show.venue + '</div>',
      '    <div class="date__city">' + show.city + '</div>',
      '  </div>',
      '  <div class="date__tags"><span class="tag">' + show.time + '</span></div>',
      '  ' + action,
      '</div>'
    ].join('\n');
  }

  function render() {
    var container = document.querySelector('.dates__list');
    if (!container) return;
    container.innerHTML = SHOWS.map(renderShow).join('\n');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();
