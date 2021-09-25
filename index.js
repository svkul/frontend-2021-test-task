var pandemicForecast = (function() {
  const result = document.querySelector('[data-result]');
  const input = document.querySelector('[data-input-map]');
  const btn = document.querySelector('[data-run-forecast]');

  if(input && btn) {
    btn.addEventListener('click', paintResult.bind(null, input));
  }

  function getPandemicForecast(pandemicMap) {
    let total = 0;
    let infected = 0;

    const mapAfter = pandemicMap.split('X').map(el => {
      if(el.length) {
        total += el.length;

        if(el.indexOf('1') >= 0 ) {
          infected += el.length;

          return el.replace(/0/g, '1');
        }
      }
      return el;
    }).join('X');

    return {
      total,
      infected,
      percentage: infected * 100 / total,
      mapBefore: pandemicMap,
      mapAfter,
    }
  }

  function getWordMap(worldMap) {
    const elItem = {
      'X': "<span class='cube ocean'><svg style='width:24px;height:24px' viewBox='0 0 24 24'><path fill='currentColor' d='M20,12H22V14H20C18.62,14 17.26,13.65 16,13C13.5,14.3 10.5,14.3 8,13C6.74,13.65 5.37,14 4,14H2V12H4C5.39,12 6.78,11.53 8,10.67C10.44,12.38 13.56,12.38 16,10.67C17.22,11.53 18.61,12 20,12M20,6H22V8H20C18.62,8 17.26,7.65 16,7C13.5,8.3 10.5,8.3 8,7C6.74,7.65 5.37,8 4,8H2V6H4C5.39,6 6.78,5.53 8,4.67C10.44,6.38 13.56,6.38 16,4.67C17.22,5.53 18.61,6 20,6M20,18H22V20H20C18.62,20 17.26,19.65 16,19C13.5,20.3 10.5,20.3 8,19C6.74,19.65 5.37,20 4,20H2V18H4C5.39,18 6.78,17.53 8,16.67C10.44,18.38 13.56,18.38 16,16.67C17.22,17.53 18.61,18 20,18Z'/></svg></span>",
      '1': "<span class='cube infected'><svg style='width:24px;height:24px' viewBox='0 0 24 24'><path fill='currentColor' d='M10 4A4 4 0 0 1 14 8A4 4 0 0 1 10 12A4 4 0 0 1 6 8A4 4 0 0 1 10 4M10 14C14.42 14 18 15.79 18 18V20H2V18C2 15.79 5.58 14 10 14M20 12V7H22V13H20M20 17V15H22V17H20Z'/></svg></span>",
      '0': "<span class='cube uninfected'><svg style='width:24px;height:24px' viewBox='0 0 24 24'><path fill='currentColor' d='M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z'/></svg></span>"
    }

    return`<ul class='map'>${ worldMap.split('').map(el => elItem[el]).join('') }</ul>`;
  }

  function paintResult(input) {
    if(input.value) {
      if(/^[X10]+$/g.test(input.value)) {
        const pandemicForecast = getPandemicForecast(input.value);
        const wordMapBefore = getWordMap(pandemicForecast.mapBefore);
        const wordMapAfter = getWordMap(pandemicForecast.mapAfter);
        
        result.innerHTML = `
          <div>
            <h2>Pandemic start</h2>
    
            ${wordMapBefore}
    
            <h2>Pandemic end</h2>
    
            ${wordMapAfter}
    
            <h2>Total: ${pandemicForecast.total}</h2>
            <h2>Infected: ${pandemicForecast.infected}</h2>
            <h2>Percentage: ${pandemicForecast.percentage}%</h2>
          </div>  
        `;
      } else {
        alert("Error: Invalid input value");
      }
    } else {
      alert("Error: Empty input");
    }
  }

  return {
    getPandemicForecast
  }
})();
