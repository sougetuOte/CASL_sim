import { CASL2SimulatorUI } from '../casl2-simulator-ui.js';
import { CASL2Simulator } from '../casl2-simulator.js';
import { CASL2Assembler } from '../casl2-assembler-main.js';
import { CASL2UI } from '../casl2-ui-core.js';

jest.mock('../casl2-simulator.js');
jest.mock('../casl2-assembler-main.js');
jest.mock('../casl2-ui-core.js');

describe('CASL2SimulatorUI', () => {
    let simulatorUI;

    beforeEach(() => {
        // モックのリセット
        CASL2Simulator.mockClear();
        CASL2Assembler.mockClear();
        CASL2UI.mockClear();

        simulatorUI = new CASL2SimulatorUI();
        document.body.appendChild(simulatorUI);
    });

    afterEach(() => {
        document.body.removeChild(simulatorUI);
    });

    // Web Componentsの動作確認テスト
    test('should create shadow DOM', () => {
        expect(simulatorUI.shadowRoot).not.toBeNull();
    });

    test('should render template and styles', () => {
        const template = simulatorUI.shadowRoot.querySelector('div');
        const style = simulatorUI.shadowRoot.querySelector('style');
        expect(template).not.toBeNull();
        expect(style).not.toBeNull();
    });

    // UIイベントハンドリングのテスト
    test('should setup event listeners', () => {
        const assembleBtn = simulatorUI.shadowRoot.getElementById('assembleBtn');
        const runBtn = simulatorUI.shadowRoot.getElementById('runBtn');
        const stepBtn = simulatorUI.shadowRoot.getElementById('stepBtn');
        const resetBtn = simulatorUI.shadowRoot.getElementById('resetBtn');

        expect(assembleBtn).not.toBeNull();
        expect(runBtn).not.toBeNull();
        expect(stepBtn).not.toBeNull();
        expect(resetBtn).not.toBeNull();

        // イベントリスナーが設定されているか確認
        expect(assembleBtn.onclick).not.toBeNull();
        expect(runBtn.onclick).not.toBeNull();
        expect(stepBtn.onclick).not.toBeNull();
        expect(resetBtn.onclick).not.toBeNull();
    });

    // 表示更新ロジックのテスト
    test('should update UI when simulator state changes', () => {
        const mockUpdateUI = jest.fn();
        simulatorUI.ui.updateUI = mockUpdateUI;

        simulatorUI.simulator.run();
        expect(mockUpdateUI).toHaveBeenCalled();
    });

    // outputメソッドのテスト
    test('should call output method on simulator', () => {
        const mockOutput = jest.fn();
        simulatorUI.simulator.output = mockOutput;

        simulatorUI.ui.assemble();
        expect(mockOutput).toHaveBeenCalled();
    });
});
