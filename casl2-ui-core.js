import { getMessage } from './config.js';

export class CASL2UI {
    constructor(simulator, assembler, shadowRoot) {
        this.simulator = simulator;
        this.assembler = assembler;
        this.shadowRoot = shadowRoot;
        this.initializeUI();
    }

    initializeUI() {
        this.addEventListeners();
        this.updateUI();
    }

    addEventListeners() {
        const buttons = [
            { id: 'assembleBtn', action: () => this.assemble() },
            { id: 'runBtn', action: () => this.simulator.run() },
            { id: 'stepBtn', action: () => this.simulator.step() },
            { id: 'resetBtn', action: () => this.simulator.reset() }
        ];

        buttons.forEach(({ id, action }) => {
            this.shadowRoot.getElementById(id).addEventListener('click', action);
        });

        for (let i = 0; i < 8; i++) {
            this.shadowRoot.getElementById(`GR${i}`).addEventListener('change', (e) => this.updateRegisterFromUI(i, e.target.value));
        }

        ['PR', 'SP', 'FR'].forEach(register => {
            this.shadowRoot.getElementById(register).addEventListener('change', (e) => this.updateSpecialRegisterFromUI(register, e.target.value));
        });

        this.shadowRoot.getElementById('updateMemoryBtn').addEventListener('click', () => this.updateMemoryFromUI());
    }

    assemble() {
        const code = this.shadowRoot.getElementById('editor').value;
        const result = this.assembler.assemble(code);
        if (result.success) {
            this.simulator.memory = result.memory;
            this.simulator.labelTable = result.labelTable;
            this.simulator.output(getMessage('assembleComplete'));
        } else {
            this.simulator.output(getMessage('assembleError', { error: result.error }));
        }
        this.updateUI();
    }

    updateUI() {
        this.updateRegistersDisplay();
        this.updateMemoryDisplay();
        this.updateOutputDisplay();
        this.updateIOLogDisplay();
    }

    updateRegistersDisplay() {
        for (let i = 0; i < 8; i++) {
            this.shadowRoot.getElementById(`GR${i}`).value = this.simulator.registers[i].toString(16).padStart(4, '0');
        }
        this.shadowRoot.getElementById('PR').value = this.simulator.PR.toString(16).padStart(4, '0');
        this.shadowRoot.getElementById('SP').value = this.simulator.SP.toString(16).padStart(4, '0');
        this.shadowRoot.getElementById('FR').value = this.simulator.FR.toString(2).padStart(3, '0');
    }

    updateMemoryDisplay() {
        const memoryElement = this.shadowRoot.getElementById('memory');
        const memoryContent = Array.from({ length: 256 }, (_, i) => {
            const address = i * 8;
            const values = Array.from({ length: 8 }, (_, j) => 
                this.simulator.memory[address + j].toString(16).padStart(4, '0')
            ).join(' ');
            return `${address.toString(16).padStart(4, '0')}: ${values}`;
        }).join('\n');
        memoryElement.textContent = memoryContent;
    }

    updateOutputDisplay() {
        const outputElement = this.shadowRoot.getElementById('output');
        outputElement.innerHTML = this.simulator.output.join('<br>');
        outputElement.scrollTop = outputElement.scrollHeight;
    }

    updateIOLogDisplay() {
        const ioLogElement = this.shadowRoot.getElementById('ioLog');
        ioLogElement.innerHTML = this.simulator.ioLog.join('<br>');
        ioLogElement.scrollTop = ioLogElement.scrollHeight;
    }

    updateRegisterFromUI(index, value) {
        const numValue = parseInt(value, 16);
        if (!isNaN(numValue) && numValue >= 0 && numValue <= 0xFFFF) {
            this.simulator.updateRegister(index, numValue);
            this.updateUI();
        } else {
            alert(getMessage('invalidRegisterValue', { index, value }));
        }
    }

    updateSpecialRegisterFromUI(register, value) {
        const base = register === 'FR' ? 2 : 16;
        const maxValue = register === 'FR' ? 0b111 : 0xFFFF;
        const numValue = parseInt(value, base);
        if (!isNaN(numValue) && numValue >= 0 && numValue <= maxValue) {
            this.simulator[register] = numValue;
            this.updateUI();
        } else {
            alert(getMessage('invalidSpecialRegisterValue', { register, value }));
        }
    }

    updateMemoryFromUI() {
        const address = parseInt(this.shadowRoot.getElementById('memoryAddress').value, 10);
        const value = parseInt(this.shadowRoot.getElementById('memoryValue').value, 16);
        if (!isNaN(address) && address >= 0 && address <= 0xFFFF) {
            if (!isNaN(value) && value >= 0 && value <= 0xFFFF) {
                this.simulator.updateMemory(address, value);
                this.updateUI();
            } else {
                alert(getMessage('invalidMemoryValue', { value }));
            }
        } else {
            alert(getMessage('invalidMemoryAddress', { address }));
        }
    }

    displayTestResult(result) {
        const testResultElement = this.shadowRoot.getElementById('testResult');
        testResultElement.innerHTML = result;
        testResultElement.style.display = 'block';
    }
}
