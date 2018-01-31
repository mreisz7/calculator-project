var equationArray = [];
var currentValue;

$(document).ready(function() {

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
      };
    }
  });

  // Map click events to the value buttons
  $('.button[data-button-type="value"]').on('click', function() {
    console.log($(this).find('span').text() + ' (value)');
  });

  // Map click events to the operator buttons
  $('.button[data-button-type="operator"]').on('click', function() {
    console.log($(this).find('span').text() + ' (operator)');
  });

  // Map click events to the event buttons
  $('.button[data-button-type="event"]').on('click', function() {
    console.log($(this).find('span').text() + ' (event)');
  });

});
