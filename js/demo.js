$(document).ready(function () {
  $(".popup-content-inner").sortable();
});
$(document).on("contextmenu", function (e) {
  e.preventDefault();
});
function updateCircle() {
  let numElements = $(".popup-content-inner .element").length;
  if (numElements >= 8) {
    $(".add-text-button, .add-button-button").prop("disabled", true);
  } else {
    $(".add-text-button, .add-button-button").prop("disabled", false);
  }
  let circleDiameter = 350 + numElements * 40; // Adjust diameter based on the number of elements
  let circleRadius = circleDiameter / 2;

  // Update circle size
  $(".popup-editor").css({
    width: circleDiameter + "px",
    height: circleDiameter + "px",
  });

  // Position elements within the circle
  $(".popup-content-inner .element").each(function (index) {
    let angle = (index / numElements) * 2 * Math.PI;
    let xOffset = circleRadius * Math.cos(angle);
    let yOffset = circleRadius * Math.sin(angle);

    $(this).css({
      left: circleRadius + xOffset + "px",
      top: circleRadius + yOffset + "px",
    });
  });
}

$(document).ready(function () {
  // Add Text Element
  $(".add-text-button").click(function () {
    $(".popup-content-inner").append(
      '<div class="element text" contenteditable="true">Your Text Here</div>'
    );
    makeElementSortable($(".popup-content-inner").children().last());
    updateCircle();
  });

  // Add Field Element
  // $(".add-field-button").click(function() {
  //   $(".popup-content-inner").append('<div class="element field"><input type="text" placeholder="Input Field"></div>');
  //   makeElementSortable($(".popup-content-inner").children().last());
  //    updateCircle();
  // });

  // Add Button Element
  $(".add-button-button").click(function () {
    $(".popup-content-inner").append(
      '<div class="element signUp" contenteditable="true">Button</div>'
    );
    makeElementSortable($(".popup-content-inner").children().last());
    updateCircle();
  });

  // Function to make newly added element draggable
  function makeElementSortable(element) {
    element.sortable();
  }

  // Remove Element
  $(document).on("dblclick", ".element", function () {
    $(this).remove();
    updateCircle();
  });
});

$(document).ready(function () {
  // Add event listener for color picker
  $("#background-color-picker").change(function () {
    let color = $(this).val();
    $(".popup-editor").css("background-color", color);
  });
});

// Function to show the notification
function showNotification(message) {
  var notificationToast = new bootstrap.Toast(document.getElementById('notification-toast'));
  var toastBody = document.querySelector('.toast-body');
  toastBody.textContent = message;
  notificationToast.show();
}


// Save Popup to localStorage

function savePopupToLocalStorage() {
  // Clone the popup content to avoid modifying the original elements
  let clonedPopup = $("#previewHtml").clone();
  // Remove the contenteditable attribute from all elements
  clonedPopup.find("[contenteditable]").removeAttr("contenteditable");
  // Get the HTML content of the modified popup
  let popupHtml = clonedPopup.html();
  // Save the modified HTML content to local storage
  localStorage.setItem("popupHtml", popupHtml);
}

// Get Popup from localStorage

function retrievePopupFromLocalStorage() {
  return localStorage.getItem("popupHtml");
}

// Save Popup to localStorage when Save button is clicked
$(".save-button").click(function () {
  savePopupToLocalStorage();
  showNotification("Popup saved successfully!");
});

// Load Popup from localStorage when Load button is clicked
$(".preview-button").click(function () {
  let popupHtml = retrievePopupFromLocalStorage();
  $("#previewModal .modal-body").html(popupHtml);
  $("#previewModal").modal("show");
});

updateCircle();
