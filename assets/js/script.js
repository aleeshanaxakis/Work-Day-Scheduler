// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

$(document).ready(function() {

// Add a listener for click events on the save button. 

$(".saveBtn").on("click", function () {
    var textarea = $(this).siblings(".description");
    var eventText = textarea.val();
    var timeBlockId = $(this).parent().attr("id");
    localStorage.setItem(timeBlockId, eventText);
});

// Add code to apply the past, present, or future class to each time
// block by comparing the id to the current hour. 

function colourCoding() {
    // Get the current hour using Day.js
        var currentTime = dayjs().hour();
    // Iterate over each row
        $('.row').each(function () {
            var row = $(this);
            var id = parseInt(row.attr('id').replace('hour-', ''));

        row.removeClass("past present future");
    
    // Compare currentTime with id to determine the colour
            if (currentTime < id) {
                row.addClass("future");
            } else if (currentTime === id) {
                row.addClass("present");
            } else {
                row.addClass("past");
            }
        });
    }

colourCoding()

// Add code to get any user input that was saved in localStorage and set
// the values of the corresponding textarea elements. 

$(".time-block").each(function () {
    var timeBlockId = $(this).attr("id");
    var eventText = localStorage.getItem(timeBlockId);

    if (eventText) {
        $(this).find(".description").val(eventText);
    }
});

// Add code to display the current date in the header of the page.
    $('#currentDay').text(dayjs().format('dddd MMMM D') + "th");
  });
  