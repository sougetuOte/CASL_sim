import { CASL2Simulator } from './casl2-simulator.js';
import { CASL2Assembler } from './casl2-assembler-main.js';
import { CASL2UI } from './casl2-ui-core.js';
import { getTemplate } from './casl2-simulator-ui-template.js';
import { getStyles } from './casl2-simulator-ui-styles.js';
import { runTest } from './casl2-simulator-ui-test.js';

// Web Component for CASL2 Simulator UI
export class CASL2SimulatorUI extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.simulator = new CASL2Simulator();
        this.assembler = new CASL2Assembler();
        this.ui = new CASL2UI(this.simulator, this.assembler, this.shadowRoot);
        this.setupEventListeners();
        runTest(this);
    }

    render() {
        const template = getTemplate();
        const styles = getStyles();
        this.shadowRoot.innerHTML = `
            <style>${styles}</style>
            ${template}
        `;
    }

    setupEventListeners() {
        const assembleBtn = this.shadowRoot.getElementById('assembleBtn');
        const runBtn = this.shadowRoot.getElementById('runBtn');
        const stepBtn = this.shadowRoot.getElementById('stepBtn');
        const resetBtn = this.shadowRoot.getElementById('resetBtn');

        assembleBtn.addEventListener('click', () => this.ui.assemble());
        runBtn.addEventListener('click', () => this.simulator.run());
        stepBtn.addEventListener('click', () => this.ui.step());
        resetBtn.addEventListener('click', () => this.ui.reset());
    }
}

customElements.define('casl2-simulator', CASL2SimulatorUI);
