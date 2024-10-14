export function getTemplate() {
    return `
        <div id="casl2-simulator">
            <div id="controls">
                <button id="assembleBtn" class="button-primary">アセンブル</button>
                <button id="runBtn">実行</button>
                <button id="stepBtn">ステップ実行</button>
                <button id="resetBtn">リセット</button>
            </div>
            <div id="testResult"></div>
            <div class="row">
                <div id="codeEditor" class="six columns">
                    <textarea id="editor" placeholder="CASL2 コードを入力してください"></textarea>
                </div>
                <div id="registerArea" class="three columns">
                    <h2>レジスタ</h2>
                    <div id="generalRegisters">
                        ${Array.from({ length: 8 }, (_, i) => `
                            <label for="GR${i}">GR${i}</label>
                            <input type="text" id="GR${i}" maxlength="4">
                        `).join('')}
                    </div>
                    <div id="specialRegisters">
                        <label for="PR">PR</label>
                        <input type="text" id="PR" maxlength="4">
                        <label for="SP">SP</label>
                        <input type="text" id="SP" maxlength="4">
                        <label for="FR">FR</label>
                        <input type="text" id="FR" maxlength="3">
                    </div>
                </div>
                <div id="memoryArea" class="three columns">
                    <h2>メモリ</h2>
                    <div id="memory"></div>
                    <div id="memoryEdit">
                        <input type="number" id="memoryAddress" placeholder="アドレス" min="0" max="65535">
                        <input type="text" id="memoryValue" placeholder="値">
                        <button id="updateMemoryBtn">更新</button>
                    </div>
                </div>
                <div id="outputArea" class="six columns">
                    <h2>実行結果・出力</h2>
                    <div id="output"></div>
                </div>
                <div id="ioLogArea" class="six columns">
                    <h2>入出力ログ</h2>
                    <div id="ioLog"></div>
                </div>
            </div>
        </div>
    `;
}
