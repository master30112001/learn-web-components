const template = document.createElement("template");

template.innerHTML = `

<style>
p{
    color: red;
}

.mycard {
    font-family: 'Arial', sans-serif;
    background: #f4f4f4;
    width: 500px;
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-gap: 10px;
    margin-bottom: 15px;
    border-bottom: darkorchid 5px solid;
}

.mycard img {
    width: 100%;
}

.mycard button {
    cursor: pointer;
    background: darkorchid;
    color: #fff;
    border: 0;
    border-radius: 5px;
    padding: 5px 10px;
}

</style>

<div class='mycard'>

    <img />

    <div>
        <p></p>
        <div class="card-info">
            <span> <slot name="email"/> </span>
            <span> <slot name="phone"/> </span>
        </div>

        <button id="toggle-info">
        Hide info
        </button>

    </div>
</div>
`;

class UserCard extends HTMLElement {
  constructor() {
    super();

    this.showInfo = true;

    // shadow
    this.attachShadow({ mode: "open" });
    this.shadowRoot.append(template.content.cloneNode(true));
  }

  static get observedAttributes() {
    return ["username", "avatar"];
  }

  // attribute change
  attributeChangedCallback(property, oldValue, newValue) {
    if (oldValue === newValue) return;
    this[property] = newValue;
    this.render();
  }

  toggleInfo() {
    console.log("toggling info display");

    this.showInfo = !this.showInfo;

    const cardInfo = this.shadowRoot.querySelector(".card-info");
    const toggleInfo = this.shadowRoot.querySelector("#toggle-info");

    if (this.showInfo) {
      cardInfo.style.display = "block";
      toggleInfo.innerText = "Hide Info";
    } else {
      cardInfo.style.display = "none";
      toggleInfo.innerText = "Show Info";
    }
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.querySelector("p").innerText =
      this.getAttribute("username");

    this.shadowRoot.querySelector("img").src = this.getAttribute("avatar");

    this.shadowRoot
      .querySelector("#toggle-info")
      .addEventListener("click", () => this.toggleInfo());
  }

  disconnectedCallback() {
    this.shadowRoot.querySelector("#toggle-info").removeEventListener();
  }
}

window.customElements.define("user-card", UserCard);
