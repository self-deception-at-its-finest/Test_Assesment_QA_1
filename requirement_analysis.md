# Requirement Analysis — Trend View (Sections & Tags)

**Scope:** Dashboard → Trend View: section and tag management.
**Environment:** https://demo-3.client.samguard.co (demo user)

---

## RA-01. Section name length vs. truncation (2.2)

- **Requirement:** "Maximum length of 10 characters" and "Names longer than 10 characters are displayed truncated with an ellipsis (…)".
- **Issue:** The two statements contradict each other: if 10 is a hard limit, a name longer than 10 characters cannot exist. It is also unclear whether truncation applies while typing or only when the name is displayed. The rule is listed together with input restrictions, which makes it more confusing.
  *Observed:* the field accepts 50+ characters, and the name in the section header is cut off without an ellipsis.
- **Questions:**
  - Is 10 a hard input limit (typing is blocked) or a validation error on save?
  - If it is a hard limit, in which case can a name be longer than 10 characters?
  - Is truncation a display-only rule, and where exactly does it apply (section header, delete dialog)?
  - Is 10 characters enough for a meaningful name?

## RA-02. Allowed characters in section name (2.2)

- **Requirement:** "May contain only English letters and numbers".
- **Issue:** Undefined: spaces (between words, leading, trailing), empty name, non-English letters (Cyrillic, Hebrew, accented), special characters, emoji, pasted text, how invalid input is handled, whether names must be unique.
  *Observed:* the default name "Section 1" contains a space, so the system itself violates the rule. The field accepts spaces, special characters, and Cyrillic characters.
- **Questions:**
  - Are spaces allowed?
  - Is an empty name allowed?
  - Is invalid input blocked, stripped or rejected with an error? What is the message text?
  - Must section names be unique?
  - Is the default name "Section N" intended?
- **Assumption:** Allowed characters are A–Z, a–z, 0–9, length 1–10, no spaces. An empty name is rejected. Invalid characters are prevented or rejected with a visible message. Duplicate names are allowed, since the requirements do not forbid them.

## RA-03. Tag name length and tag source (2.3)

- **Requirement:** "Tag names longer than 10 characters are displayed truncated".
- **Issue:** Only display behavior is defined. There is no maximum tag name length and no description of where tags come from.
  *Observed:* tags can only be selected from a predefined list; users cannot create their own.
- **Questions:**
  - Where do tags come from and who manages them?
  - Is creating custom tags intentionally out of scope?
  - Is there a maximum tag name length?

## RA-04. Tag truncation rule (2.3)

- **Issue:** It is unclear whether the rule is character-based or width-based, and where it applies.
  *Observed:* names shorter than 10 characters are already truncated (e.g. `TC5802.OP`, 9 characters, is shown as `TC5802.…`). In the two-column layout, the "+N" overflow list shows full names without truncation. Chips show only the tag code, while the picker shows a code and a description.
- **Questions:**
  - Is truncation based on character count (10) or on available width?
  - Does it apply to the chips only, or also to the "+N" list and the chart legend?
  - Should the full name (and the description) be available on hover?
- **Assumption:** In the section header chips, tag names of up to 10 characters are shown in full, and longer names are truncated with "…".

## RA-05. Tag search / picker behavior (not documented)

- **Issue:** The picker behavior is not described at all.
  *Observed:* search shows results only after at least 3 characters are entered, and the full list cannot be browsed, so the user must already know the exact tag name.
- **Questions:**
  - Is the 3-character minimum intended?
  - Should the user be able to browse the full list?
  - Is there a maximum length for the search input?

## RA-06. Section creation flow (2.2, 2.3)

- **Requirement:** "Clicking Add Section opens a configuration popup"; a section must contain a name and at least one tag.
- **Issue:**
  *Observed:* "Add" immediately creates an empty section with the default name "Section N" and no tags. No configuration popup opens.
- **Questions:**
  - Which behavior is correct, the requirement or the implementation?
  - If a default name is intended, should it be described in the requirements?
