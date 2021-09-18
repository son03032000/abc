function logon() {
  let username = $("#username").val();
  let password = $("#password").val();
  let age = $("#age").val();
  $.ajax({
    url: "/user/",
    type: "POST",
    data: { username: username, password: password, age: age },
  })
    .then(function (data) {
      console.log(data);
    })
    .catch(function (err) {
      console.log(err);
    });
}
