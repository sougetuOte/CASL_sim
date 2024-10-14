# CASL2シミュレータ 開発者ガイド

## 1. 開発環境のセットアップ
- 必要なソフトウェア
  - 最新のウェブブラウザ（Chrome、Edge、Firefoxなど）
  - テキストエディタまたはIDE（Visual Studio Code推奨）
  - Node.js（テスト実行用）
- ローカル開発サーバーのセットアップ（オプション）

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
├── HANDOVER.md
└── IMPLEMENTATION_CHECKLIST.md
```

## 3. コーディング規約
- JavaScript: [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)に準拠
- HTML/CSS: [Google HTML/CSS Style Guide](https://google.github.io/styleguide/htmlcssguide.html)に準拠
- コメント: JSDocスタイルのコメントを使用

## 4. 開発ワークフロー
1. 機能ブランチの作成
2. コードの実装
3. テストの作成と実行
4. コードレビュー
5. マージ

## 5. テスト
- Jestを使用した単体テスト
- テストカバレッジ目標: 80%以上
- `npm test`コマンドでテストを実行

## 6. ビルドプロセス
- 現在はビルドプロセスなし（将来的にWebpackなどの導入を検討）

## 7. デバッグ
- ブラウザの開発者ツールを使用
- console.logを適切に使用（本番環境では削除すること）
- デバッガークラス（debugger.js）を活用

## 8. パフォーマンス最適化
- メモリ使用量の監視
- 実行速度の定期的な計測
- ボトルネックの特定と改善

## 9. セキュリティ考慮事項
- ユーザー入力のバリデーションとサニタイゼーション
- クロスサイトスクリプティング（XSS）対策

## 10. ドキュメンテーション
- コード内のコメント
- README.mdの更新
- SPECIFICATION.mdの更新
- HANDOVER.mdの更新
- IMPLEMENTATION_CHECKLIST.mdの更新
- APIドキュメントの生成（JSDoc使用）

## 11. バージョン管理
- セマンティックバージョニングの使用
- CHANGELOGの維持

## 12. 貢献ガイドライン
- イシューの作成
- プルリクエストのプロセス
- コードレビューのガイドライン

## 13. ライセンス
- [ライセンス名]に基づくライセンス管理

## 14. 連絡先
- 開発チームの連絡先情報
- コミュニティリソース（フォーラム、メーリングリストなど）

## 15. 今後の開発計画
- 短期的な目標
  - エラー処理の強化
  - 未実装命令の実装完了
  - テストカバレッジの向上
- 長期的なロードマップ
  - Canvas APIを使用した視覚化機能の追加
  - ユーザーインターフェースの大幅な改善
  - パフォーマンスの最適化
  - 隠しコマンド（MULA、MULL、DIVA、DIVL）の実装

## 16. 進捗管理
- IMPLEMENTATION_CHECKLIST.mdを使用して実装の進捗を管理
- 定期的にチェックリストを更新し、進捗状況を把握

注意: 開発を進める際は、HANDOVER.mdに記載されている現在の状態と次のステップを常に参照してください。
