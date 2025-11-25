---
slug: wcag
title: Web Content Accessibility Guidelines
hide_table_of_contents: false
custom_edit_url: null
---

# Infracost Accessibility Conformance Report

**WCAG Edition (Based on VPAT**® **Version 2.5Rev)**  


## Product & Report Details

|  |  |
| :--- | :--- |
| **Name of Product/Version:** | Infracost Cloud |
| **Report Date:** | November 24, 2025 |
| **Product Description:** | Infracost shifts cloud costs left and makes FinOps proactive. It sits in the engineering workflow and shows the cost impact of code changes before shipping to production. This catches costly mistakes before money has been spent. It also ensures all resources are tagged correctly and checks the code against FinOps policies, ensuring best practices are followed (e.g., GP2 volumes should be GP3, lifecycle policies). |
| **Contact Information:** | Email: [hello@infracost.io](http://hello@infracost.io) |
| **Notes:** | Evaluated for WCAG 2.1 Compliance. |
| **Evaluation Methods Used:** | Infracost Cloud was evaluated using Chrome 141.0.7390.70 on a Linux Mint laptop computer. Assistive technologies used in this evaluation included the ORCA screen reader as well as exclusive use of the keyboard to navigate and operate the site content and functionality. The [Text Adaptation Bookmarklet](https://github.com/alastc/adaptation-scripts/blob/master/scripts/text-adaptation.js) was also used. ANDI and WAVE plug-ins were also utilized. |

## **Applicable Standards/Guidelines**

This report covers the degree of conformance for the following accessibility standard/guidelines:

| Standard/Guideline | Included In Report |
| :---- | :--- |
| [Web Content Accessibility Guidelines 2.0](http://www.w3.org/TR/2008/REC-WCAG20-20081211) | Level A: **Yes**<br/>Level AA: **Yes**<br/>Level AAA: **No** |
| [Web Content Accessibility Guidelines 2.1](https://www.w3.org/TR/WCAG21) | Level A: **Yes**<br/>Level AA: **Yes**<br/>Level AAA: **No** |

## **Terms**

The terms used in the Conformance Level information are defined as follows:

* **Supports**: The functionality of the product has at least one method that meets the criterion without known defects or meets with equivalent facilitation.  
* **Partially Supports**: Some functionality of the product does not meet the criterion.  
* **Does Not Support**: The majority of product functionality does not meet the criterion.  
* **Not Applicable**: The criterion is not relevant to the product.  
* **Not Evaluated**: The product has not been evaluated against the criterion. This can only be used in WCAG Level AAA criteria.

## **WCAG 2.x Report**

Note: When reporting on conformance with the WCAG 2.x Success Criteria, they are scoped for full pages, complete processes, and accessibility-supported ways of using technology as documented in the [WCAG 2.0 Conformance Requirements](https://www.w3.org/TR/WCAG20/#conformance-reqs).

# **Dashboard Setup Process**

### **Table 1: Success Criteria, Level A**

Notes:

| Criteria | Conformance Level | Remarks and Explanations |
| ----- | ----- | ----- |
| [**1.1.1 Non-text Content**](http://www.w3.org/TR/WCAG20/#text-equiv-all) (Level A) | Does Not Support  | This section provides sufficient text alternatives for some instances of non-text content. Exceptions include:  Star banner in Step 4 Part 4 should either have descriptive alternative text or use empty alternative text if it is purely decorative.  Github Process gif in Step 4 Part 3 should include alternative text describing the process it’s meant to convey. Company logos displaying examples of Infracost Examples do not have proper alternative text Check mark icons used to convey to the user if a step has been completed or not should either include alt text or aria labeling The chat icon for Infracost’s chat bot should either include alt text or aria labeling.  Informational tool-tip icons should either include alt text or aria labeling.  All icons used in the settings drop down should include either alt text or aria labeling.  External link icon in Step 3 should either include alt text or aria labeling.  Copy graphic in Step 4 should include either alt text or aria labeling.  Infracost example report image should include proper alt text |
| [**1.2.1 Audio-only and Video-only (Prerecorded)**](http://www.w3.org/TR/WCAG20/#media-equiv-av-only-alt) (Level A) | Not Applicable | This section does not contain prerecorded audio-only or video-only media  |
| [**1.2.2 Captions (Prerecorded)**](http://www.w3.org/TR/WCAG20/#media-equiv-captions) (Level A) | Not Applicable | This section does not contain prerecorded synchronized media.  |
| [**1.2.3 Audio Description or Media Alternative (Prerecorded)**](http://www.w3.org/TR/WCAG20/#media-equiv-audio-desc) (Level A) | Not Applicable | This section does not contain prerecorded video content that would require audio description or a media alternative.  |
| [**1.3.1 Info and Relationships**](http://www.w3.org/TR/WCAG20/#content-structure-separation-programmatic) (Level A) | Partially Supports | Most visual structure and relationship information is provided through object information or is available in text. Exceptions include:  Select Element on Step 3 does not have an accessible name or label. Select Element on Step 4 does not have an accessible name or label. Visual lists delineating sub tasks for the setup process in Step 4 are not programmed as lists.  |
| [**1.3.2 Meaningful Sequence**](http://www.w3.org/TR/WCAG20/#content-structure-separation-sequence) (Level A)  | Supports | This section’s content is presented in a meaningful sequence |
| [**1.3.3 Sensory Characteristics**](http://www.w3.org/TR/WCAG20/#content-structure-separation-understanding) (Level A) | Does Not Support | Instructions for Step 4 rely on an arrow graphic with no accessible name or text alternative to instruct keyboard users. |
| [**1.4.1 Use of Color**](http://www.w3.org/TR/WCAG20/#visual-audio-contrast-without-color) (Level A) | Supports | There is no part of the website that solely uses color to convey meaning.  |
| [**1.4.2 Audio Control**](http://www.w3.org/TR/WCAG20/#visual-audio-contrast-dis-audio) (Level A)	 | Not Applicable | The site does not contain audio that plays automatically |
| [**2.1.1 Keyboard**](http://www.w3.org/TR/WCAG20/#keyboard-operation-keyboard-operable) (Level A)	 | Partially Supports | Most functionality in this section can be accessed and operated using a keyboard. Exceptions include:  “Help and More” drop down does not let user select items with the enter or space bar key  Open button in Step 4 is not keyboard operable  |
| [**2.1.2 No Keyboard Trap**](http://www.w3.org/TR/WCAG20/#keyboard-operation-trapping) (Level A)	 | Supports | This section does not include keyboard traps  |
| [**2.1.4 Character Key Shortcuts**](https://www.w3.org/TR/WCAG21/#character-key-shortcuts) (Level A 2.1 and 2.2) | Not Applicable | No shortcuts are used in this section |
| [**2.2.1 Timing Adjustable**](http://www.w3.org/TR/WCAG20/#time-limits-required-behaviors) (Level A) | Not Applicable | This section does not include time limits.  |
| [**2.2.2 Pause, Stop, Hide**](http://www.w3.org/TR/WCAG20/#time-limits-pause) (Level A) | Does Not Support  | The animated gif in Step 4 does not provide a way to pause, stop, or hide the animation |
| [**2.3.1 Three Flashes or Below Threshold**](http://www.w3.org/TR/WCAG20/#seizure-does-not-violate) (Level A) | Not Applicable | This section does not include flashes	 |
| [**2.4.1 Bypass Blocks**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-skip) (Level A)	 | Partially Supports  | The navigation pane is the only programmatic landmark that can allow users to bypass it.  The footer and main sections of the page should also be programmed as landmarks.  |
| [**2.4.2 Page Titled**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-title) (Level A)	 | Supports | The page is properly titled.  |
| [**2.4.3 Focus Order**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-focus-order) (Level A)	  | Partially Supports | Most elements in this section receive proper focus. Exceptions include:  Buttons in the chat do not receive focus  In Step 4, the focus disappears visually as it moves onto panes that aren’t presented to the user “Open” button in Step 4 does not receive focus  |
| [**2.4.4 Link Purpose (In Context)**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-refs) (Level A) | Partially Supports | Most links adequately describe their purpose in context. Exceptions include:  Infracost logo link does not properly label itself as a Home Button |
| [**2.5.1 Pointer Gestures**](https://www.w3.org/TR/WCAG21/#pointer-gestures) (Level A 2.1 and 2.2) | Not Applicable | The site does not rely on multi-point or path-based gestures. |
| [**2.5.2 Pointer Cancellation**](https://www.w3.org/TR/WCAG21/#pointer-cancellation) (Level A 2.1 and 2.2) | Supports | The site functions that use a single pointer are completed when the user releases the pointer. |
| [**2.5.3 Label in Name**](https://www.w3.org/TR/WCAG21/#label-in-name) (Level A 2.1 and 2.2) | Partially Supports | Most elements in this section have their labels in their accessible name. Exceptions include:  Select Element on Step 3 does not have an accessible name or label  |
| [**2.5.4 Motion Actuation**](https://www.w3.org/TR/WCAG21/#motion-actuation) (Level A 2.1 and 2.2) | Not Applicable | No content depends on the ability to move a device  |
| [**3.1.1 Language of Page**](http://www.w3.org/TR/WCAG20/#meaning-doc-lang-id) (Level A) | Supports | Page language is programmatically determined |
| [**3.2.1 On Focus**](http://www.w3.org/TR/WCAG20/#consistent-behavior-receive-focus) (Level A) | Supports | This section’s components do not initiate a change of context when focused. |
| [**3.2.2 On Input**](http://www.w3.org/TR/WCAG20/#consistent-behavior-unpredictable-change) (Level A) | Partially Supports  | Most content in this section do not trigger changes of context automatically on user input. Exceptions include:   Selection tool in Step 3 changes content on the page automatically when using arrow keys (and drop down mode isn’t engaged)  |
| [**3.2.6 Consistent Help**](https://www.w3.org/TR/WCAG22/#consistent-help) (Level A 2.2 only) | Supports  | Support page is in the same location across all pages  |
| [**3.3.1 Error Identification**](http://www.w3.org/TR/WCAG20/#minimize-error-identified) (Level A) | Not Applicable	 | No Automatic Error Notifications Identified  |
| [**3.3.2 Labels or Instructions**](http://www.w3.org/TR/WCAG20/#minimize-error-cues) (Level A) | Does Not Support | Step 3 input field that appears when “Automatically add Current and Future Terraform Repos matching name or wildcard features” has no programmed label and the visual label disappears on typing. |
| [**3.3.7 Redundant Entry**](https://www.w3.org/TR/WCAG22/#redundant-entry) (Level A 2.2 only) | Not Evaluated | Testing for 2.1 Conformance |
| [**4.1.1 Parsing**](http://www.w3.org/TR/WCAG20/#ensure-compat-parses) (Level A) WCAG 2.0 and 2.1 – Always answer ‘Supports’ WCAG 2.2 (obsolete and removed) \- Does not apply | Supports | For WCAG 2.0 and 2.1, the September 2023 errata update indicates this criterion is always supported. See the [WCAG 2.0 Editorial Errata](https://www.w3.org/WAI/WCAG20/errata/#editorial) and the [WCAG 2.1 Editorial Errata](https://www.w3.org/WAI/WCAG21/errata/#editorial). |
| [**4.1.2 Name, Role, Value**](http://www.w3.org/TR/WCAG20/#ensure-compat-rsv) (Level A) | Partially Supports | Most user interface components in this section provide programmatic name, role, and/or state information. Exceptions include:  Selection Element in Step 3 has no accessible name or role exposed.  Selection Element in Step 4 Part 2 has no accessible name or role exposed.  Open button in Step 4 Part 2 has no accessible name or role exposed.  |

### **Table 2: Success Criteria, Level AA**

Notes:

| Criteria | Conformance Level | Remarks and Explanations |
| ----- | ----- | ----- |
| [**1.2.4 Captions (Live)**](http://www.w3.org/TR/WCAG20/#media-equiv-real-time-captions) (Level AA) | Not Applicable | This section does not contain live synchronized media  |
| [**1.2.5 Audio Description (Prerecorded)**](http://www.w3.org/TR/WCAG20/#media-equiv-audio-desc-only) (Level AA) | Not Applicable | This section does not contain prerecorded video content that would require audio description  |
| [**1.3.4 Orientation**](https://www.w3.org/TR/WCAG21/#orientation) (Level AA 2.1 and 2.2) | Supports | The content of this section does not restrict its view and operation to a single display orientation |
| [**1.3.5 Identify Input Purpose**](https://www.w3.org/TR/WCAG21/#identify-input-purpose) (Level AA 2.1 and 2.2) | Not Applicable | This section does not contain input fields that require the user to enter personally identifiable information.  |
| [**1.4.3 Contrast (Minimum)**](http://www.w3.org/TR/WCAG20/#visual-audio-contrast-contrast) (Level AA) | Partially Supports | Most text in this section meets minimum contrast requirements. Exceptions include:  “SOC 2 Type II Certified” link  Connect Button  Next Buttons Line numbers and comments in code widget seen in Step 4  Status widget reading “Pull Request Received” |
| [**1.4.4 Resize text**](http://www.w3.org/TR/WCAG20/#visual-audio-contrast-scale) (Level AA) | Partially Supports | Most site content and user interfaces support standard zoom capabilities built into modern web browsers and operating systems. The Chat icon, however, disappears at 200% Zoom in Chromium browsers.  |
| [**1.4.5 Images of Text**](http://www.w3.org/TR/WCAG20/#visual-audio-contrast-text-presentation) (Level AA) | Partially Supports | Logotypes are considered essential, but should have alternative text.   Gif of Github pull request process is considered essential, but should have alternative text |
| [**1.4.10 Reflow**](https://www.w3.org/TR/WCAG21/#reflow) (Level AA 2.1 and 2.2)	 | Partially Supports  | Main page information re-flows at a width of 320 pixels, but the chat fails At 320 pixels wide, the forward and back buttons in Step 4 block important content.  |
| [**1.4.11 Non-text Contrast**](https://www.w3.org/TR/WCAG21/#non-text-contrast) (Level AA 2.1 and 2.2) | Does Not Support | Focus Indicators need to be high contrast |
| [**1.4.12 Text Spacing**](https://www.w3.org/TR/WCAG21/#text-spacing) (Level AA 2.1 and 2.2) | Partially Supports | The spacing between letters, words, lines of text and/or paragraphs can be adjusted in the site’s web page. However, selection element cuts off text when text-spacing is applied.   |
| [**1.4.13 Content on Hover or Focus**](https://www.w3.org/TR/WCAG21/#content-on-hover-or-focus) (Level AA 2.1 and 2.2) | Partially Supports  | Tool-tips that become available when hovering over information images are not hover-able themselves.  |
| [**2.4.5 Multiple Ways**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-mult-loc) (Level AA)	 | Does Not Support | There is only one way to navigate the page – the navigation pane.  |
| [**2.4.6 Headings and Labels**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-descriptive) (Level AA)	 | Supports  | Most headings and labels that do exist are descriptive. Exceptions include:  Organization Selection Widget does not provide descriptive labels on its purpose |
| [**2.4.7 Focus Visible**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-focus-visible) (Level AA)	 | Partially Supports | Not All Focus-able Items have a focus indicator 	 |
| [**2.4.11 Focus Not Obscured (Minimum)**](https://www.w3.org/TR/WCAG22/#focus-not-obscured-minimum) (Level AA 2.2 only) | Not Evaluated |  |
| [**2.5.7 Dragging Movements**](https://www.w3.org/TR/WCAG22/#dragging-movements) (Level AA 2.2 only) | Not Applicable | No dragging movements required  |
| [**2.5.8 Target Size (Minimum)**](https://www.w3.org/TR/WCAG22/#target-size-minimum) (Level AA 2.2 only) | Not Evaluated |  |
| [**3.1.2 Language of Parts**](http://www.w3.org/TR/WCAG20/#meaning-other-lang-id) (Level AA) | Not Applicable | No sections in alternate languages |
| [**3.2.3 Consistent Navigation**](http://www.w3.org/TR/WCAG20/#consistent-behavior-consistent-locations) (Level AA)	 | Supports | Navigation stays consistent across pages  |
| [**3.2.4 Consistent Identification**](http://www.w3.org/TR/WCAG20/#consistent-behavior-consistent-functionality) (Level AA) | Supports | Identification of interactive objects stays the same even when the page changes |
| [**3.3.3 Error Suggestion**](http://www.w3.org/TR/WCAG20/#minimize-error-suggestions) (Level AA) 	 | Partially Supports | When the user inputs a message the chat bot cannot detect, an error message is displayed in the chat. This message is, however, difficult for screen reader users to navigate to or place in context.  Step 3 input field provides no error suggestion  |
| [**3.3.4 Error Prevention (Legal, Financial, Data)**](http://www.w3.org/TR/WCAG20/#minimize-error-reversible) (Level AA) | Supports | Forms that may use user data are single page forms that do not submit until the user selects a submit button, or presses enter. This provides the user with time to correct mistakes. It is advised to let users know that interacting with the chat bot, however, may include giving user data. This context gives the user more control over their personal information.  |
| [**3.3.8 Accessible Authentication (Minimum)**](https://www.w3.org/TR/WCAG22/#accessible-authentication-minimum) (Level AA 2.2 only) | Not Evaluated | 2.1 |
| [**4.1.3 Status Messages**](https://www.w3.org/TR/WCAG21/#status-messages) (Level AA 2.1 and 2.2)	 | Does Not Support | “Waiting for Pull Request” alert is not exposed to the screen reader “Pull Request Received” alert is not exposed to the screen reader.  |

# **Dashboard**

### **Table 1: Success Criteria, Level A**

Notes:	

| Criteria | Conformance Level | Remarks and Explanations |
| ----- | ----- | ----- |
| [**1.1.1 Non-text Content**](http://www.w3.org/TR/WCAG20/#text-equiv-all) (Level A) | Does Not Support | Non-text content does not provide proper accessible names or alternative text. This includes:  Lightning Icon Dropdown Icons Eld Icon Chart Icon Leaderboard Icon |
| [**1.2.1 Audio-only and Video-only (Prerecorded)**](http://www.w3.org/TR/WCAG20/#media-equiv-av-only-alt) (Level A) | Not Applicable | This section does not contain prerecorded audio-only or video-only media  |
| [**1.2.2 Captions (Prerecorded)**](http://www.w3.org/TR/WCAG20/#media-equiv-captions) (Level A) | Not Applicable | This section does not contain prerecorded synchronized media.  |
| [**1.2.3 Audio Description or Media Alternative (Prerecorded)**](http://www.w3.org/TR/WCAG20/#media-equiv-audio-desc) (Level A) | Not Applicable | This section does not contain prerecorded video content that would require audio description or a media alternative.   |
| [**1.3.1 Info and Relationships**](http://www.w3.org/TR/WCAG20/#content-structure-separation-programmatic) (Level A) | Partially Supports | Most visual structure and relationship information is provided through object information or is available in text. Exceptions include:  Support Button at the bottom of the screen is listed as an unordered list (A) “Infracost Usage Summary” and (B)“issues detected, merged pull requests, yr saved” are both h2 level headings, while (C) “celebrating the engineers” is an h1 level heading. Visually, it looks like B should be a h1, while C would be an h2, and C would be an h3. Additionally, (D) Governance Impact and (E) Cost Impact are h2 level headings, while they appear to be under the “Infracost usage summary” h2 heading level.  They should brobably be h3 level headings.  |
| [**1.3.2 Meaningful Sequence**](http://www.w3.org/TR/WCAG20/#content-structure-separation-sequence) (Level A) 	 | Supports | This section’s content is presented in a meaningful sequence |
| [**1.3.3 Sensory Characteristics**](http://www.w3.org/TR/WCAG20/#content-structure-separation-understanding) (Level A) | Not Applicable | This section does not provide directions that rely on Sensory Characteristics  |
| [**1.4.1 Use of Color**](http://www.w3.org/TR/WCAG20/#visual-audio-contrast-without-color) (Level A) | Supports | There is no part of the website that solely uses color to convey meaning.  |
| [**1.4.2 Audio Control**](http://www.w3.org/TR/WCAG20/#visual-audio-contrast-dis-audio) (Level A)	 | Not Applicable  | The site does not contain audio that plays automatically |
| [**2.1.1 Keyboard**](http://www.w3.org/TR/WCAG20/#keyboard-operation-keyboard-operable) (Level A)	 | Partially Supports | Most functionality in this section can be accessed and operated using a keyboard. Exceptions include:  Circle chart slices are toggle buttons, but do not provide keyboard operability Go Back Button is not keyboard operable  |
| [**2.1.2 No Keyboard Trap**](http://www.w3.org/TR/WCAG20/#keyboard-operation-trapping) (Level A)	 | Supports | There are no keyboard traps present in this section |
| [**2.1.4 Character Key Shortcuts**](https://www.w3.org/TR/WCAG21/#character-key-shortcuts) (Level A 2.1 and 2.2) | Not Applicable  | No shortcuts are used in this section |
| [**2.2.1 Timing Adjustable**](http://www.w3.org/TR/WCAG20/#time-limits-required-behaviors) (Level A) | Not Applicable  | This section does not include time limits.  |
| [**2.2.2 Pause, Stop, Hide**](http://www.w3.org/TR/WCAG20/#time-limits-pause) (Level A) | Not Applicable | This section does not include animations |
| [**2.3.1 Three Flashes or Below Threshold**](http://www.w3.org/TR/WCAG20/#seizure-does-not-violate) (Level A) | Not Applicable  | This section does not include flashes  |
| [**2.4.1 Bypass Blocks**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-skip) (Level A)	 | Partially Supports | The navigation pane is the only programmatic landmark that can allow users to bypass it.  The footer and main sections of the page should also be programmed as landmarks.  |
| [**2.4.2 Page Titled**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-title) (Level A)	 | Supports | The page is properly titled  |
| [**2.4.3 Focus Order**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-focus-order) (Level A)	  | Partially Supports  | Most of the page maintains a focus order that preserves operable understanding and functionality. Exceptions include:  Circle chart slices are toggle buttons but are not focusable Go Back Button is not focusable |
| [**2.4.4 Link Purpose (In Context)**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-refs) (Level A) | Partially Support | Most links adequately describe their purpose in context. Exceptions include:  Percentage based buttons lack context to where they are sending the user after clicking the buttons.  |
| [**2.5.1 Pointer Gestures**](https://www.w3.org/TR/WCAG21/#pointer-gestures) (Level A 2.1 and 2.2) | Not Applicable | The site does not rely on multi-point or path-based gestures. |
| [**2.5.2 Pointer Cancellation**](https://www.w3.org/TR/WCAG21/#pointer-cancellation) (Level A 2.1 and 2.2) | Supports | The site functions that use a single pointer are completed when the user releases the pointer. |
| [**2.5.3 Label in Name**](https://www.w3.org/TR/WCAG21/#label-in-name) (Level A 2.1 and 2.2) | Partially Supports | Most elements in this section have their labels in their accessible name. Exceptions include:  Circle chart toggle buttons do not have accessible names or labeles.  |
| [**2.5.4 Motion Actuation**](https://www.w3.org/TR/WCAG21/#motion-actuation) (Level A 2.1 and 2.2) | Not Applicable | No content depends on the ability to move a device  |
| [**3.1.1 Language of Page**](http://www.w3.org/TR/WCAG20/#meaning-doc-lang-id) (Level A) | Supports | Page language is programmatically determined |
| [**3.2.1 On Focus**](http://www.w3.org/TR/WCAG20/#consistent-behavior-receive-focus) (Level A) | Supports | This section’s components do not initiate a change of context when focused. |
| [**3.2.2 On Input**](http://www.w3.org/TR/WCAG20/#consistent-behavior-unpredictable-change) (Level A) | Supports | Content in this section do not trigger changes of context automatically on user input.  |
| [**3.2.6 Consistent Help**](https://www.w3.org/TR/WCAG22/#consistent-help) (Level A 2.2 only) | Not Evaluated | Testing for 2.1 Conformance |
| [**3.3.1 Error Identification**](http://www.w3.org/TR/WCAG20/#minimize-error-identified) (Level A) | Not Applicable | No Automatic Error Notifications Identified  |
| [**3.3.2 Labels or Instructions**](http://www.w3.org/TR/WCAG20/#minimize-error-cues) (Level A) | Does Not Support | Date selection Widget does not provide proper instructions to it’s labeling for users to understand it’s content. |
| [**3.3.7 Redundant Entry**](https://www.w3.org/TR/WCAG22/#redundant-entry) (Level A 2.2 only) | Not Evaluated  | Testing for 2.1 Conformance |
| [**4.1.1 Parsing**](http://www.w3.org/TR/WCAG20/#ensure-compat-parses) (Level A) WCAG 2.0 and 2.1 – Always answer ‘Supports’ WCAG 2.2 (obsolete and removed) \- Does not apply | Supports |  |
| [**4.1.2 Name, Role, Value**](http://www.w3.org/TR/WCAG20/#ensure-compat-rsv) (Level A) | Partially Supports  | Most elements on the page have programmatically determinable accessible names and roles. Exceptions include:  Circle chart toggle buttons have no accessible name  |

### **Table 2: Success Criteria, Level AA**

Notes:

| Criteria | Conformance Level | Remarks and Explanations |
| ----- | ----- | ----- |
| [**1.2.4 Captions (Live)**](http://www.w3.org/TR/WCAG20/#media-equiv-real-time-captions) (Level AA) | Not Applicable | This section does not contain live synchronized media  |
| [**1.2.5 Audio Description (Prerecorded)**](http://www.w3.org/TR/WCAG20/#media-equiv-audio-desc-only) (Level AA) | Not Applicable | This section does not contain prerecorded video content that would require audio description  |
| [**1.3.4 Orientation**](https://www.w3.org/TR/WCAG21/#orientation) (Level AA 2.1 and 2.2) | Supports | The content of this section does not restrict its view and operation to a single display orientation |
| [**1.3.5 Identify Input Purpose**](https://www.w3.org/TR/WCAG21/#identify-input-purpose) (Level AA 2.1 and 2.2) | Not Applicable  | This section does not contain input fields that require the user to enter personally identifiable information.  |
| [**1.4.3 Contrast (Minimum)**](http://www.w3.org/TR/WCAG20/#visual-audio-contrast-contrast) (Level AA) | Supports | All text in this section meets minimum contrast requirements.  |
| [**1.4.4 Resize text**](http://www.w3.org/TR/WCAG20/#visual-audio-contrast-scale) (Level AA) | Supports | All site content and user interfaces support standard zoom capabilities built into modern web browsers and operating systems.  |
| [**1.4.5 Images of Text**](http://www.w3.org/TR/WCAG20/#visual-audio-contrast-text-presentation) (Level AA) | Does Not Support  | Some images of text are considered essential, but non-essential images of text are non-comforming including:  Text in the center of the circle charts are non-essential and do no thave text equivalents  |
| [**1.4.10 Reflow**](https://www.w3.org/TR/WCAG21/#reflow) (Level AA 2.1 and 2.2)	 | Does Not Support  | Some components reflow at a width of 320 pixels, exceptions include:  Menu button is not keyboard operable.  Calendar Widget does not properly reflow  |
| [**1.4.11 Non-text Contrast**](https://www.w3.org/TR/WCAG21/#non-text-contrast) (Level AA 2.1 and 2.2) | Does Not Support | Some components maintain non-text contrast levels. Exceptions include:  Focus indicators do not have high enough contrast  Light pink in the money saved circle chart does not have enough high contrast against the white background  Green in the issues circle chart does not have enough contrast against the white background Green in the Database Icon does not have enough contrast against the white background when unhovered, and does not have enough contrast agianst the pink background when hovered.  |
| [**1.4.12 Text Spacing**](https://www.w3.org/TR/WCAG21/#text-spacing) (Level AA 2.1 and 2.2) | Partially Supports  | Most components maintain readability when text spacing adjustments are applied. Notable exceptions include:  Issues Detected and Saved Per Year labels disappear behind the pie charts when text spacing is updated  Finish Setup button label doesn’t center vertically when text spacing is applied  |
| [**1.4.13 Content on Hover or Focus**](https://www.w3.org/TR/WCAG21/#content-on-hover-or-focus) (Level AA 2.1 and 2.2) | Does Not Support  | Tooltip from informational buttons are hoverable and persistent, but they are not dismissable. Circle chart tooltip is persisent and dismissable, but is not hoverable – when the user hovers over the tooltip, but not the pie chart, the tool tip disappears.  |
| [**2.4.5 Multiple Ways**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-mult-loc) (Level AA)	 | Does Not Support  | There is only one way to navigate the page – the navigation pane.  |
| [**2.4.6 Headings and Labels**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-descriptive) (Level AA)	 | Partially Supports | Most headings and labels are descriptive. Exceptions include:  Date selection Widget does not provide descriptive labels on its purpose |
| [**2.4.7 Focus Visible**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-focus-visible) (Level AA)	 | Supports | Focus is Visible for all currently focusable element |
| [**2.4.11 Focus Not Obscured (Minimum)**](https://www.w3.org/TR/WCAG22/#focus-not-obscured-minimum) (Level AA 2.2 only) | Not Evaluated  | Testing for 2.1 Conformance |
| [**2.5.7 Dragging Movements**](https://www.w3.org/TR/WCAG22/#dragging-movements) (Level AA 2.2 only) | Not Evaluated  | Testing for 2.1 Conformance |
| [**2.5.8 Target Size (Minimum)**](https://www.w3.org/TR/WCAG22/#target-size-minimum) (Level AA 2.2 only) | Not Evaluated  | Testing for 2.1 Conformance |
| [**3.1.2 Language of Parts**](http://www.w3.org/TR/WCAG20/#meaning-other-lang-id) (Level AA) | Not Applicable  | No sections in alternate languages |
| [**3.2.3 Consistent Navigation**](http://www.w3.org/TR/WCAG20/#consistent-behavior-consistent-locations) (Level AA)	 | Supports  | Navigation stays consistent the same across pages  |
| [**3.2.4 Consistent Identification**](http://www.w3.org/TR/WCAG20/#consistent-behavior-consistent-functionality) (Level AA) | Supports  | Identification of interactive objects stays the same even when the page changes |
| [**3.3.3 Error Suggestion**](http://www.w3.org/TR/WCAG20/#minimize-error-suggestions) (Level AA) 	 | Not Applicable | No Error Suggestions or Errors Possible on forms  |
| [**3.3.4 Error Prevention (Legal, Financial, Data)**](http://www.w3.org/TR/WCAG20/#minimize-error-reversible) (Level AA) | Not Applicable  | No forms in this section have legal, Financial, or Personal Data consequences |
| [**3.3.8 Accessible Authentication (Minimum)**](https://www.w3.org/TR/WCAG22/#accessible-authentication-minimum) (Level AA 2.2 only) | Not Evaluated  | Testing for 2.1 Conformance  |
| [**4.1.3 Status Messages**](https://www.w3.org/TR/WCAG21/#status-messages) (Level AA 2.1 and 2.2)	 | Not Applicable | No Status Messages  |

# 

# **Log In/Sign Up**

### **Table 1: Success Criteria, Level A**

Notes:	

| Criteria | Conformance Level | Remarks and Explanations |
| ----- | ----- | ----- |
| [**1.1.1 Non-text Content**](http://www.w3.org/TR/WCAG20/#text-equiv-all) (Level A) | Does Not Support | Non-text content does not provide proper accessible names or alternative text. This includes:  Infracost Logo and Logotype  Shift FinOps Left  |
| [**1.2.1 Audio-only and Video-only (Prerecorded)**](http://www.w3.org/TR/WCAG20/#media-equiv-av-only-alt) (Level A) | Not Applicable  | This section does not contain prerecorded audio-only or video-only media  |
| [**1.2.2 Captions (Prerecorded)**](http://www.w3.org/TR/WCAG20/#media-equiv-captions) (Level A) | Not Applicable   | This section does not contain prerecorded synchronized media.  |
| [**1.2.3 Audio Description or Media Alternative (Prerecorded)**](http://www.w3.org/TR/WCAG20/#media-equiv-audio-desc) (Level A) | Not Applicable   | This section does not contain prerecorded video content that would require audio description or a media alternative.   |
| [**1.3.1 Info and Relationships**](http://www.w3.org/TR/WCAG20/#content-structure-separation-programmatic) (Level A) | Does Not Support  | Visual headings present in the Shift FinOps Left are not programmatic headings, but instead part of an image.  |
| [**1.3.2 Meaningful Sequence**](http://www.w3.org/TR/WCAG20/#content-structure-separation-sequence) (Level A) 	 | Supports | This section’s content is presented in a meaningful sequence  |
| [**1.3.3 Sensory Characteristics**](http://www.w3.org/TR/WCAG20/#content-structure-separation-understanding) (Level A) | Supports | Instructions do not rely on sensory characteristics |
| [**1.4.1 Use of Color**](http://www.w3.org/TR/WCAG20/#visual-audio-contrast-without-color) (Level A)		 | Partially Supports  | Most components do not use solely color to convey meaning. Exceptions include: LInk text in the Sign Up tab describing where to find the Privacy Policy and Terms of Service |
| [**1.4.2 Audio Control**](http://www.w3.org/TR/WCAG20/#visual-audio-contrast-dis-audio) (Level A)	 | Not Applicable | The site does not contain audio that plays automatically |
| [**2.1.1 Keyboard**](http://www.w3.org/TR/WCAG20/#keyboard-operation-keyboard-operable) (Level A)	 | Does Not Support  | Some functionality in this section can be accessed and operated using a keyboard.  Exceptions include:  Github button is not keyboard operable  Google button is not keyboard operable |
| [**2.1.2 No Keyboard Trap**](http://www.w3.org/TR/WCAG20/#keyboard-operation-trapping) (Level A)	 | Supports | This secton does not include keyboard traps  |
| [**2.1.4 Character Key Shortcuts**](https://www.w3.org/TR/WCAG21/#character-key-shortcuts) (Level A 2.1 and 2.2) | Not Applicable  | No shortcuts are used in this section |
| [**2.2.1 Timing Adjustable**](http://www.w3.org/TR/WCAG20/#time-limits-required-behaviors) (Level A) | Not Applicable | This section does not include time limits.  |
| [**2.2.2 Pause, Stop, Hide**](http://www.w3.org/TR/WCAG20/#time-limits-pause) (Level A) | Not Applicable | There are no animations that require the ability to pause, stop, or hide	 |
| [**2.3.1 Three Flashes or Below Threshold**](http://www.w3.org/TR/WCAG20/#seizure-does-not-violate) (Level A) | Not Applicable | This section does not inlcude flashes |
| [**2.4.1 Bypass Blocks**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-skip) (Level A)	 | Not Applicable | No blocks of repeated content  |
| [**2.4.2 Page Titled**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-title) (Level A)	 | Supports | The page is properly titled  |
| [**2.4.3 Focus Order**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-focus-order) (Level A)	  | Does Not Support | Some of the page elements are in a focus order that maintains operability of the page. Exceptions include:  Focus order skips Github and Google log-in/sign-up options.  When Sign Up is selected, focus order skips the form entirely and lands on terms and services  |
| [**2.4.4 Link Purpose (In Context)**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-refs) (Level A) | Supports | Links adequately describe their purpose in context.  |
| [**2.5.1 Pointer Gestures**](https://www.w3.org/TR/WCAG21/#pointer-gestures) (Level A 2.1 and 2.2) | Not Applicable | The site does not rely on multi-point or path-based gestures |
| [**2.5.2 Pointer Cancellation**](https://www.w3.org/TR/WCAG21/#pointer-cancellation) (Level A 2.1 and 2.2) | Supports	 | The site functions that use a single pointer are completed when the user releases the pointer. |
| [**2.5.3 Label in Name**](https://www.w3.org/TR/WCAG21/#label-in-name) (Level A 2.1 and 2.2) | Partially Supports | Most components include their label in their accessible name. Exceptions include:  Github and Google buttons have no accessible names, so their visual labels “Github” and “Google” can’t be included in an accessible name.  Full Name input box has a label and an accessible ame of “full\_name” which reads as “Full Line Name” in a screen reader.  |
| [**2.5.4 Motion Actuation**](https://www.w3.org/TR/WCAG21/#motion-actuation) (Level A 2.1 and 2.2) | Not Applicable | No content depends on the ability to move a device so far	  |
| [**3.1.1 Language of Page**](http://www.w3.org/TR/WCAG20/#meaning-doc-lang-id) (Level A) | Does Not Support  | Page language is not defined  |
| [**3.2.1 On Focus**](http://www.w3.org/TR/WCAG20/#consistent-behavior-receive-focus) (Level A) | Supports | This section’s components do not initiate a change of context when focused.  	 |
| [**3.2.2 On Input**](http://www.w3.org/TR/WCAG20/#consistent-behavior-unpredictable-change) (Level A) | Does Not Support  | Some components do not change context when input is made. Exception includes:  When Sign Up is selected, focus changes to the  terms of service link.  |
| [**3.2.6 Consistent Help**](https://www.w3.org/TR/WCAG22/#consistent-help) (Level A 2.2 only) | Not Evaluated |  |
| [**3.3.1 Error Identification**](http://www.w3.org/TR/WCAG20/#minimize-error-identified) (Level A) | Does Not Support | Some compents provide proper error identification. Exceptions include:  Full Name box does not any alert status that lets the user know why the full name is wrong (unallowed characters, blank full name)  |
| [**3.3.2 Labels or Instructions**](http://www.w3.org/TR/WCAG20/#minimize-error-cues) (Level A) | Partially Supports | Most compoents provide acceptable labels or instructions for inputs. Exception includes:  Instructions are provided for making a new password, but the alert is not screen reader accessible  Placeholder text provides instruction on how to properly format email text, but it is not screen reader accessible  |
| [**3.3.7 Redundant Entry**](https://www.w3.org/TR/WCAG22/#redundant-entry) (Level A 2.2 only) | Not Applicable | No redundant entry of information  |
| [**4.1.1 Parsing**](http://www.w3.org/TR/WCAG20/#ensure-compat-parses) (Level A) WCAG 2.0 and 2.1 – Always answer ‘Supports’ WCAG 2.2 (obsolete and removed) \- Does not apply | Supports |  |
| [**4.1.2 Name, Role, Value**](http://www.w3.org/TR/WCAG20/#ensure-compat-rsv) (Level A)	 | Does Not Support | Some components provide accessible names, roles, and values. Exceptions include:  Github and Google buttons do not have accessible names or roles  Log In and Sign Up buttons do not have roles  |

### **Table 2: Success Criteria, Level AA**

Notes:

| Criteria | Conformance Level | Remarks and Explanations |
| ----- | ----- | ----- |
| [**1.2.4 Captions (Live)**](http://www.w3.org/TR/WCAG20/#media-equiv-real-time-captions) (Level AA) | Not Applicable | This section does not contain live synchronized media  |
| [**1.2.5 Audio Description (Prerecorded)**](http://www.w3.org/TR/WCAG20/#media-equiv-audio-desc-only) (Level AA) | Not Applicable | This section does not contain prerecorded video content that would require audio description  |
| [**1.3.4 Orientation**](https://www.w3.org/TR/WCAG21/#orientation) (Level AA 2.1 and 2.2) | Supports | The content of this section does not restrict its view and operation to a single display orientation	 |
| [**1.3.5 Identify Input Purpose**](https://www.w3.org/TR/WCAG21/#identify-input-purpose) (Level AA 2.1 and 2.2) | Does Not Support  | Input labels that ask for user information do not have descriptive enough labels exposed to accessible technology to pass AA standards. For example, User Email input box has the label Email, but does not direct the user necessarily to who’s email should be inputted. While visually, the example text hints at the user inputting their own email, this is not neccessarily exposed to the screen reader.  |
| [**1.4.3 Contrast (Minimum)**](http://www.w3.org/TR/WCAG20/#visual-audio-contrast-contrast) (Level AA)	 | Supports  | Text in this section meets minimum contrast requirements.  |
| [**1.4.4 Resize text**](http://www.w3.org/TR/WCAG20/#visual-audio-contrast-scale) (Level AA) | Supports | Site content and user interfaces support standard zoom capabilities built into modern web browsers and operating systems. The Chat icon, however, disappears at 200% Zoom in Chromium browsers.  |
| [**1.4.5 Images of Text**](http://www.w3.org/TR/WCAG20/#visual-audio-contrast-text-presentation) (Level AA)	 | Does Not Support  | Logotypes are considered essential, but should have alternative text.  Information contained in the “Shift Finops Left” is not all considered to be essential and should be styled as text.  |
| [**1.4.10 Reflow**](https://www.w3.org/TR/WCAG21/#reflow) (Level AA 2.1 and 2.2)	 | Supports | Information relows properly at a width of 320 pixels.  |
| [**1.4.11 Non-text Contrast**](https://www.w3.org/TR/WCAG21/#non-text-contrast) (Level AA 2.1 and 2.2) | Does Not Support | Focus Indicators need to be high contrast |
| [**1.4.12 Text Spacing**](https://www.w3.org/TR/WCAG21/#text-spacing) (Level AA 2.1 and 2.2) | Supports | The spacing between letters, words, lines of text and/or paragraphs can be adjusted in the site’s webpage.   |
| [**1.4.13 Content on Hover or Focus**](https://www.w3.org/TR/WCAG21/#content-on-hover-or-focus) (Level AA 2.1 and 2.2) | Not Applicable | Tooltip for password characteristics appears when the user starts inputting a password, not on focus or hover  |
| [**2.4.5 Multiple Ways**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-mult-loc) (Level AA)	 | Not Applicable  | Single page application |
| [**2.4.6 Headings and Labels**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-descriptive) (Level AA)	 | Not Applicable | No visible headings or visible labels  |
| [**2.4.7 Focus Visible**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-focus-visible) (Level AA)	 | Partially Support | Most focusable elements have a visible focus indicators. Exceptions include: Log-in and Sign-up Tab Buttons do not have visible focus indicators |
| [**2.4.11 Focus Not Obscured (Minimum)**](https://www.w3.org/TR/WCAG22/#focus-not-obscured-minimum) (Level AA 2.2 only) | Not Evaluated |  |
| [**2.5.7 Dragging Movements**](https://www.w3.org/TR/WCAG22/#dragging-movements) (Level AA 2.2 only) | Not Evaluated |  |
| [**2.5.8 Target Size (Minimum)**](https://www.w3.org/TR/WCAG22/#target-size-minimum) (Level AA 2.2 only) | Not Evaluated |  |
| [**3.1.2 Language of Parts**](http://www.w3.org/TR/WCAG20/#meaning-other-lang-id) (Level AA) | Not Applicable | No parts in different languages from the rest of the page  |
| [**3.2.3 Consistent Navigation**](http://www.w3.org/TR/WCAG20/#consistent-behavior-consistent-locations) (Level AA)	 | Not Applicable | Single page web application |
| [**3.2.4 Consistent Identification**](http://www.w3.org/TR/WCAG20/#consistent-behavior-consistent-functionality) (Level AA) | Supports | Identification of interactive objects stays the same even when the page changes |
| [**3.3.3 Error Suggestion**](http://www.w3.org/TR/WCAG20/#minimize-error-suggestions) (Level AA)	 		 | Partially Supports | Most elements provide error suggestion. Exceptions include:  While there is an error suggestion alert provided for the password upon input, it may not be exposed to the screen reader  Information about proper way to format emails is in the placeholder text, which means it may not be screen reader accessible |
| [**3.3.4 Error Prevention (Legal, Financial, Data)**](http://www.w3.org/TR/WCAG20/#minimize-error-reversible) (Level AA) | Supports  | All errors are checked, and the user is given the chance to correct |
| [**3.3.8 Accessible Authentication (Minimum)**](https://www.w3.org/TR/WCAG22/#accessible-authentication-minimum) (Level AA 2.2 only) | Not Evaluated |  |
| [**4.1.3 Status Messages**](https://www.w3.org/TR/WCAG21/#status-messages) (Level AA 2.1 and 2.2)	 | Not Applicable | No Status Messages  |

# 

# **Individual Policy Page**

### **Table 1: Success Criteria, Level A**

Notes:	

| Criteria | Conformance Level | Remarks and Explanations |
| ----- | ----- | ----- |
| [**1.1.1 Non-text Content**](http://www.w3.org/TR/WCAG20/#text-equiv-all) (Level A) | Does Not Support  | This section provides sufficient text alternatives for some instances of non-text content. Exceptions include:  Magnifying Glass Icon has no alt text  Plus Icon has no alt text  Coding Node icon has no alt text  Block icon has no alt text  Document icons have no alt text   |
| [**1.2.1 Audio-only and Video-only (Prerecorded)**](http://www.w3.org/TR/WCAG20/#media-equiv-av-only-alt) (Level A) | Not Applicable  | This section does not contain prerecorded audio-only or video-only media  |
| [**1.2.2 Captions (Prerecorded)**](http://www.w3.org/TR/WCAG20/#media-equiv-captions) (Level A) | Not Applicable  | This section does not contain prerecorded synchronized media.  |
| [**1.2.3 Audio Description or Media Alternative (Prerecorded)**](http://www.w3.org/TR/WCAG20/#media-equiv-audio-desc) (Level A) | Not Applicable  | This section does not contain prerecorded video content that would require audio description or a media alternative.  |
| [**1.3.1 Info and Relationships**](http://www.w3.org/TR/WCAG20/#content-structure-separation-programmatic) (Level A) | Does Not Support | Some visual structure and relationship information is provided through object information is available in text. Exceptions include:  “Active Policy” visual heading is not a programmatic heading  “Only Trigger when new resources are added“ visual heading is not a programmatic heading “Include details in pull requests” visual heading is not a programmatic heading “Description” visual heading is not a programmatic heading “Customize AutoFix prompt visual heading is not a programmatic heading “Tags Filter” visual heading is not a programmatic heading “Repositories Filter” visual heading is not a programmatic heading “Base Branches Filter” visual heading is not a programmatic heading “Projects Filter” visual heading is not a programmatic heading |
| [**1.3.2 Meaningful Sequence**](http://www.w3.org/TR/WCAG20/#content-structure-separation-sequence) (Level A) 	 | Supports | This section’s content is presented in a meaningful sequence |
| [**1.3.3 Sensory Characteristics**](http://www.w3.org/TR/WCAG20/#content-structure-separation-understanding) (Level A) | Supports | This section does not require sensory characteristics in its instructions to the user.  |
| [**1.4.1 Use of Color**](http://www.w3.org/TR/WCAG20/#visual-audio-contrast-without-color) (Level A)		 | Does Not Support  | Some components do not solely use color to convey meaning to the user. Exceptions include:  “Back to FinOps Policies” link uses only color to distinguish itself as a link  “Reset to Default” link uses only color to distinguish itself Error text uses only color to differentiate it from other text |
| [**1.4.2 Audio Control**](http://www.w3.org/TR/WCAG20/#visual-audio-contrast-dis-audio) (Level A)	 | Not Applicable  | The site does not contain audio that plays automatically |
| [**2.1.1 Keyboard**](http://www.w3.org/TR/WCAG20/#keyboard-operation-keyboard-operable) (Level A)	 | Supports | Functionality in this section can be accessed and operated using a keyboard.  |
| [**2.1.2 No Keyboard Trap**](http://www.w3.org/TR/WCAG20/#keyboard-operation-trapping) (Level A)	 | Supports | This section does not include keyboard traps  |
| [**2.1.4 Character Key Shortcuts**](https://www.w3.org/TR/WCAG21/#character-key-shortcuts) (Level A 2.1 and 2.2) | Not Applicable | No shortcuts are used in this section |
| [**2.2.1 Timing Adjustable**](http://www.w3.org/TR/WCAG20/#time-limits-required-behaviors) (Level A) | Not Applicable  | This section does not include time limits |
| [**2.2.2 Pause, Stop, Hide**](http://www.w3.org/TR/WCAG20/#time-limits-pause) (Level A) | Supports | Any animations present are considered essential because not indicating progress could confuse users or cause them to think that content was frozen or broken. |
| [**2.3.1 Three Flashes or Below Threshold**](http://www.w3.org/TR/WCAG20/#seizure-does-not-violate) (Level A) | Not Applicable | There are no flashes in this section |
| [**2.4.1 Bypass Blocks**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-skip) (Level A)	 | Partially Supports  | The navigation pane is the only programmatic landmark that can allow users to bypass it.  The footer and main sections of the page should also be programmed as landmarks.  	 |
| [**2.4.2 Page Titled**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-title) (Level A)	 | Supports | The page is properly titled |
| [**2.4.3 Focus Order**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-focus-order) (Level A)	  | Partially Supports   | Most elements in this secton receive proper focus. Exceptions include:  “Reset to Default” link is not focusable  |
| [**2.4.4 Link Purpose (In Context)**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-refs) (Level A) | Supports | Links adequately describe their purpose in context.  |
| [**2.5.1 Pointer Gestures**](https://www.w3.org/TR/WCAG21/#pointer-gestures) (Level A 2.1 and 2.2) | Not Applicable | This site does not rely on multi-point or path-based gestures	 |
| [**2.5.2 Pointer Cancellation**](https://www.w3.org/TR/WCAG21/#pointer-cancellation) (Level A 2.1 and 2.2) | Supports | The site functions that use a single pointer are completed when the user releases the pointer.  |
| [**2.5.3 Label in Name**](https://www.w3.org/TR/WCAG21/#label-in-name) (Level A 2.1 and 2.2) | Partially Supports | Most elements in this section have their labels in their accessible name. Exceptions include:  “Description” and “Customize AutoFix prompt” text areas do not have labels or accessible names |
| [**2.5.4 Motion Actuation**](https://www.w3.org/TR/WCAG21/#motion-actuation) (Level A 2.1 and 2.2) | Not Applicable | No content depends on the ability to move a device |
| [**3.1.1 Language of Page**](http://www.w3.org/TR/WCAG20/#meaning-doc-lang-id) (Level A) | Supports | Page language is programmatically determined  |
| [**3.2.1 On Focus**](http://www.w3.org/TR/WCAG20/#consistent-behavior-receive-focus) (Level A) | Supports | This section’s components do not initiate a change of context when focused	 |
| [**3.2.2 On Input**](http://www.w3.org/TR/WCAG20/#consistent-behavior-unpredictable-change) (Level A) | Supports | This section’s components do not initiate a change of context on input |
| [**3.2.6 Consistent Help**](https://www.w3.org/TR/WCAG22/#consistent-help) (Level A 2.2 only) | Not Evaluated |  |
| [**3.3.1 Error Identification**](http://www.w3.org/TR/WCAG20/#minimize-error-identified) (Level A) | Supports | Aria-invalid used for automatically identified labels 	 |
| [**3.3.2 Labels or Instructions**](http://www.w3.org/TR/WCAG20/#minimize-error-cues) (Level A) | Does Not Support  | Some user interfaces in this section include descriptive labels or instructions. Exceptions include: 	 “Description” and “Customize AutoFix prompt” text areas do not have accessible labels  While text areas do have instructions provided as placeholder text, placeholders may not be exposed to screen readers  |
| [**3.3.7 Redundant Entry**](https://www.w3.org/TR/WCAG22/#redundant-entry) (Level A 2.2 only) | Not Evaluated |  |
| [**4.1.1 Parsing**](http://www.w3.org/TR/WCAG20/#ensure-compat-parses) (Level A) WCAG 2.0 and 2.1 – Always answer ‘Supports’ WCAG 2.2 (obsolete and removed) \- Does not apply | Supports |  |
| [**4.1.2 Name, Role, Value**](http://www.w3.org/TR/WCAG20/#ensure-compat-rsv) (Level A)	 | Does Not Support  | Some user interface components in this section provide programmatic name, role, and/or state information.  Exceptions include:  “Description” and “Customize AutoFix prompt” text areas do not have accessible labels  |

### **Table 2: Success Criteria, Level AA**

Notes: 

| Criteria | Conformance Level | Remarks and Explanations |
| ----- | ----- | ----- |
| [**1.2.4 Captions (Live)**](http://www.w3.org/TR/WCAG20/#media-equiv-real-time-captions) (Level AA) | Not Applicable | This section does not contain live synchronized media  |
| [**1.2.5 Audio Description (Prerecorded)**](http://www.w3.org/TR/WCAG20/#media-equiv-audio-desc-only) (Level AA) | Not Applicable | This section does not contain prerecorded video content that would require audio description  |
| [**1.3.4 Orientation**](https://www.w3.org/TR/WCAG21/#orientation) (Level AA 2.1 and 2.2) | Supports | The content of this section does not restrict its view and operation to a single display orientation |
| [**1.3.5 Identify Input Purpose**](https://www.w3.org/TR/WCAG21/#identify-input-purpose) (Level AA 2.1 and 2.2) | Not Applicable | This section does not contain input fields that require the user to enter personally identifiable information.   |
| [**1.4.3 Contrast (Minimum)**](http://www.w3.org/TR/WCAG20/#visual-audio-contrast-contrast) (Level AA)	 | Partially Supports | Most text in this section meets minimumc ontrast requriements. Exceptions include:  Error text does not meet minimum contrast ratios |
| [**1.4.4 Resize text**](http://www.w3.org/TR/WCAG20/#visual-audio-contrast-scale) (Level AA) | Supports | Site content and user interfaces support standard zoom capabilities built into modern web browsers and operating systems.  |
| [**1.4.5 Images of Text**](http://www.w3.org/TR/WCAG20/#visual-audio-contrast-text-presentation) (Level AA)	 | Supports | No images of text in this section |
| [**1.4.10 Reflow**](https://www.w3.org/TR/WCAG21/#reflow) (Level AA 2.1 and 2.2)	 | Supports | Page information properly reflows at a width of 320 pixels.		 |
| [**1.4.11 Non-text Contrast**](https://www.w3.org/TR/WCAG21/#non-text-contrast) (Level AA 2.1 and 2.2) | Partially Supports | Most non-text components maintain sufficient contrast against the background. Exceptions include: Light blue focus indicators do not maintain enough contrast Pink focus indicators do not maintain enough contrast |
| [**1.4.12 Text Spacing**](https://www.w3.org/TR/WCAG21/#text-spacing) (Level AA 2.1 and 2.2) | Supports | The spacing between letters, words, lines of text and/or paragraphs can be adjusted in the site’s webpage.	 |
| [**1.4.13 Content on Hover or Focus**](https://www.w3.org/TR/WCAG21/#content-on-hover-or-focus) (Level AA 2.1 and 2.2) | Does Not Support | Tooltips that become available when hovering over information images are not dismissable.  |
| [**2.4.5 Multiple Ways**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-mult-loc) (Level AA)	 | Does Not Support  | There is only one way to navigate the page – the navigation pane. 	 |
| [**2.4.6 Headings and Labels**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-descriptive) (Level AA)	 | Partially Supports | Most headings and labels that do exist are descriptive. Exceptions include:  “Only trigger when new resources are added” check button’s label actually says “Active Policy” |
| [**2.4.7 Focus Visible**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-focus-visible) (Level AA)	 | Supports | All focusable items have a visual focus indicator |
| [**2.4.11 Focus Not Obscured (Minimum)**](https://www.w3.org/TR/WCAG22/#focus-not-obscured-minimum) (Level AA 2.2 only) | Not Evaluated |  |
| [**2.5.7 Dragging Movements**](https://www.w3.org/TR/WCAG22/#dragging-movements) (Level AA 2.2 only) | Not Evaluated |  |
| [**2.5.8 Target Size (Minimum)**](https://www.w3.org/TR/WCAG22/#target-size-minimum) (Level AA 2.2 only) | Not Evaluated |  |
| [**3.1.2 Language of Parts**](http://www.w3.org/TR/WCAG20/#meaning-other-lang-id) (Level AA) | Not Applicable  | No components are in alternate languages |
| [**3.2.3 Consistent Navigation**](http://www.w3.org/TR/WCAG20/#consistent-behavior-consistent-locations) (Level AA)	 | Supports | Navigation stays consistent across pages  |
| [**3.2.4 Consistent Identification**](http://www.w3.org/TR/WCAG20/#consistent-behavior-consistent-functionality) (Level AA) | Supports | Identification of interactive objects stays the same even when the page changes  |
| [**3.3.3 Error Suggestion**](http://www.w3.org/TR/WCAG20/#minimize-error-suggestions) (Level AA)	 		 | Supports | Automatically detected errors provide suggestions when possible to the user |
| [**3.3.4 Error Prevention (Legal, Financial, Data)**](http://www.w3.org/TR/WCAG20/#minimize-error-reversible) (Level AA) | Supports | Confirmation dialogues are available, along with cancel buttons, to prevent the user from submitting consequential errors |
| [**3.3.8 Accessible Authentication (Minimum)**](https://www.w3.org/TR/WCAG22/#accessible-authentication-minimum) (Level AA 2.2 only) | Not Evaluated  |  |
| [**4.1.3 Status Messages**](https://www.w3.org/TR/WCAG21/#status-messages) (Level AA 2.1 and 2.2)	 | Supports | Status messages are exposed to the user programattically.  |

# 

# **Aggregated Policy Page**

### **Table 1: Success Criteria, Level A**

Notes:	

| Criteria | Conformance Level | Remarks and Explanations |
| ----- | ----- | ----- |
| [**1.1.1 Non-text Content**](http://www.w3.org/TR/WCAG20/#text-equiv-all) (Level A) | Does Not Support  | This section provides sufficient text alternatives for some instances of non-text content. Exceptions Include:  Lightning Bolt Icon Up Arrow icon Ellipses Icon  Magnifying Glass Icon  Checkmark Icon |
| [**1.2.1 Audio-only and Video-only (Prerecorded)**](http://www.w3.org/TR/WCAG20/#media-equiv-av-only-alt) (Level A) | Not Applicable  | This section does not contain prerecorded audio-only or video-only media  |
| [**1.2.2 Captions (Prerecorded)**](http://www.w3.org/TR/WCAG20/#media-equiv-captions) (Level A) | Not Applicable  | This section does not contain prerecorded synchronized media.  |
| [**1.2.3 Audio Description or Media Alternative (Prerecorded)**](http://www.w3.org/TR/WCAG20/#media-equiv-audio-desc) (Level A) | Not Applicable  | This section does not contain prerecorded video content that would require audio description or a media alternative.  |
| [**1.3.1 Info and Relationships**](http://www.w3.org/TR/WCAG20/#content-structure-separation-programmatic) (Level A) | Partially Supports  | Most visual structure and relationship information is provided through object information is available in text. Exceptions include:  Table cells only announce the top header (PR Comment i.e.) without context of which policy has PR comments enabled.  |
| [**1.3.2 Meaningful Sequence**](http://www.w3.org/TR/WCAG20/#content-structure-separation-sequence) (Level A) 	 | Supports | This section’s content is presented in a meaningful sequence |
| [**1.3.3 Sensory Characteristics**](http://www.w3.org/TR/WCAG20/#content-structure-separation-understanding) (Level A) | Supports | This section does not require sensory characteristics in its instructions to the user.  |
| [**1.4.1 Use of Color**](http://www.w3.org/TR/WCAG20/#visual-audio-contrast-without-color) (Level A)		 | Does Not Support | Some components do not solely use color to convey meaning to the user. Exceptions include:  “Back to Cloud Policies” link “Production Filters” link  “Add another condition” button  Checkmarks only use color to distinguish between an enabled option and disabled option “Request Policy” button Error messages use only red text to notify the users that there is an error |
| [**1.4.2 Audio Control**](http://www.w3.org/TR/WCAG20/#visual-audio-contrast-dis-audio) (Level A)	 | Not Applicable | The site does not contain audio that plays automatically  |
| [**2.1.1 Keyboard**](http://www.w3.org/TR/WCAG20/#keyboard-operation-keyboard-operable) (Level A)	 | Partially Supports | Most functionality in this section can be accessed and operated using a keyboard. Exceptions include:  “Back to Cloud Policies” link is not keyboard operable  Tooltips are not keyboard operable  Focus disappears after the “Your Policy” tab interface |
| [**2.1.2 No Keyboard Trap**](http://www.w3.org/TR/WCAG20/#keyboard-operation-trapping) (Level A)	 | Supports | This section does not include keyboard traps  |
| [**2.1.4 Character Key Shortcuts**](https://www.w3.org/TR/WCAG21/#character-key-shortcuts) (Level A 2.1 and 2.2) | Not Applicable | No shortcuts are used in this section	 |
| [**2.2.1 Timing Adjustable**](http://www.w3.org/TR/WCAG20/#time-limits-required-behaviors) (Level A) | Not Applicable | This section does not include time limits |
| [**2.2.2 Pause, Stop, Hide**](http://www.w3.org/TR/WCAG20/#time-limits-pause) (Level A) | Supports | Any animations present are considered essential because not indicating progress could confuse users or cause them to think that content was frozen or broken.  |
| [**2.3.1 Three Flashes or Below Threshold**](http://www.w3.org/TR/WCAG20/#seizure-does-not-violate) (Level A) | Not Applicable  | This sectoin does not include flashes |
| [**2.4.1 Bypass Blocks**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-skip) (Level A)	 | Partially Supports  | The navigation pane is the only programmatic landmark that can allow users to bypass it.  The footer and main sections of the page should also be programmed as landmarks.  	 |
| [**2.4.2 Page Titled**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-title) (Level A)	 | Does Not Support  | While there is a page title present, it refers to the wrong web page. Cloud Security Policy edit page is titled “Request a new Finops Policy” |
| [**2.4.3 Focus Order**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-focus-order) (Level A)	  | Partially Supports | Most elements in this secton receive proper focus in an order that maintains understandability and operability. Exceptions include:  “Back to Cloud Policies” link is not focusable  Tooltips are not focusable Focus disappears after the “Your Policy” tab interface |
| [**2.4.4 Link Purpose (In Context)**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-refs) (Level A) | Supports | Links adequately describe their purpose in context.  |
| [**2.5.1 Pointer Gestures**](https://www.w3.org/TR/WCAG21/#pointer-gestures) (Level A 2.1 and 2.2)	 | Not Applicable | This site does not rely on multi-point or path-based gestures	 |
| [**2.5.2 Pointer Cancellation**](https://www.w3.org/TR/WCAG21/#pointer-cancellation) (Level A 2.1 and 2.2) | Partially Supports | Most site functions that use a single pointer are completed when the user released the pointer. Exceptions include;  “Your Policies” and “Policies Library” tabs trigger on pointer down, not pointer up.  |
| [**2.5.3 Label in Name**](https://www.w3.org/TR/WCAG21/#label-in-name) (Level A 2.1 and 2.2) | Partially Supports | Most elements in this section have their labels in their accessible name. Exceptions include:   “Describe your policy” text box does not have an associated label or instructions exposed to screen readers |
| [**2.5.4 Motion Actuation**](https://www.w3.org/TR/WCAG21/#motion-actuation) (Level A 2.1 and 2.2) | Not Applicable  | No content depends on the ability to move a device |
| [**3.1.1 Language of Page**](http://www.w3.org/TR/WCAG20/#meaning-doc-lang-id) (Level A) | Supports | Page language is programmatically determined  |
| [**3.2.1 On Focus**](http://www.w3.org/TR/WCAG20/#consistent-behavior-receive-focus) (Level A) | Supports | This section’s components do not initiate a change of context when focused |
| [**3.2.2 On Input**](http://www.w3.org/TR/WCAG20/#consistent-behavior-unpredictable-change) (Level A) | Supports | This section’s components do not initiate a change of context on input |
| [**3.2.6 Consistent Help**](https://www.w3.org/TR/WCAG22/#consistent-help) (Level A 2.2 only) | Not Evaluated |  |
| [**3.3.1 Error Identification**](http://www.w3.org/TR/WCAG20/#minimize-error-identified) (Level A) | Supports	 | Aria-invalid used for automatically identified errors 	 |
| [**3.3.2 Labels or Instructions**](http://www.w3.org/TR/WCAG20/#minimize-error-cues) (Level A) | Does Not Support | Some user interfaces in this section include descriptive labels or instructions. Exceptions include:  “Describe your policy” text box does not have an associated label or instructions exposed to screen readers While there are instructions provided for text boxes, instructions are either place-holder texts (which are not exposed to all screen readers), or instructions are paragraph text not associated with the text box. |
| [**3.3.7 Redundant Entry**](https://www.w3.org/TR/WCAG22/#redundant-entry) (Level A 2.2 only) | Not Evaluated |  |
| [**4.1.1 Parsing**](http://www.w3.org/TR/WCAG20/#ensure-compat-parses) (Level A) WCAG 2.0 and 2.1 – Always answer ‘Supports’ WCAG 2.2 (obsolete and removed) \- Does not apply | Supports |  |
| [**4.1.2 Name, Role, Value**](http://www.w3.org/TR/WCAG20/#ensure-compat-rsv) (Level A)	 | Partially Supports | Most user interface components in this secitn provide programmatic name, role, and/or state information. Exceptions include:  Up Arrow Icon Button does not list button as it’s role.  |

### **Table 2: Success Criteria, Level AA**

Notes: 

| Criteria | Conformance Level | Remarks and Explanations |
| ----- | ----- | ----- |
| [**1.2.4 Captions (Live)**](http://www.w3.org/TR/WCAG20/#media-equiv-real-time-captions) (Level AA) | Not Applicable | This section does not contain live synchronized media  |
| [**1.2.5 Audio Description (Prerecorded)**](http://www.w3.org/TR/WCAG20/#media-equiv-audio-desc-only) (Level AA) | Not Applicable | This section does not contain prerecorded video content that would require audio description  |
| [**1.3.4 Orientation**](https://www.w3.org/TR/WCAG21/#orientation) (Level AA 2.1 and 2.2)	 | Supports | The content of this section does not restrict its view and operation to a single display orientation |
| [**1.3.5 Identify Input Purpose**](https://www.w3.org/TR/WCAG21/#identify-input-purpose) (Level AA 2.1 and 2.2) | Not Applicable  | This section does not contain input fields that require the user to enter personally identifiable information.  |
| [**1.4.3 Contrast (Minimum)**](http://www.w3.org/TR/WCAG20/#visual-audio-contrast-contrast) (Level AA)	 | Supports | Text in this section meets minimumc ontrast requriements.  |
| [**1.4.4 Resize text**](http://www.w3.org/TR/WCAG20/#visual-audio-contrast-scale) (Level AA)	 | Supports | Site content and user interfaces support standard zoom capabilities built into modern web browsers and operating systems.  |
| [**1.4.5 Images of Text**](http://www.w3.org/TR/WCAG20/#visual-audio-contrast-text-presentation) (Level AA)	 | Supports | All images of text are essential logotypes |
| [**1.4.10 Reflow**](https://www.w3.org/TR/WCAG21/#reflow) (Level AA 2.1 and 2.2)	 | Does Not Support | Page does not properly reflow at a width of 320 pixels.Exceptions include:   While the Table of policies is allowed to scroll back and forth in two dimensions, the rest of the page shouldn’t.  |
| [**1.4.11 Non-text Contrast**](https://www.w3.org/TR/WCAG21/#non-text-contrast) (Level AA 2.1 and 2.2) | Does Not Support | Some non-text components maintain sufficient contrast against the background. Exceptions include:  Light blue focus indicators do not maintain enough contrast Pink focus indicators do not maintain enough contrast Light Green Icons |
| [**1.4.12 Text Spacing**](https://www.w3.org/TR/WCAG21/#text-spacing) (Level AA 2.1 and 2.2) | Partially Supports | The spacing between letters, words, lines of text and/or paragraphs can be adjusted in the site’s webpage. However, some issues occur:  Information and Up arrow icons are no longer vertically cented when using text spacing.  |
| [**1.4.13 Content on Hover or Focus**](https://www.w3.org/TR/WCAG21/#content-on-hover-or-focus) (Level AA 2.1 and 2.2) | Does Not Support  | Tooltips that become available when hovering over information images are not dismissable.  |
| [**2.4.5 Multiple Ways**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-mult-loc) (Level AA)	 | Does Not Support  | There is only one way to navigate the page – the navigation pane.  |
| [**2.4.6 Headings and Labels**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-descriptive) (Level AA)	 | Partially supports  | Most headings and labels that do exist are descriptive. Exceptions include:  “Search” input box has no label  “Describe your policy” input box has no label  |
| [**2.4.7 Focus Visible**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-focus-visible) (Level AA)	 | Supports | All focusable items have a visual focus indicator |
| [**2.4.11 Focus Not Obscured (Minimum)**](https://www.w3.org/TR/WCAG22/#focus-not-obscured-minimum) (Level AA 2.2 only) | Not Evaluated |  |
| [**2.5.7 Dragging Movements**](https://www.w3.org/TR/WCAG22/#dragging-movements) (Level AA 2.2 only) | Not Evaluated |  |
| [**2.5.8 Target Size (Minimum)**](https://www.w3.org/TR/WCAG22/#target-size-minimum) (Level AA 2.2 only) | Not Evaluated |  |
| [**3.1.2 Language of Parts**](http://www.w3.org/TR/WCAG20/#meaning-other-lang-id) (Level AA) | Not Applicable  | No components are in alternate languages |
| [**3.2.3 Consistent Navigation**](http://www.w3.org/TR/WCAG20/#consistent-behavior-consistent-locations) (Level AA)	 | Supports | Navigation stays consistent across pages  |
| [**3.2.4 Consistent Identification**](http://www.w3.org/TR/WCAG20/#consistent-behavior-consistent-functionality) (Level AA) | Supports | Identification of interactive objects stays the same even when the page changes  |
| [**3.3.3 Error Suggestion**](http://www.w3.org/TR/WCAG20/#minimize-error-suggestions) (Level AA)	 		 | Supports | Automatically detected errors provide suggestions when possible to the user |
| [**3.3.4 Error Prevention (Legal, Financial, Data)**](http://www.w3.org/TR/WCAG20/#minimize-error-reversible) (Level AA) | Supports  | Confirmation dialogues are available, along with cancel buttons, to prevent the user from submitting consequential errors  |
| [**3.3.8 Accessible Authentication (Minimum)**](https://www.w3.org/TR/WCAG22/#accessible-authentication-minimum) (Level AA 2.2 only) | Not Evaluated |  |
| [**4.1.3 Status Messages**](https://www.w3.org/TR/WCAG21/#status-messages) (Level AA 2.1 and 2.2)	 | Does Not Support | Status messages are exposed to the user programmatitically.  |

# 

# **Cost Guardrails**

### **Table 1: Success Criteria, Level A**

Notes:	

| Criteria | Conformance Level | Remarks and Explanations |
| ----- | ----- | ----- |
| [**1.1.1 Non-text Content**](http://www.w3.org/TR/WCAG20/#text-equiv-all) (Level A) | Does Not Support |  |
| [**1.2.1 Audio-only and Video-only (Prerecorded)**](http://www.w3.org/TR/WCAG20/#media-equiv-av-only-alt) (Level A) | Not Applicable  | This section does not contain prerecorded audio-only or video-only media  |
| [**1.2.2 Captions (Prerecorded)**](http://www.w3.org/TR/WCAG20/#media-equiv-captions) (Level A) | Not Applicable  | This section does not contain prerecorded synchronized media.  |
| [**1.2.3 Audio Description or Media Alternative (Prerecorded)**](http://www.w3.org/TR/WCAG20/#media-equiv-audio-desc) (Level A) | Not Applicable  | This section does not contain prerecorded video content that would require audio description or a media alternative.  |
| [**1.3.1 Info and Relationships**](http://www.w3.org/TR/WCAG20/#content-structure-separation-programmatic) (Level A) | Does Not Support | Some visual structure and relationship information is provided through object information is available in text. Exceptions include:  Microsoft Teams Channels input box, Guardrail Name input box, Mailing list emails input box, Search input and Custom Message input box have no accessible labels Table has no scope attribute |
| [**1.3.2 Meaningful Sequence**](http://www.w3.org/TR/WCAG20/#content-structure-separation-sequence) (Level A) 	 | Supports | This section’s content is presented in a meaningful sequence |
| [**1.3.3 Sensory Characteristics**](http://www.w3.org/TR/WCAG20/#content-structure-separation-understanding) (Level A) | Supports | This section does not require sensory characteristics in its instructions to the user.  |
| [**1.4.1 Use of Color**](http://www.w3.org/TR/WCAG20/#visual-audio-contrast-without-color) (Level A)		 | Does Not Support | Some components do not solely use color to convey meaning to the user. Exceptions include:  “Our Docs” and “Back to Guardrails” links use only color to distingusih themselves  Error text uses only color to distinguish itself  Text for disabled “CC pull request author on notification emails” uses only color to distinguish between its enabled and disabled states  “Create” button uses only color to distinguish it as disabled or enabled |
| [**1.4.2 Audio Control**](http://www.w3.org/TR/WCAG20/#visual-audio-contrast-dis-audio) (Level A)	 | Not Applicable | The site does not contain audio that plays automatically |
| [**2.1.1 Keyboard**](http://www.w3.org/TR/WCAG20/#keyboard-operation-keyboard-operable) (Level A)	 | Partially Supports | Most functionality in this section can be accessed and operated using a keyboard. Exceptions include:  “Clear Email” X button is focusable, but is not operable using the keyboard “Clear All Selected” button is not focusable, which does not preserve the operabiltiy of the page |
| [**2.1.2 No Keyboard Trap**](http://www.w3.org/TR/WCAG20/#keyboard-operation-trapping) (Level A)	 | Supports | This section does not include keyboard traps  |
| [**2.1.4 Character Key Shortcuts**](https://www.w3.org/TR/WCAG21/#character-key-shortcuts) (Level A 2.1 and 2.2) | Not Applicable | No shortcuts are used in this section	 |
| [**2.2.1 Timing Adjustable**](http://www.w3.org/TR/WCAG20/#time-limits-required-behaviors) (Level A) | Not Applicable | This section does not include time limits |
| [**2.2.2 Pause, Stop, Hide**](http://www.w3.org/TR/WCAG20/#time-limits-pause) (Level A) | Supports | Any animations present are considered essential because not indicating progress could confuse users or cause them to think that content was frozen or broken. |
| [**2.3.1 Three Flashes or Below Threshold**](http://www.w3.org/TR/WCAG20/#seizure-does-not-violate) (Level A) | Supports | This sectoin does not include flashes |
| [**2.4.1 Bypass Blocks**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-skip) (Level A)	 | Partially Supports  | The navigation pane is the only programmatic landmark that can allow users to bypass it.  The footer and main sections of the page should also be programmed as landmarks.  |
| [**2.4.2 Page Titled**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-title) (Level A)	 | Supports  | Page is properly titled  |
| [**2.4.3 Focus Order**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-focus-order) (Level A)	  | Partially Supports | Most elements in this secton receive proper focus. Exceptions include:  “Clear All Selected” button is not focusable, which does not preserve page operability  |
| [**2.4.4 Link Purpose (In Context)**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-refs) (Level A) | Supports | Links adequately describe their purpose in context.  |
| [**2.5.1 Pointer Gestures**](https://www.w3.org/TR/WCAG21/#pointer-gestures) (Level A 2.1 and 2.2)	 | Not Applicable | This site does not rely on multi-point or path-based gestures	 |
| [**2.5.2 Pointer Cancellation**](https://www.w3.org/TR/WCAG21/#pointer-cancellation) (Level A 2.1 and 2.2) | Partially Supports | Most site functions that use a single pointer are completed when the user releases the pointer.  “Clear All Selected” button fires on the down event rather than the up event  |
| [**2.5.3 Label in Name**](https://www.w3.org/TR/WCAG21/#label-in-name) (Level A 2.1 and 2.2) | Does Not Support | Most elements in this section have their labels in their accessible name. Exceptions include:  Search input box has no label  Microsoft Teams channels input box has no label  Guardrail Name input box has no label  Custom Message input box has no label  Mailing List Emails input box has no label |
| [**2.5.4 Motion Actuation**](https://www.w3.org/TR/WCAG21/#motion-actuation) (Level A 2.1 and 2.2) | Not Applicable  | No content depends on the ability to move a device |
| [**3.1.1 Language of Page**](http://www.w3.org/TR/WCAG20/#meaning-doc-lang-id) (Level A) | Supports | Page language is programmatically determined  |
| [**3.2.1 On Focus**](http://www.w3.org/TR/WCAG20/#consistent-behavior-receive-focus) (Level A) | Supports | This section’s components do not initiate a change of context when focused	 |
| [**3.2.2 On Input**](http://www.w3.org/TR/WCAG20/#consistent-behavior-unpredictable-change) (Level A) | Supports | This section’s components do not initiate a change of context on input |
| [**3.2.6 Consistent Help**](https://www.w3.org/TR/WCAG22/#consistent-help) (Level A 2.2 only) | Not Evaluated |  |
| [**3.3.1 Error Identification**](http://www.w3.org/TR/WCAG20/#minimize-error-identified) (Level A) | Supports | Aria-invalid used for automatically identified labels 	 |
| [**3.3.2 Labels or Instructions**](http://www.w3.org/TR/WCAG20/#minimize-error-cues) (Level A) | Does Not Support | Some user interfaces in this section include descriptive labels or instructions. Exceptions include:  Search input box has no label  Microsoft Teams channels input box has no label  Guardrail Name input box has no label  Custom Message input box has no label  Mailing List Emails input box has no label While text areas do have instructions provided as placeholder text, placeholders may not be exposed to screen readers: Guardrail Name  Enter a value (increase threshold) Enter a value (Increase percent threshold) Enter a value (Total Threshold) Additional Emails Slack Channel Microsoft Teams  Custom Message All Filters text boxes   |
| [**3.3.7 Redundant Entry**](https://www.w3.org/TR/WCAG22/#redundant-entry) (Level A 2.2 only) | Not Evaluated |  |
| [**4.1.1 Parsing**](http://www.w3.org/TR/WCAG20/#ensure-compat-parses) (Level A) WCAG 2.0 and 2.1 – Always answer ‘Supports’ WCAG 2.2 (obsolete and removed) \- Does not apply | Support |  |
| [**4.1.2 Name, Role, Value**](http://www.w3.org/TR/WCAG20/#ensure-compat-rsv) (Level A)	 | Does Not Support  | Some user interface components in this section provide programmatic name, role, and/or state information.  Exceptions include: Search input box has no label  Microsoft Teams channels input box has no label  Guardrail Name input box has no label  Custom Message input box has no label  Mailing List Emails input box has no label  “Clear Email” button does not identify its role properly as a button  Status text does not identify its role properly as a status indicator  	 |

### **Table 2: Success Criteria, Level AA**

Notes: 

| Criteria | Conformance Level | Remarks and Explanations |
| ----- | ----- | ----- |
| [**1.2.4 Captions (Live)**](http://www.w3.org/TR/WCAG20/#media-equiv-real-time-captions) (Level AA) | Not Applicable | This section does not contain live synchronized media  |
| [**1.2.5 Audio Description (Prerecorded)**](http://www.w3.org/TR/WCAG20/#media-equiv-audio-desc-only) (Level AA) | Not Applicable | This section does not contain prerecorded video content that would require audio description  |
| [**1.3.4 Orientation**](https://www.w3.org/TR/WCAG21/#orientation) (Level AA 2.1 and 2.2)	 | Supports | The content of this section does not restrict its view and operation to a single display orientation |
| [**1.3.5 Identify Input Purpose**](https://www.w3.org/TR/WCAG21/#identify-input-purpose) (Level AA 2.1 and 2.2) | Supports | While the page asks for user emails, the user selects from a list of already added emails.  For mailing list emails, the user is not inputting personal information. 	 No other inputs ask for user data in this section |
| [**1.4.3 Contrast (Minimum)**](http://www.w3.org/TR/WCAG20/#visual-audio-contrast-contrast) (Level AA)	 | Partially supports | Text in this section meets minimumc ontrast requriements.  |
| [**1.4.4 Resize text**](http://www.w3.org/TR/WCAG20/#visual-audio-contrast-scale) (Level AA) | Supports | Site content and user interfaces support standard zoom capabilities built into modern web browsers and operating systems.  |
| [**1.4.5 Images of Text**](http://www.w3.org/TR/WCAG20/#visual-audio-contrast-text-presentation) (Level AA)	 | Supports | No images of text present  |
| [**1.4.10 Reflow**](https://www.w3.org/TR/WCAG21/#reflow) (Level AA 2.1 and 2.2)	 | Supports | Page information properly reflows at a width of 320 pixels.	 |
| [**1.4.11 Non-text Contrast**](https://www.w3.org/TR/WCAG21/#non-text-contrast) (Level AA 2.1 and 2.2) | Does Not Support  | Some non-text components maintain sufficient contrast against the background. Exceptions include: Up arrow icon used for sorting table data does not meet minimum contrast requirements.  Light blue focus indicators do not maintain enough contrast Pink focus indicators do not maintain enough contrast Checkbox icon for disabled “CC pull request author on notification emails’ does not meet contrast requirements  |
| [**1.4.12 Text Spacing**](https://www.w3.org/TR/WCAG21/#text-spacing) (Level AA 2.1 and 2.2) | Partially Supports | The spacing between letters, words, lines of text and/or paragraphs can be adjusted in most of this section. Exceptions include:  Name Column label in the table is no longer centered in the cell “CC pull request author on notification emails” is no longer centered with it’s checkbox |
| [**1.4.13 Content on Hover or Focus**](https://www.w3.org/TR/WCAG21/#content-on-hover-or-focus) (Level AA 2.1 and 2.2) | Does Not Support  | Tooltips that become available when hovering over information images are not dismissable.  |
| [**2.4.5 Multiple Ways**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-mult-loc) (Level AA)	 | Does Not Support  | There is only one way to navigate the page – the navigation pane.  |
| [**2.4.6 Headings and Labels**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-descriptive) (Level AA)		 | Partially Supports | Most headings and labels that do exist are descriptive. Exceptions include:  Search input box has no label  Microsoft Teams channels input box has no label  Guardrail Name input box has no label  Custom Message input box has no label  Mailing List Emails input box has no label  |
| [**2.4.7 Focus Visible**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-focus-visible) (Level AA)	 | Partially Supports | Most focusable items have a visual focus indicator. Exceptions include:  “Back to Guardrails” link has no visual focus indicator |
| [**2.4.11 Focus Not Obscured (Minimum)**](https://www.w3.org/TR/WCAG22/#focus-not-obscured-minimum) (Level AA 2.2 only) | Not Evaluated |  |
| [**2.5.7 Dragging Movements**](https://www.w3.org/TR/WCAG22/#dragging-movements) (Level AA 2.2 only) | Not Evaluated |  |
| [**2.5.8 Target Size (Minimum)**](https://www.w3.org/TR/WCAG22/#target-size-minimum) (Level AA 2.2 only) | Not Evaluated |  |
| [**3.1.2 Language of Parts**](http://www.w3.org/TR/WCAG20/#meaning-other-lang-id) (Level AA) | Not Applicable  | No components are in alternate languages |
| [**3.2.3 Consistent Navigation**](http://www.w3.org/TR/WCAG20/#consistent-behavior-consistent-locations) (Level AA)	 | Supports | Navigation stays consistent across pages  |
| [**3.2.4 Consistent Identification**](http://www.w3.org/TR/WCAG20/#consistent-behavior-consistent-functionality) (Level AA) | Supports | Identification of interactive objects stays the same even when the page changes  |
| [**3.3.3 Error Suggestion**](http://www.w3.org/TR/WCAG20/#minimize-error-suggestions) (Level AA)	 		 | Supports | Automatically detected errors provide suggestions when possible to the user |
| [**3.3.4 Error Prevention (Legal, Financial, Data)**](http://www.w3.org/TR/WCAG20/#minimize-error-reversible) (Level AA) | Supports  | Confirmation dialogues are available, along with cancel buttons, to prevent the user from submitting consequential errors |
| [**3.3.8 Accessible Authentication (Minimum)**](https://www.w3.org/TR/WCAG22/#accessible-authentication-minimum) (Level AA 2.2 only) | Not Evaluated |  |
| [**4.1.3 Status Messages**](https://www.w3.org/TR/WCAG21/#status-messages) (Level AA 2.1 and 2.2)	 | Does Not Support | Status messages are exposed to the user programmatitically.  |

	

# 

# **Campaigns**

### **Table 1: Success Criteria, Level A**

Notes:	

| Criteria | Conformance Level | Remarks and Explanations |
| ----- | ----- | ----- |
| [**1.1.1 Non-text Content**](http://www.w3.org/TR/WCAG20/#text-equiv-all) (Level A) | Does Not Support | This section provides sufficient text alternatives for some instances of non-text content. Exceptions include:  Speaker icon Back Arrow icons Sparkle icon Up Arrow icons Magnifying Glass icon Drop Down icon  Calendar icon  Several information icons |
| [**1.2.1 Audio-only and Video-only (Prerecorded)**](http://www.w3.org/TR/WCAG20/#media-equiv-av-only-alt) (Level A) | Not Applicable  | This section does not contain prerecorded audio-only or video-only media  |
| [**1.2.2 Captions (Prerecorded)**](http://www.w3.org/TR/WCAG20/#media-equiv-captions) (Level A) | Not Applicable  | This section does not contain prerecorded synchronized media.  |
| [**1.2.3 Audio Description or Media Alternative (Prerecorded)**](http://www.w3.org/TR/WCAG20/#media-equiv-audio-desc) (Level A) | Not Applicable  | This section does not contain prerecorded video content that would require audio description or a media alternative.  |
| [**1.3.1 Info and Relationships**](http://www.w3.org/TR/WCAG20/#content-structure-separation-programmatic) (Level A) | Does Not Support  | Some visual structure and relationship information is provided through object information is available in text. Exceptions include:  Search input box does not have an accessible label  Campaign Description input box does not have an accessible label  Table cells only announce the top header (issue i.e.) without context of which policy the issues link refers too Number of days Spinbutton element has no accessible name.  Date Range h1 header looks like it has less  importance than the h2 header for “Campaign Insights” |
| [**1.3.2 Meaningful Sequence**](http://www.w3.org/TR/WCAG20/#content-structure-separation-sequence) (Level A) 	 | Supports | This section’s content is presented in a meaningful sequence |
| [**1.3.3 Sensory Characteristics**](http://www.w3.org/TR/WCAG20/#content-structure-separation-understanding) (Level A) | Supports | This section does not require sensory characteristics in its instructions to the user.  |
| [**1.4.1 Use of Color**](http://www.w3.org/TR/WCAG20/#visual-audio-contrast-without-color) (Level A)		 | Does Not Support | Some components do not solely use color to convey meaning to the user. Exceptions include:  “Back to Campaigns” link uses only color to differentiate it  Number of issues links inside of the table uses only color to differentiate them Selected Policies widget uses only color to differentiate between the selected policy and the issues it has  Apply and Create buttons use only color to differentiate enabled and disabled states Issues Fixed and Issues Prvented tab buttons use only color to distinguish which one is selected  Color is the only way to differentiate different lines on the chart  Date widget’s 30,60,90,180 day buttons use only color to distinguish their different states  Dropdown focus indicators use only color to indicate which option is in focus  |
| [**1.4.2 Audio Control**](http://www.w3.org/TR/WCAG20/#visual-audio-contrast-dis-audio) (Level A)	 | Not Applicable | The site does not contain audio that plays automatically |
| [**2.1.1 Keyboard**](http://www.w3.org/TR/WCAG20/#keyboard-operation-keyboard-operable) (Level A)	 | Does Not Support | Some functions in this section can be accessed and operated using a keyboard. Exceptions include:  Issues percentage slider is not keyboard operable  Chart popup information is not keyboard accessible  Tooltips are not keyboard accessible |
| [**2.1.2 No Keyboard Trap**](http://www.w3.org/TR/WCAG20/#keyboard-operation-trapping) (Level A)	 | Supports | This section does not include keyboard traps |
| [**2.1.4 Character Key Shortcuts**](https://www.w3.org/TR/WCAG21/#character-key-shortcuts) (Level A 2.1 and 2.2) | Not Applicable | No shortcuts are used in this section	 |
| [**2.2.1 Timing Adjustable**](http://www.w3.org/TR/WCAG20/#time-limits-required-behaviors) (Level A) | Not Applicable | This section does not include time limits |
| [**2.2.2 Pause, Stop, Hide**](http://www.w3.org/TR/WCAG20/#time-limits-pause) (Level A) | Supports | Any animations present are considered essential because not indicating progress could confuse users or cause them to think that content was frozen or broken. |
| [**2.3.1 Three Flashes or Below Threshold**](http://www.w3.org/TR/WCAG20/#seizure-does-not-violate) (Level A) | Not Applicable | No Flashes |
| [**2.4.1 Bypass Blocks**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-skip) (Level A)	 | Partially Supports | The navigation pane is the only programmatic landmark that can allow users to bypass it.  The footer and main sections of the page should also be programmed as landmarks.  |
| [**2.4.2 Page Titled**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-title) (Level A)	 | Supports | The page is properly titled  |
| [**2.4.3 Focus Order**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-focus-order) (Level A)	  | Does Not Support | Some elements in this section receive proper focus in an order that preserves operability. Exceptions include:  Selecting a policy shifts the focus of the page away from the table and onto the Goal section Tabbing away from the Cancel button in the date selection widget brings the user to the beginning of the page Tooltips are not focusable  |
| [**2.4.4 Link Purpose (In Context)**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-refs) (Level A) | Does Not Support | Some links adequately describe their purpose in context. Exceptions include: Table cells with links only announce the top header (issue i.e.) without context of which policy the link refers to  |
| [**2.5.1 Pointer Gestures**](https://www.w3.org/TR/WCAG21/#pointer-gestures) (Level A 2.1 and 2.2)	 | Supports | Slider widget can be used with the number box to the left of it, or with point and click interfaces.  |
| [**2.5.2 Pointer Cancellation**](https://www.w3.org/TR/WCAG21/#pointer-cancellation) (Level A 2.1 and 2.2) | Partially Supports | Most site functions that use a single pointer are completed when the user releases the pointer. Exceptions include:  On the mouse down event, 30,60,90, 180 days buttons turn gray. |
| [**2.5.3 Label in Name**](https://www.w3.org/TR/WCAG21/#label-in-name) (Level A 2.1 and 2.2) | Partially Supports  | Most elements in this section have their labels in their accessible name. Exceptions include:  Search input box does not have an accessible label  Campaign Description input box does not have an accessible label  Number of days Spinbutton element has no accessible name.  Goal Slider Widget does not include its units (%) in its label or accessible name |
| [**2.5.4 Motion Actuation**](https://www.w3.org/TR/WCAG21/#motion-actuation) (Level A 2.1 and 2.2) | Not Applicable  | No content depends on the ability to move a device |
| [**3.1.1 Language of Page**](http://www.w3.org/TR/WCAG20/#meaning-doc-lang-id) (Level A) | Supports | Page language is programmatically determined  |
| [**3.2.1 On Focus**](http://www.w3.org/TR/WCAG20/#consistent-behavior-receive-focus) (Level A) | Partially Supports  | Most of section’s components do not initiate a change of context when focused. Exceptions include:  Tabbing away from the last button in the date selection widgets brings the user to the beginning of the page	 |
| [**3.2.2 On Input**](http://www.w3.org/TR/WCAG20/#consistent-behavior-unpredictable-change) (Level A) | Does Not Support | Some components do not initiate a change of context on input. Exceptions include:  Selecting a policy shifts the focus of the page away from the table and onto the Goal section |
| [**3.2.6 Consistent Help**](https://www.w3.org/TR/WCAG22/#consistent-help) (Level A 2.2 only) | Not Evaluated |  |
| [**3.3.1 Error Identification**](http://www.w3.org/TR/WCAG20/#minimize-error-identified) (Level A) | Not Applicable  | No automatically identified errors |
| [**3.3.2 Labels or Instructions**](http://www.w3.org/TR/WCAG20/#minimize-error-cues) (Level A) | Does Not Support | Some user interfaces in this section include descriptive labels or instructions. Exceptions include:  While text areas do have instructions provided as placeholder text, placeholders may not be exposed to screen readers  Search input box does not have an accessible label  Campaign Description input box does not have an accessible label  Number of days Spinbutton element has no accessible name.  Goal Slider Widget does not include its units (%) in its label or accessible name Label and instructions provided to the user for setting how many issues out of the total amount of issues a user wants to have fixed by the end of a campaign lacks proper context  |
| [**3.3.7 Redundant Entry**](https://www.w3.org/TR/WCAG22/#redundant-entry) (Level A 2.2 only) | Not Evaluated |   |
| [**4.1.1 Parsing**](http://www.w3.org/TR/WCAG20/#ensure-compat-parses) (Level A) WCAG 2.0 and 2.1 – Always answer ‘Supports’ WCAG 2.2 (obsolete and removed) \- Does not apply | Support |  |
| [**4.1.2 Name, Role, Value**](http://www.w3.org/TR/WCAG20/#ensure-compat-rsv) (Level A)	 | Does Not Support  | Some user interface components in this section provide programmatic name, role, and/or state information. Exceptions include:  Search input box does not have an accessible label  Campaign Description input box does not have an accessible label  Number of days Spinbutton element has no accessible name.  Goal Slider Widget does not include its units (%) in its label or accessible name Tooltips that are not buttons do not announce their role.  Tooltips in the chart do not announce their role  |

### **Table 2: Success Criteria, Level AA**

Notes: 

| Criteria | Conformance Level | Remarks and Explanations |
| ----- | ----- | ----- |
| [**1.2.4 Captions (Live)**](http://www.w3.org/TR/WCAG20/#media-equiv-real-time-captions) (Level AA) | Not Applicable | This section does not contain live synchronized media  |
| [**1.2.5 Audio Description (Prerecorded)**](http://www.w3.org/TR/WCAG20/#media-equiv-audio-desc-only) (Level AA) | Not Applicable | This section does not contain prerecorded video content that would require audio description  |
| [**1.3.4 Orientation**](https://www.w3.org/TR/WCAG21/#orientation) (Level AA 2.1 and 2.2)	 | Supports | The content of this section does not restrict its view and operation to a single display orientation |
| [**1.3.5 Identify Input Purpose**](https://www.w3.org/TR/WCAG21/#identify-input-purpose) (Level AA 2.1 and 2.2) | Not Applicable  | This section does not contain input fields that require the user to enter personally identifiable information.  |
| [**1.4.3 Contrast (Minimum)**](http://www.w3.org/TR/WCAG20/#visual-audio-contrast-contrast) (Level AA)	 | Partially supports | Most text in this section meets minimum contrast requriements. Exceptions include:  Text that describes the number of issues selected does not meet contrast requirements |
| [**1.4.4 Resize text**](http://www.w3.org/TR/WCAG20/#visual-audio-contrast-scale) (Level AA) | Supports | Site content and user interfaces support standard zoom capabilities built into modern web browsers and operating systems.  |
| [**1.4.5 Images of Text**](http://www.w3.org/TR/WCAG20/#visual-audio-contrast-text-presentation) (Level AA)	 | Supports | All images of text are essential logotypes |
| [**1.4.10 Reflow**](https://www.w3.org/TR/WCAG21/#reflow) (Level AA 2.1 and 2.2)	 | Does Not Support  | Page does not properly reflow at a width of 320 pixels.Exceptions include:  Chart labels overflow onto one another  Date widget does not reflow properly, nor does it have inner scroll bars to interact with the widget, which changes the reflow of the rest of the page.  Table tooltips on Campaigns page do not reflow  |
| [**1.4.11 Non-text Contrast**](https://www.w3.org/TR/WCAG21/#non-text-contrast) (Level AA 2.1 and 2.2) | Does Not Support  | Some non-text components maintain sufficient contrast against the background. Exceptions include:  Light blue focus indicators do not maintain enough contrast Pink focus indicators do not maintain enough contrast Light Green Icons and graphs Sparkle icons  Unchecked Checbox Icons  |
| [**1.4.12 Text Spacing**](https://www.w3.org/TR/WCAG21/#text-spacing) (Level AA 2.1 and 2.2) | Partially Supports | The spacing between letters, words, lines of text and/or paragraphs can be adjusted in the site’s webpage. However, some issues occur:  Policy label is no longer centereed with its associated chackbox  Timeline text is no longer bounded by it’s associated texbox  Campaigns Data Table cells are no longer centered with eachother, making it more difficult to figure out what row each cell applies to  |
| [**1.4.13 Content on Hover or Focus**](https://www.w3.org/TR/WCAG21/#content-on-hover-or-focus) (Level AA 2.1 and 2.2) | Does Not Support | Tooltips that are not buttons are hoverable but are not dismissable.  Tooltips that are buttons are dismissable but not hoverable 	 Chart data point tooltips are neither dismissable nor hoverable  |
| [**2.4.5 Multiple Ways**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-mult-loc) (Level AA)	 | Does Not Support  | There is only one way to navigate the page – the navigation pane.  |
| [**2.4.6 Headings and Labels**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-descriptive) (Level AA)		 | Does Not Support | Some headings and labels that do exist are descriptive. Exceptions include:  Search input box does not have an accessible label  Campaign Description input box does not have an accessible label  Number of days Spinbutton element has no accessible name.  Goal Slider Widget does not include its units (%) in its label or accessible name Label and instructions provided to the user for setting how many issues out of the total amount of issues a user wants to have fixed by the end of a campaign lacks proper context  |
| [**2.4.7 Focus Visible**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-focus-visible) (Level AA)	 | Partially Supports  | Most focusable items have visual focus indicators. Exceptions include:  “Back to Campaigns” buttons do not have visible focus indicators |
| [**2.4.11 Focus Not Obscured (Minimum)**](https://www.w3.org/TR/WCAG22/#focus-not-obscured-minimum) (Level AA 2.2 only) | Not Evaluated |  |
| [**2.5.7 Dragging Movements**](https://www.w3.org/TR/WCAG22/#dragging-movements) (Level AA 2.2 only) | Not Evaluated |  |
| [**2.5.8 Target Size (Minimum)**](https://www.w3.org/TR/WCAG22/#target-size-minimum) (Level AA 2.2 only) | Not Evaluated |  |
| [**3.1.2 Language of Parts**](http://www.w3.org/TR/WCAG20/#meaning-other-lang-id) (Level AA) | Not Applicable  | No components are in alternate languages |
| [**3.2.3 Consistent Navigation**](http://www.w3.org/TR/WCAG20/#consistent-behavior-consistent-locations) (Level AA)	 | Supports | Navigation stays consistent across pages  |
| [**3.2.4 Consistent Identification**](http://www.w3.org/TR/WCAG20/#consistent-behavior-consistent-functionality) (Level AA) | Supports | Identification of interactive objects stays the same even when the page changes  |
| [**3.3.3 Error Suggestion**](http://www.w3.org/TR/WCAG20/#minimize-error-suggestions) (Level AA)	 		 | Not Applicable | No Automatically identified errors  |
| [**3.3.4 Error Prevention (Legal, Financial, Data)**](http://www.w3.org/TR/WCAG20/#minimize-error-reversible) (Level AA) | Supports | Confirmation dialogues are available, along with cancel buttons, to prevent the user from submitting consequential errors |
| [**3.3.8 Accessible Authentication (Minimum)**](https://www.w3.org/TR/WCAG22/#accessible-authentication-minimum) (Level AA 2.2 only) | Not Evaluated |  |
| [**4.1.3 Status Messages**](https://www.w3.org/TR/WCAG21/#status-messages) (Level AA 2.1 and 2.2)	 | Does Not Support | Status messages are exposed to the user programmatitically.  |

	

# 

# **Issue Explorer**

### **Table 1: Success Criteria, Level A**

Notes:	

| Criteria | Conformance Level | Remarks and Explanations |
| ----- | ----- | ----- |
| [**1.1.1 Non-text Content**](http://www.w3.org/TR/WCAG20/#text-equiv-all) (Level A) | Does Not Support | This section provides sufficient text alternatives for some instances of non-text content. Exceptions Include:  Calendar Icons “Report Parameters” icon “Filter” Icon |
| [**1.2.1 Audio-only and Video-only (Prerecorded)**](http://www.w3.org/TR/WCAG20/#media-equiv-av-only-alt) (Level A) | Not Applicable  | This section does not contain prerecorded audio-only or video-only media  |
| [**1.2.2 Captions (Prerecorded)**](http://www.w3.org/TR/WCAG20/#media-equiv-captions) (Level A) | Not Applicable  | This section does not contain prerecorded synchronized media.  |
| [**1.2.3 Audio Description or Media Alternative (Prerecorded)**](http://www.w3.org/TR/WCAG20/#media-equiv-audio-desc) (Level A) | Not Applicable  | This section does not contain prerecorded video content that would require audio description or a media alternative.  |
| [**1.3.1 Info and Relationships**](http://www.w3.org/TR/WCAG20/#content-structure-separation-programmatic) (Level A) | Partially Supports | Most visual structure and relationship information is provided through object information is available in text. Exceptions include:  Table cells only announce the top header (Select Row, Issues) without context of which policy the user is viewing the issues for, or selecting Tables have no scope attribute Visual headers in date selection widget are not programmatic headers |
| [**1.3.2 Meaningful Sequence**](http://www.w3.org/TR/WCAG20/#content-structure-separation-sequence) (Level A) 	 | Supports | This section’s content is presented in a meaningful sequence |
| [**1.3.3 Sensory Characteristics**](http://www.w3.org/TR/WCAG20/#content-structure-separation-understanding) (Level A) | Supports | This section does not require sensory characteristics in its instructions to the user.  |
| [**1.4.1 Use of Color**](http://www.w3.org/TR/WCAG20/#visual-audio-contrast-without-color) (Level A)		 | Does Not Support  | Some components do not solely use color to convey meaning to the user. Exceptions include:  Color is the only way to differentiate the lines and bars on the charts Apply buttons’ disabled and enabled states use only color to distinguish between the two  |
| [**1.4.2 Audio Control**](http://www.w3.org/TR/WCAG20/#visual-audio-contrast-dis-audio) (Level A)	 | Not Applicable | The site does not contain audio that plays automatically |
| [**2.1.1 Keyboard**](http://www.w3.org/TR/WCAG20/#keyboard-operation-keyboard-operable) (Level A)	 | Does Not Support  | Most functionality in this section can be accessed and operated using a keyboard. Exceptions include:  Repository name button that expands another table is not keyboard accessible Selecting a policy wiht the spacebar has a different behavior than selecting the policy with the mouse Bar Chart and Line chart tooltiops are not keyboard accessible   |
| [**2.1.2 No Keyboard Trap**](http://www.w3.org/TR/WCAG20/#keyboard-operation-trapping) (Level A)	 | Supports | This section does not include keyboard traps  |
| [**2.1.4 Character Key Shortcuts**](https://www.w3.org/TR/WCAG21/#character-key-shortcuts) (Level A 2.1 and 2.2) | Not Applicable | No shortcuts are used in this section	 |
| [**2.2.1 Timing Adjustable**](http://www.w3.org/TR/WCAG20/#time-limits-required-behaviors) (Level A) | Not Applicable | This section does not include time limits |
| [**2.2.2 Pause, Stop, Hide**](http://www.w3.org/TR/WCAG20/#time-limits-pause) (Level A) | Supports | Any animations present are considered essential because not indicating progress could confuse users or cause them to think that content was frozen or broken. |
| [**2.3.1 Three Flashes or Below Threshold**](http://www.w3.org/TR/WCAG20/#seizure-does-not-violate) (Level A) | Not Applicable | This section does not include flashes |
| [**2.4.1 Bypass Blocks**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-skip) (Level A)	 | Partially Supports | The navigation pane is the only programmatic landmark that can allow users to bypass it.  The footer and main sections of the page should also be programmed as landmarks.  |
| [**2.4.2 Page Titled**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-title) (Level A)	 | Supports | The page is properly titled  |
| [**2.4.3 Focus Order**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-focus-order) (Level A)	  | Partially Supports | Most elements in this secton receive proper focus in an order that maintains understandability and operability. Exceptions include:  Repository name button that expands another table is not focusable  |
| [**2.4.4 Link Purpose (In Context)**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-refs) (Level A) | Not Applicable | This section does not have any links |
| [**2.5.1 Pointer Gestures**](https://www.w3.org/TR/WCAG21/#pointer-gestures) (Level A 2.1 and 2.2)	 | Not Applicable | This section does not rely on multi-point or path-based gestures	 |
| [**2.5.2 Pointer Cancellation**](https://www.w3.org/TR/WCAG21/#pointer-cancellation) (Level A 2.1 and 2.2) | Partially Supports | Most site functions that use a single pointer are completed when the user released the pointer. Exceptions include;  On the mouse down event, 7,60,90, 365 days buttons turn gray |
| [**2.5.3 Label in Name**](https://www.w3.org/TR/WCAG21/#label-in-name) (Level A 2.1 and 2.2) | Partially Supports  | Most elements in this section have their labels in their accessible name. Exceptions include:  Date range widget does not use its visual label in its accessible name.  |
| [**2.5.4 Motion Actuation**](https://www.w3.org/TR/WCAG21/#motion-actuation) (Level A 2.1 and 2.2) | Not Applicable  | No content depends on the ability to move a device |
| [**3.1.1 Language of Page**](http://www.w3.org/TR/WCAG20/#meaning-doc-lang-id) (Level A) | Supports | Page language is programmatically determined  |
| [**3.2.1 On Focus**](http://www.w3.org/TR/WCAG20/#consistent-behavior-receive-focus) (Level A) | Partially Supports | Most of this section’s components do not initiate a change of context when focused. Exceptions include:  Tabbing away from the Cancel button in the date selection widget brings the user all the way up to the beginning of the page.  |
| [**3.2.2 On Input**](http://www.w3.org/TR/WCAG20/#consistent-behavior-unpredictable-change) (Level A) | Does Not Support | Some components do not initiate a change of context on input. Exceptions include:  Charts auto update upon selecting an option in the Metrics and Group By drop down menus |
| [**3.2.6 Consistent Help**](https://www.w3.org/TR/WCAG22/#consistent-help) (Level A 2.2 only) | Not Evaluated |  |
| [**3.3.1 Error Identification**](http://www.w3.org/TR/WCAG20/#minimize-error-identified) (Level A) | Not Applicable  | No automatically identified errors |
| [**3.3.2 Labels or Instructions**](http://www.w3.org/TR/WCAG20/#minimize-error-cues) (Level A) | Partially Supports | Most user interfaces in this section include descriptive labels or instructions. Exceptions include:  Table cells only announce the top header (Select Row, Issues) without context of which policy the user is viewing the issues for, or selecting |
| [**3.3.7 Redundant Entry**](https://www.w3.org/TR/WCAG22/#redundant-entry) (Level A 2.2 only) | Not Evaluated |   |
| [**4.1.1 Parsing**](http://www.w3.org/TR/WCAG20/#ensure-compat-parses) (Level A) WCAG 2.0 and 2.1 – Always answer ‘Supports’ WCAG 2.2 (obsolete and removed) \- Does not apply | Supports  |  |
| [**4.1.2 Name, Role, Value**](http://www.w3.org/TR/WCAG20/#ensure-compat-rsv) (Level A)	 | Partially Supports | Most user interface components in this section provide programmatic name, role, and/or state information. Exceptions include:  Informational tooltips do not have the role tooltip |

### **Table 2: Success Criteria, Level AA**

Notes: 

| Criteria | Conformance Level | Remarks and Explanations |
| ----- | ----- | ----- |
| [**1.2.4 Captions (Live)**](http://www.w3.org/TR/WCAG20/#media-equiv-real-time-captions) (Level AA) | Not Applicable | This section does not contain live synchronized media  |
| [**1.2.5 Audio Description (Prerecorded)**](http://www.w3.org/TR/WCAG20/#media-equiv-audio-desc-only) (Level AA) | Not Applicable | This section does not contain prerecorded video content that would require audio description  |
| [**1.3.4 Orientation**](https://www.w3.org/TR/WCAG21/#orientation) (Level AA 2.1 and 2.2)	 | Supports | The content of this section does not restrict its view and operation to a single display orientation |
| [**1.3.5 Identify Input Purpose**](https://www.w3.org/TR/WCAG21/#identify-input-purpose) (Level AA 2.1 and 2.2) | Not Applicable  | This section does not contain input fields that require the user to enter personally identifiable information.  |
| [**1.4.3 Contrast (Minimum)**](http://www.w3.org/TR/WCAG20/#visual-audio-contrast-contrast) (Level AA)	 | Supports | Text in this section meets minimum contrast requriements.  |
| [**1.4.4 Resize text**](http://www.w3.org/TR/WCAG20/#visual-audio-contrast-scale) (Level AA) | Partially Supports | Most site content and user interfaces support standard zoom capabilities built into modern web browsers and operating systems. Exceptions include:  Graph tooltips are hidden by other sections (Filters, e.g.) |
| [**1.4.5 Images of Text**](http://www.w3.org/TR/WCAG20/#visual-audio-contrast-text-presentation) (Level AA)	 | Supports | All images of text are essential logotypes |
| [**1.4.10 Reflow**](https://www.w3.org/TR/WCAG21/#reflow) (Level AA 2.1 and 2.2)	 | Does Not Support | Page does not properly reflow at a width of 320 pixels |
| [**1.4.11 Non-text Contrast**](https://www.w3.org/TR/WCAG21/#non-text-contrast) (Level AA 2.1 and 2.2) | Does Not Support  | Some non-text components maintain sufficient contrast against the background. Exceptions include:  Chart’s light blue against chart’s pink does not maintain contrast requirements Chart’s light green against the chart’s pink or white does not maintain contrast requirements Chart’s orange against red, green, or white does not maintain contrast requirement  Light green icons do not have sufficient contrast against white  Orange icons do not have sufficient ocntrast against white |
| [**1.4.12 Text Spacing**](https://www.w3.org/TR/WCAG21/#text-spacing) (Level AA 2.1 and 2.2) | Supports | The spacing between letters, words, lines of text and/or paragraphs can be adjusted in the site’s webpage. |
| [**1.4.13 Content on Hover or Focus**](https://www.w3.org/TR/WCAG21/#content-on-hover-or-focus) (Level AA 2.1 and 2.2) | Does Not Support | Tooltips are dismissable but not hoverable 	 |
| [**2.4.5 Multiple Ways**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-mult-loc) (Level AA)	 | Does Not Support  | There is only one way to navigate the page – the navigation pane.  |
| [**2.4.6 Headings and Labels**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-descriptive) (Level AA)		 | Partially Supports  | Most headings and labels that do exist are descrptive. Exceptions include:  Date range widget does not use its visual label (Date Range) in its accessible name |
| [**2.4.7 Focus Visible**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-focus-visible) (Level AA)	 | Supports | Focusable items have visual focus indicators. |
| [**2.4.11 Focus Not Obscured (Minimum)**](https://www.w3.org/TR/WCAG22/#focus-not-obscured-minimum) (Level AA 2.2 only) | Not Evaluated |  |
| [**2.5.7 Dragging Movements**](https://www.w3.org/TR/WCAG22/#dragging-movements) (Level AA 2.2 only) | Not Evaluated |  |
| [**2.5.8 Target Size (Minimum)**](https://www.w3.org/TR/WCAG22/#target-size-minimum) (Level AA 2.2 only) | Not Evaluated |  |
| [**3.1.2 Language of Parts**](http://www.w3.org/TR/WCAG20/#meaning-other-lang-id) (Level AA) | Not Applicable 	 | No components are in alternate languages |
| [**3.2.3 Consistent Navigation**](http://www.w3.org/TR/WCAG20/#consistent-behavior-consistent-locations) (Level AA)	 | Supports  | Navigation stays consistent across pages  |
| [**3.2.4 Consistent Identification**](http://www.w3.org/TR/WCAG20/#consistent-behavior-consistent-functionality) (Level AA) | Supports | Identification of interactive objects stays the same even when the page changes  |
| [**3.3.3 Error Suggestion**](http://www.w3.org/TR/WCAG20/#minimize-error-suggestions) (Level AA)	 		 | Not Applicable | No automatically identified errors  |
| [**3.3.4 Error Prevention (Legal, Financial, Data)**](http://www.w3.org/TR/WCAG20/#minimize-error-reversible) (Level AA) | Not Applicable | No choses have legal, financial, or data consequences  |
| [**3.3.8 Accessible Authentication (Minimum)**](https://www.w3.org/TR/WCAG22/#accessible-authentication-minimum) (Level AA 2.2 only) | Not Evaluated |  |
| [**4.1.3 Status Messages**](https://www.w3.org/TR/WCAG21/#status-messages) (Level AA 2.1 and 2.2)	 | Not Applicable | No status messages |

	

# 

# **Repositories**

### **Table 1: Success Criteria, Level A**

Notes:	

| Criteria | Conformance Level | Remarks and Explanations |
| ----- | ----- | ----- |
| [**1.1.1 Non-text Content**](http://www.w3.org/TR/WCAG20/#text-equiv-all) (Level A) | Does Not Support  | This section provides sufficient text alternatives for some instances of non-text content. Exceptions include:  Magnifying Glass icon Down Arrow  Three line icon (Filters)  Dropdown Icon Repo Icon  External Link icons Pull Request icons Github icons User Icon Clock Icon Branch Icon  Gear Icon |
| [**1.2.1 Audio-only and Video-only (Prerecorded)**](http://www.w3.org/TR/WCAG20/#media-equiv-av-only-alt) (Level A) | Not Applicable  | This section does not contain prerecorded audio-only or video-only media  |
| [**1.2.2 Captions (Prerecorded)**](http://www.w3.org/TR/WCAG20/#media-equiv-captions) (Level A) | Not Applicable  | This section does not contain prerecorded synchronized media.  |
| [**1.2.3 Audio Description or Media Alternative (Prerecorded)**](http://www.w3.org/TR/WCAG20/#media-equiv-audio-desc) (Level A) | Not Applicable  | This section does not contain prerecorded video content that would require audio description or a media alternative.  |
| [**1.3.1 Info and Relationships**](http://www.w3.org/TR/WCAG20/#content-structure-separation-programmatic) (Level A) | Does Not Support  | Some visual structure and relationship information is provided through object information is available in text. Exceptions include:  (Individual Repository Page) Table cells only announce top header without context of which policy the user is viewing information for  Tables have no scope attribute  (Repositories List; Pull Requests tab on Individual Repository page) Visual table is not a programmatic table  |
| [**1.3.2 Meaningful Sequence**](http://www.w3.org/TR/WCAG20/#content-structure-separation-sequence) (Level A) 	 | Supports | This section’s content is presented in a meaningful sequence |
| [**1.3.3 Sensory Characteristics**](http://www.w3.org/TR/WCAG20/#content-structure-separation-understanding) (Level A) | Supports | This section does not require sensory characteristics in its instructions to the user.  |
| [**1.4.1 Use of Color**](http://www.w3.org/TR/WCAG20/#visual-audio-contrast-without-color) (Level A)		 | Partially supports  | Most components do not solely use color to convey meaning to the user. Exceptions include:  Search, Filter, and Save buttons disabled/enabled states use only color to differentiate states  “Back to Repos” and “Something looks wrong?” llinks use only color to distinguish them as links  Heading Level 2 and Heading Level 3 use only color to differentiate between eachother |
| [**1.4.2 Audio Control**](http://www.w3.org/TR/WCAG20/#visual-audio-contrast-dis-audio) (Level A)	 | Not Applicable | The site does not contain audio that plays automatically |
| [**2.1.1 Keyboard**](http://www.w3.org/TR/WCAG20/#keyboard-operation-keyboard-operable) (Level A)	 | Partially Supports | Most functions in this section can be accessed and operated using a keyboard. Exceptions include:  Project | Monthly Baseline Cost | Monthly Usage cost under the Branches tab is not keyboard accessible  |
| [**2.1.2 No Keyboard Trap**](http://www.w3.org/TR/WCAG20/#keyboard-operation-trapping) (Level A)	 | Supports | This section does not include keyboard traps |
| [**2.1.4 Character Key Shortcuts**](https://www.w3.org/TR/WCAG21/#character-key-shortcuts) (Level A 2.1 and 2.2) | Not Applicable | No shortcuts are used in this section	 |
| [**2.2.1 Timing Adjustable**](http://www.w3.org/TR/WCAG20/#time-limits-required-behaviors) (Level A) | Not Applicable | This section does not include time limits |
| [**2.2.2 Pause, Stop, Hide**](http://www.w3.org/TR/WCAG20/#time-limits-pause) (Level A) | Supports | Any animations present are considered essential because not indicating progress could confuse users or cause them to think that content was frozen or broken. |
| [**2.3.1 Three Flashes or Below Threshold**](http://www.w3.org/TR/WCAG20/#seizure-does-not-violate) (Level A) | Not Applicable | No Flashes |
| [**2.4.1 Bypass Blocks**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-skip) (Level A)	 | Partially Supports | The navigation pane is the only programmatic landmark that can allow users to bypass it.  The footer and main sections of the page should also be programmed as landmarks.  |
| [**2.4.2 Page Titled**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-title) (Level A)	 | Supports | The page is properly titled  |
| [**2.4.3 Focus Order**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-focus-order) (Level A)	  | Partially Supports  | Most elements in this section receive proper focus in an order that preserves operability. Exceptions include:  Focus disappears after Refresh Cost Estimates button 	 Project | Monthly Baseline Cost | Monthly Usage cost under the Branches tab is not focusable |
| [**2.4.4 Link Purpose (In Context)**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-refs) (Level A) | Does Not Support | Some links adequately describe their purpose in context. Exceptions include: Repository Name Links with Github logos next to them do not announce that users will be going to Infracost view of Issues and Policies  Refresh Buttons that rely on tooltips to differentiate between their functions may not have that information exposed to screen readers  External Link Icon with link to external github repositories has the wrong name “Search Database” Name for Links that take users to Github Pull Requests only use \[Request Number\] \[Open or Closed\] to announce themselves Links that use Pull Request/Commit names do not announce that they will take users to the Cost Estimates page  |
| [**2.5.1 Pointer Gestures**](https://www.w3.org/TR/WCAG21/#pointer-gestures) (Level A 2.1 and 2.2)	 | Supports | No Multipath gestures are required int his section |
| [**2.5.2 Pointer Cancellation**](https://www.w3.org/TR/WCAG21/#pointer-cancellation) (Level A 2.1 and 2.2) | Supports | Site functions that use a single pointer are completed when the user releases the pointer.  |
| [**2.5.3 Label in Name**](https://www.w3.org/TR/WCAG21/#label-in-name) (Level A 2.1 and 2.2) | Does Not Support | Some elements in this section have their labels in their accessible name. Exceptions include:  Visual Label \[“Current Branch”) not included in the Current Branch Drop Down accessible name  Search, Filters, Base Branches, and Config File input boxes do not have accessible labels  |
| [**2.5.4 Motion Actuation**](https://www.w3.org/TR/WCAG21/#motion-actuation) (Level A 2.1 and 2.2) | Not Applicable  | No content depends on the ability to move a device |
| [**3.1.1 Language of Page**](http://www.w3.org/TR/WCAG20/#meaning-doc-lang-id) (Level A) | Supports  | Page language is programmatically determined  |
| [**3.2.1 On Focus**](http://www.w3.org/TR/WCAG20/#consistent-behavior-receive-focus) (Level A) | Partially Supports | Most components do not initiate a change of context on focus. Exceptions include:  Focus disappears after Refresh Cost Estimates button 	 |
| [**3.2.2 On Input**](http://www.w3.org/TR/WCAG20/#consistent-behavior-unpredictable-change) (Level A) | Supports  | Components do not initiate a change of context on input  |
| [**3.2.6 Consistent Help**](https://www.w3.org/TR/WCAG22/#consistent-help) (Level A 2.2 only) | Not Evaluated |  |
| [**3.3.1 Error Identification**](http://www.w3.org/TR/WCAG20/#minimize-error-identified) (Level A) | Not Applicable  | No automatically identified errors |
| [**3.3.2 Labels or Instructions**](http://www.w3.org/TR/WCAG20/#minimize-error-cues) (Level A) | Does Not Support  | Some user interfaces in this section include descriptive labels or instructions. Exceptions include:  Visual Label \[“Current Branch”) not included in the Current Branch Drop Down accessible name  Search, Filters, Base Branches, and Config File input boxes do not have accessible labels  While text areas do have instructions provided as placeholder text, placeholders may not be exposed to screen readers  External Link Icon with link to external github repositories has the wrong name “Search Database”  |
| [**3.3.7 Redundant Entry**](https://www.w3.org/TR/WCAG22/#redundant-entry) (Level A 2.2 only) | Not Evaluated |   |
| [**4.1.1 Parsing**](http://www.w3.org/TR/WCAG20/#ensure-compat-parses) (Level A) WCAG 2.0 and 2.1 – Always answer ‘Supports’ WCAG 2.2 (obsolete and removed) \- Does not apply | Support  |  |
| [**4.1.2 Name, Role, Value**](http://www.w3.org/TR/WCAG20/#ensure-compat-rsv) (Level A)	 | Does Not Support  | Some user interface components in this section provide programmatic name, role, and/or state information. Exceptions include:  Visual Label \[“Current Branch”) not included in the Current Branch Drop Down accessible name  Search, Filters, Base Branches, and Config File input boxes do not have accessible labels  While text areas do have instructions provided as placeholder text, placeholders may not be exposed to screen readers  External Link Icon with link to external github repositories has the wrong name “Search Database” Visual tables do not have the proper role  Informational tooltips do not have the proper role  |

### **Table 2: Success Criteria, Level AA**

Notes: 

| Criteria | Conformance Level | Remarks and Explanations |
| ----- | ----- | ----- |
| [**1.2.4 Captions (Live)**](http://www.w3.org/TR/WCAG20/#media-equiv-real-time-captions) (Level AA) | Not Applicable | This section does not contain live synchronized media  |
| [**1.2.5 Audio Description (Prerecorded)**](http://www.w3.org/TR/WCAG20/#media-equiv-audio-desc-only) (Level AA) | Not Applicable | This section does not contain prerecorded video content that would require audio description  |
| [**1.3.4 Orientation**](https://www.w3.org/TR/WCAG21/#orientation) (Level AA 2.1 and 2.2)	 | Supports | The content of this section does not restrict its view and operation to a single display orientation |
| [**1.3.5 Identify Input Purpose**](https://www.w3.org/TR/WCAG21/#identify-input-purpose) (Level AA 2.1 and 2.2) | Not Applicable  | This section does not contain input fields that require the user to enter personally identifiable information.  |
| [**1.4.3 Contrast (Minimum)**](http://www.w3.org/TR/WCAG20/#visual-audio-contrast-contrast) (Level AA)	 | Supports  | Text in this section meets minimum contrast requriements.  |
| [**1.4.4 Resize text**](http://www.w3.org/TR/WCAG20/#visual-audio-contrast-scale) (Level AA) | Supports | Site content and user interfaces support standard zoom capabilities built into modern web browsers and operating systems.  |
| [**1.4.5 Images of Text**](http://www.w3.org/TR/WCAG20/#visual-audio-contrast-text-presentation) (Level AA)	 | Supports | All images of text are essential logo types  |
| [**1.4.10 Reflow**](https://www.w3.org/TR/WCAG21/#reflow) (Level AA 2.1 and 2.2)	 | Does Not Support  | Page does not properly reflow at a width of 320 pixels. Exceptions include:   While the tables are allowed to scroll back and forth in two dimensions, the rest of the page shouldn’t.  |
| [**1.4.11 Non-text Contrast**](https://www.w3.org/TR/WCAG21/#non-text-contrast) (Level AA 2.1 and 2.2) | Does Not Support  | Some non-text components maintain sufficient contrast against the background. Exceptions include:  Light blue focus indicators do not maintain enough contrast Pink focus indicators do not maintain enough contrast Light Green Icons Orange icons  Unchecked Toggle buttons |
| [**1.4.12 Text Spacing**](https://www.w3.org/TR/WCAG21/#text-spacing) (Level AA 2.1 and 2.2) | Supports | The spacing between letters, words, lines of text and/or paragraphs can be adjusted in the site’s webpage. |
| [**1.4.13 Content on Hover or Focus**](https://www.w3.org/TR/WCAG21/#content-on-hover-or-focus) (Level AA 2.1 and 2.2) | Does Not Support  | Persistent, hoverable, not dissmissable  |
| [**2.4.5 Multiple Ways**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-mult-loc) (Level AA)	 | Does Not Support  | There is only one way to navigate the page – the navigation pane.  |
| [**2.4.6 Headings and Labels**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-descriptive) (Level AA)		 | Partially Supports  | Most headings and labels that do exist are descriptive. Exceptions include:  Visual Label \[“Current Branch”) not included in the Current Branch Drop Down accessible name  Search, Filters, Base Branches, and Config File input boxes do not have accessible labels   |
| [**2.4.7 Focus Visible**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-focus-visible) (Level AA)	 | Partially Supports | Most focusable items have visual focus indicators. Exceptions include:  “Back to Repos” buttons do not have visible focus indicators |
| [**2.4.11 Focus Not Obscured (Minimum)**](https://www.w3.org/TR/WCAG22/#focus-not-obscured-minimum) (Level AA 2.2 only) | Not Evaluated |  |
| [**2.5.7 Dragging Movements**](https://www.w3.org/TR/WCAG22/#dragging-movements) (Level AA 2.2 only) | Not Evaluated |  |
| [**2.5.8 Target Size (Minimum)**](https://www.w3.org/TR/WCAG22/#target-size-minimum) (Level AA 2.2 only) | Not Evaluated |  |
| [**3.1.2 Language of Parts**](http://www.w3.org/TR/WCAG20/#meaning-other-lang-id) (Level AA) | Not Applicable 	 | No components are in alternate languages |
| [**3.2.3 Consistent Navigation**](http://www.w3.org/TR/WCAG20/#consistent-behavior-consistent-locations) (Level AA)	 | Supports  | Navigation stays consistent across pages  |
| [**3.2.4 Consistent Identification**](http://www.w3.org/TR/WCAG20/#consistent-behavior-consistent-functionality) (Level AA) | Supports | Identification of interactive objects stays the same even when the page changes  |
| [**3.3.3 Error Suggestion**](http://www.w3.org/TR/WCAG20/#minimize-error-suggestions) (Level AA)	 		 | Not Applicable | No Automatically identified errors  |
| [**3.3.4 Error Prevention (Legal, Financial, Data)**](http://www.w3.org/TR/WCAG20/#minimize-error-reversible) (Level AA) | Supports | Confirmation dialogues are available, along with cancel buttons, to prevent the user from submitting consequential errors |
| [**3.3.8 Accessible Authentication (Minimum)**](https://www.w3.org/TR/WCAG22/#accessible-authentication-minimum) (Level AA 2.2 only) | Not Evaluated |  |
| [**4.1.3 Status Messages**](https://www.w3.org/TR/WCAG21/#status-messages) (Level AA 2.1 and 2.2)	 | Does Not Support  | Status messages are exposed to the user programmatitically. 	  |

	

# 

# **Pull Request**

### **Table 1: Success Criteria, Level A**

Notes:	

| Criteria | Conformance Level | Remarks and Explanations |
| ----- | ----- | ----- |
| [**1.1.1 Non-text Content**](http://www.w3.org/TR/WCAG20/#text-equiv-all) (Level A) | Does Not Support  | This section provides sufficient text alternatives for some instances of non-text content. Exceptions include:  Filters Icon Calendar Icon Dropdown Icon Down Arrow Icon (Sort) Pull Request Icon Github Icon  Backwards Icon Branch Icon Commit Icon Clock |
| [**1.2.1 Audio-only and Video-only (Prerecorded)**](http://www.w3.org/TR/WCAG20/#media-equiv-av-only-alt) (Level A) | Not Applicable  | This section does not contain prerecorded audio-only or video-only media  |
| [**1.2.2 Captions (Prerecorded)**](http://www.w3.org/TR/WCAG20/#media-equiv-captions) (Level A) | Not Applicable  | This section does not contain prerecorded synchronized media.  |
| [**1.2.3 Audio Description or Media Alternative (Prerecorded)**](http://www.w3.org/TR/WCAG20/#media-equiv-audio-desc) (Level A) | Not Applicable  | This section does not contain prerecorded video content that would require audio description or a media alternative.  |
| [**1.3.1 Info and Relationships**](http://www.w3.org/TR/WCAG20/#content-structure-separation-programmatic) (Level A) | Does Not Support | Some visual structure and relationship information is provided through object information is available in text. Exceptions include:  Heading Level 2 is less visually immportant than Heading Level 3 Visual Table (Pull Requests Page Aggregation Page) is not programmed as a table  Visual Headers in date selection widget are not programmatic headers  |
| [**1.3.2 Meaningful Sequence**](http://www.w3.org/TR/WCAG20/#content-structure-separation-sequence) (Level A) 	 | Supports | This section’s content is presented in a meaningful sequence |
| [**1.3.3 Sensory Characteristics**](http://www.w3.org/TR/WCAG20/#content-structure-separation-understanding) (Level A) | Supports | This section does not require sensory characteristics in its instructions to the user.  |
| [**1.4.1 Use of Color**](http://www.w3.org/TR/WCAG20/#visual-audio-contrast-without-color) (Level A)		 | Partially Supports  | Most components do not solely use color to convey meaning to the user. Exceptions include:  “See Estimates”, “Back to Pull Requests” and “Back to Estimates” links use only color to distinguish itself from other text “Apply” button in the Filters widget uses only color to differentiate its enabled and disabled states |
| [**1.4.2 Audio Control**](http://www.w3.org/TR/WCAG20/#visual-audio-contrast-dis-audio) (Level A)	 | Not Applicable | The site does not contain audio that plays automatically |
| [**2.1.1 Keyboard**](http://www.w3.org/TR/WCAG20/#keyboard-operation-keyboard-operable) (Level A)	 | Partially Supports | Most functions in this section can be accessed and operated using a keyboard. Exceptions include: 	 Filters button is not keyboard operable Page loses focus after Exclude from Cost Savings toggle ubtton fires  Focus shifts to the top of the page after the user tabs away from the Apply button in the Filters and Date widget dialogs |
| [**2.1.2 No Keyboard Trap**](http://www.w3.org/TR/WCAG20/#keyboard-operation-trapping) (Level A)	 | Supports | This section does not include keyboard traps  |
| [**2.1.4 Character Key Shortcuts**](https://www.w3.org/TR/WCAG21/#character-key-shortcuts) (Level A 2.1 and 2.2) | Not Applicable | No shortcuts are used in this section	 |
| [**2.2.1 Timing Adjustable**](http://www.w3.org/TR/WCAG20/#time-limits-required-behaviors) (Level A) | Not Applicable | This section does not include time limits |
| [**2.2.2 Pause, Stop, Hide**](http://www.w3.org/TR/WCAG20/#time-limits-pause) (Level A) | Supports | Any animations present are considered essential because not indicating progress could confuse users or cause them to think that content was frozen or broken. |
| [**2.3.1 Three Flashes or Below Threshold**](http://www.w3.org/TR/WCAG20/#seizure-does-not-violate) (Level A) | Not Applicable | No Flashes |
| [**2.4.1 Bypass Blocks**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-skip) (Level A)	 | Partially Supports  | The navigation pane is the only programmatic landmark that can allow users to bypass it.  The footer and main sections of the page should also be programmed as landmarks.  |
| [**2.4.2 Page Titled**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-title) (Level A)	 | Supports | The page is properly titled  |
| [**2.4.3 Focus Order**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-focus-order) (Level A)	 | Partially Supports | Most elements in this section receive proper focus in an order that preserves operability. Exceptions include:  Filters button is not focusable Page loses focus after Exclude form Cost Savings toggle ubtton fires  Focus shifts to the top of the page after the user tabs away from the Apply button in the Filters and Date widget dialogs |
| [**2.4.4 Link Purpose (In Context)**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-refs) (Level A) | Does Not Support  | Some links adequately describe their purpose in context. Exceptions include: Name for Links that take users to Github Pull Requests only use \[Request Number\] \[Open or Closed\] to announce themselves Links that use Pull Request/Commit names do not announce that they will take users to the Cost Estimates page   |
| [**2.5.1 Pointer Gestures**](https://www.w3.org/TR/WCAG21/#pointer-gestures) (Level A 2.1 and 2.2)	 | Not Applicable  | No Multipath gestures are required int his section |
| [**2.5.2 Pointer Cancellation**](https://www.w3.org/TR/WCAG21/#pointer-cancellation) (Level A 2.1 and 2.2) | Partially Supports  | Site functions that use a single pointer are completed when the user releases the pointer.  7, 30, 90, 165 days buttons turn gray on the mouse down event.  |
| [**2.5.3 Label in Name**](https://www.w3.org/TR/WCAG21/#label-in-name) (Level A 2.1 and 2.2) | Supports | Elements in this section have their visual labels in their accessible name.  |
| [**2.5.4 Motion Actuation**](https://www.w3.org/TR/WCAG21/#motion-actuation) (Level A 2.1 and 2.2) | Not Applicable  | No content depends on the ability to move a device |
| [**3.1.1 Language of Page**](http://www.w3.org/TR/WCAG20/#meaning-doc-lang-id) (Level A) | Supports | Page language is programmatically determined  |
| [**3.2.1 On Focus**](http://www.w3.org/TR/WCAG20/#consistent-behavior-receive-focus) (Level A) | Does Not Support  | Some components do not initiate a change of context on focus. Exceptions include:  Focus shifts to the top of the page after the user tabs away from the Apply button in the Filters and Date widget dialog |
| [**3.2.2 On Input**](http://www.w3.org/TR/WCAG20/#consistent-behavior-unpredictable-change) (Level A) | Does Not Support  | Some components do not initiate a change of context on focus. Exceptions include:  Page loses focus after Exclude from Cost Savings toggle ubtton fires  |
| [**3.2.6 Consistent Help**](https://www.w3.org/TR/WCAG22/#consistent-help) (Level A 2.2 only) | Not Evaluated |  |
| [**3.3.1 Error Identification**](http://www.w3.org/TR/WCAG20/#minimize-error-identified) (Level A) | Supports | Automatically identified errors are announced to the user |
| [**3.3.2 Labels or Instructions**](http://www.w3.org/TR/WCAG20/#minimize-error-cues) (Level A) | Partially Supported  | Most user interfaces in this section include descriptive labels or instructions. Exceptions include:  While text areas do have instructions provided as placeholder text, placeholders may not be exposed to screen readers  |
| [**3.3.7 Redundant Entry**](https://www.w3.org/TR/WCAG22/#redundant-entry) (Level A 2.2 only) | Not Evaluated |   |
| [**4.1.1 Parsing**](http://www.w3.org/TR/WCAG20/#ensure-compat-parses) (Level A) WCAG 2.0 and 2.1 – Always answer ‘Supports’ WCAG 2.2 (obsolete and removed) \- Does not apply | Support  |  |
| [**4.1.2 Name, Role, Value**](http://www.w3.org/TR/WCAG20/#ensure-compat-rsv) (Level A)	 | Partially Supports  | Most user interface components in this section provide programmatic name, role, and/or state information. Exceptions include:  Tooltips have the role “Button” when they should probably have the role tooltip Visual Table (Pull Requests Page Aggregation Page) is not programmed as a table  |

### **Table 2: Success Criteria, Level AA**

Notes: 

| Criteria | Conformance Level | Remarks and Explanations |
| ----- | ----- | ----- |
| [**1.2.4 Captions (Live)**](http://www.w3.org/TR/WCAG20/#media-equiv-real-time-captions) (Level AA) | Not Applicable | This section does not contain live synchronized media  |
| [**1.2.5 Audio Description (Prerecorded)**](http://www.w3.org/TR/WCAG20/#media-equiv-audio-desc-only) (Level AA) | Not Applicable | This section does not contain prerecorded video content that would require audio description  |
| [**1.3.4 Orientation**](https://www.w3.org/TR/WCAG21/#orientation) (Level AA 2.1 and 2.2)	 | Supports | The content of this section does not restrict its view and operation to a single display orientation |
| [**1.3.5 Identify Input Purpose**](https://www.w3.org/TR/WCAG21/#identify-input-purpose) (Level AA 2.1 and 2.2) | Not Applicable 	 | This section does not contain input fields that require the user to enter personally identifiable information.  |
| [**1.4.3 Contrast (Minimum)**](http://www.w3.org/TR/WCAG20/#visual-audio-contrast-contrast) (Level AA)	 | Supports | Text in this section meets minimum contrast requriements.  |
| [**1.4.4 Resize text**](http://www.w3.org/TR/WCAG20/#visual-audio-contrast-scale) (Level AA) | Supports | Site content and user interfaces support standard zoom capabilities built into modern web browsers and operating systems.  |
| [**1.4.5 Images of Text**](http://www.w3.org/TR/WCAG20/#visual-audio-contrast-text-presentation) (Level AA)	 | Not Applicable | No Images of Text  |
| [**1.4.10 Reflow**](https://www.w3.org/TR/WCAG21/#reflow) (Level AA 2.1 and 2.2)	 | Does Not Support  | Page does not properly reflow at a width of 320 pixels.Exceptions include:  Date widget does not reflow properly, nor does it have inner scroll bars to interact with the widget, which changes the reflow of the rest of the page.  Tooltips do not reflow  |
| [**1.4.11 Non-text Contrast**](https://www.w3.org/TR/WCAG21/#non-text-contrast) (Level AA 2.1 and 2.2) | Does Not Support | ome non-text components maintain sufficient contrast against the background. Exceptions include:  Light blue focus indicators do not maintain enough contrast Pink focus indicators do not maintain enough contrast Light Green Icons Unchecked Checbox Icons |
| [**1.4.12 Text Spacing**](https://www.w3.org/TR/WCAG21/#text-spacing) (Level AA 2.1 and 2.2) | Partially Supports | The spacing between letters, words, lines of text and/or paragraphs can be adjusted in the site’s webpage. However, some issues occur:  Pull request number is no longer centered in its table cell  \[Number of Issues\] Passed text is no longer centered with its tooltip  |
| [**1.4.13 Content on Hover or Focus**](https://www.w3.org/TR/WCAG21/#content-on-hover-or-focus) (Level AA 2.1 and 2.2) | Does Not Support | Tooltips are hoverable but are not dismissable.   |
| [**2.4.5 Multiple Ways**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-mult-loc) (Level AA)	 | Does Not Support  | There is only one way to navigate the page – the navigation pane.  |
| [**2.4.6 Headings and Labels**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-descriptive) (Level AA)		 | Supports | Headings and Labels are descriptive |
| [**2.4.7 Focus Visible**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-focus-visible) (Level AA)	 | Supports | Focusable items have visual focus indicators.  |
| [**2.4.11 Focus Not Obscured (Minimum)**](https://www.w3.org/TR/WCAG22/#focus-not-obscured-minimum) (Level AA 2.2 only) | Not Evaluated |  |
| [**2.5.7 Dragging Movements**](https://www.w3.org/TR/WCAG22/#dragging-movements) (Level AA 2.2 only) | Not Evaluated |  |
| [**2.5.8 Target Size (Minimum)**](https://www.w3.org/TR/WCAG22/#target-size-minimum) (Level AA 2.2 only) | Not Evaluated |  |
| [**3.1.2 Language of Parts**](http://www.w3.org/TR/WCAG20/#meaning-other-lang-id) (Level AA) | Not Applicable 	 | No components are in alternate languages |
| [**3.2.3 Consistent Navigation**](http://www.w3.org/TR/WCAG20/#consistent-behavior-consistent-locations) (Level AA)	 | Supports | Navigation stays consistent across pages  |
| [**3.2.4 Consistent Identification**](http://www.w3.org/TR/WCAG20/#consistent-behavior-consistent-functionality) (Level AA) | Supports | Identification of interactive objects stays the same even when the page changes  |
| [**3.3.3 Error Suggestion**](http://www.w3.org/TR/WCAG20/#minimize-error-suggestions) (Level AA)	 		 | Supports | Automatically identified errors provide proper suggestions to users |
| [**3.3.4 Error Prevention (Legal, Financial, Data)**](http://www.w3.org/TR/WCAG20/#minimize-error-reversible) (Level AA) | Not Applicable  | No forms have legal, financial, data consequences |
| [**3.3.8 Accessible Authentication (Minimum)**](https://www.w3.org/TR/WCAG22/#accessible-authentication-minimum) (Level AA 2.2 only) | Not Evaluated |  |
| [**4.1.3 Status Messages**](https://www.w3.org/TR/WCAG21/#status-messages) (Level AA 2.1 and 2.2)	 | Supports | Status messages are exposed to hte user programmatically with the correct role |

# 

# **Reports**

### **Table 1: Success Criteria, Level A**

Notes:	

| Criteria | Conformance Level | Remarks and Explanations |
| ----- | ----- | ----- |
| [**1.1.1 Non-text Content**](http://www.w3.org/TR/WCAG20/#text-equiv-all) (Level A) | Does Not Support  | This section provides sufficient text alternatives for some instances of non-text content. Exceptions include:  Magnifying glass icon  Sorting arrow icon  Ellipsus icon  Back arrow icon  Repository Icon Icon Filter Icon  |
| [**1.2.1 Audio-only and Video-only (Prerecorded)**](http://www.w3.org/TR/WCAG20/#media-equiv-av-only-alt) (Level A) | Not Applicable  | This section does not contain prerecorded audio-only or video-only media  |
| [**1.2.2 Captions (Prerecorded)**](http://www.w3.org/TR/WCAG20/#media-equiv-captions) (Level A) | Not Applicable  | This section does not contain prerecorded synchronized media.  |
| [**1.2.3 Audio Description or Media Alternative (Prerecorded)**](http://www.w3.org/TR/WCAG20/#media-equiv-audio-desc) (Level A) | Not Applicable  | This section does not contain prerecorded video content that would require audio description or a media alternative.  |
| [**1.3.1 Info and Relationships**](http://www.w3.org/TR/WCAG20/#content-structure-separation-programmatic) (Level A) | Partially Supports | Most visual structure and relationship information is provided through object information or is available in text. Exceptions include:  Visual headings (Repository and Repository Filter) are not programmatic headings  Table cells only announce the top header (Name) without context of which report the user is editing or selecting |
| [**1.3.2 Meaningful Sequence**](http://www.w3.org/TR/WCAG20/#content-structure-separation-sequence) (Level A) 	 | Supports | This section’s content is presented in a meaningful sequence  |
| [**1.3.3 Sensory Characteristics**](http://www.w3.org/TR/WCAG20/#content-structure-separation-understanding) (Level A) | Supports | No instructions rely on sensory characteristics  |
| [**1.4.1 Use of Color**](http://www.w3.org/TR/WCAG20/#visual-audio-contrast-without-color) (Level A)		 | Partially Supports | Most components do not solely use color to convey meaning to the user. Exceptions include:  “our docs” and “Back to Reports” links only use color to distinguish them from other text  |
| [**1.4.2 Audio Control**](http://www.w3.org/TR/WCAG20/#visual-audio-contrast-dis-audio) (Level A)	 | Not Applicable | The site does not contain audio that plays automatically |
| [**2.1.1 Keyboard**](http://www.w3.org/TR/WCAG20/#keyboard-operation-keyboard-operable) (Level A)	 | Partially Supports | Most functionality in this section can be accessed and operated using a keyboard. Exceptions Include:  Clear Selected Options button is not keyboard accessible  |
| [**2.1.2 No Keyboard Trap**](http://www.w3.org/TR/WCAG20/#keyboard-operation-trapping) (Level A)	 | Supports | No keyboard traps in this section |
| [**2.1.4 Character Key Shortcuts**](https://www.w3.org/TR/WCAG21/#character-key-shortcuts) (Level A 2.1 and 2.2) | Not Applicable | No shortcuts are used in this section	 |
| [**2.2.1 Timing Adjustable**](http://www.w3.org/TR/WCAG20/#time-limits-required-behaviors) (Level A) | Not Applicable | This section does not include time limits |
| [**2.2.2 Pause, Stop, Hide**](http://www.w3.org/TR/WCAG20/#time-limits-pause) (Level A) | Supports | Any animations present are considered essential because not indicating progress could confuse users or cause them to think that content was frozen or broken. |
| [**2.3.1 Three Flashes or Below Threshold**](http://www.w3.org/TR/WCAG20/#seizure-does-not-violate) (Level A) | Not Applicable | There are no flashes in this section  |
| [**2.4.1 Bypass Blocks**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-skip) (Level A)	 | Partially Supports  | The navigation pane is the only programmatic landmark that can allow users to bypass it.  The footer and main sections of the page should also be programmed as landmarks.  |
| [**2.4.2 Page Titled**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-title) (Level A)	 | Supports | The page is properly titled |
| [**2.4.3 Focus Order**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-focus-order) (Level A)	 | Partially Supports | Most elements in this secton receive proper focus. Exceptions include: 	 Clear Selected Options button is not keyboard accessible  |
| [**2.4.4 Link Purpose (In Context)**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-refs) (Level A) | Does Not Support   | Some links adequately describe their purpose in context. Exceptions include: Report name links don’t provide user with the context that the link takes them to the settings page of the report  |
| [**2.5.1 Pointer Gestures**](https://www.w3.org/TR/WCAG21/#pointer-gestures) (Level A 2.1 and 2.2)	 | Not Applicable  | No Multipath gestures are required in this section |
| [**2.5.2 Pointer Cancellation**](https://www.w3.org/TR/WCAG21/#pointer-cancellation) (Level A 2.1 and 2.2) | Partially Supports  | Most site functions that use a single pointer are completed when the user releases the pointer. Exceptions include:  “Clear Selected Options” button fires on the down event  |
| [**2.5.3 Label in Name**](https://www.w3.org/TR/WCAG21/#label-in-name) (Level A 2.1 and 2.2) | Does Not Support  | Some elements in this section have their labels in their accessible name. Exceptions include:  Search input box does not have an accessible name  Report name input box does not use visual label in its accessible name  Radio buttons do not use visual label to describe the radio group  |
| [**2.5.4 Motion Actuation**](https://www.w3.org/TR/WCAG21/#motion-actuation) (Level A 2.1 and 2.2) | Not Applicable  | No content depends on the ability to move a device |
| [**3.1.1 Language of Page**](http://www.w3.org/TR/WCAG20/#meaning-doc-lang-id) (Level A) | Supports | Page language is programmatically determined  |
| [**3.2.1 On Focus**](http://www.w3.org/TR/WCAG20/#consistent-behavior-receive-focus) (Level A) | Supports | This section’s components do not initiate a change of context when focused	 |
| [**3.2.2 On Input**](http://www.w3.org/TR/WCAG20/#consistent-behavior-unpredictable-change) (Level A) | Partially supports | Most of this section’s components do not initiate a change of context on input. Exceptions include:  Search bar auto searches on input |
| [**3.2.6 Consistent Help**](https://www.w3.org/TR/WCAG22/#consistent-help) (Level A 2.2 only) | Not Evaluated |  |
| [**3.3.1 Error Identification**](http://www.w3.org/TR/WCAG20/#minimize-error-identified) (Level A) | Not Applicable | No automatically identified errors  |
| [**3.3.2 Labels or Instructions**](http://www.w3.org/TR/WCAG20/#minimize-error-cues) (Level A) | Does Not Support  | Some user interfaces in this section include descriptive labels or instructions. Exceptions include: 	 Search input box does not have an accessible name  Report name input box does not use visual label in its accessible name  Radio buttons do not use visual label to describe the radio group  While text areas do have instructions provided as placeholder text, placeholders may not be exposed to screen readers  |
| [**3.3.7 Redundant Entry**](https://www.w3.org/TR/WCAG22/#redundant-entry) (Level A 2.2 only) | Not Evaluated |   |
| [**4.1.1 Parsing**](http://www.w3.org/TR/WCAG20/#ensure-compat-parses) (Level A) WCAG 2.0 and 2.1 – Always answer ‘Supports’ WCAG 2.2 (obsolete and removed) \- Does not apply | Support  |  |
| [**4.1.2 Name, Role, Value**](http://www.w3.org/TR/WCAG20/#ensure-compat-rsv) (Level A)	 | Does Not Support  | Some user interface components in this section provide programmatic name, role, and/or state information. Exceptions include: Search input box does not have an accessible name  Report name input box does not use visual label in its accessible name  Radio buttons do not use visual label to describe the radio group  |

### **Table 2: Success Criteria, Level AA**

Notes: 

| Criteria | Conformance Level | Remarks and Explanations |
| ----- | ----- | ----- |
| [**1.2.4 Captions (Live)**](http://www.w3.org/TR/WCAG20/#media-equiv-real-time-captions) (Level AA) | Not Applicable | This section does not contain live synchronized media  |
| [**1.2.5 Audio Description (Prerecorded)**](http://www.w3.org/TR/WCAG20/#media-equiv-audio-desc-only) (Level AA) | Not Applicable | This section does not contain prerecorded video content that would require audio description  |
| [**1.3.4 Orientation**](https://www.w3.org/TR/WCAG21/#orientation) (Level AA 2.1 and 2.2)	 | Supports | The content of this section does not restrict its view and operation to a single display orientation |
| [**1.3.5 Identify Input Purpose**](https://www.w3.org/TR/WCAG21/#identify-input-purpose) (Level AA 2.1 and 2.2) | Not Applicable 	 | This section does not contain input fields that require the user to enter personally identifiable information.  |
| [**1.4.3 Contrast (Minimum)**](http://www.w3.org/TR/WCAG20/#visual-audio-contrast-contrast) (Level AA)	 | Partially | Most text in this section meets minimum contrast requirements.Exceptions include:  White text against Green background for status messages do not contrast requirements   |
| [**1.4.4 Resize text**](http://www.w3.org/TR/WCAG20/#visual-audio-contrast-scale) (Level AA) | Supports | Site content and user interfaces support standard zoom capabilities built into modern web browsers and operating systems.  |
| [**1.4.5 Images of Text**](http://www.w3.org/TR/WCAG20/#visual-audio-contrast-text-presentation) (Level AA)	 | Not Applicable | No Images of Text  |
| [**1.4.10 Reflow**](https://www.w3.org/TR/WCAG21/#reflow) (Level AA 2.1 and 2.2)	 | Supports | Page information properly reflows at a width of 320 pixels.	 |
| [**1.4.11 Non-text Contrast**](https://www.w3.org/TR/WCAG21/#non-text-contrast) (Level AA 2.1 and 2.2) | Does Not Support  | Some non-text components maintain sufficient contrast against the background. Exceptions include: Light blue focus indicators do not maintain enough contrast Pink focus indicators do not maintain enough contrast Unchecked Checkbox and Radio buttons do not meet contrast requirements against gray and white backgrounds  |
| [**1.4.12 Text Spacing**](https://www.w3.org/TR/WCAG21/#text-spacing) (Level AA 2.1 and 2.2) | Partially Supports  | The spacing between letters, words, lines of text and/or paragraphs can be adjusted in the site’s webpage. However, some errors occur:  Name label in the data table is no longer centered with its associated checkbox and sorting button  |
| [**1.4.13 Content on Hover or Focus**](https://www.w3.org/TR/WCAG21/#content-on-hover-or-focus) (Level AA 2.1 and 2.2) | Does Not Support  | Tooltips that become available when hovering over information images are not dismissable.  |
| [**2.4.5 Multiple Ways**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-mult-loc) (Level AA)	 | Does Not Support  | There is only one way to navigate the page – the navigation pane. 	 |
| [**2.4.6 Headings and Labels**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-descriptive) (Level AA)		 | Does Not Support  | Some  headings and labels that do exist are descriptive. Exceptions include:  Visual headings (Repository and Repository Filter) are not programmatic headings Search input box does not have an accessible name  Report name input box does not use visual label in its accessible name  Radio buttons do not use visual label to describe the radio group   |
| [**2.4.7 Focus Visible**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-focus-visible) (Level AA)	 | Partially Supports   | Most focusable items have a visual focus indicator. Exceptions include:  “Back to reports” link does not have visible focus indicators  |
| [**2.4.11 Focus Not Obscured (Minimum)**](https://www.w3.org/TR/WCAG22/#focus-not-obscured-minimum) (Level AA 2.2 only) | Not Evaluated |  |
| [**2.5.7 Dragging Movements**](https://www.w3.org/TR/WCAG22/#dragging-movements) (Level AA 2.2 only) | Not Evaluated |  |
| [**2.5.8 Target Size (Minimum)**](https://www.w3.org/TR/WCAG22/#target-size-minimum) (Level AA 2.2 only) | Not Evaluated |  |
| [**3.1.2 Language of Parts**](http://www.w3.org/TR/WCAG20/#meaning-other-lang-id) (Level AA) | Not Applicable 	 | No components are in alternate languages |
| [**3.2.3 Consistent Navigation**](http://www.w3.org/TR/WCAG20/#consistent-behavior-consistent-locations) (Level AA)	 | Supports | Navigation stays consistent across pages  |
| [**3.2.4 Consistent Identification**](http://www.w3.org/TR/WCAG20/#consistent-behavior-consistent-functionality) (Level AA) | Supports | Identification of interactive objects stays the same even when the page changes  |
| [**3.3.3 Error Suggestion**](http://www.w3.org/TR/WCAG20/#minimize-error-suggestions) (Level AA)	 		 | Not Applicable | No automatically  identified errors 	 |
| [**3.3.4 Error Prevention (Legal, Financial, Data)**](http://www.w3.org/TR/WCAG20/#minimize-error-reversible) (Level AA) | Supports | No forms in this section have legal, Financial, or Personal Data consequences |
| [**3.3.8 Accessible Authentication (Minimum)**](https://www.w3.org/TR/WCAG22/#accessible-authentication-minimum) (Level AA 2.2 only) | Not Evaluated |  |
| [**4.1.3 Status Messages**](https://www.w3.org/TR/WCAG21/#status-messages) (Level AA 2.1 and 2.2)	 | Supports | Status messages are exposed to the user programattically.  |

# 

# **New Organization Page** 

### **Table 1: Success Criteria, Level A**

Notes:	

| Criteria | Conformance Level | Remarks and Explanations |
| ----- | ----- | ----- |
| [**1.1.1 Non-text Content**](http://www.w3.org/TR/WCAG20/#text-equiv-all) (Level A) | Not Applicable | No non-text content in this section  |
| [**1.2.1 Audio-only and Video-only (Prerecorded)**](http://www.w3.org/TR/WCAG20/#media-equiv-av-only-alt) (Level A) | Not Applicable  | This section does not contain prerecorded audio-only or video-only media  |
| [**1.2.2 Captions (Prerecorded)**](http://www.w3.org/TR/WCAG20/#media-equiv-captions) (Level A) | Not Applicable  | This section does not contain prerecorded synchronized media.  |
| [**1.2.3 Audio Description or Media Alternative (Prerecorded)**](http://www.w3.org/TR/WCAG20/#media-equiv-audio-desc) (Level A) | Not Applicable  | This section does not contain prerecorded video content that would require audio description or a media alternative.  |
| [**1.3.1 Info and Relationships**](http://www.w3.org/TR/WCAG20/#content-structure-separation-programmatic) (Level A) | Supports | Visual structure and relationship information is provided through object information or is available in text |
| [**1.3.2 Meaningful Sequence**](http://www.w3.org/TR/WCAG20/#content-structure-separation-sequence) (Level A) 	 | Supports | This section’s content is presented in a meaningful sequence |
| [**1.3.3 Sensory Characteristics**](http://www.w3.org/TR/WCAG20/#content-structure-separation-understanding) (Level A) | Supports | This section does not provide directions that rely on Sensory Characteristics  |
| [**1.4.1 Use of Color**](http://www.w3.org/TR/WCAG20/#visual-audio-contrast-without-color) (Level A)		 | Supports | There is no part of the website that solely uses color to convey meaning.  |
| [**1.4.2 Audio Control**](http://www.w3.org/TR/WCAG20/#visual-audio-contrast-dis-audio) (Level A)	 | Not Applicable | The site does not contain audio that plays automatically |
| [**2.1.1 Keyboard**](http://www.w3.org/TR/WCAG20/#keyboard-operation-keyboard-operable) (Level A)	 | Supports | Functionality in this section can be accessed and operated using a keyboard. Exceptions include:  |
| [**2.1.2 No Keyboard Trap**](http://www.w3.org/TR/WCAG20/#keyboard-operation-trapping) (Level A)	 | Supports | There are no keyboard traps present in this section |
| [**2.1.4 Character Key Shortcuts**](https://www.w3.org/TR/WCAG21/#character-key-shortcuts) (Level A 2.1 and 2.2) | Not Applicable | No shortcuts are used in this section	 |
| [**2.2.1 Timing Adjustable**](http://www.w3.org/TR/WCAG20/#time-limits-required-behaviors) (Level A) | Not Applicable | This section does not include time limits |
| [**2.2.2 Pause, Stop, Hide**](http://www.w3.org/TR/WCAG20/#time-limits-pause) (Level A) | Supports | Any animations present are considered essential because not indicating progress could confuse users or cause them to think that content was frozen or broken. |
| [**2.3.1 Three Flashes or Below Threshold**](http://www.w3.org/TR/WCAG20/#seizure-does-not-violate) (Level A) | Not Applicable | There are no flashes in this section  |
| [**2.4.1 Bypass Blocks**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-skip) (Level A)	 | Partially Supports | The navigation pane is the only programmatic landmark that can allow users to bypass it.  The footer and main sections of the page should also be programmed as landmarks.  |
| [**2.4.2 Page Titled**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-title) (Level A)	 | Supports | The page is properly titled   |
| [**2.4.3 Focus Order**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-focus-order) (Level A)	 | Supports | The page maintains a focus order that preserves operable understanding and functionality |
| [**2.4.4 Link Purpose (In Context)**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-refs) (Level A) | Not Applicable  | No links present in this section  |
| [**2.5.1 Pointer Gestures**](https://www.w3.org/TR/WCAG21/#pointer-gestures) (Level A 2.1 and 2.2)	 | Not Applicable  | No Multipath gestures are required in this section |
| [**2.5.2 Pointer Cancellation**](https://www.w3.org/TR/WCAG21/#pointer-cancellation) (Level A 2.1 and 2.2) | Supports  | The site functions that use a single pointer are completed when the user releases the pointer. |
| [**2.5.3 Label in Name**](https://www.w3.org/TR/WCAG21/#label-in-name) (Level A 2.1 and 2.2) | Supports | Elements in this section have their labels in their accessible name.  |
| [**2.5.4 Motion Actuation**](https://www.w3.org/TR/WCAG21/#motion-actuation) (Level A 2.1 and 2.2) | Not Applicable  | No content depends on the ability to move a device |
| [**3.1.1 Language of Page**](http://www.w3.org/TR/WCAG20/#meaning-doc-lang-id) (Level A) | Supports | Page language is programmatically determined |
| [**3.2.1 On Focus**](http://www.w3.org/TR/WCAG20/#consistent-behavior-receive-focus) (Level A) | Supports | This section’s components do not initiate a change of context when focused. |
| [**3.2.2 On Input**](http://www.w3.org/TR/WCAG20/#consistent-behavior-unpredictable-change) (Level A) | Supports | Content in this section do not trigger changes of context automatically on user input.  |
| [**3.2.6 Consistent Help**](https://www.w3.org/TR/WCAG22/#consistent-help) (Level A 2.2 only) | Not Evaluated |  |
| [**3.3.1 Error Identification**](http://www.w3.org/TR/WCAG20/#minimize-error-identified) (Level A) | Supports | Components provide proper error identification |
| [**3.3.2 Labels or Instructions**](http://www.w3.org/TR/WCAG20/#minimize-error-cues) (Level A) | Supports | Components provide acceptable lables or instructions for inputs.  |
| [**3.3.7 Redundant Entry**](https://www.w3.org/TR/WCAG22/#redundant-entry) (Level A 2.2 only) | Not Evaluated |   |
| [**4.1.1 Parsing**](http://www.w3.org/TR/WCAG20/#ensure-compat-parses) (Level A) WCAG 2.0 and 2.1 – Always answer ‘Supports’ WCAG 2.2 (obsolete and removed) \- Does not apply | Supports  |  |
| [**4.1.2 Name, Role, Value**](http://www.w3.org/TR/WCAG20/#ensure-compat-rsv) (Level A)	 | Supports | Components provide accessible names, roles, and values.  |

### **Table 2: Success Criteria, Level AA**

Notes: 

| Criteria | Conformance Level | Remarks and Explanations |
| ----- | ----- | ----- |
| [**1.2.4 Captions (Live)**](http://www.w3.org/TR/WCAG20/#media-equiv-real-time-captions) (Level AA) | Not Applicable | This section does not contain live synchronized media  |
| [**1.2.5 Audio Description (Prerecorded)**](http://www.w3.org/TR/WCAG20/#media-equiv-audio-desc-only) (Level AA) | Not Applicable | This section does not contain prerecorded video content that would require audio description  |
| [**1.3.4 Orientation**](https://www.w3.org/TR/WCAG21/#orientation) (Level AA 2.1 and 2.2)	 | Supports | The content of this section does not restrict its view and operation to a single display orientation	 |
| [**1.3.5 Identify Input Purpose**](https://www.w3.org/TR/WCAG21/#identify-input-purpose) (Level AA 2.1 and 2.2) | Not Applicable 	 | This section does not contain input fields that require the user to enter personally identifiable information.  |
| [**1.4.3 Contrast (Minimum)**](http://www.w3.org/TR/WCAG20/#visual-audio-contrast-contrast) (Level AA)	 | Partially supports | Most text in this section meets minimum contrast requirements.Exceptions include:  White text against green backgrounds used in successful status messages	 |
| [**1.4.4 Resize text**](http://www.w3.org/TR/WCAG20/#visual-audio-contrast-scale) (Level AA) | Supports | Site content and user interfaces support standard zoom capabilities built into modern web browsers and operating systems. The Chat icon, however, disappears at 200% Zoom in Chromium browsers.  |
| [**1.4.5 Images of Text**](http://www.w3.org/TR/WCAG20/#visual-audio-contrast-text-presentation) (Level AA)	 | Not Applicable | No images of text in this section |
| [**1.4.10 Reflow**](https://www.w3.org/TR/WCAG21/#reflow) (Level AA 2.1 and 2.2)	 | Supports | Information relows properly at a width of 320 pixels.  |
| [**1.4.11 Non-text Contrast**](https://www.w3.org/TR/WCAG21/#non-text-contrast) (Level AA 2.1 and 2.2) | Supports | All non-text content meets contrast minimums  |
| [**1.4.12 Text Spacing**](https://www.w3.org/TR/WCAG21/#text-spacing) (Level AA 2.1 and 2.2) | Supports | The spacing between letters, words, lines of text and/or paragraphs can be adjusted in the site’s webpage |
| [**1.4.13 Content on Hover or Focus**](https://www.w3.org/TR/WCAG21/#content-on-hover-or-focus) (Level AA 2.1 and 2.2) | Not Applicable | No content on hover or focus |
| [**2.4.5 Multiple Ways**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-mult-loc) (Level AA)	 | Does Not Support | There is only one way to navigate the page – the navigation pane. 	 |
| [**2.4.6 Headings and Labels**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-descriptive) (Level AA)		 | Supports | Headings and labels are descriptive. |
| [**2.4.7 Focus Visible**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-focus-visible) (Level AA)	 | Supports | All focusable items have a visual focus indicator |
| [**2.4.11 Focus Not Obscured (Minimum)**](https://www.w3.org/TR/WCAG22/#focus-not-obscured-minimum) (Level AA 2.2 only) | Not Evaluated |  |
| [**2.5.7 Dragging Movements**](https://www.w3.org/TR/WCAG22/#dragging-movements) (Level AA 2.2 only) | Not Evaluated |  |
| [**2.5.8 Target Size (Minimum)**](https://www.w3.org/TR/WCAG22/#target-size-minimum) (Level AA 2.2 only) | Not Evaluated |  |
| [**3.1.2 Language of Parts**](http://www.w3.org/TR/WCAG20/#meaning-other-lang-id) (Level AA) | Not Applicable 	 | No components are in alternate languages |
| [**3.2.3 Consistent Navigation**](http://www.w3.org/TR/WCAG20/#consistent-behavior-consistent-locations) (Level AA)	 | Supports | Navigation stays consistent across pages  |
| [**3.2.4 Consistent Identification**](http://www.w3.org/TR/WCAG20/#consistent-behavior-consistent-functionality) (Level AA) | Supports | Identification of interactive objects stays the same even when the page changes  |
| [**3.3.3 Error Suggestion**](http://www.w3.org/TR/WCAG20/#minimize-error-suggestions) (Level AA)	 		 | Supports | Automatically detected errors provide suggestions when possible to the user |
| [**3.3.4 Error Prevention (Legal, Financial, Data)**](http://www.w3.org/TR/WCAG20/#minimize-error-reversible) (Level AA) | Supports | No forms in this section have legal, Financial, or Personal Data consequences |
| [**3.3.8 Accessible Authentication (Minimum)**](https://www.w3.org/TR/WCAG22/#accessible-authentication-minimum) (Level AA 2.2 only) | Not Evaluated |  |
| [**4.1.3 Status Messages**](https://www.w3.org/TR/WCAG21/#status-messages) (Level AA 2.1 and 2.2)	 | Supports | Status messages are exposed to the user programattically.  |

# 

# **User Settings**

### **Table 1: Success Criteria, Level A**

Notes:	

| Criteria | Conformance Level | Remarks and Explanations |
| ----- | ----- | ----- |
| [**1.1.1 Non-text Content**](http://www.w3.org/TR/WCAG20/#text-equiv-all) (Level A) | Not Applicablle | No applicable non-text content  |
| [**1.2.1 Audio-only and Video-only (Prerecorded)**](http://www.w3.org/TR/WCAG20/#media-equiv-av-only-alt) (Level A) | Not Applicable  | This section does not contain prerecorded audio-only or video-only media  |
| [**1.2.2 Captions (Prerecorded)**](http://www.w3.org/TR/WCAG20/#media-equiv-captions) (Level A) | Not Applicable  | This section does not contain prerecorded synchronized media.  |
| [**1.2.3 Audio Description or Media Alternative (Prerecorded)**](http://www.w3.org/TR/WCAG20/#media-equiv-audio-desc) (Level A) | Not Applicable  | This section does not contain prerecorded video content that would require audio description or a media alternative.  |
| [**1.3.1 Info and Relationships**](http://www.w3.org/TR/WCAG20/#content-structure-separation-programmatic) (Level A) | Supports | Visual structure and relationship information is provided through object information or is available in text |
| [**1.3.2 Meaningful Sequence**](http://www.w3.org/TR/WCAG20/#content-structure-separation-sequence) (Level A) 	 | Supports | This section’s content is presented in a meaningful sequence |
| [**1.3.3 Sensory Characteristics**](http://www.w3.org/TR/WCAG20/#content-structure-separation-understanding) (Level A) | Supports | This section does not provide directions that rely on Sensory Characteristics  |
| [**1.4.1 Use of Color**](http://www.w3.org/TR/WCAG20/#visual-audio-contrast-without-color) (Level A)		 | Supports | There is no part of the website that solely uses color to convey meaning.  |
| [**1.4.2 Audio Control**](http://www.w3.org/TR/WCAG20/#visual-audio-contrast-dis-audio) (Level A)	 | Not Applicable | The site does not contain audio that plays automatically |
| [**2.1.1 Keyboard**](http://www.w3.org/TR/WCAG20/#keyboard-operation-keyboard-operable) (Level A)	 | Supports | Functionality in this section can be accessed and operated using a keyboard. Exceptions include:  |
| [**2.1.2 No Keyboard Trap**](http://www.w3.org/TR/WCAG20/#keyboard-operation-trapping) (Level A)	 | Supports | There are no keyboard traps present in this section |
| [**2.1.4 Character Key Shortcuts**](https://www.w3.org/TR/WCAG21/#character-key-shortcuts) (Level A 2.1 and 2.2) | Not Applicable | No shortcuts are used in this section	 |
| [**2.2.1 Timing Adjustable**](http://www.w3.org/TR/WCAG20/#time-limits-required-behaviors) (Level A) | Not Applicable | This section does not include time limits |
| [**2.2.2 Pause, Stop, Hide**](http://www.w3.org/TR/WCAG20/#time-limits-pause) (Level A) | Not Applicable  |  There are no animations that require the ability to pause, stop, or hide	 |
| [**2.3.1 Three Flashes or Below Threshold**](http://www.w3.org/TR/WCAG20/#seizure-does-not-violate) (Level A) | Not Applicable | There are no flashes in this section  |
| [**2.4.1 Bypass Blocks**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-skip) (Level A)	 | Partially Supports | The navigation pane is the only programmatic landmark that can allow users to bypass it.  The footer and main sections of the page should also be programmed as landmarks.  |
| [**2.4.2 Page Titled**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-title) (Level A)	 | Supports | The page is properly titled   |
| [**2.4.3 Focus Order**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-focus-order) (Level A)	 | Supports | The page maintains a focus order that preserves operable understanding and functionality |
| [**2.4.4 Link Purpose (In Context)**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-refs) (Level A) | Not Applicable  | No links present in this section  |
| [**2.5.1 Pointer Gestures**](https://www.w3.org/TR/WCAG21/#pointer-gestures) (Level A 2.1 and 2.2)	 | Not Applicable  | No Multipath gestures are required in this section |
| [**2.5.2 Pointer Cancellation**](https://www.w3.org/TR/WCAG21/#pointer-cancellation) (Level A 2.1 and 2.2) | Does Not Support | Dropdown menu |
| [**2.5.3 Label in Name**](https://www.w3.org/TR/WCAG21/#label-in-name) (Level A 2.1 and 2.2) | Supports | Elements in this section have their labels in their accessible name.  |
| [**2.5.4 Motion Actuation**](https://www.w3.org/TR/WCAG21/#motion-actuation) (Level A 2.1 and 2.2) | Not Applicable  | No content depends on the ability to move a device |
| [**3.1.1 Language of Page**](http://www.w3.org/TR/WCAG20/#meaning-doc-lang-id) (Level A) | Supports | Page language is programmatically determined |
| [**3.2.1 On Focus**](http://www.w3.org/TR/WCAG20/#consistent-behavior-receive-focus) (Level A) | Supports | This section’s components do not initiate a change of context when focused. |
| [**3.2.2 On Input**](http://www.w3.org/TR/WCAG20/#consistent-behavior-unpredictable-change) (Level A) | Supports | Content in this section do not trigger changes of context automatically on user input.  |
| [**3.2.6 Consistent Help**](https://www.w3.org/TR/WCAG22/#consistent-help) (Level A 2.2 only) | Not Evaluated |  |
| [**3.3.1 Error Identification**](http://www.w3.org/TR/WCAG20/#minimize-error-identified) (Level A) | Supports | Components provide proper error identification |
| [**3.3.2 Labels or Instructions**](http://www.w3.org/TR/WCAG20/#minimize-error-cues) (Level A) | Supports | Components provide acceptable lables or instructions for inputs.  |
| [**3.3.7 Redundant Entry**](https://www.w3.org/TR/WCAG22/#redundant-entry) (Level A 2.2 only) | Not Evaluated |   |
| [**4.1.1 Parsing**](http://www.w3.org/TR/WCAG20/#ensure-compat-parses) (Level A) WCAG 2.0 and 2.1 – Always answer ‘Supports’ WCAG 2.2 (obsolete and removed) \- Does not apply | Supports  |  |
| [**4.1.2 Name, Role, Value**](http://www.w3.org/TR/WCAG20/#ensure-compat-rsv) (Level A)	 | Supports | Components provide accessible names, roles, and values.  |

### **Table 2: Success Criteria, Level AA**

Notes: 

| Criteria | Conformance Level | Remarks and Explanations |
| ----- | ----- | ----- |
| [**1.2.4 Captions (Live)**](http://www.w3.org/TR/WCAG20/#media-equiv-real-time-captions) (Level AA) | Not Applicable | This section does not contain live synchronized media  |
| [**1.2.5 Audio Description (Prerecorded)**](http://www.w3.org/TR/WCAG20/#media-equiv-audio-desc-only) (Level AA) | Not Applicable | This section does not contain prerecorded video content that would require audio description  |
| [**1.3.4 Orientation**](https://www.w3.org/TR/WCAG21/#orientation) (Level AA 2.1 and 2.2)	 | Supports | The content of this section does not restrict its view and operation to a single display orientation	 |
| [**1.3.5 Identify Input Purpose**](https://www.w3.org/TR/WCAG21/#identify-input-purpose) (Level AA 2.1 and 2.2) | Not Applicable 	 | This section does not contain input fields that require the user to enter personally identifiable information.  |
| [**1.4.3 Contrast (Minimum)**](http://www.w3.org/TR/WCAG20/#visual-audio-contrast-contrast) (Level AA)	 | Partially Supports  | Most text in this section meets minimum contrast requirements.Exceptions include:  White text against green backgrounds used in successful status messages	 |
| [**1.4.4 Resize text**](http://www.w3.org/TR/WCAG20/#visual-audio-contrast-scale) (Level AA) | Supports | Site content and user interfaces support standard zoom capabilities built into modern web browsers and operating systems. The Chat icon, however, disappears at 200% Zoom in Chromium browsers.  |
| [**1.4.5 Images of Text**](http://www.w3.org/TR/WCAG20/#visual-audio-contrast-text-presentation) (Level AA)	 | Not Applicable | No images of text in this section |
| [**1.4.10 Reflow**](https://www.w3.org/TR/WCAG21/#reflow) (Level AA 2.1 and 2.2)	 | Supports | Information relows properly at a width of 320 pixels.  |
| [**1.4.11 Non-text Contrast**](https://www.w3.org/TR/WCAG21/#non-text-contrast) (Level AA 2.1 and 2.2) | Does Not Support | Most non-text components maintain sufficient contrast against the background. Exceptions include: Light blue focus indicators do not maintain enough contrast |
| [**1.4.12 Text Spacing**](https://www.w3.org/TR/WCAG21/#text-spacing) (Level AA 2.1 and 2.2) | Partially Supports | Most components allow the spacing between letters, words, lines of text, and/or paragraphs to be adjusted in the site’s webpage. Exceptions include:  Combobox selection menu does not allow respacing |
| [**1.4.13 Content on Hover or Focus**](https://www.w3.org/TR/WCAG21/#content-on-hover-or-focus) (Level AA 2.1 and 2.2) | Not Applicable | No content on hover or focus |
| [**2.4.5 Multiple Ways**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-mult-loc) (Level AA)	 | Does Not Support | There is only one way to navigate the page – the navigation pane. 	 |
| [**2.4.6 Headings and Labels**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-descriptive) (Level AA)		 | Supports | Headings and labels are descriptive. |
| [**2.4.7 Focus Visible**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-focus-visible) (Level AA)	 | Supports | All focusable items have a visual focus indicator |
| [**2.4.11 Focus Not Obscured (Minimum)**](https://www.w3.org/TR/WCAG22/#focus-not-obscured-minimum) (Level AA 2.2 only) | Not Evaluated |  |
| [**2.5.7 Dragging Movements**](https://www.w3.org/TR/WCAG22/#dragging-movements) (Level AA 2.2 only) | Not Evaluated |  |
| [**2.5.8 Target Size (Minimum)**](https://www.w3.org/TR/WCAG22/#target-size-minimum) (Level AA 2.2 only) | Not Evaluated |  |
| [**3.1.2 Language of Parts**](http://www.w3.org/TR/WCAG20/#meaning-other-lang-id) (Level AA) | Not Applicable 	 | No components are in alternate languages |
| [**3.2.3 Consistent Navigation**](http://www.w3.org/TR/WCAG20/#consistent-behavior-consistent-locations) (Level AA)	 | Supports | Identification of interactive objects stays the same even when the page changes  |
| [**3.2.4 Consistent Identification**](http://www.w3.org/TR/WCAG20/#consistent-behavior-consistent-functionality) (Level AA) | Supports | Automatically detected errors provide suggestions when possible to the user |
| [**3.3.3 Error Suggestion**](http://www.w3.org/TR/WCAG20/#minimize-error-suggestions) (Level AA)	 | Not Applicable | No Automatically Identified Errors |
| [**3.3.4 Error Prevention (Legal, Financial, Data)**](http://www.w3.org/TR/WCAG20/#minimize-error-reversible) (Level AA) | Supports | No forms in this section have legal, Financial, or Personal Data consequences |
| [**3.3.8 Accessible Authentication (Minimum)**](https://www.w3.org/TR/WCAG22/#accessible-authentication-minimum) (Level AA 2.2 only) | Not Evaluated |  |
| [**4.1.3 Status Messages**](https://www.w3.org/TR/WCAG21/#status-messages) (Level AA 2.1 and 2.2)	 | Supports | Status messages are exposed to the user programattically.   |

# 

# **Cost Explorer**

### **Table 1: Success Criteria, Level A**

Notes:	

| Criteria | Conformance Level | Remarks and Explanations |
| ----- | ----- | ----- |
| [**1.1.1 Non-text Content**](http://www.w3.org/TR/WCAG20/#text-equiv-all) (Level A) | Does Not Support | This section provides sufficient text alternatives for some instances of non-text content. Exceptions include:  Magnifying Icon  Dropdown Icon Chart has inner text but does not provide a descriptive alternative text or label  |
| [**1.2.1 Audio-only and Video-only (Prerecorded)**](http://www.w3.org/TR/WCAG20/#media-equiv-av-only-alt) (Level A) | Not Applicable  | This section does not contain prerecorded audio-only or video-only media  |
| [**1.2.2 Captions (Prerecorded)**](http://www.w3.org/TR/WCAG20/#media-equiv-captions) (Level A) | Not Applicable 	 | This section does not contain prerecorded synchronized media.  |
| [**1.2.3 Audio Description or Media Alternative (Prerecorded)**](http://www.w3.org/TR/WCAG20/#media-equiv-audio-desc) (Level A) | Not Applicable  | This section does not contain prerecorded video content that would require audio description or a media alternative.  |
| [**1.3.1 Info and Relationships**](http://www.w3.org/TR/WCAG20/#content-structure-separation-programmatic) (Level A) | Does Not Support  | Some visual structure and relationship information is provided through object information or is available in text. Exceptions include:  Tables have no scope attribute Refresh’s button label is included in “Cost Changes Between”Heading 2 which could be confusing for screen reader users “Most impactful changes between 2024-11-19 and 2025-11-19” heading looks like H2 but is programmed as H3 |
| [**1.3.2 Meaningful Sequence**](http://www.w3.org/TR/WCAG20/#content-structure-separation-sequence) (Level A) 	 | Does Not Support  | Some of this section’s content is presented in a meaningful sequence. Exceptions include:  Filter drop downs do not linearize in a way that preserves operability or meaning  |
| [**1.3.3 Sensory Characteristics**](http://www.w3.org/TR/WCAG20/#content-structure-separation-understanding) (Level A) | Supports | No instructions rely on sensory characteristics  |
| [**1.4.1 Use of Color**](http://www.w3.org/TR/WCAG20/#visual-audio-contrast-without-color) (Level A)		 | Does Not Support | Most components do not solely use color to convey meaning to the user. Exceptions include:  Apply button’s enable and disabled states are only distinguishable using color  Chart only uses color to distinguish between data points that are made in different repositories.  |
| [**1.4.2 Audio Control**](http://www.w3.org/TR/WCAG20/#visual-audio-contrast-dis-audio) (Level A)	 | Not Applicable | The site does not contain audio that plays automatically |
| [**2.1.1 Keyboard**](http://www.w3.org/TR/WCAG20/#keyboard-operation-keyboard-operable) (Level A)	 | Does Not Support | Some Functionality in this section can be accessed and operated using a keyboard. Exceptions include:  Filter dropdown menus are not keyboard operable  |
| [**2.1.2 No Keyboard Trap**](http://www.w3.org/TR/WCAG20/#keyboard-operation-trapping) (Level A)	 | Supports | There are no keyboard traps present in this section |
| [**2.1.4 Character Key Shortcuts**](https://www.w3.org/TR/WCAG21/#character-key-shortcuts) (Level A 2.1 and 2.2) | Not Applicable | No shortcuts are used in this section	 |
| [**2.2.1 Timing Adjustable**](http://www.w3.org/TR/WCAG20/#time-limits-required-behaviors) (Level A) | Not Applicable | This section does not include time limits |
| [**2.2.2 Pause, Stop, Hide**](http://www.w3.org/TR/WCAG20/#time-limits-pause) (Level A) | Supports | Any animations present are considered essential because not indicating progress could confuse users or cause them to think that content was frozen or broken. |
| [**2.3.1 Three Flashes or Below Threshold**](http://www.w3.org/TR/WCAG20/#seizure-does-not-violate) (Level A) | Not Applicable | There are no flashes in this section  |
| [**2.4.1 Bypass Blocks**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-skip) (Level A)	 | Partially supports  | The navigation pane is the only programmatic landmark that can allow users to bypass it.  The footer and main sections of the page should also be programmed as landmarks.  |
| [**2.4.2 Page Titled**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-title) (Level A)	 | Supports | The page is properly titled |
| [**2.4.3 Focus Order**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-focus-order) (Level A)	 | Partially Supports | Most elements in this secton receive proper focus. Exceptions include: 	 Filter options in drop down menus do not recieve focus  |
| [**2.4.4 Link Purpose (In Context)**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-refs) (Level A) | Supports | Links adequately describe their prupose in context.  |
| [**2.5.1 Pointer Gestures**](https://www.w3.org/TR/WCAG21/#pointer-gestures) (Level A 2.1 and 2.2)	 | Not Applicable  | No Multipath gestures are required in this section |
| [**2.5.2 Pointer Cancellation**](https://www.w3.org/TR/WCAG21/#pointer-cancellation) (Level A 2.1 and 2.2) | Partially Supports | Most site functions that use a single pointer are completed when the user releases the pointer. Exceptions include:  Number of days buttons turn gray on button down. Cancelling the button up gesture does not return the buttons to their original state.  |
| [**2.5.3 Label in Name**](https://www.w3.org/TR/WCAG21/#label-in-name) (Level A 2.1 and 2.2) | Partially Supports | Most elements in this section have their labels in their accessible name. Exceptions include:  Date widget does not include visual label “Costs Changes Between” |
| [**2.5.4 Motion Actuation**](https://www.w3.org/TR/WCAG21/#motion-actuation) (Level A 2.1 and 2.2) | Not Applicable | No content depends on the ability to move a device |
| [**3.1.1 Language of Page**](http://www.w3.org/TR/WCAG20/#meaning-doc-lang-id) (Level A) | Supports | Page language is programmatically determined  |
| [**3.2.1 On Focus**](http://www.w3.org/TR/WCAG20/#consistent-behavior-receive-focus) (Level A) | Supports | This section’s components do not initiate a change of context when focused	 |
| [**3.2.2 On Input**](http://www.w3.org/TR/WCAG20/#consistent-behavior-unpredictable-change) (Level A) | Supports | This section’s components do not initiate a change of context on input.  |
| [**3.2.6 Consistent Help**](https://www.w3.org/TR/WCAG22/#consistent-help) (Level A 2.2 only) | Not Evaluated |  |
| [**3.3.1 Error Identification**](http://www.w3.org/TR/WCAG20/#minimize-error-identified) (Level A) | Not Applicable  | No automatically identified errors  |
| [**3.3.2 Labels or Instructions**](http://www.w3.org/TR/WCAG20/#minimize-error-cues) (Level A) | Supports | User interfaces in this section include descriptive labels or instructions. |
| [**3.3.7 Redundant Entry**](https://www.w3.org/TR/WCAG22/#redundant-entry) (Level A 2.2 only) | Not Evaluated  |   |
| [**4.1.1 Parsing**](http://www.w3.org/TR/WCAG20/#ensure-compat-parses) (Level A) WCAG 2.0 and 2.1 – Always answer ‘Supports’ WCAG 2.2 (obsolete and removed) \- Does not apply | Supports |  |
| [**4.1.2 Name, Role, Value**](http://www.w3.org/TR/WCAG20/#ensure-compat-rsv) (Level A)	 | Does Not Support | Some user interface components in this section provide programmatic name, role, and/or state information. Exceptions include: Tooltips are not given the proper role  |

### **Table 2: Success Criteria, Level AA**

Notes: 

| Criteria | Conformance Level | Remarks and Explanations |
| ----- | ----- | ----- |
| [**1.2.4 Captions (Live)**](http://www.w3.org/TR/WCAG20/#media-equiv-real-time-captions) (Level AA) | Not Applicable | This section does not contain live synchronized media  |
| [**1.2.5 Audio Description (Prerecorded)**](http://www.w3.org/TR/WCAG20/#media-equiv-audio-desc-only) (Level AA) | Not Applicable | This section does not contain prerecorded video content that would require audio description  |
| [**1.3.4 Orientation**](https://www.w3.org/TR/WCAG21/#orientation) (Level AA 2.1 and 2.2)	 | Supports | The content of this section does not restrict its view and operation to a single display orientation  |
| [**1.3.5 Identify Input Purpose**](https://www.w3.org/TR/WCAG21/#identify-input-purpose) (Level AA 2.1 and 2.2) | Not Applicable 	 | This section does not contain input fields that require the user to enter personally identifiable information.  |
| [**1.4.3 Contrast (Minimum)**](http://www.w3.org/TR/WCAG20/#visual-audio-contrast-contrast) (Level AA)	 | Supports | Text in this section meets minimum contrast requirements.Exceptions include:  |
| [**1.4.4 Resize text**](http://www.w3.org/TR/WCAG20/#visual-audio-contrast-scale) (Level AA) | Supports | Site content and user interfaces support standard zoom capabilities built into modern web browsers and operating systems.  |
| [**1.4.5 Images of Text**](http://www.w3.org/TR/WCAG20/#visual-audio-contrast-text-presentation) (Level AA)	 | Not Applicable | No Images of Text  |
| [**1.4.10 Reflow**](https://www.w3.org/TR/WCAG21/#reflow) (Level AA 2.1 and 2.2)	 | Partially Supports | Page information properly reflows at a width of 320 pixels.	 |
| [**1.4.11 Non-text Contrast**](https://www.w3.org/TR/WCAG21/#non-text-contrast) (Level AA 2.1 and 2.2) | Does Not Support | Some non-text components maintain sufficient contrast against the background. Exceptions include: Light blue focus indicators do not maintain enough contrast Orange Data Points do not mantain enough contrast  |
| [**1.4.12 Text Spacing**](https://www.w3.org/TR/WCAG21/#text-spacing) (Level AA 2.1 and 2.2) | Supports | “Cost Change” label could have more space from the axis of the chart, but nothing overlaps |
| [**1.4.13 Content on Hover or Focus**](https://www.w3.org/TR/WCAG21/#content-on-hover-or-focus) (Level AA 2.1 and 2.2) | Does Not Support | Hoverable but not dismissable |
| [**2.4.5 Multiple Ways**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-mult-loc) (Level AA)	 | Does Not Support | There is only one way to navigate the page – the navigation pane. 	 |
| [**2.4.6 Headings and Labels**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-descriptive) (Level AA)		 | Partially Supports | Most headings and labels that do exist are descriptive. Exceptions include:  Date widget does not have a label that properly describes what the user is choosing dates for  |
| [**2.4.7 Focus Visible**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-focus-visible) (Level AA)	 | Supports | Focusable items have a visual focus indicator.  |
| [**2.4.11 Focus Not Obscured (Minimum)**](https://www.w3.org/TR/WCAG22/#focus-not-obscured-minimum) (Level AA 2.2 only) | Not Evaluated |  |
| [**2.5.7 Dragging Movements**](https://www.w3.org/TR/WCAG22/#dragging-movements) (Level AA 2.2 only) | Not Evaluated |  |
| [**2.5.8 Target Size (Minimum)**](https://www.w3.org/TR/WCAG22/#target-size-minimum) (Level AA 2.2 only) | Not Evaluated |  |
| [**3.1.2 Language of Parts**](http://www.w3.org/TR/WCAG20/#meaning-other-lang-id) (Level AA) | Not Applicable 	 | No components are in alternate languages |
| [**3.2.3 Consistent Navigation**](http://www.w3.org/TR/WCAG20/#consistent-behavior-consistent-locations) (Level AA)	 | Supports | Navigation stays consistent across pages  |
| [**3.2.4 Consistent Identification**](http://www.w3.org/TR/WCAG20/#consistent-behavior-consistent-functionality) (Level AA) | Does Not Support | Some Identification of interactive objects stays the same even when the page changes  Label for filters changes to the values selected. This can be confusing for users.  |
| [**3.3.3 Error Suggestion**](http://www.w3.org/TR/WCAG20/#minimize-error-suggestions) (Level AA)	 | Not Applicable | No Automatically Identified Errors |
| [**3.3.4 Error Prevention (Legal, Financial, Data)**](http://www.w3.org/TR/WCAG20/#minimize-error-reversible) (Level AA) | Not Applicable | No errors that have legal, financial, or data consequences |
| [**3.3.8 Accessible Authentication (Minimum)**](https://www.w3.org/TR/WCAG22/#accessible-authentication-minimum) (Level AA 2.2 only) | Not Evaluated |  |
| [**4.1.3 Status Messages**](https://www.w3.org/TR/WCAG21/#status-messages) (Level AA 2.1 and 2.2)	 | Not Applicable | No status messages in this section  |

# 

# **Organization Settings**

### **Table 1: Success Criteria, Level A**

Notes:	

| Criteria | Conformance Level | Remarks and Explanations |
| ----- | ----- | ----- |
| [**1.1.1 Non-text Content**](http://www.w3.org/TR/WCAG20/#text-equiv-all) (Level A) | Does Not Support | This section provides sufficient text alternatives for some instances of non-text content. Exceptions include:  External LInk Icon Dropdown Icon Magnifying glass icon Seats Used Chart does not have descriptive alt text – inner text shown only describes the vertical and horizontal axes  Magnifying glass \+ dotted line box icon  Gear Icon |
| [**1.2.1 Audio-only and Video-only (Prerecorded)**](http://www.w3.org/TR/WCAG20/#media-equiv-av-only-alt) (Level A) | Not Applicable  | This section does not contain prerecorded audio-only or video-only media  |
| [**1.2.2 Captions (Prerecorded)**](http://www.w3.org/TR/WCAG20/#media-equiv-captions) (Level A) | Not Applicable 	 | This section does not contain prerecorded synchronized media.  |
| [**1.2.3 Audio Description or Media Alternative (Prerecorded)**](http://www.w3.org/TR/WCAG20/#media-equiv-audio-desc) (Level A) | Not Applicable  | This section does not contain prerecorded video content that would require audio description or a media alternative.  |
| [**1.3.1 Info and Relationships**](http://www.w3.org/TR/WCAG20/#content-structure-separation-programmatic) (Level A) 	 | Does Not Support  | Some visual structure and relationship information is provided through object information is available in text. Exceptions include:  H3 and H2 have the same visual importance for most instances of both  User Management Visual table is not programmed as a table  Billing and Licensing tab – “Seats used in last 12 months” and “Billing and Licensing” h3 headers have different visual importance  “CLI and CI/CD Token” looks like a header, but isn’t programmed as one  “Service Accounts“ looks like a header but isn’t programmed on Name column on “Service Accounts” data table should be a header colum so that more context is provided to the delete action Tables have no scope property Repo Custom Properties table does not allow users to view individual cells as they are not programmed as cells  Usage Cost Details table’s name column should be a header colum so that more context is provided to the enable action |
| [**1.3.2 Meaningful Sequence**](http://www.w3.org/TR/WCAG20/#content-structure-separation-sequence) (Level A) 	 | Supports | This section’s content is presented in a meaningful sequence |
| [**1.3.3 Sensory Characteristics**](http://www.w3.org/TR/WCAG20/#content-structure-separation-understanding) (Level A) | Supports | This section does not require sensory characteristics in its instructions to the user.  |
| [**1.4.1 Use of Color**](http://www.w3.org/TR/WCAG20/#visual-audio-contrast-without-color) (Level A)		 | Does Not Support  | Most components do not solely use color to convey meaning to the user. Exceptions include:  General Tab – Update buttons use only color to distinguish enabled and disabled states User Management Tab \- “Enable SSO by following the docs” and “Enable the SAML by following the docs” links use only color to distinguish them from other text  Search buttons use only color to distinguish enabled and disabled states  Billing and Licensing chart uses only color to distinguish between pull request authors and org members Integrations Tab – Integration name link uses only color to distinguish it from other text  Repo Config File Tab \- Save button uses only color to distinguish enabled and disabled states  Repo Custom Properties – Save Changes button uses only color to distinguish enabled and disabled states Repo Custom Properties — “Infracost API” link uses only color to distinguish it form other text Production Filters Tab \- Hide button uses only color to distinguish it from other text  Custtom Support Tab – Save button uses only color to distinguish enabled and distabled states  |
| [**1.4.2 Audio Control**](http://www.w3.org/TR/WCAG20/#visual-audio-contrast-dis-audio) (Level A)	 | Not Applicable | The site does not contain audio that plays automatically |
| [**2.1.1 Keyboard**](http://www.w3.org/TR/WCAG20/#keyboard-operation-keyboard-operable) (Level A)	 | Does Not Support | Some Functionality in this section can be accessed and operated using a keyboard. Exceptions include:  Integrations Tab \-  CI/CD Intedgrations Dropdown is not keyboard accessible  API Tokens Tab – Click to Show button is not keyboard accessible  Upload CSV file is not keyboard accessible Production Filters \- Add a Filter buttons are not keyboard accessible  General \- Update button is not keyboard operable |
| [**2.1.2 No Keyboard Trap**](http://www.w3.org/TR/WCAG20/#keyboard-operation-trapping) (Level A)	 | Supports | This section does not include keyboard traps |
| [**2.1.4 Character Key Shortcuts**](https://www.w3.org/TR/WCAG21/#character-key-shortcuts) (Level A 2.1 and 2.2) | Not Applicable | No shortcuts are used in this section	 |
| [**2.2.1 Timing Adjustable**](http://www.w3.org/TR/WCAG20/#time-limits-required-behaviors) (Level A) | Not Applicable	 | This section does not include time limits |
| [**2.2.2 Pause, Stop, Hide**](http://www.w3.org/TR/WCAG20/#time-limits-pause) (Level A) | Supports  | Any animations present are considered essential because not indicating progress could confuse users or cause them to think that content was frozen or broken. |
| [**2.3.1 Three Flashes or Below Threshold**](http://www.w3.org/TR/WCAG20/#seizure-does-not-violate) (Level A) | Not Applicable | There are no flashes in this section  |
| [**2.4.1 Bypass Blocks**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-skip) (Level A)	 | Partially supports  | The navigation pane is the only programmatic landmark that can allow users to bypass it.  The footer and main sections of the page should also be programmed as landmarks.  |
| [**2.4.2 Page Titled**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-title) (Level A)	 | Supports | The page is properly titled  |
| [**2.4.3 Focus Order**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-focus-order) (Level A)	 | Does Not Support  | Some elements in this section receive proper focus in an order that preserves operability. Exceptions include:  https://www.infracost.io/supportGeneral – Delete Organization recieves focus twice  Focus disappears after the Organization Settings Tab Menu User Settings – Focus disappears after Add Users button Integrations – Add Integrations – All buttons recieve focus twice  CI/CD Integrations dropdown menu is not focusable |
| [**2.4.4 Link Purpose (In Context)**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-refs) (Level A) | Partially Supports | Most links adequately describe their purpose in context. Exceptions include: Integrations \- Installed Integrations – Link that takes user to the edit integrations page only provides the user with the user name Usage Cost Defaults – Usage Cost Name link does not provide user with context that the link will take them to an editing page |
| [**2.5.1 Pointer Gestures**](https://www.w3.org/TR/WCAG21/#pointer-gestures) (Level A 2.1 and 2.2)	 | Not Applicable  | No Multipath gestures are required in this section |
| [**2.5.2 Pointer Cancellation**](https://www.w3.org/TR/WCAG21/#pointer-cancellation) (Level A 2.1 and 2.2) | Partially Supports  | Most Site functions that use a single pointer are completed when the user releases the pointer. Exceptions include: User Management \- Active / Invited  – tabs change with the down event Integrations – Installed Integrations / Add Integrations \- tabs change with the down event  |
| [**2.5.3 Label in Name**](https://www.w3.org/TR/WCAG21/#label-in-name) (Level A 2.1 and 2.2) | Does Not Support  | Some elements in this section have their labels in their accessible name. Exceptions include:  Repo Config File text box does not have an accessible name  Repo Custom Properties input boxes have no accessible names  Repo Custom Properties Config File box has no accessible name  Production Filters – Search input box has no accessible name  Branch Filters input boxes have no accessible names  Repo Filters input boxes have no accessible names Use Management \- Role combobox does not use visual label in its role  CI/CD Token input box does not use its visual label in its accessible name     |
| [**2.5.4 Motion Actuation**](https://www.w3.org/TR/WCAG21/#motion-actuation) (Level A 2.1 and 2.2) | Not Applicable | No content depends on the ability to move a device |
| [**3.1.1 Language of Page**](http://www.w3.org/TR/WCAG20/#meaning-doc-lang-id) (Level A) | Supports | Page language is programmatically determined |
| [**3.2.1 On Focus**](http://www.w3.org/TR/WCAG20/#consistent-behavior-receive-focus) (Level A) | Does Not Support | Most components do not initiate a change of context on focus. Exceptions include:  Focus disappears after the Organization Settings Tab Menu User Settings – Focus disappears after Add Users button |
| [**3.2.2 On Input**](http://www.w3.org/TR/WCAG20/#consistent-behavior-unpredictable-change) (Level A) | Does Not Support  | Some Components do not initiate a change of context on input . Exceptions include:  Purchase Infracost Cloud combobox automatically changes the page when the user makes a selection  Focus disappears after button is pressed  Repo Config File – Focus disappears after Save button is pressed  Repo Custom Property – Focus disappears after Save Changes is pressed Focus disappears after Hide button is pressed  Custom Price Books – Focus disappears after save button is pressed  Custom Support – Focus disappars after Save and Discard Changes buttons are pressed.  Focus disappears after enable predefined values is pressed |
| [**3.2.6 Consistent Help**](https://www.w3.org/TR/WCAG22/#consistent-help) (Level A 2.2 only) | Not Evaluated |  |
| [**3.3.1 Error Identification**](http://www.w3.org/TR/WCAG20/#minimize-error-identified) (Level A) | Supports | Components provide proper error identification |
| [**3.3.2 Labels or Instructions**](http://www.w3.org/TR/WCAG20/#minimize-error-cues) (Level A) | Does Not Support | Some components provide acceptable lables or instructions for inputs. Exceptions include:  Repo Config File text box does not have an accessible name  Repo Custom Properties input boxes have no accessible names  Repo Custom Properties Config File box has no accessible name  Production Filters – Search input box has no accessible name  Branch Filters input boxes have no accessible names  Repo Filters input boxes have no accessible names While text areas do have instructions provided as placeholder text, placeholders may not be exposed to screen readers  |
| [**3.3.7 Redundant Entry**](https://www.w3.org/TR/WCAG22/#redundant-entry) (Level A 2.2 only) | Not Evaluated  |   |
| [**4.1.1 Parsing**](http://www.w3.org/TR/WCAG20/#ensure-compat-parses) (Level A) WCAG 2.0 and 2.1 – Always answer ‘Supports’ WCAG 2.2 (obsolete and removed) \- Does not apply | Supports	 |  |
| [**4.1.2 Name, Role, Value**](http://www.w3.org/TR/WCAG20/#ensure-compat-rsv) (Level A)	 |  | Some Components provide accessible names, roles, and values.  Config File text box does not have an accessible name  Repo Custom Properties input boxes have no accessible names  Repo Custom Properties Config File box has no accessible name  Production Filters – Search input box has no accessible name  Branch Filters input boxes have no accessible names  Repo Filters input boxes have no accessible names Repo Custom Properties table does not allow users to view individual cells as they are not programmed as cells  User Management Visual table is not programmed as a table  Add a filter buttons are not programmed as buttons Production / Non Production buttons are not programmed with the role tab Tooltips are programmed as buttons, not as tooltips  |

### **Table 2: Success Criteria, Level AA**

Notes: 

| Criteria | Conformance Level | Remarks and Explanations |
| ----- | ----- | ----- |
| [**1.2.4 Captions (Live)**](http://www.w3.org/TR/WCAG20/#media-equiv-real-time-captions) (Level AA) | Not Applicable | This section does not contain live synchronized media  |
| [**1.2.5 Audio Description (Prerecorded)**](http://www.w3.org/TR/WCAG20/#media-equiv-audio-desc-only) (Level AA) | Not Applicable | This section does not contain prerecorded video content that would require audio description  |
| [**1.3.4 Orientation**](https://www.w3.org/TR/WCAG21/#orientation) (Level AA 2.1 and 2.2)	 | Does Not Support | Some content of this section does not restrict its view and operation to a single display orientation. Exceptions include:  Billing and Licensing Tab – Purchase Infracost Cloud button fails in portrait mode  Repository Custom Properties Tab fails  Usage Cost Defaults Table fails \- overlapping text |
| [**1.3.5 Identify Input Purpose**](https://www.w3.org/TR/WCAG21/#identify-input-purpose) (Level AA 2.1 and 2.2) | Not Applicable 	 | This section does not contain input fields that require the user to enter personally identifiable information.  |
| [**1.4.3 Contrast (Minimum)**](http://www.w3.org/TR/WCAG20/#visual-audio-contrast-contrast) (Level AA)	 | Partially supports  | Most text in this section meets minimum contrast requirements.Exceptions include:  Billing and Licensing Tab – Org Members horizontal label does not meet contrast requirements for text  |
| [**1.4.4 Resize text**](http://www.w3.org/TR/WCAG20/#visual-audio-contrast-scale) (Level AA) | Does Not Support  | Some Site content and user interfaces support standard zoom capabilities built into modern web browsers and operating systems. The Chat icon, however, disappears at 200% Zoom in Chromium browsers.  Billing and Licensing Tab – Purchase Infracost Cloud button fails in portrait mode  Repository Custom Properties Tab fails  Usage Cost Defaults Table fails \- overlapping text |
| [**1.4.5 Images of Text**](http://www.w3.org/TR/WCAG20/#visual-audio-contrast-text-presentation) (Level AA)	 | Does Not Support  | Images of text do not have text alternatives. Examples include:  “AWS S3 Bucket” text and “Azure Blob Storage” text.  |
| [**1.4.10 Reflow**](https://www.w3.org/TR/WCAG21/#reflow) (Level AA 2.1 and 2.2)	 | Does Not Support  | Some Site content and user interfaces support standard zoom capabilities built into modern web browsers and operating systems. Exceptions include:  Repository Custom Properties Tab fails  Usage Cost Defaults Tab fails |
| [**1.4.11 Non-text Contrast**](https://www.w3.org/TR/WCAG21/#non-text-contrast) (Level AA 2.1 and 2.2) | Does Not Support  | Some non-text content meets contrast minimums. Exceptions include:  Toggle buttons, when off, do not meet contrast requirements  Checkbox icon, when off, does not meet contrast requirements Light blue focus indicators do not meet contrast requirements Light pink focus indicators do not meet contrast requirements  |
| [**1.4.12 Text Spacing**](https://www.w3.org/TR/WCAG21/#text-spacing) (Level AA 2.1 and 2.2) | Does Not Support  | The spacing between letters, words, lines of text and/or paragraphs can be adjusted in the site’s webpage. Exceptions include:  User Management Data Table cell contents are no longer centered vertically with eachother	 Billing and Licensing Tab – Infracost Cloud Trial Expires text is no longer vertically centered with its tool tip, or surrounding text  Repository Custom Properites Data Table cell contents are no longer centered vertically with eachother	 Production Filters combo boxes are no longer centered with their drop down icons  |
| [**1.4.13 Content on Hover or Focus**](https://www.w3.org/TR/WCAG21/#content-on-hover-or-focus) (Level AA 2.1 and 2.2) | Does Not Support | Informational Tooltips are hoverable but not dismissable.  Chart tooltips are not hoverable or dismissable  |
| [**2.4.5 Multiple Ways**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-mult-loc) (Level AA)	 | Does Not Support | There is only one way to navigate the page – the navigation pane. 	 |
| [**2.4.6 Headings and Labels**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-descriptive) (Level AA)		 | Partially Supports  | Most headings and labels that do exist are descriptive. Exceptions include:  Config File text box does not have a label Repo Custom Properties input boxes have no labels  Repo Custom Properties Config File box has no label Production Filters – Search input box has no label  Branch Filters input boxes have no label  Repo Filters input boxes have no label |
| [**2.4.7 Focus Visible**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-focus-visible) (Level AA)	 | Does Not Support | Not All Focus-able Items have a focus indicator  Production and Non-Production keyword filters are focusable but their focus is not visible  |
| [**2.4.11 Focus Not Obscured (Minimum)**](https://www.w3.org/TR/WCAG22/#focus-not-obscured-minimum) (Level AA 2.2 only) | Not Evaluated |  |
| [**2.5.7 Dragging Movements**](https://www.w3.org/TR/WCAG22/#dragging-movements) (Level AA 2.2 only) | Not Evaluated |  |
| [**2.5.8 Target Size (Minimum)**](https://www.w3.org/TR/WCAG22/#target-size-minimum) (Level AA 2.2 only) | Not Evaluated |  |
| [**3.1.2 Language of Parts**](http://www.w3.org/TR/WCAG20/#meaning-other-lang-id) (Level AA) | Not Applicable 	 | No components are in alternate languages |
| [**3.2.3 Consistent Navigation**](http://www.w3.org/TR/WCAG20/#consistent-behavior-consistent-locations) (Level AA)	 | Supports | Navigation stays consistent across pages  |
| [**3.2.4 Consistent Identification**](http://www.w3.org/TR/WCAG20/#consistent-behavior-consistent-functionality) (Level AA) | Supports | Identification of interactive objects stays the same even when the page changes  |
| [**3.3.3 Error Suggestion**](http://www.w3.org/TR/WCAG20/#minimize-error-suggestions) (Level AA)	 | Supports | Automatically detected errors provide suggestions when possible to the user |
| [**3.3.4 Error Prevention (Legal, Financial, Data)**](http://www.w3.org/TR/WCAG20/#minimize-error-reversible) (Level AA) | Supports | Forms that may use user data or have legal and financial consequences are single page forms that do not submit until the user selects a submit button, or presses enter. This provides the user with time to correct mistakes. It is advised to let users know that interacting with the chat bot, however, may include giving user data. This context gives the user more control over their personal information.  |
| [**3.3.8 Accessible Authentication (Minimum)**](https://www.w3.org/TR/WCAG22/#accessible-authentication-minimum) (Level AA 2.2 only) | Not Evaluated |  |
| [**4.1.3 Status Messages**](https://www.w3.org/TR/WCAG21/#status-messages) (Level AA 2.1 and 2.2)	 | Supports | Status message announces itself as a status  |

## **Disclaimer**

*©2025 Infracost Inc. All rights reserved. The names of actual companies and products mentioned herein may be the trademarks of their respective owners. The information contained in this document represents the current view of Infracost Inc. on the issues discussed as of the date of publication. Infracost cannot guarantee the accuracy of any information presented after the date of publication.*

*Infracost’s WCAG 2.1 conformance reports provide the information included in ITI’s “VPAT® 2.5 WCAG (November 2023)” template. “Voluntary Product Accessibility Template” and “VPAT” are registered service marks of the Information Technology Industry Council (ITI). This document includes material copied from or derived from the Web Content Accessibility Guidelines (WCAG 2.1). Copyright © 2017-2018 W3C® (MIT, ERCIM, Keio, Beihang). This document is not the Web Content Accessibility Guidelines (WCAG) and should not be used as a substitute for it. Excerpts of WCAG are referenced solely for purposes of detailing Infracost’s conformance with the relevant provisions. A full and complete copy of the Guidelines is available from the W3C WAI.*

*Infracost regularly updates its websites and provides new information about the accessibility of products as that information becomes available. Customization of the product voids this conformance statement from Infracost. Customers may make independent conformance statements if they have conducted due diligence to meet all relevant requirements for their customization. Please consult with Assistive Technology (AT) vendors for compatibility specifications of specific AT products. This document is for informational purposes only. Infracost MAKES NO WARRANTIES, EXPRESS OR IMPLIED, IN THIS DOCUMENT.*

The following pages have not been included in this version of the VPAT Accessibility Conformance Report. These are pages that are used less frequently by users. 

* Github Repos Setup page  
* Select Github Org page   
* Gitlab Integration Setup page  
* Self Managed Gitlab Integration Setup Page  
* Setup Azure Repos page   
* Jira Integration page  
* Service Account page   
* AWS S3 Bucket page  
* Azure Blog Storage Export page  
* Usage Cost Overrides page   
* Connect your repos to Infracost

The following 3rd Party Vendor reports might also be useful:  

- [Github Install Infracost Page (3rd Party Vendor)](https://accessibility.github.com/conformance/github-com/)  
- [Gitlab Install Infracost Page (3rd Party Vendor)](https://design.gitlab.com/accessibility/wcag)  
- [Azure Devops Install Infracost Page (3rd Party Vendor)](https://aat-acr-api-prod.azurewebsites.net/api/file/d/p/f34b5582-44f4-47b1-9725-8c9f74f0c87f/a/7583db73-8b09-4049-a64d-b8a184337cd3/f/Azure%20DevOps.Web.WCAG%20\(1\).docx) 

