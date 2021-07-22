console.log("page1");

$(function () {
  console.log("onload", "page1");

  // Test jQuery
  $("<p>From jQuery</p>").appendTo("body");

  // Test ES6
  const Name = ["“Mike”", "“Jacky”", "“Andy”", "“Scars”"];
  Name.forEach((obj, idx) => console.log(`${idx} => ${obj}`));

  // Test Global Variable
  console.log(parent.constant);

  $("#page1_change_button").click(function () {
    parent.constant['Test'] = "Set on page1";
  });

  $("#page1_check_button").click(function () {
    console.log(parent.constant);
  });
});