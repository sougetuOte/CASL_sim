import { CASL2SimulatorUI } from '../casl2-simulator-ui.js';
import { CASL2Simulator } from '../casl2-core.js';
import { CASL2Assembler } from '../casl2-assembler-main.js';
import { CASL2UI } from '../casl2-ui-core.js';

describe('CASL2SimulatorUI', () => {
  let uiComponent;
  let simulator;
  let assembler;
  let ui;

  beforeEach(() => {
    simulator = new CASL2Simulator();
    assembler = new CASL2Assembler();
    uiComponent = new CASL2SimulatorUI();
    document.body.appendChild(uiComponent);
    ui = uiComponent.ui;
  });

  afterEach(() => {
    document.body.removeChild(uiComponent);
  });

  test('UI初期化', () => {
    expect(uiComponent.shadowRoot.querySelector('#casl2-simulator')).not.toBeNull();
    expect(uiComponent.shadowRoot.querySelector('#assembleBtn')).not.toBeNull();
    expect(uiComponent.shadowRoot.querySelector('#runBtn')).not.toBeNull();
    expect(uiComponent.shadowRoot.querySelector('#stepBtn')).not.toBeNull();
    expect(uiComponent.shadowRoot.querySelector('#resetBtn')).not.toBeNull();
  });

  test('アセンブル機能', () => {
    const testProgram = 'START\nLD GR1,=1\nEND';
    uiComponent.shadowRoot.querySelector('#editor').value = testProgram;
    uiComponent.shadowRoot.querySelector('#assembleBtn').click();
    expect(simulator.memory[0]).toBe(0x1010); // LD GR1,=1のオペコード
  });

  test('実行機能', () => {
    const testProgram = 'START\nLD GR1,=1\nEND';
    uiComponent.shadowRoot.querySelector('#editor').value = testProgram;
    uiComponent.shadowRoot.querySelector('#assembleBtn').click();
    uiComponent.shadowRoot.querySelector('#runBtn').click();
    expect(simulator.registers[1]).toBe(1);
  });

  test('ステップ実行機能', () => {
    const testProgram = 'START\nLD GR1,=1\nLD GR2,=2\nEND';
    uiComponent.shadowRoot.querySelector('#editor').value = testProgram;
    uiComponent.shadowRoot.querySelector('#assembleBtn').click();
    uiComponent.shadowRoot.querySelector('#stepBtn').click();
    expect(simulator.registers[1]).toBe(1);
    expect(simulator.registers[2]).toBe(0);
    uiComponent.shadowRoot.querySelector('#stepBtn').click();
    expect(simulator.registers[2]).toBe(2);
  });

  test('リセット機能', () => {
    const testProgram = 'START\nLD GR1,=1\nEND';
    uiComponent.shadowRoot.querySelector('#editor').value = testProgram;
    uiComponent.shadowRoot.querySelector('#assembleBtn').click();
    uiComponent.shadowRoot.querySelector('#runBtn').click();
    uiComponent.shadowRoot.querySelector('#resetBtn').click();
    expect(simulator.registers[1]).toBe(0);
    expect(simulator.PR).toBe(0);
  });

  test('レジスタの更新', () => {
    uiComponent.shadowRoot.querySelector('#GR1').value = 'ABCD';
    uiComponent.shadowRoot.querySelector('#GR1').dispatchEvent(new Event('change'));
    expect(simulator.registers[1]).toBe(0xABCD);
  });

  test('メモリの更新', () => {
    uiComponent.shadowRoot.querySelector('#memoryAddress').value = '100';
    uiComponent.shadowRoot.querySelector('#memoryValue').value = 'FFFF';
    uiComponent.shadowRoot.querySelector('#updateMemoryBtn').click();
    expect(simulator.memory[100]).toBe(0xFFFF);
  });

  test('UI表示の更新', () => {
    simulator.registers[0] = 0x1234;
    simulator.PR = 0x5678;
    simulator.memory[0] = 0xABCD;
    ui.updateUI();
    expect(uiComponent.shadowRoot.querySelector('#GR0').value).toBe('1234');
    expect(uiComponent.shadowRoot.querySelector('#PR').value).toBe('5678');
    expect(uiComponent.shadowRoot.querySelector('#memory').textContent).toContain('0000: abcd');
  });
});
