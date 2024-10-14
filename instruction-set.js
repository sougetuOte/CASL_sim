// CASL2命令セットの定義と説明

export const CASL2InstructionSet = {
    // データ転送
    LD: {
        opcode: 0x10,
        format: 'R,R',
        description: '第2オペランドの内容を第1オペランドにロードします。'
    },
    ST: {
        opcode: 0x11,
        format: 'R,R',
        description: '第1オペランドの内容を第2オペランドが指すアドレスに格納します。'
    },
    LAD: {
        opcode: 0x12,
        format: 'R,adr',
        description: '実効アドレスを第1オペランドにロードします。'
    },

    // 算術演算
    ADDA: {
        opcode: 0x20,
        format: 'R,R',
        description: '第1オペランドと第2オペランドの内容を加算し、結果を第1オペランドに格納します。'
    },
    SUBA: {
        opcode: 0x21,
        format: 'R,R',
        description: '第1オペランドから第2オペランドの内容を減算し、結果を第1オペランドに格納します。'
    },
    ADDL: {
        opcode: 0x22,
        format: 'R,R',
        description: '第1オペランドと第2オペランドの内容を論理加算し、結果を第1オペランドに格納します。'
    },
    SUBL: {
        opcode: 0x23,
        format: 'R,R',
        description: '第1オペランドから第2オペランドの内容を論理減算し、結果を第1オペランドに格納します。'
    },

    // 論理演算
    AND: {
        opcode: 0x30,
        format: 'R,R',
        description: '第1オペランドと第2オペランドの内容の論理積を第1オペランドに格納します。'
    },
    OR: {
        opcode: 0x31,
        format: 'R,R',
        description: '第1オペランドと第2オペランドの内容の論理和を第1オペランドに格納します。'
    },
    XOR: {
        opcode: 0x32,
        format: 'R,R',
        description: '第1オペランドと第2オペランドの内容の排他的論理和を第1オペランドに格納します。'
    },

    // 比較
    CPA: {
        opcode: 0x40,
        format: 'R,R',
        description: '第1オペランドと第2オペランドの内容を比較し、結果をフラグレジスタに設定します。'
    },
    CPL: {
        opcode: 0x41,
        format: 'R,R',
        description: '第1オペランドと第2オペランドの内容を論理比較し、結果をフラグレジスタに設定します。'
    },

    // シフト
    SLA: {
        opcode: 0x50,
        format: 'R,adr',
        description: '第1オペランドの内容を第2オペランドで指定したビット数だけ算術左シフトします。'
    },
    SRA: {
        opcode: 0x51,
        format: 'R,adr',
        description: '第1オペランドの内容を第2オペランドで指定したビット数だけ算術右シフトします。'
    },
    SLL: {
        opcode: 0x52,
        format: 'R,adr',
        description: '第1オペランドの内容を第2オペランドで指定したビット数だけ論理左シフトします。'
    },
    SRL: {
        opcode: 0x53,
        format: 'R,adr',
        description: '第1オペランドの内容を第2オペランドで指定したビット数だけ論理右シフトします。'
    },

    // 分岐
    JMI: {
        opcode: 0x61,
        format: 'adr',
        description: 'フラグレジスタのSFが1の場合、指定されたアドレスにジャンプします。'
    },
    JNZ: {
        opcode: 0x62,
        format: 'adr',
        description: 'フラグレジスタのZFが0の場合、指定されたアドレスにジャンプします。'
    },
    JZE: {
        opcode: 0x63,
        format: 'adr',
        description: 'フラグレジスタのZFが1の場合、指定されたアドレスにジャンプします。'
    },
    JUMP: {
        opcode: 0x64,
        format: 'adr',
        description: '無条件に指定されたアドレスにジャンプします。'
    },
    JPL: {
        opcode: 0x65,
        format: 'adr',
        description: 'フラグレジスタのSFが0の場合、指定されたアドレスにジャンプします。'
    },
    JOV: {
        opcode: 0x66,
        format: 'adr',
        description: 'フラグレジスタのOFが1の場合、指定されたアドレスにジャンプします。'
    },

    // スタック操作
    PUSH: {
        opcode: 0x70,
        format: 'R',
        description: '第1オペランドの内容をスタックにプッシュします。'
    },
    POP: {
        opcode: 0x71,
        format: 'R',
        description: 'スタックから値をポップし、第1オペランドに格納します。'
    },
    RPUSH: {
        opcode: 0x72,
        format: '',
        description: 'すべての汎用レジスタの内容をスタックにプッシュします。'
    },
    RPOP: {
        opcode: 0x73,
        format: '',
        description: 'スタックから値をポップし、すべての汎用レジスタに格納します。'
    },

    // サブルーチン
    CALL: {
        opcode: 0x80,
        format: 'adr',
        description: 'サブルーチンを呼び出します。'
    },
    RET: {
        opcode: 0x81,
        format: '',
        description: 'サブルーチンから戻ります。'
    },

    // その他
    NOP: {
        opcode: 0x00,
        format: '',
        description: '何も行いません。'
    },
    SVC: {
        opcode: 0xF0,
        format: 'adr',
        description: 'スーパーバイザコールを実行します。'
    },

    // 疑似命令
    START: {
        format: 'adr',
        description: 'プログラムの開始アドレスを指定します。'
    },
    END: {
        format: '',
        description: 'プログラムの終了を示します。'
    },
    DS: {
        format: 'size',
        description: 'データ領域を確保します。'
    },
    DC: {
        format: 'value',
        description: '定数を定義します。'
    }
};

export const getInstructionInfo = (mnemonic) => {
    const info = CASL2InstructionSet[mnemonic.toUpperCase()];
    return info ? { mnemonic: mnemonic.toUpperCase(), ...info } : null;
};

export const isValidInstruction = (mnemonic) => {
    return mnemonic.toUpperCase() in CASL2InstructionSet;
};

export const getOpcode = (mnemonic) => {
    const info = getInstructionInfo(mnemonic);
    return info ? info.opcode : null;
};

export const getInstructionFormat = (mnemonic) => {
    const info = getInstructionInfo(mnemonic);
    return info ? info.format : null;
};

export const getInstructionDescription = (mnemonic) => {
    const info = getInstructionInfo(mnemonic);
    return info ? info.description : null;
};
