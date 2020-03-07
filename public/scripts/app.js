/* ———————————————————— NAVBAR ———————————————————— */
$(() => {
  const indicator = document.querySelector('.nav-indicator');
  const items = document.querySelectorAll('.nav-item');

  function handleIndicator(el) {
    items.forEach(item => {
      item.classList.remove('is-active');
      item.removeAttribute('style');
    });

    indicator.style.width = `${el.offsetWidth}px`;
    indicator.style.left = `${el.offsetLeft}px`;
    indicator.style.backgroundColor = el.getAttribute('active-color');

    el.classList.add('is-active');
    el.style.color = el.getAttribute('active-color');
  }


  items.forEach((item, index) => {
    item.addEventListener('click', (e) => { handleIndicator(e.target) });
    item.classList.contains('is-active') && handleIndicator(item);
  });
});

/* ———————————————————— GET USERS FROM SQL ———————————————————— */
$(() => {
  // console.log("it works")
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for (user of users.users) {
      $("<div>").text(user.name).appendTo($(""));
    }
  });

/* ———————————————————— GET MENU FROM SQL ———————————————————— */
  $.ajax({
    method: "GET",
    url: "/api/menu"
  }).done((res) => {
    console.log(res)
    for (food of res.menu) {
      const wrapper = $("<div class='menu-item'>")
        .append($("<h2>")
          .text(food.name + " - ")
          .append($("<span class='price'>").text(`$${food.price/100}`)))
        .append($("<p>").text(food.description));

      $(".menu").append(wrapper);
      // $("<h2>").text(food.name + " - ").appendTo($(".menu"));
      // $("<span>").text(" " + food.price).appendTo($(".menu"));
      // $("<p>").text(food.description).appendTo($(".menu"));
    }
  });

});
