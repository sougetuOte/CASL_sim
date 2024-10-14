# CASL2シミュレータ プロジェクト引き継ぎ文書

このドキュメントは、CASL2シミュレータプロジェクトの引き継ぎ情報を提供します。詳細な情報は以下のファイルに分割されています：

1. [HANDOVER_OVERVIEW.md](HANDOVER_OVERVIEW.md) - プロジェクトの概要、構造、リソース
2. [HANDOVER_CURRENT_STATE.md](HANDOVER_CURRENT_STATE.md) - 現在の状態、更新されたファイル、最新の進捗状況
3. [HANDOVER_NEXT_STEPS.md](HANDOVER_NEXT_STEPS.md) - 実装上の問題点と改善点、次のステップ、直近の課題
4. [HANDOVER_NOTES.md](HANDOVER_NOTES.md) - 一般的な注意点、追加の注意点

プロジェクトの作業を開始する前に、これらのドキュメントを注意深く読んでください。質問や問題がある場合は、[担当者の連絡先]に連絡してください。

## 最新の進捗状況

- RX命令（CPA、CPL）のアセンブル結果の問題が解決されました。
- Misc命令（IN、OUT）のアセンブル結果の問題が解決されました。
- すべてのテストケース（46個）が正常に通過しました。
- プロジェクト文書が整理され、HANDOVER.md関連ファイルが分割されました。
- IMPLEMENTATION_CHECKLIST.mdがジャンル別に分割され、より管理しやすくなりました。

## 現在の優先事項

1. テストケースの追加と品質保証の強化
   - 特にcasl2-ui.js、debugger.js、casl2-test-suite.jsのカバレッジ改善に注力
2. UI/UX改善
   - ユーザーインターフェースのレイアウト最適化
   - 操作性の向上
   - エラーメッセージの改善
3. 残りの実装項目の優先順位付けと開発ロードマップの作成
4. エラー処理とバリデーションの強化
5. 未実装命令の実装
6. パフォーマンスの最適化

詳細な開発計画や優先タスクについては、[HANDOVER_NEXT_STEPS.md](HANDOVER_NEXT_STEPS.md)を参照してください。

## 実装チェックリスト

プロジェクトの実装状況は、以下のファイルに分割されたチェックリストで管理されています：

- [IMPLEMENTATION_CHECKLIST.md](IMPLEMENTATION_CHECKLIST.md) - チェックリストの概要と各ファイルへのリンク
- [checklist_priority.md](checklist_priority.md) - 最優先事項
- [checklist_system.md](checklist_system.md) - システム特性とレジスタ
- [checklist_assembler.md](checklist_assembler.md) - アセンブラ言語の仕様と命令形式
- [checklist_instructions.md](checklist_instructions.md) - 命令セット
- [checklist_pseudo_macro.md](checklist_pseudo_macro.md) - 疑似命令、マクロ命令、マクロ機能
- [checklist_io.md](checklist_io.md) - 入出力処理
- [checklist_execution.md](checklist_execution.md) - プログラム実行の手順
- [checklist_error.md](checklist_error.md) - エラー処理
- [checklist_additional.md](checklist_additional.md) - 追加機能と文字コード

これらのチェックリストを定期的に確認し、更新することで、プロジェクトの進捗を効果的に管理できます。

プロジェクトの改善を継続し、特にカバレッジの低いファイルのテスト強化に注力してください。
