import { LitElement, html, css } from 'lit'
import { classMap } from 'lit/directives/class-map.js'

class ColorSchemeButton extends LitElement {
  static get styles () {
    return css`
      * {
        margin: 0;
        padding: 0;
        
        /* --icon-color: purple; */
      }

      :host {
        /* button are inline element */
        display: inline-block;
        min-width: 16px;
        min-height: 16px;
      }
      
      button {
        /* reset */
        border: none;
        background: none;
        color: inherit;
        outline: inherit;
        line-height: 0;
        cursor: pointer;

        width: 100%;
        height: 100%;
      }

      svg {
        display: inline-block;
        outline: none;

        fill: var(--icon-color, #000);
      }

      .hidden {
        display: none !important;
      }

      svg path,
      svg rect,
      svg g,
      svg polygon {
        pointer-events: none;
      }

      button:focus .animationRevolution,
      button:hover .animationRevolution {
        animation: revolution 1s ease-in-out 1 forwards;
      }

      button:focus .animation-bigger,
      button:hover .animation-bigger {
        animation: bigger 1s ease-in-out 1 forwards;
      }
       
      @keyframes revolution {
        0% {
          opacity: 1;
          transform: rotate(0deg);
        }
        50% {
          opacity: .9;
          transform: rotate(180deg);
        }
        100% {
          opacity: 1;
          transform: rotate(0deg);
        }
      }

      @keyframes bigger {
        0% {
          opacity: 1;
          transform: scale(1);
        }
        50% {
          opacity: .9;
          transform: scale(1.05);
        }
        100% {
          opacity: 1;
          transform: scale(1);
        }
      }
    `
  }

  static get properties () {
    return {
      title: String,
      ariaLabel: String,
      mode: String
    }
  }

