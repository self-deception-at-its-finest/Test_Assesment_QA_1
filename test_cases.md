### TC-001

**ID:** TC-001  
**Title:** Section creation opens a configuration popup  
**Priority:** High  
**Preconditions:** User is logged in to Dashboard → Trend; fewer than four sections exist.  
**Steps:**
1. Click **+ ADD TREND** (or the bottom **+ Add** button).
2. Observe whether a configuration popup opens before the new section is created.
3. Check whether section name and initial tag selection can be configured.

**Expected Result:** A configuration popup opens before a section is created, allowing the user to provide a section name and at least one tag.  
**Type:** Negative / Requirement validation

### TC-002

**ID:** TC-002    
**Title:** Create a section with one tag and verify persistence  
**Priority:** High  
**Preconditions:** Fewer than four sections exist; at least one selectable tag is available.  
**Steps:**
1. Click **+ ADD TREND** or the bottom **+ Add** button.
2. Edit the new section's inline title to `QA2601` and commit the change.
3. Click the black **+** button in the new section.
4. Search for an available tag using at least three characters.
5. Select one tag and click **CONFIRM**.
6. Refresh the page.

**Expected Result:** The section displays `QA2601` and the selected tag; both remain after page refresh.  
**Type:** Positive / Persistence

### TC-003

**ID:** TC-003  
**Title:** Prevent persistence of a section without tags  
**Priority:** High  
**Preconditions:** Fewer than four sections exist; a test section can be created safely.  
**Steps:**
1. Click **+ ADD TREND** or the bottom **+ Add** button.
2. Do not select any tags.
3. Inspect the section's assigned tags, not just the chart's empty-state message.
4. Refresh the page and inspect the section again.

**Expected Result:** A section must contain at least one tag; an empty-tag section must not remain saved as a valid configuration. The validation mechanism is not specified.  
**Type:** Negative / Validation

### TC-004

**ID:** TC-004  
**Title:** Reject invalid characters in a section name  
**Priority:** High  
**Preconditions:** A test section with an editable inline title exists.  
**Steps:**
1. Click the section title to edit it.
2. Attempt to save each invalid name: `Area 1`, `Area_1`, `Area-1`, `Тест123`.
3. After each attempt, inspect the displayed title and refresh the page.

**Expected Result:** Section names containing spaces, underscores, hyphens or Cyrillic characters are not saved; only English letters and digits are permitted.  
**Type:** Negative / Validation

### TC-005

**ID:** TC-005  
**Title:** Validate the ten-character section-name boundary  
**Priority:** High  
**Preconditions:** A test section with an editable inline title exists.  
**Steps:**
1. Rename the section to `A123456789` (10 characters) and commit.
2. Verify the title, then rename it to `A1234567890` (11 characters).
3. Commit the change, inspect the displayed title, and refresh the page.

**Expected Result:** A valid ten-character name is accepted. For 11 characters, the specification is contradictory: it states both a maximum length of 10 and truncation with an ellipsis for longer names. Record the observed behavior; final pass/fail for the 11-character case requires clarification.  
**Type:** Boundary / Requirement ambiguity

### TC-006

**ID:** TC-006
**Title:** Prevent creation of more than four sections  
**Priority:** High  
**Preconditions:** Exactly four sections exist simultaneously in a controlled test configuration.  
**Steps:**
1. Open **Dashboard → Trend** with four sections.
2. Inspect the **Max number of trend graphs achieved** indicator.
3. Attempt to add a fifth section if an Add control remains accessible.
4. Refresh the page and count the sections.

**Expected Result:** No fifth section is created. An attempted addition beyond the limit displays an error message as specified; if the control is disabled, its behavior requires clarification.  
**Type:** Negative / Boundary

### TC-007

**ID:** TC-007  
**Title:** Rename a section and verify persistence  
**Priority:** High  
**Preconditions:** A test section with at least one assigned tag exists.  
**Steps:**
1. Click the section title to activate inline editing.
2. Replace the title with `QA011` and commit the change.
3. Refresh the page.

**Expected Result:** The section is renamed to `QA011`; its new name and existing tag assignments remain after refresh.  
**Type:** Positive / Persistence

### TC-008

**ID:** TC-008
**Title:** Cancel section deletion using No and X  
**Priority:** Medium  
**Preconditions:** A test section with at least one tag exists.  
**Steps:**
1. Click the section's trash icon.
2. In the **Remove this section from your view?** dialog, click **No**.
3. Open the deletion dialog again and click **X**.
4. Refresh the page.

**Expected Result:** Both cancellation actions leave the section and its tags unchanged, including after refresh.  
**Type:** Negative / Cancellation

### TC-009

**ID:** TC-009  
**Title:** Confirm section deletion and verify persistence  
**Priority:** High  
**Preconditions:** A test-owned section exists and may be safely deleted.  
**Steps:**
1. Click the section's trash icon.
2. Verify that the confirmation dialog appears before deletion.
3. Click **Yes**.
4. Check the remaining sections and refresh the page.

**Expected Result:** Only the confirmed section is deleted; other sections are unchanged, and the deleted section does not reappear after refresh.  
**Type:** Positive / Deletion / Persistence

### TC-010

**ID:** TC-010 
**Title:** Add a tag to an existing section and verify persistence  
**Priority:** High  
**Preconditions:** A test section exists with fewer than five assigned tags; an additional tag is available.  
**Steps:**
1. Click the black **+** button inside the target section.
2. In **Add tag**, enter at least three search characters.
3. Select an available tag using its checkbox.
4. Click **CONFIRM** and refresh the page.

**Expected Result:** The selected tag is added to the correct section and remains assigned after refresh.  
**Type:** Positive / Persistence

### TC-011

**ID:** TC-011  
**Title:** Prevent adding a sixth tag to a section  
**Priority:** High  
**Preconditions:** A test section already has five tags; a sixth selectable tag exists.  
**Steps:**
1. Click the section's black **+** button to open **Add tag**.
2. Select a sixth tag.
3. Inspect **CONFIRM (6)**, any warning text, and whether confirmation is possible.
4. Attempt confirmation if enabled, then refresh the page.

**Expected Result:** The section never saves more than five tags. An attempt to exceed the limit shows an error message; the exact message and handling of a disabled Confirm button are not specified.  
**Type:** Negative / Boundary

### TC-012

**ID:** TC-012  
**Title:** Remove one tag and verify persistence  
**Priority:** High  
**Preconditions:** A test section has at least two assigned tags.  
**Steps:**
1. Click **X** next to one assigned tag.
2. Complete any required save or confirmation action, if shown.
3. Verify the other assigned tag remains.
4. Refresh the page.

**Expected Result:** Only the selected tag is removed; at least one tag remains in the section, and removal persists after refresh.  
**Type:** Positive / Persistence
