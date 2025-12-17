# 簿記マスター - 勘定科目分類ゲーム

ゲーム感覚で簿記の勘定科目を5要素（資産・負債・純資産・収益・費用）に分類して学習できるWebアプリです。

## 起動方法

```bash
npm install
npm run dev
```

サーバーが起動したら、ブラウザで `http://localhost:5000` にアクセスしてください。

## 機能

### ホーム画面
- 今日の成績（連続学習日数、前回正答率、前回スコア）を表示
- 「スタート」「弱点帳」「設定」の3つのメインアクション

### ゲーム画面（分類）
- 勘定科目カードをドラッグ＆ドロップで5つのカテゴリに分類
- 正誤判定と理由の即時フィードバック
- スコア、コンボ、進捗表示
- 制限時間モード（オプション）

### 結果画面
- 正答数、不正解数、正答率、獲得スコア表示
- 称号システム（分類マスター、分類職人など）
- 間違えた科目の一覧と正しい分類・理由

### 弱点帳
- 間違えた回数の多い科目を優先表示
- 各科目の分類、理由、仕訳例を確認

### 設定
- 難易度選択（初級/中級）
- カード枚数設定（5〜20枚）
- 制限時間のオン/オフと秒数設定

## 技術スタック

- **フロントエンド**: React + TypeScript + Vite
- **スタイリング**: Tailwind CSS + shadcn/ui
- **ドラッグ＆ドロップ**: @dnd-kit/core
- **アニメーション**: Framer Motion
- **データ保存**: localStorage（ブラウザ内保存）

## データ構造

### 科目マスタ（30科目収録）

```typescript
interface Account {
  id: string;           // 英語ID
  name_ja: string;      // 日本語名
  category: CategoryType; // "asset" | "liability" | "equity" | "revenue" | "expense"
  explanation_ja: string; // 短い説明
  examples_ja?: string;  // 仕訳例（任意）
}
```

### ユーザーデータ

```typescript
interface UserData {
  lastPlayDate: string | null;
  streak: number;        // 連続学習日数
  totalGames: number;
  totalCorrect: number;
  totalWrong: number;
  weakAccounts: Record<string, number>; // 科目IDと間違えた回数
  recentResults: GameResult[];
  settings: GameSettings;
}
```

## 追加課題（次に作る機能）

1. **デイリーミッション**: 毎日の学習目標設定と達成報酬
2. **ローカルランキング**: 過去の自己ベストスコア一覧
3. **通知機能**: 学習リマインダー
4. **仕訳モード**: 借方・貸方を選んで仕訳を完成させる新ゲームモード
5. **問題生成**: ランダムな取引から適切な勘定科目を選ぶクイズ
6. **ダークモード**: 目に優しいダークテーマ対応
7. **実績/バッジシステム**: 学習継続や正答率に応じた称号獲得
8. **解説モード**: 各勘定科目の詳しい解説と例題

## ファイル構成

```
client/
├── src/
│   ├── components/
│   │   ├── game/
│   │   │   ├── DraggableCard.tsx    # ドラッグ可能なカード
│   │   │   ├── DroppableCategory.tsx # ドロップ先のカテゴリ枠
│   │   │   ├── FeedbackOverlay.tsx  # 正誤フィードバック表示
│   │   │   └── ScoreDisplay.tsx     # スコア・進捗表示
│   │   └── ui/                      # shadcn/uiコンポーネント
│   ├── context/
│   │   └── GameContext.tsx          # ゲーム状態管理
│   ├── data/
│   │   └── accounts.ts              # 勘定科目マスタデータ
│   ├── lib/
│   │   └── storage.ts               # localStorage操作
│   ├── pages/
│   │   ├── Home.tsx                 # ホーム画面
│   │   ├── Game.tsx                 # ゲーム画面
│   │   ├── Result.tsx               # 結果画面
│   │   ├── WeakPoints.tsx           # 弱点帳
│   │   └── Settings.tsx             # 設定画面
│   └── App.tsx                      # ルーティング設定
└── index.html

shared/
└── schema.ts                        # 型定義
```

## ライセンス

MIT
