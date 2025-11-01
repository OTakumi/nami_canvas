# Nami Canvas

## アプリケーションの目的

Sin波やCos波などの波形をリアルタイムで可視化し、インタラクティブにパラメータを調整できるWebアプリケーションです。

## 主な機能

- 波形の可視化: Sin波またはCos波をグラフ表示
- リアルタイム更新: パラメータ変更時に即座にグラフを更新
- パラメータ調整:
  - 波形タイプ: Sin波/Cos波の切り替え
  - 周波数: 0〜10の範囲で0.1刻みで調整
  - 振幅: 0〜5の範囲で0.1刻みで調整
- レスポンシブデザイン: 画面サイズに応じて自動的にレイアウトを調整

<img width="1562" height="737" alt="image" src="https://github.com/user-attachments/assets/66bd7056-6a38-4c7d-bff9-0ec2b29af25a" />


## 技術スタック

- フレームワーク: Next.js 16.0.0 (App Router, Turbopack)
- 言語: TypeScript
- グラフ描画: Recharts 3.3.0

## セットアップ

### 必要な環境

- Node.js 18.x 以上
- pnpm (推奨) または npm/yarn

### インストール手順

```bash
# リポジトリのクローン
git clone https://github.com/OTakumi/nami_canvas.git
cd nami_canvas

# 依存関係のインストール
pnpm install

# 開発サーバーの起動
pnpm dev
```

### アクセス方法

開発サーバー起動後、以下のURLにアクセス:

- **アプリケーション**: [http://localhost:3000/wave-visualization](http://localhost:3000/wave-visualization)
- **Storybook**: [http://localhost:6006](http://localhost:6006) (別途起動が必要)

## 開発コマンド

```bash
# 開発サーバーの起動
pnpm dev

# プロダクションビルド
pnpm build

# プロダクションサーバーの起動
pnpm start

# リンターの実行
pnpm lint

```

## Storybook

このプロジェクトはコンポーネントの開発、テストにStorybookを使用しています。

### Storybookの実行

```bash
pnpm storybook
```

### Building Storybook

```bash
pnpm build-storybook
```

### コンポーネント一覧

Storybookで以下のコンポーネントを確認できます:

- **WaveGraph**: 波形グラフコンポーネント
  - 様々な波形タイプ、振幅、周波数の表示例
  - グリッドや軸ラベルの表示/非表示
  - カスタムスタイリングのサンプル

- **WaveControlPanel**: パラメータ調整パネル
  - 波形タイプ選択（Sin/Cos）
  - 周波数・振幅の数値入力
  - インタラクティブな動作確認

## テスト

このプロジェクトではVitestを使用して単体テストを実装しています。

```bash
# 全てのテストを実行
pnpm test

# 特定のコンポーネントのテストを実行
pnpm test WaveGraph
pnpm test WaveControlPanel

# ウォッチモードを無効にして実行
pnpm test run

# カバレッジレポートを生成
pnpm test --coverage
```

### テスト対象

- **コンポーネントテスト**:
  - WaveGraph: レンダリング、プロパティ変更、スタイリング
  - WaveControlPanel: ユーザー操作、コールバック、バリデーション

- **ユーティリティテスト**:
  - waveUtils: 波形計算ロジックの正確性
