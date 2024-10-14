# CASL2シミュレータ

## 概要
このプロジェクトは、CASL2（Computer Architecture Simulator Language 2）のプログラムをブラウザ上で実行するシミュレータです。教育目的で使用することを想定しています。

## 特徴
- ブラウザ上で動作するCASL2シミュレータ
- モダンなUIデザイン（Skeletonフレームワーク使用）
- オフライン環境での実行が可能
- Web Components技術を活用した柔軟なUI

## 主な機能
- CASL2プログラムのアセンブルと実行
- ステップ実行機能
- ブレークポイントの設定と解除
- メモリとレジスタの状態表示と編集
- 入出力ログの表示
- 実行履歴の表示
- 詳細なデバッグ情報の表示
- RPUSH、RPOP命令のサポート
- 包括的なテストスイート

## 最新の更新
- RX命令（CPA、CPL）のアセンブル結果の問題が解決
- Misc命令（IN、OUT）のアセンブル結果の問題が解決
- すべてのテストケース（46個）が正常に通過
- プロジェクト文書の整理と更新（HANDOVER.md関連ファイルの分割）
- IMPLEMENTATION_CHECKLIST.mdのジャンル別分割

## 使用方法
1. `index.html`をウェブブラウザで開きます。
2. コードエディタにCASL2プログラムを入力します。
3. 「アセンブル」ボタンをクリックしてプログラムをアセンブルします。
4. 「実行」ボタンをクリックしてプログラムを実行します。
   - 「ステップ実行」ボタンで1命令ずつ実行することもできます。
5. 必要に応じてブレークポイントを設定します。
6. 実行結果とメモリ・レジスタの状態を確認します。
7. メモリやレジスタの内容を直接編集することができます。
8. 実行履歴と詳細なデバッグ情報を確認します。

## プロジェクト構造
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
├── docs/
│   ├── SPECIFICATION.md
│   ├── DEVELOPMENT.md
│   ├── HANDOVER.md
│   ├── HANDOVER_OVERVIEW.md
│   ├── HANDOVER_CURRENT_STATE.md
│   ├── HANDOVER_NEXT_STEPS.md
│   ├── HANDOVER_NOTES.md
│   ├── IMPLEMENTATION_CHECKLIST.md
│   ├── checklist_priority.md
│   ├── checklist_system.md
│   ├── checklist_assembler.md
│   ├── checklist_instructions.md
│   ├── checklist_pseudo_macro.md
│   ├── checklist_io.md
│   ├── checklist_execution.md
│   ├── checklist_error.md
│   └── checklist_additional.md
```

## 開発者向け情報
開発者向けの詳細な情報は、`docs/DEVELOPMENT.md`を参照してください。

## 仕様
CASL2シミュレータの詳細な仕様については、`docs/SPECIFICATION.md`を参照してください。

## テスト
プロジェクトには包括的なテストスイートが含まれています。テストの実行方法については、`docs/DEVELOPMENT.md`を参照してください。

## 進捗管理
プロジェクトの実装状況と進捗は、`docs/IMPLEMENTATION_CHECKLIST.md`とそれに関連する個別のチェックリストファイルで管理しています。以下のファイルを参照してください：

- `docs/checklist_priority.md`: 最優先事項
- `docs/checklist_system.md`: システム特性とレジスタ
- `docs/checklist_assembler.md`: アセンブラ言語の仕様と命令形式
- `docs/checklist_instructions.md`: 命令セット
- `docs/checklist_pseudo_macro.md`: 疑似命令、マクロ命令、マクロ機能
- `docs/checklist_io.md`: 入出力処理
- `docs/checklist_execution.md`: プログラム実行の手順
- `docs/checklist_error.md`: エラー処理
- `docs/checklist_additional.md`: 追加機能と文字コード

## プロジェクト引き継ぎ情報
プロジェクトの引き継ぎ情報は、以下のファイルに分割して管理されています：

- `docs/HANDOVER.md`: 引き継ぎ情報の概要と他のファイルへのリンク
- `docs/HANDOVER_OVERVIEW.md`: プロジェクトの概要、構造、リソース
- `docs/HANDOVER_CURRENT_STATE.md`: 現在の状態、更新されたファイル、最新の進捗状況
- `docs/HANDOVER_NEXT_STEPS.md`: 実装上の問題点と改善点、次のステップ、直近の課題
- `docs/HANDOVER_NOTES.md`: 一般的な注意点、追加の注意点

新しく参加する開発者は、これらのファイルを確認することで、プロジェクトの現状と今後の方向性を理解できます。

## 今後の開発計画
主な開発計画は以下の通りです：

1. カバレッジ向上のためのテストケース追加（特にcasl2-ui.js、debugger.js、casl2-test-suite.js）
2. エラー処理とバリデーションの強化
3. 未実装命令の実装
4. ユーザーインターフェースの改善（Canvas APIを使用した視覚化機能の追加など）
5. パフォーマンスの最適化

詳細な開発計画や優先タスクについては、`docs/HANDOVER_NEXT_STEPS.md`を参照してください。

## ライセンス
このプロジェクトは[ライセンス名]のもとで公開されています。詳細は`LICENSE`ファイルを参照してください。

## 貢献
バグ報告や機能リクエストは、Issueトラッカーを使用してください。プルリクエストも歓迎します。貢献の際は、`docs/DEVELOPMENT.md`に記載されているガイドラインを参照してください。

## 連絡先
[プロジェクト管理者の連絡先]
