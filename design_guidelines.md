# 簿記3級学習アプリ - Design Guidelines

## Design Approach

**Gamified Learning System**: Material Design principles enhanced with vibrant motivational elements. The interface creates an uplifting, achievement-focused environment that celebrates progress and sustains engagement.

**Core Principles:**
- Immediate positive reinforcement through visual rewards
- Prominent gamification that drives daily return
- Energetic yet focused hierarchy emphasizing achievement
- Japanese-first with celebratory visual language

---

## Typography

**Font Families:**
- Primary: 'Noto Sans JP' (Google Fonts) - Clear Japanese readability
- Accent: 'Outfit' (Google Fonts) - Bold, friendly feel for scores/stats
- Monospace: 'JetBrains Mono' - Numbers and account codes

**Hierarchy:**
- Achievement headlines: text-4xl/font-black (Outfit)
- Page titles: text-3xl/font-bold
- Stats/scores: text-3xl/font-bold (Outfit, monospace for numbers)
- Section headers: text-xl/font-semibold
- Problem text: text-lg/font-medium
- Labels: text-sm/font-medium
- Fine print: text-xs

---

## Layout System

**Spacing Primitives:** Tailwind units of 2, 4, 6, and 8 (p-4, gap-6, m-8, py-8)

**Container Structure:**
- Game area: max-w-4xl mx-auto
- Dashboard: max-w-6xl mx-auto (wider for stats grid)
- Consistent padding: px-4 md:px-8
- Section spacing: space-y-8 or gap-8

---

## Core Components

### Motivational Dashboard (Top Priority)
- Hero stats panel with current streak prominently displayed
- 3-column grid (desktop) / stacked (mobile): 総スコア | 連続日数 | 今日の進捗
- Large animated numbers with suffix badges
- Progress ring/bar showing daily goal completion
- Recent badges carousel with shine/glow effects
- Compact calendar heatmap showing learning activity

### Achievement System Display
- Badge showcase grid (3-4 columns)
- Locked badges shown with silhouette + unlock requirements
- Earned badges: Full vibrant display with earned date
- Next milestone indicator with progress bar
- Celebration modal for new badge unlocks with confetti animation

### Game Header
- Logo + level badge on left
- Center: Current problem count (e.g., "問題 5/20")
- Right: Live score counter with +points animation on correct answers
- Sticky positioning (sticky top-0 z-50)
- Height: h-20 (extra space for prominence)

### Problem Display Card
- Elevated card with gradient border treatment
- Problem scenario in structured format with icons
- Visual difficulty indicator (星 rating)
- Timer display with circular progress (if timed mode)
- Rounded-xl with generous padding (p-8)

### Journal Entry Form
- Side-by-side debit/credit (借方 | 貸方) grid
- Large, touch-friendly dropdowns with search
- Monospace number inputs with subtle background
- Visual alignment guides (dotted lines between sides)
- Prominent submit button with icon (full-width, py-4)
- Quick reference panel: Collapsible account cheat sheet

### Feedback Experience
- Full-screen success celebration: Animated checkmark, confetti burst, +points flyup
- Gentle error state: Shake animation, helpful explanation card, hint button reveal
- Explanation panel: Side-by-side comparison (あなたの回答 vs 正解)
- Encouraging messages rotation ("素晴らしい！", "完璧！", "頑張りました！")
- Auto-advance to next problem (3-second countdown) or manual button

### Statistics Dashboard Section
- Card grid layout: 正解率 | 平均解答時間 | 得意な仕訳 | 苦手な仕訳
- Donut/bar charts using visual data representation
- Weekly progress line graph
- Category breakdown (資産/負債 etc.) radar chart
- Each stat card: Large number + trend indicator (↑↓) + descriptive label

### Daily Challenge Card
- Special highlighted section on dashboard
- Today's challenge problem preview
- Bonus points indicator
- Completion checkbox with celebration trigger

### Level Progression Display
- XP bar showing progress to next level
- Current level badge (animated on level-up)
- Next level preview with unlock rewards
- Level-up modal: Full celebration with new features unlocked

---

## Navigation Structure

**Tab-based navigation:**
- Main tabs: 学習 (practice) | 統計 (stats) | バッジ (achievements) | 設定
- Persistent bottom navigation on mobile
- Top horizontal tabs on desktop
- Active tab with underline indicator + icon

**Modals:**
- Tutorial/onboarding overlay
- Badge detail view
- Settings panel
- Account reference (searchable, categorized)

---

## Interactive Elements

**Buttons:**
- Primary: Solid with shadow, icon + text, min-h-12
- Success state: Vibrant with pulse effect
- Secondary: Outlined, subtle hover lift
- Icon buttons: Circle background, clear tap target (min-w-10 min-h-10)

**Cards:**
- Elevated with hover lift effect (hover:translate-y-[-2px])
- Rounded-xl with border or gradient border
- Stats cards: Background gradient with icon

**Progress Indicators:**
- Circular progress rings for streaks/completion
- Linear bars with animated fill
- Step indicators for multi-part problems

**Animations:**
- Badge earn: Scale-in + rotate + confetti
- Score increase: Number count-up + color pulse
- Streak milestone: Flame animation burst
- Success: Bounce + fade-in with sparkle
- Transitions: Smooth fade/slide (300ms)

---

## Images & Icons

**No large hero image** - Utility-focused learning interface

**Icon System:**
- Heroicons (outline + solid) via CDN
- Success: CheckCircleIcon (solid), Trophy, Star
- Progress: ChartBarIcon, FireIcon (streak), CalendarIcon
- Learning: BookOpenIcon, LightBulbIcon, AcademicCapIcon
- Navigation: HomeIcon, ChartPieIcon, SparklesIcon, CogIcon

**Badge Illustrations:**
- SVG badge designs with gradient fills
- Achievement categories: 連続達成 (flame), 完璧正解 (star), 速度 (lightning), マスター (trophy)

---

## Accessibility

- High contrast ratios maintained throughout
- All interactive elements have visible focus rings (ring-2)
- Form labels always visible (no placeholder-only)
- Keyboard navigation: Full tab order, Enter to submit
- ARIA labels on all icon-only buttons
- Success/error states communicated through text + icon (not color alone)
- Reduced motion fallback for animations

---

## Mobile Optimization

- Bottom navigation bar (fixed bottom-0)
- Stats grid: 2-column on tablet, 1-column on mobile
- Form inputs: Stacked on mobile (grid-cols-1), side-by-side on md:grid-cols-2
- Touch targets: Minimum 44×44px
- Modal overlays: Full-screen on mobile
- Swipe gestures: Next/previous problem, dismiss modals

---

This design transforms learning into an exciting, rewarding journey with constant positive reinforcement, clear progress visualization, and celebration of every achievement—creating addictive engagement that sustains daily practice habits.