  constructor () {
    super()
    this.schemas = ['light', 'dark', 'dim']
    // init the mode
    this.mode = 'light'
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.mode = 'dark'
    }
    if (window.matchMedia('(prefers-color-scheme: dim)').matches) {
      this.mode = 'dim'
    }
  }

  connectedCallback () {
    super.connectedCallback()
    // listen for changes in prefers-color-scheme
    window.matchMedia('(prefers-color-scheme: light)')
      .addEventListener('change', this.#handleChangeLight)
    window.matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', this.#handleChangeDark)
    window.matchMedia('(prefers-color-scheme: dim)')
      .addEventListener('change', this.#handleChangeDim)
  }

  disconnectedCallback () {
    super.disconnectedCallback()
    window.matchMedia('(prefers-color-scheme: light)')
      .removeEventListener(this.#handleChangeLight)
    window.matchMedia('(prefers-color-scheme: dark)')
      .removeEventListener(this.#handleChangeDark)
    window.matchMedia('(prefers-color-scheme: dim)')
      .removeEventListener(this.#handleChangeDim)
  }

  #handleChangeLight = (e) => {
    if (e.matches) {
      this.mode = 'light'
    }
  }

  #handleChangeDark = (e) => {
    if (e.matches) {
      this.mode = 'dark'
    }
  }

  #handleChangeDim = (e) => {
    if (e.matches) {
      this.mode = 'dim'
    }
  }

  #handleClick (event) {
    const schema = event.target.id
    const position = this.schemas.indexOf(schema)
    const nextSchema =
      this.schemas[((position + 1) % this.schemas.length)]
    this.mode = nextSchema
    // console.log(`@NEXT >> ${nextSchema}`)
    this.#setDocumentAttribute(nextSchema)
  }

  #setDocumentAttribute (schema) {
    document.firstElementChild
      .setAttribute('color-scheme', schema)
  } 

  /* TODO ready to be implemented */
  #dispatchSchemeEvent (schema) {
    const schemaEvent = new CustomEvent('schema-event', {
      detail: { schema },
      bubbles: true,
      composed: true
    })
    this.dispatchEvent(schemaEvent)
  }

  render () {

    const lightClasses = {
      animationRevolution: true,
      hidden: this.mode !== 'light'
    }

    const darkClasses = {
      hidden: this.mode !== 'dark'
    }

    const dimClasses = {
      hidden: this.mode !== 'dim'
    }

    return html`
      <button id="btn"
        ${this.title} 
        ${this.ariaLabel}
        @click=${this.#handleClick}>

        <svg id="light"
          class="${classMap(lightClasses)}"
          viewBox="0 0 24 24"
          role="img" 
          aria-hidden="true" 
          focusable="false" >
          <rect fill="none" height="24" width="24" shape-rendering="geometricPrecision" />
          <path d="M12,9c1.65,0,3,1.35,3,3s-1.35,3-3,3s-3-1.35-3-3S10.35,9,12,9 M12,7c-2.76,0-5,2.24-5,5s2.24,5,5,5s5-2.24,5-5 S14.76,7,12,7L12,7z M2,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S1.45,13,2,13z M20,13l2,0c0.55,0,1-0.45,1-1 s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S19.45,13,20,13z M11,2v2c0,0.55,0.45,1,1,1s1-0.45,1-1V2c0-0.55-0.45-1-1-1S11,1.45,11,2z M11,20v2c0,0.55,0.45,1,1,1s1-0.45,1-1v-2c0-0.55-0.45-1-1-1C11.45,19,11,19.45,11,20z M5.99,4.58c-0.39-0.39-1.03-0.39-1.41,0 c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0s0.39-1.03,0-1.41L5.99,4.58z M18.36,16.95 c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0c0.39-0.39,0.39-1.03,0-1.41 L18.36,16.95z M19.42,5.99c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41 s1.03,0.39,1.41,0L19.42,5.99z M7.05,18.36c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06 c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L7.05,18.36z" shape-rendering="geometricPrecision" />
        </svg>

        <svg id="dark"
          class="${classMap(darkClasses)}"
          viewBox="0 0 24 24"
          role="img" 
          aria-hidden="true" 
          focusable="false" >
          <rect fill="none" height="24" width="24" shape-rendering="geometricPrecision" />
          <path d="M9.37,5.51C9.19,6.15,9.1,6.82,9.1,7.5c0,4.08,3.32,7.4,7.4,7.4c0.68,0,1.35-0.09,1.99-0.27C17.45,17.19,14.93,19,12,19 c-3.86,0-7-3.14-7-7C5,9.07,6.81,6.55,9.37,5.51z M12,3c-4.97,0-9,4.03-9,9s4.03,9,9,9s9-4.03,9-9c0-0.46-0.04-0.92-0.1-1.36 c-0.98,1.37-2.58,2.26-4.4,2.26c-2.98,0-5.4-2.42-5.4-5.4c0-1.81,0.89-3.42,2.26-4.4C12.92,3.04,12.46,3,12,3L12,3z" shape-rendering="geometricPrecision" />
        </svg>

        <svg id="dim"
          class="${classMap(dimClasses)}"
          viewBox="0 0 24 24"
          role="img" 
          aria-hidden="true" 
          focusable="false" >
          <g>
            <rect fill="none" height="24" width="24" x="0" shape-rendering="geometricPrecision"/>
          </g>
          <g>
            <g>
              <polygon points="19,9 20.25,6.25 23,5 20.25,3.75 19,1 17.75,3.75 15,5 17.75,6.25" shape-rendering="geometricPrecision" >
                <animate attributeName="opacity" values="1;0.7;1" dur="1s" repeatCount="1" />
              </polygon>
              <polygon points="19,15 17.75,17.75 15,19 17.75,20.25 19,23 20.25,20.25 23,19 20.25,17.75" shape-rendering="geometricPrecision" >
                <animate attributeName="opacity" values="1;0.7;1" dur="2s" repeatCount="1" />
              </polygon>
              <path d="M11.5,9.5L9,4L6.5,9.5L1,12l5.5,2.5L9,20l2.5-5.5L17,12L11.5,9.5z M9.99,12.99L9,15.17l-0.99-2.18L5.83,12l2.18-0.99 L9,8.83l0.99,2.18L12.17,12L9.99,12.99z" shape-rendering="geometricPrecision">
                <animate attributeName="opacity" values="1;0.7;1" dur="4s" repeatCount="1" />
              </path>
            </g>
          </g>
        </svg>

      </button>
    `
  }
}

customElements.define('color-scheme-button', ColorSchemeButton)
