export function runTest(component) {
    const testProgram = `
PROGRAM  START
         LD    GR1,=1
         LD    GR2,=2
         ADDA  GR1,GR2
         RET
         END
`;
    component.shadowRoot.getElementById('editor').value = testProgram;
    component.ui.assemble();
    component.simulator.run();
    component.ui.updateUI();
    
    const gr1Value = component.simulator.registers[1];
    const gr2Value = component.simulator.registers[2];
    const testPassed = gr1Value === 3 && gr2Value === 2;
    
    const testResult = `
        <h3>テスト結果</h3>
        <p>GR1: ${gr1Value} (期待値: 3)</p>
        <p>GR2: ${gr2Value} (期待値: 2)</p>
        <p>テスト ${testPassed ? '成功' : '失敗'}</p>
    `;
    
    component.ui.displayTestResult(testResult);
}
