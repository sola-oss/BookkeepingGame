# 簿記ゲーム - Design Guidelines

## Design Approach

**System-Based with Gamification**: Using Material Design principles adapted for educational gaming. The interface should feel approachable and encouraging, not intimidating like traditional accounting software.

**Key Design Principles:**
- Clear, immediate feedback for learning
- Gamified progress indicators to maintain motivation
- Clean hierarchy that emphasizes the learning content
- Japanese-first design with clear typography

---

## Typography

**Font Families:**
- Primary: 'Noto Sans JP' (Google Fonts) - Clean, highly readable for Japanese text
- Monospace: 'JetBrains Mono' - For numerical values and account codes

**Hierarchy:**
- Page titles: text-3xl/font-bold
- Section headers: text-xl/font-semibold
- Problem text: text-lg/font-medium
- Form labels: text-sm/font-medium
- Account names: text-base
- Numbers/scores: text-2xl/font-bold (monospace)

---

## Layout System

**Spacing Primitives:** Use Tailwind units of 2, 4, 6, and 8 consistently (e.g., p-4, gap-6, m-8)

**Container Structure:**
- Max width: max-w-4xl mx-auto
- Padding: px-4 md:px-8
- Vertical spacing between sections: space-y-8

---

## Core Components

### Game Header
- Logo/title on left, score and level indicators on right
- Sticky positioning (sticky top-0)
- Clean separator border at bottom
- Height: h-16

### Problem Display Card
- Large card with rounded corners (rounded-lg)
- Clear problem scenario text
- Transaction details in structured format
- Subtle border treatment

### Journal Entry Form
- Two-column grid layout (借方 | 貸方)
- Dropdown selects for account selection
- Number inputs for amounts with monospace font
- Aligned vertically with clear labels
- Submit button: Full-width, prominent

### Account Reference Panel
- Collapsible sidebar or bottom sheet
- Categorized account list (資産/負債/純資産/収益/費用)
- Search functionality
- Compact list items with category badges

### Feedback Display
- Immediate visual feedback (correct/incorrect) after submission
- Animated checkmark/X icon
- Explanation text for incorrect answers
- "Next problem" action button

### Score Dashboard
- Current score display (large, prominent)
- Streak counter with flame/lightning icon
- Progress bar showing level completion
- Statistics: 正解率, 連続正解 displayed as cards

---

## Navigation & Flow

**Single-page application structure:**
- Main game interface is always visible
- Modal overlays for: settings, tutorial, account reference
- Smooth transitions between problems (slide/fade)

---

## Interactive Elements

**Buttons:**
- Primary (submit answer): Solid, bold with icon
- Secondary (skip/hint): Outlined style
- Icon buttons: For help, settings (top-right corner)

**Form Inputs:**
- Dropdowns: Native select with custom styling
- Number inputs: Large touch targets, increment/decrement buttons
- Focus states: Clear ring indicator

**Animations:**
- Success: Gentle bounce + fade-in checkmark
- Error: Subtle shake + fade-in X mark
- Score increase: Number count-up animation
- Keep animations minimal and functional

---

## Images

**No hero image required** - This is a utility-focused game interface.

**Icon usage:**
- Use Heroicons (outline style) via CDN
- Key icons: CheckCircle, XCircle, QuestionMarkCircle, ChartBar, BookOpen, LightBulb

---

## Accessibility

- All form inputs have visible labels
- Focus indicators on all interactive elements
- Sufficient color contrast for text
- Keyboard navigation support (Tab through form fields)
- ARIA labels for icon-only buttons

---

## Mobile Considerations

- Form inputs: Stack vertically on mobile, side-by-side on desktop (md:grid-cols-2)
- Account reference: Bottom sheet on mobile, sidebar on desktop
- Touch-friendly button sizes (min-h-12)
- Simplified header on small screens

---

This design creates a clean, focused learning environment that feels like a modern educational app rather than traditional accounting software, encouraging practice through clear feedback and gamification elements.