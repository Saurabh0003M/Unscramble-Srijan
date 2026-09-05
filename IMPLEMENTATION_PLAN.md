# Implementation Plan: Integrate Voice Intake Call Demo & Case Briefing Suite

Integrate the missing citizen voice intake call demo, AI case-briefing reviewer dashboard, and advocate marketplace from the downloaded Bolt project (`project/`) into the main repository (`Unscramble-Srijan`), wire them into the NyaySetu portal navigation and case lifecycle, and push the branch to GitHub.

## User Review Required

> [!IMPORTANT]
> - A new git branch named `feat/voice-intake-call-demos` will be created in `Unscramble-Srijan`.
> - Changes will be committed and pushed to `origin feat/voice-intake-call-demos` on GitHub (`https://github.com/Saurabh0003M/Unscramble-Srijan`).
> - The Voice Intake suite will be accessible directly from the top navigation bar via a new **"AI Call Intake (कॉल डेमो)"** tab, providing the complete citizen call simulation -> case brief generation -> reviewer triage -> advocate marketplace flow.
> - An action to "Convert to Official Matter" will be provided so intake briefs can be seamlessly promoted to active NyaySetu litigation matters.

---

## Proposed Changes

### 1. Types & Data Layer

#### [NEW] [voiceIntake.ts](file:///d:/chrome%20download/project-bolt-sb1-uolnshn4/Unscramble-Srijan/frontend/src/types/voiceIntake.ts)
- Define TypeScript types: `CallStatus`, `PriorityCategory`, `ComplexityCategory`, `AdvocateTier`, `IntakeCaseStatus`, `MatterType`, `VerificationStatus`, `ApplicationStatus`, `ChronologyEvent`, `Contradiction`, `AuditLogEntry`, `FactItem`, `CaseData`, `Advocate`, `ActiveTab`, `AppData`.

#### [NEW] [mockVoiceData.ts](file:///d:/chrome%20download/project-bolt-sb1-uolnshn4/Unscramble-Srijan/frontend/src/data/mockVoiceData.ts)
- Provide initial state data:
  - Base case `CB-2026-000123` (Cyber fraud victim Ravi Kumar, ₹45,000 UPI theft, priority score 85, audio timestamps, chronology, contradictions, key facts, missing info).
  - Additional intake cases (Domestic violence, Property boundary encroachment, Consumer defective warranty).
  - Advocate marketplace roster with tiers, match scores, practice areas, and SLAs.

---

### 2. UI Components & Visualizations

#### [NEW] [RadialGauge.tsx](file:///d:/chrome%20download/project-bolt-sb1-uolnshn4/Unscramble-Srijan/frontend/src/components/voice/RadialGauge.tsx)
- Animated SVG radial gauge showing priority score (0–100) with color mapping and smooth transition.

#### [NEW] [VoiceBadges.tsx](file:///d:/chrome%20download/project-bolt-sb1-uolnshn4/Unscramble-Srijan/frontend/src/components/voice/VoiceBadges.tsx)
- Status and category badges: `PriorityBadge`, `ComplexityBadge`, `TierBadge`, `IntakeStatusBadge`, `VerificationBadge`, and `ApplicationStatusBadge`.

#### [NEW] [VoiceModal.tsx](file:///d:/chrome%20download/project-bolt-sb1-uolnshn4/Unscramble-Srijan/frontend/src/components/voice/VoiceModal.tsx)
- Accessible backdrop-blurred modal dialog for priority/tier overrides and advocate assignments.

#### [NEW] [CitizenCallTrigger.tsx](file:///d:/chrome%20download/project-bolt-sb1-uolnshn4/Unscramble-Srijan/frontend/src/components/voice/CitizenCallTrigger.tsx)
- Voice intake call simulator:
  - Phone number input field with country code support.
  - Step flow: Idle → Calling → Live Interview in Progress → Generating Brief → Completed (View Brief).
  - Real-time speech dialogue preview (Caller vs AI intake agent).
  - DPDP Act 2023 & recording consent disclaimers.
  - "Simulate Demo Call" instant jump and "View Brief" CTA.

#### [NEW] [ReviewerDashboard.tsx](file:///d:/chrome%20download/project-bolt-sb1-uolnshn4/Unscramble-Srijan/frontend/src/components/voice/ReviewerDashboard.tsx)
- Reviewer & triage workbench:
  - Search and filter by matter type, priority, and intake status.
  - Priority score breakdown (+30 financial loss <24h, +20 amount stated, etc.).
  - Contradiction warnings with audio timestamp chips.
  - Interactive chronology with simulated audio playback.
  - Verification toggles for key facts, evidence, and missing information.
  - Audit log recording all human reviewer actions.
  - Priority and Advocate Tier override modals.
  - "Assign Advocate" and "Convert to Active Court Matter" actions.

