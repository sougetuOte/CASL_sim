# CASL2シミュレータ プロジェクト引き継ぎ文書 - 概要

## 1. プロジェクト概要
CASL2シミュレータは、CASL2（Computer Architecture Simulator Language 2）のプログラムをブラウザ上で実行するシミュレータです。教育目的での使用を想定しています。

### 主な特徴
- ブラウザ上で動作するCASL2シミュレータ
- モダンなUIデザイン（Skeletonフレームワーク使用）
- オフライン環境での実行が可能
- Web Components技術を活用した柔軟なUI

### 主な機能
- CASL2プログラムのアセンブルと実行
- ステップ実行機能
- ブレークポイントの設定と解除
- メモリとレジスタの状態表示と編集
- 入出力ログの表示
- 実行履歴の表示
- 詳細なデバッグ情報の表示
- RPUSH、RPOP命令のサポート

## 2. プロジェクト構造
```
CASL_sim/
│
├── index.html
├── styles.css
├── skeleton.css
├── normalize.css
├── casl2-core.js
├── casl2-assembler.js
├── casl2-ui.js
├── debugger.js
├── config.js
├── instruction-set.js
├── README.md
├── SPECIFICATION.md
├── DEVELOPMENT.md
├── HANDOVER_OVERVIEW.md
├── HANDOVER_CURRENT_STATE.md
├── HANDOVER_NEXT_STEPS.md
├── HANDOVER_NOTES.md
└── IMPLEMENTATION_CHECKLIST.md
```

## 3. リソース
- CASL2言語仕様書
- 既存のCASLシミュレータの実装例（参考用）
- Resources/CASLシミュレータ/内の画像（UIデザインの参考）
- test_cases/ディレクトリ内のテストケース（機能テストの参考）
- CASL2命令セットの詳細ドキュメント（instruction-set.jsファイル内のコメントも参照）

## 4. 連絡先
問題や質問がある場合は、[担当者の連絡先]に連絡してください。
