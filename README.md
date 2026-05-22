# Create Your Account — Frontend Take-Home

Multi-step signup UI built from the Figma assignment (React + TypeScript). No backend — the flow is front-end only with fake delays where a real API would sit.

---

## Submission

| | Link |
|---|------|
| **Live app** | _add your Vercel/Netlify URL here_ |
---

## What’s in the app

The screens follow the order in the design files:

1. Pick account type (Personal / Business)  
2. Enter mobile number (+1, US flag)  
3. Enter 4-digit OTP (resend with cooldown)  
4. First & last name  
5. Password + confirm  
6. Success modal with a short summary  

Going **Back** keeps what you already typed — that’s on purpose so people don’t lose work when they review an earlier step.

---

## Run it locally

```bash
npm install
npm run dev
```

Then open whatever URL Vite prints (usually `http://localhost:5173`).

Other commands:

```bash
npm run build    # production build → dist/
npm run preview  # serve the production build locally
npm run lint     # ESLint
```

---

## Tech stack

- React 19 + TypeScript  
- Vite 8  
- CSS Modules (no Tailwind, MUI, or animation libraries)  
- Rubik from Google Fonts  

---

## How the code is organised

```
src/
├── components/
│   ├── layout/          SignupLayout (hero + page), FormCard
│   ├── steps/           One file per wizard step + StepNavigation
│   ├── ui/              Button, InputField, ProgressBar
│   ├── icons/           Small inline SVGs (person, briefcase, eye, shield)
│   ├── SignupFlow.tsx   Wires steps, validation, Continue/Back
│   └── SuccessModal.tsx
├── hooks/
│   └── useSignupWizard.ts
├── types/
│   └── signup.ts
└── utils/
    ├── validation.ts       Field rules + maskEmail for the summary
    └── stepValidation.ts   Per-step error maps used before Continue
```

**State:** Everything lives in `useSignupWizard` — current step, form fields, progress %, loading, and the success modal flag. I didn’t pull in Redux or similar; the flow is small enough that one hook plus local error state in `SignupFlow` felt right.

**Validation:** Step UIs stay mostly dumb. `SignupFlow` calls `getStepErrors()` when you hit Continue; invalid steps don’t advance. Errors clear when you move back or forward.

**Layout:** Desktop is a two-column page — hero copy + illustration on the left, white card on the right. The card height and vertical padding are tuned so the layout doesn’t scroll on large screens; smaller viewports can scroll normally.

**Assets:** PNGs for hero, flags, checkmark, success tick, etc. Background waves are an inline SVG in CSS (exporting the Figma wave as PNG gave a black background, so I went with SVG instead).

---

## What I focused on (vs the brief)

| Brief asks for | What I did |
|----------------|------------|
| Match Figma | Spacing, typography (Rubik), colors via CSS variables, card/progress/OTP layout |
| Interaction states | Hover/focus on buttons, inputs, account cards, OTP boxes; loading on Continue for mobile + submit |
| Validation / errors | Required fields, 10-digit mobile, 4-digit OTP, name rules, password length + match |
| Motion | Card enter, progress bar fill, modal fade/scale, step wrapper animation |
---

## Decisions & small extras

- **No real API.** Sending OTP and finishing signup wait ~900ms / ~1.2s with a spinner so the loading state is visible.  
- **Email on the success screen.** There’s no email step in the Figma sequence. The modal shows a masked placeholder built from the first name (`jo*****@example.com` style) so the summary still looks like the design.  
- **OTP resend.** 30s cooldown so the button isn’t spam-clickable.  
- **Password fields.** Show/hide toggle on both fields. Hint text uses the same strings as the validators so messaging stays consistent.  
- **Country code.** Fixed at +1 in the UI for now; not stored as editable state.





