import "../scss/userSection.scss";
import * as bootstrap from "bootstrap";

const header = document.querySelector("#head");
let userOnline = JSON.parse(localStorage.getItem("userOnline"));

header.innerHTML = `<article class="home">
<a href="HOME">HOME</a>
</article>
<article class="user">
<h1>Hi, ${userOnline.username}</h1>
<img src="${userOnline.icon}" alt="">
</article>`