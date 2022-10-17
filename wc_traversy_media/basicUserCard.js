class BasicUserCard extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
    <style>
    p{
        color: blue; 
    }
    </style>
    <p> ${this.getAttribute("username")}</p>
    `;
  }
}

window.customElements.define("basic-user-card", BasicUserCard);