#### [NEW] [AdvocateMarketplace.tsx](file:///d:/chrome%20download/project-bolt-sb1-uolnshn4/Unscramble-Srijan/frontend/src/components/voice/AdvocateMarketplace.tsx)
- Advocate matching interface:
  - Filter by Matched Tier vs All Advocates.
  - Experience, location, rating, and match score metrics.
  - Consultation request state transitions (None → Sent → Viewed → Accepted).

#### [NEW] [VoiceIntakeHub.tsx](file:///d:/chrome%20download/project-bolt-sb1-uolnshn4/Unscramble-Srijan/frontend/src/components/voice/VoiceIntakeHub.tsx)
- Container view providing sub-navigation across the 3 voice intake stages:
  1. **Citizen Call Simulator** (`call`)
  2. **Reviewer Case Briefing** (`dashboard`)
  3. **Advocate Marketplace** (`marketplace`)

---

### 3. Application Integration & Styling

#### [MODIFY] [Navbar.tsx](file:///d:/chrome%20download/project-bolt-sb1-uolnshn4/Unscramble-Srijan/frontend/src/components/Navbar.tsx)
- Add navigation item for `voice-intake`: **"Voice Intake & Call Demo"** (नागरिक कॉल डेमो) with call icon and active indicator.

#### [MODIFY] [App.tsx](file:///d:/chrome%20download/project-bolt-sb1-uolnshn4/Unscramble-Srijan/frontend/src/App.tsx)
- Add state for `currentView = 'voice-intake'`.
- Manage `voiceAppData`, `handleSelectCase`, `handleUpdateCase`, `handleApplyAdvocate`, `handleAdvanceApplication`.
- Implement `handleConvertIntakeToMatter`: allows promoting an intake brief directly into an active NyaySetu Matter with prefilled parties and case details.
- Fix `DemoWalkthroughModal` integration: pass `onSelectStepAction` to prevent runtime `TypeError`.

#### [MODIFY] [index.css](file:///d:/chrome%20download/project-bolt-sb1-uolnshn4/Unscramble-Srijan/frontend/src/index.css)
- Add theme color tokens for surface, primary, secondary, and accent colors.
- Define `.glass-card`, `.btn-primary`, `.btn-secondary`, `.input-field`, and animation utility classes for smooth rendering.

#### [MODIFY] [DemoWalkthroughModal.tsx](file:///d:/chrome%20download/project-bolt-sb1-uolnshn4/Unscramble-Srijan/frontend/src/components/DemoWalkthroughModal.tsx)
- Add an explicit 8th step or highlight step for **"8. Voice Intake & AI Call Briefing"** illustrating citizen voice intake, triage scoring, and advocate routing.

---

### 4. Git Branch & Remote Push

- Create and switch to new branch `feat/voice-intake-call-demos`:
  ```bash
  git checkout -b feat/voice-intake-call-demos
  ```
- Build & verify production bundle with `npm run build`.
- Stage all changes and commit with descriptive git commit message.
- Push to GitHub remote:
  ```bash
  git push -u origin feat/voice-intake-call-demos
  ```

---

## Verification Plan

### Automated Tests
- Run `npm run build` in `Unscramble-Srijan/frontend` to verify TypeScript compile and Vite bundle generation.
- Run `npm run lint` (or `tsc --noEmit`) to ensure zero type errors.

### Manual Verification
- Test navigation: clicking "AI Call Intake" in Navbar switches to the Voice Intake Hub.
- Test Call Demo:
  - Enter phone number, click "Start AI Intake Call", verify calling -> live dialogue -> generating -> brief ready.
  - Click "Simulate Demo Call" or "View Brief", verify transition to Reviewer Dashboard.
- Test Reviewer Dashboard:
  - Toggle fact verifications (Verified/Unverified/Needs Correction).
  - Open Priority Override modal and submit a reason; confirm audit log entry appears.
  - Click "Find Advocate", confirm navigation to Marketplace.
- Test Advocate Marketplace:
  - Click "Send Consultation Request", verify status advances to "Sent".
- Test "Convert to Matter":
  - Confirm intake brief can be converted into an official court matter on NyaySetu's main matter list.
