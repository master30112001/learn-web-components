class Counter extends HTMLElement {
  constructor() {
    super();
    this.startFrom = 10;
    this.name = "vedant";

    this.shadow = this.attachShadow({ mode: "open" });
  }

  get startFrom() {
    return this.getAttribute("startFrom");
  }
  set startFrom(val) {
    return this.setAttribute("startFrom", val);
  }

  get name() {
    return this.getAttribute("name");
  }
  set name(val) {
    return this.setAttribute("name", val);
  }

  static get observedAttributes() {
    return ["startFrom", "name"];
  }

  // attribute change
  attributeChangedCallback(property, oldValue, newValue) {
    if (oldValue === newValue) return;
    this.render();
  }

  // connect component
  connectedCallback() {
    this.render();
  }

  render() {
    this.shadow.innerHTML = `
    <p>Hello ${this.getAttribute("startFrom")}  ${this.getAttribute(
      "name"
    )} !</p>
    `;
  }
}

// register component
customElements.define("my-counter", Counter);
