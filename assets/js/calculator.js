var equationArray = [];
var currentValue = "";
var lastInteraction = "";

$(document).ready(function() {

  // Prevent the quick find from appearing in Firefox
  $(document).on('keydown', function(event) {
    if (event.keyCode===191 || event.keyCode===111) {
        event.preventDefault();
    }
  });

  // Map the keyboard events that correspond with calculator keys
  document.addEventListener('keydown', function(event) {
    if (event.shiftKey) {
      switch(event.keyCode) {
        case 61:    // + (shift & =)
          $('#button-plus').click();
          break;
        case 53:    // % (shift & 5)
          $('#button-percent').click();
          break;
        case 56:    // * (shift & 8)
          $('#button-multiply').click();
          break;
        case 173:   // - (keyboard)
        case 109:   // - (numpad)
          $('#button-negative').click();
          break;
        case 46:
          $('#button-ac').click();
          break;
      }
    } else {
      switch(event.keyCode) {
        case 48:    // 0 (keyboard)
        case 96:    // 0 (numpad)
          $('#button-0').click();
          break;
        case 49:    // 1 (keyboard)
        case 97:    // 1 (numpad)
          $('#button-1').click();
          break;
        case 50:    // 2 (keyboard)
        case 98:    // 2 (numpad)
          $('#button-2').click();
          break;
        case 51:    // 3 (keyboard)
        case 99:    // 3 (numpad)
          $('#button-3').click();
          break;
        case 52:    // 4 (keyboard)
        case 100:   // 4 (numpad)
          $('#button-4').click();
          break;
        case 53:    // 5 (keyboard)
        case 101:    // 5 (numpad)
          $('#button-5').click();
          break;
        case 54:    // 6 (keyboard)
        case 102:   // 6 (numpad)
          $('#button-6').click();
          break;
        case 55:    // 7 (keyboard)
        case 103:   // 7 (numpad)
          $('#button-7').click();
          break;
        case 56:    // 8 (keyboard)
        case 104:   // 8 (numpad)
          $('#button-8').click();
          break;
        case 57:    // 9 (keyboard)
        case 105:   // 9 (numpad)
          $('#button-9').click();
          break;
        case 106:   // * (numpad)
        case 88:    // x
          $('#button-multiply').click();
          break;
        case 107:   // + (numpad)
          $('#button-plus').click();
          break;
        case 173:   // - (keyboard)
        case 109:   // - (numpad)
          $('#button-minus').click();
          break;
        case 191:   // / (keyboard)
        case 111:   // / (numpad)
          $('#button-divide').click();
          break;
        case 190:   // . (keyboard)
        case 110:   // . (numpad)
          $('#button-decimal').click();
          break;
        case 61:    // =
        case 13:    // enter
        case 0:     // enter (numpad)
          $('#button-equals').click();
          break;
        case 46:
        case 27:
          $('#button-c').click();
          break;
        case 8:
          backspace();
          break;
        default:
          console.log(event.keyCode);
      };
    }
  });

  // Map click events to the value buttons
  $('.button[data-button-type="value"]:not(#button-negative)').on('click', function() {
    var value = $(this).find('span').text()
    if (lastInteraction == 'equals') {
      equationArray = [];
      updateEquation(equationArray.join(' '));
    }
    lastInteraction = "value";
    currentValue = currentValue.toString().concat(value);
    updateResults(currentValue);
  });

  // Map a click event the negative/positive toggle
  $('#button-negative').on('click', function() {
    console.log(currentValue[0]);
    if (currentValue[0] == '-') {
      currentValue = currentValue.replace('-', '');
    } else {
      currentValue = '-'.concat(currentValue);
    }
    updateResults(currentValue);
  });

  // Map click events to the operator buttons
  $('.button[data-button-type="operator"]').on('click', function() {
    if (lastInteraction != '') {
      operator = $(this).find('span').text();
      if (lastInteraction == 'operator') {
        equationArray[equationArray.length - 1] = operator;
      } else {
        equationArray.push(currentValue);
        currentValue = '';
        updateResults(currentValue);
        equationArray.push(operator);
      }
      lastInteraction = 'operator';
      updateEquation(equationArray.join(' '));
    }
  });

  // Map click events to the equals buttons
  $('#button-equals').on('click', function() {
    if (lastInteraction == 'value') {
      equationArray.push(currentValue);
      updateEquation(equationArray.join(' ').concat(' ='));
      currentValue = '';
      var result = math.eval(equationArray.join(' ').replace('÷', '/').replace('x', '*'));
      equationArray = [result];
      currentValue = '';
      updateResults(result);
      lastInteraction = 'equals';
    }
  });

  // Map click event to the AC button
  $('#button-ac').on('click', function() {
    equationArray = [];
    updateEquation(equationArray.join(' '));
    $('#button-c').click();
    lastInteraction = '';
  });

  $('#button-c').on('click', function() {
    currentValue = "";
    updateResults(currentValue);
  });

});

function updateEquation(equation) {
  $('#equation').text(equation);
  resizeText('#equation');
}

function updateResults(value) {
  $('#results').text(value);
  resizeText('#results');
}

function resizeText(element) {
  var containingElement = $(element);
  containingElement.css('font-size', '');
  var fontSize = parseInt(containingElement.css('font-size'));
  do {
    fontSize--;
    containingElement.css('font-size', fontSize.toString() + 'px');
  } while (containingElement.width() >= containingElement.parent().width() && fontSize >= 5);
}

function backspace() {
  if (currentValue.length > 0 || equationArray.length > 0) {
    if (lastInteraction == 'value') {
      if (currentValue.length > 0) {
        currentValue = currentValue.slice(0, -1);
      } else {
        lastInteraction = 'operator';
        backspace();
      }
    } else if (lastInteraction == 'operator') {
      equationArray.pop();
      currentValue = equationArray.pop();
      lastInteraction = 'value';
    }
    updateEquation(equationArray.join(' '));
    updateResults(currentValue);
  }
}
