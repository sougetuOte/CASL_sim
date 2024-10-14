// CASL2シミュレータの設定とリテラル

export const CASL2Config = {
    // メッセージ
    messages: {
        assembleComplete: 'アセンブル完了',
        resetSimulator: 'シミュレータをリセットしました',
        invalidBreakpointAddress: '無効なブレークポイントアドレス',
        setBreakpoint: 'ブレークポイントを設定: ',
        clearBreakpoint: 'ブレークポイントを解除: ',
        breakpointNotFound: 'ブレークポイントが見つかりません: ',
        updateRegisters: 'レジスタを更新しました',
        updateMemory: 'メモリを更新しました: アドレス ',
        invalidRegisterIndex: '無効なレジスタインデックス: ${index}',
        invalidMemoryAddress: '無効なメモリアドレス: ${address}',
        inputCancelled: '入力がキャンセルされました。',
        invalidInput: '無効な入力です。-32768から65535の範囲の整数を入力してください。',
        inInstruction: 'IN命令: GR',
        outInstruction: 'OUT命令: アドレス',
        unknownInstruction: '未知の命令: ',
        breakpointReached: 'ブレークポイントに到達: ${address}',
        programExecutionComplete: 'プログラム実行完了',
        programTerminated: 'プログラム終了: ${reason}',
        executionError: '実行エラー: ${error}',
        invalidStackPointer: '無効なスタックポインタ: ${SP}',
        unimplementedInstruction: '未実装の命令: ${opcode}'
    },

    // ラベル
    labels: {
        assemble: 'アセンブル',
        run: '実行',
        stepExecution: 'ステップ実行',
        reset: 'リセット',
        setBreakpoint: 'ブレークポイント設定',
        clearBreakpoint: 'ブレークポイント解除',
        updateRegister: 'レジスタ更新',
        updateMemory: 'メモリ更新',
        address: 'アドレス',
        value: '値'
    },

    // デフォルト値
    defaults: {
        memorySize: 65536,
        registerCount: 8,
        editorPlaceholder: 'CASL2 コードを入力してください'
    }
};

export const getConfig = () => CASL2Config;

export const getMessage = (key, params = {}) => {
    const message = CASL2Config.messages[key] || '';
    return message.replace(/\${(\w+)}/g, (_, p) => params[p] || '');
};

export const getLabel = (key) => CASL2Config.labels[key] || '';

export const getDefault = (key) => CASL2Config.defaults[key];
