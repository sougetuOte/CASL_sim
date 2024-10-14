import { CASL2SimulatorUI } from '../casl2-simulator-ui.js';
import { CASL2Simulator } from '../casl2-core.js';
import { CASL2Assembler } from '../casl2-assembler-main.js';
import { CASL2UI } from '../casl2-ui-core.js';

// Mock the dependencies
jest.mock('../casl2-core.js');
jest.mock('../casl2-assembler-main.js');
jest.mock('../casl2-ui-core.js');

describe('CASL2SimulatorUI', () => {
  let simulatorUI;

  beforeEach(() => {
    simulatorUI = new CASL2SimulatorUI();
    document.body.appendChild(simulatorUI);
  });

  afterEach(() => {
    document.body.removeChild(simulatorUI);
    jest.clearAllMocks();
  });

  test('should create CASL2SimulatorUI instance', () => {
    expect(simulatorUI).toBeInstanceOf(CASL2SimulatorUI);
  });

  test('should render UI elements', () => {
    const shadow = simulatorUI.shadowRoot;
    expect(shadow.querySelector('#casl2-simulator')).not.toBeNull();
    expect(shadow.querySelector('#assembleBtn')).not.toBeNull();
    expect(shadow.querySelector('#runBtn')).not.toBeNull();
    expect(shadow.querySelector('#stepBtn')).not.toBeNull();
    expect(shadow.querySelector('#resetBtn')).not.toBeNull();
    expect(shadow.querySelector('#editor')).not.toBeNull();
    expect(shadow.querySelectorAll('#generalRegisters input').length).toBe(8);
    expect(shadow.querySelectorAll('#specialRegisters input').length).toBe(3);
    expect(shadow.querySelector('#memory')).not.toBeNull();
    expect(shadow.querySelector('#output')).not.toBeNull();
    expect(shadow.querySelector('#ioLog')).not.toBeNull();
  });

  test('should initialize simulator, assembler and UI when connected', () => {
    expect(CASL2Simulator).toHaveBeenCalledTimes(1);
    expect(CASL2Assembler).toHaveBeenCalledTimes(1);
    expect(CASL2UI).toHaveBeenCalledTimes(1);
  });

  test('should run test program when connected', () => {
    expect(simulatorUI.ui.assemble).toHaveBeenCalledTimes(1);
    expect(simulatorUI.simulator.run).toHaveBeenCalledTimes(1);
    expect(simulatorUI.ui.updateUI).toHaveBeenCalledTimes(1);
    expect(simulatorUI.ui.displayTestResult).toHaveBeenCalledTimes(1);
  });

  test('should update UI when assemble button is clicked', () => {
    const assembleBtn = simulatorUI.shadowRoot.querySelector('#assembleBtn');
    assembleBtn.click();
    expect(simulatorUI.ui.assemble).toHaveBeenCalledTimes(2); // Once in constructor, once on click
  });

  test('should update UI when run button is clicked', () => {
    const runBtn = simulatorUI.shadowRoot.querySelector('#runBtn');
    runBtn.click();
    expect(simulatorUI.simulator.run).toHaveBeenCalledTimes(2); // Once in constructor, once on click
    expect(simulatorUI.ui.updateUI).toHaveBeenCalledTimes(2); // Once in constructor, once on click
  });

  test('should update UI when step button is clicked', () => {
    const stepBtn = simulatorUI.shadowRoot.querySelector('#stepBtn');
    stepBtn.click();
    expect(simulatorUI.simulator.step).toHaveBeenCalledTimes(1);
    expect(simulatorUI.ui.updateUI).toHaveBeenCalledTimes(2); // Once in constructor, once on click
  });

  test('should reset simulator when reset button is clicked', () => {
    const resetBtn = simulatorUI.shadowRoot.querySelector('#resetBtn');
    resetBtn.click();
    expect(simulatorUI.simulator.reset).toHaveBeenCalledTimes(1);
    expect(simulatorUI.ui.updateUI).toHaveBeenCalledTimes(2); // Once in constructor, once on click
  });

  // Add more tests for error handling, data display accuracy, etc.
});
