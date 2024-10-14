export class CASL2AssemblerUtils {
    resolveAddress(address, labelTable) {
        console.log('Resolving address:', address);
        if (typeof address === 'number') {
            return this.validateAddress(address);
        }

        address = address.trim();

        if (address.startsWith('#')) {
            return this.parseNumericAddress(address.slice(1));
        } else if (address.startsWith('=')) {
            return this.handleImmediate(address);
        } else if (labelTable.has(address)) {
            return labelTable.get(address);
        } else if (this.isNumeric(address)) {
            return this.parseNumericAddress(address);
        } else {
            throw new Error(`無効なアドレスまたはラベル: ${address}`);
        }
    }

    parseNumericAddress(value) {
        let numValue;
        if (value.startsWith('0x') || value.startsWith('0X')) {
            numValue = parseInt(value.slice(2), 16);
        } else {
            numValue = parseInt(value, 10);
        }
        return this.validateAddress(numValue);
    }

    validateAddress(value) {
        if (isNaN(value) || value < 0 || value > 0xFFFF) {
            throw new Error(`無効なアドレス値: ${value} (0から65535の範囲内である必要があります)`);
        }
        return value;
    }

    handleImmediate(value) {
        console.log('Handling immediate value:', value);
        const immediateValue = parseInt(value.slice(1), 10);
        if (isNaN(immediateValue)) {
            throw new Error(`無効な即値: ${value} (数値である必要があります)`);
        }
        if (immediateValue < -32768 || immediateValue > 32767) {
            throw new Error(`即値が16ビットの範囲外です: ${value} (-32768から32767の範囲内である必要があります)`);
        }
        return immediateValue & 0xFFFF; // 16ビットの範囲内に収める
    }

    parseRegister(r) {
        console.log('Parsing register:', r);
        if (!r.startsWith('GR')) {
            throw new Error(`無効なレジスタ指定: ${r} (GRで始まる必要があります)`);
        }
        const regNum = parseInt(r.slice(2), 10);
        if (isNaN(regNum) || regNum < 0 || regNum > 7) {
            throw new Error(`無効なレジスタ番号: ${r} (0から7の範囲内である必要があります)`);
        }
        return regNum;
    }

    isNumeric(str) {
        return /^-?\d+$/.test(str) || /^0x[0-9A-Fa-f]+$/.test(str);
    }
}
