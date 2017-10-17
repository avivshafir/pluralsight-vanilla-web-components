class RandomQuote extends HTMLElement {
  constructor() {
    super();
    this._quotes = [
      "All we have is us",
      "Try to do the right thing",
      "We are the ghosts in this place"
    ];
    this._$quote = null;
    this._interval = null;
  }

  connectedCallback() {
    this.innerHTML = `
        <style>
            .container {
                width: 500px;
                margin: auto;
                border: dotted 1px #999;
                padding: 20px;
            }
            h1 {
                font-size: 20px;
                margin: 0;
            }
        </style>
        <div class="container">
            <h1>Random Quote:</h1>
            <p>"<span id="quote"></span>"</p>
        </div>
    `;
    this._$quote = this.querySelector("#quote");
    this._setInterval(this.getAttribute("interval"));
    this._render();
  }

  static get observedAttributes() {
    return ["interval"];
  }

  attributeChangedCallback(name, old, newValue) {
    this._setInterval(newValue);
  }

  _setInterval(value) {
    if (this._interval !== null) {
      clearInterval(this._interval);
    }
    if (value > 0) {
      this._interval = setInterval(() => this._render(), value);
    }
  }

  _render() {
    if (this._$quote !== null) {
      const index = Math.floor(Math.random() * this._quotes.length);
      this.setAttribute("current-index", index);
      this._$quote.innerHTML = this._quotes[index];
    }
  }

  disconnectedCallback() {
    clearInterval(this._interval);
  }
}

window.customElements.define("random-quote", RandomQuote);