- **Assumption:** The requirement is correct: a popup requires a name and at least one tag, and the section cannot be saved until both are valid. The current behavior is treated as a defect (see Bug Reports, BUG-02).

## RA-07. Maximum of 4 sections (2.2)

- **Requirement:** "If the user attempts to create more than 4 sections, an error message must be displayed".
- **Issue:** The wording implies the user can start creating a 5th section and only then sees an error.
  *Observed:* after 4 sections, the Add button is replaced by persistent grey text "max number of trend graphs achieved" (highlighted on hover), shown without any user action.
- **Questions:**
  - Which approach is intended: a preventive message instead of the button, or an error after an attempt?
  - What is the exact message text?
- **Assumption:** Preventing creation with a clear visible message satisfies the requirement. Tests verify that a 5th section cannot be created and that the message is shown.

## RA-08. Maximum of 5 tags per section (2.3)

- **Requirement:** "Each section can contain a maximum of 5 tags".
- **Issue:** It is not defined how the error is shown.
  *Observed:* with 4 existing tags and 2 selected, Confirm becomes disabled and a warning icon with a tooltip appears: "You have too many tags selected. Maximum of 5 can be added".
- **Questions:**
  - Should selecting the 6th tag be prevented, or should Confirm be blocked?
  - Should the message be visible without hovering (e.g. inline red text next to the field)?
- **Assumption:** The limit counts existing plus new tags. The user must get a visible explanation; a silently disabled control is not enough.

## RA-09. Removing the last tag (2.3)

- **Requirement:** "A tag can be removed using the X next to its name" and "At least one tag is required in each section".
- **Issue:** The behavior on removing the last remaining tag is not defined.
- **Questions:**
  - Should the X be hidden or disabled when only one tag remains? Should the user see a hint?
  - Is deleting the whole section an expected alternative? We do not recommend it, as it risks unintended loss of the section.
- **Assumption:** When one tag remains, its X is hidden or disabled, and the section is not deleted automatically.

## RA-10. Initial (empty) screen (2.1)

- **Issue:** "When a user opens Trend View for the first time" does not say whether the empty state also appears after all sections are deleted.
  *Observed:* it does, and the button is labelled "Add Trend", not "Add Section".
- **Questions:**
  - Should the empty state be shown whenever there are no sections, not only on the first visit?

## RA-11. Terminology (whole document)

- **Issue:** One concept has several names:
  - "Tag" vs. "Sensor" (Add Sensor);
  - "Section" vs. "Trend" / "trend graph" ("Add Trend", "max number of trend graphs achieved");
  - UI labels differ from the document: "Add Section" → "Add"; "Add Sensor" → a "+" icon with the tooltip "Add new tag to this section".
- **Questions:**
  - Are tag and sensor the same entity?
  - Can the terminology in the requirements and the UI be unified?
- **Assumption:** Tag = sensor and section = trend graph. Test cases refer to the actual UI labels.

## RA-12. Persistence (2.4)

- **Issue:** Only "after refreshing the page" is defined.
- **Questions:**
  - Is saving automatic or explicit?
  - Is the configuration stored per user, per plant, or shared?
  - Is it kept across logout / login, browsers and devices?
  - What does the user see if saving fails?
  - How are concurrent edits in two tabs handled?
- **Assumption:** Changes are saved automatically and immediately for the current user.

## RA-13. Layout and responsiveness (not documented)

- **Issue:** There are no requirements for the multi-column layout, the "+N" tag overflow, or window resizing.
  *Observed:* in a narrow window, tags overlap the section name; the page stops adapting and requires horizontal scrolling.
- **Questions:**
  - What are the minimum supported resolution and browsers?
  - What is the expected layout with 3–4 sections?

## RA-14. Questions for completeness

- Can sections be reordered?
- Do permissions depend on user roles?
- Should the tag description be shown on hover over a chip, so users don't have to memorise tag codes?
