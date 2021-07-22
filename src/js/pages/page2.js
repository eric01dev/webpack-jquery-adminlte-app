console.log("page2");

$(function () {
  console.log("onload", "page2");

  // Test Global Variable
  console.log(parent.constant);
  
  $("#page2_change_button").click(function () {
    parent.constant['Test'] = "Set on page2";
  });

  $("#page2_check_button").click(function () {
    console.log(parent.constant);
  });
});