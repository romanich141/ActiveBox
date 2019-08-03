import "../scss/index.scss";

("use strict");

var anchors = document.querySelectorAll("a[href*='#']");

var _loop = function _loop() {
  if (_isArray) {
    if (_i >= _iterator.length) return "break";
    _ref = _iterator[_i++];
  } else {
    _i = _iterator.next();
    if (_i.done) return "break";
    _ref = _i.value;
  }

  var anchor = _ref;
  anchor.addEventListener("click", function(event) {
    event.preventDefault();
    var blockID = anchor.getAttribute("href");
    document.querySelector("" + blockID).scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
};

for (
  var _iterator = anchors,
    _isArray = Array.isArray(_iterator),
    _i = 0,
    _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();
  ;

) {
  var _ref;

  var _ret = _loop();

  if (_ret === "break") break;
}

var burger = document.querySelector(".burger"),
  navbar = document.querySelector(".navbar__items ul"),
  close = document.querySelector(".close");

burger.addEventListener("click", function() {
  navbar.classList.toggle("mobile-navbar-active");
  burger.style.display = "none";
});
close.addEventListener("click", function() {
  navbar.classList.toggle("mobile-navbar-active");
  burger.style.display = "flex";
});

var btnFindOut = document.querySelector(".btn-find");
btnFindOut.addEventListener("click", function() {
  var xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    "https://jsonplaceholder.typicode.com/photos?_limit=6",
    false
  );
  xhr.send();

  if (xhr.status != 200) {
    alert(xhr.status + ": " + xhr.statusText);
  } else {
    var data = JSON.parse(xhr.responseText),
      titles = [...document.querySelectorAll(".item-title")],
      images = [...document.querySelectorAll(".item-logo img")];
    data.map((item, i) => {
      return (
        (images[i].src = item.thumbnailUrl), (titles[i].innerHTML = item.title)
      );
    });
  }
});
