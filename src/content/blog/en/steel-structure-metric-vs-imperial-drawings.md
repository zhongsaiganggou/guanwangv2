---
title: "Metric vs Imperial Steel Drawings: Building to Inch Plans"
language: "en"
category: "Manufacturing & Quality"
status: "published"
seoTitle: "Metric vs Imperial Steel Drawings | Inch-Pound Projects in a Metric Shop"
metaDescription: "Inch-pound drawings are not just translated into millimetres: the unit system carries its own standards, stock sizes, bolt grades and tolerances. This guide shows what must be converted, what must be approved, and what to confirm before fabrication."
h1: "Metric vs Imperial Steel Drawings: What Changes When a Metric Shop Builds to Inch-Pound Plans"
excerpt: "An imperial steel drawing is not a metric drawing with different numbers. The unit system carries its own standards, stock sizes, bolt grades, welding symbols and tolerances, and each of those has to be carried across deliberately. A metric fabrication shop can build to inch-pound drawings, but every conversion is an engineering decision that needs an owner, not a clerical one."
coverImage: "/images/blog/steel-structure-metric-vs-imperial-drawings/cover.jpg"
coverImageAlt: "Fabricated steel columns in a workshop with a rolled drawing set on a table (illustrative concept image)"
publishedAt: "2026-11-11"
updatedAt: "2026-11-11"
ctaType: "send-project-requirements"
noindex: false
author: "ZhongSai Steel Structure Editorial Team"
translationKey: "steel-structure-metric-vs-imperial-drawings"
---

An imperial steel drawing is not a metric drawing with different numbers. The unit system carries its own standards, stock sizes, bolt grades, welding symbols and tolerances, and each of those has to be carried across deliberately. A metric fabrication shop can build to inch-pound drawings, but every conversion is an engineering decision that needs an owner, not a clerical one. What has to be settled before the first plate is cut is who converts, who checks, and who signs.

This guide is written for buyers and contractors who hold inch-pound drawings and are sourcing from a metric workshop, and for anyone reviewing a quotation that quietly converts one system into the other.

## Part 1: Three things change when the unit system changes

Most conversion problems come from treating the task as arithmetic. The arithmetic is the easy part. What actually changes is:

| Layer | What changes | Why it matters |
|---|---|---|
| Dimensions | Every length, thickness and offset is stated in inches or feet | Rounding a dimension changes fit-up, and a converted dimension is no longer the drawing's dimension |
| Standards | AISC, AWS, ASTM, SSPC on one side; GB, EN, ISO on the other | Two documents can describe the same joint with different limits and different acceptance criteria |
| Stock | Imperial plate and section sizes do not exist in a metric mill's standard range | The nearest metric size is a substitution, and substitutions need approval |

A shop that converts dimensions but keeps buying to the nearest metric stock has made a design change without telling anyone. That is the failure mode this article is about.

## Part 2: The conversion table (and the rounding rule)

These factors are exact or near-exact. What is not exact is what you do with the result.

| Imperial | Metric | Notes |
|---|---|---|
| 1 inch | 25.4 mm | Exact by definition |
| 1 foot | 304.8 mm | Exact |
| 1/4 in plate | 6.35 mm | Metric stock is 6 mm |
| 3/8 in plate | 9.525 mm | Metric stock is 10 mm |
| 1/2 in plate | 12.7 mm | Metric stock is 12 mm |
| 5/8 in plate | 15.875 mm | Metric stock is 16 mm |
| 3/4 in plate | 19.05 mm | Metric stock is 20 mm |
| 1 mil coating | 25.4 µm | Coating specs are often written in mils |
| 1 ksi | 6.895 MPa | Strength and weld metal specs |
| 1 kip | 4.448 kN | Loads |
| 1 psf | 47.88 Pa | Roof and floor loads |

The rounding rule that matters: **do not round a converted dimension to a convenient metric value.** 6.35 mm is not 6 mm. If the design needs 6.35 mm, the shop either sources 6.35 mm plate or proposes 6 mm with a written engineering justification and the buyer's approval. The same applies to a 12.7 mm flange offset rounded to 13 mm: it is no longer the drawing.

Where a dimension is a reference rather than a controlling value, the drawing should say so. Where it is controlling, it should not be rounded at all in the fabrication model.

![Caliper jaws clamped across a steel plate edge while the plate is held in a vise (illustrative concept image)](/images/blog/steel-structure-metric-vs-imperial-drawings/plate-thickness-check.jpg)

## Part 3: Plate and section availability

A metric mill quotes its standard range: 6, 8, 10, 12, 14, 16, 20 mm and so on. An imperial drawing asks for 1/4, 5/16, 3/8, 1/2, 5/8, 3/4 in. The two ranges only touch at a few points.

Three options exist, and only one of them is clean:

1. **Source the imperial size.** Possible for common plate, harder for rolled sections, and it adds procurement time.
2. **Substitute the nearest metric size and approve it.** This changes thickness, section modulus, weight and sometimes connection geometry. It needs a documented check and a signature.
3. **Convert silently.** This is the option that causes site problems, and it is usually not even a conscious decision.

Rolled sections are the harder case. A W-shape with a nominal depth in inches will be replaced by an available metric H-section with different depth, flange width and mass per metre. Depth changes affect clearance and connections; mass changes affect transport and foundation loads. None of that is a drawing conversion, it is a design substitution.

![Two structural bolts of different head sizes and thread lengths beside a caliper and a drilled plate (illustrative concept image)](/images/blog/steel-structure-metric-vs-imperial-drawings/bolt-standard-comparison.jpg)

## Part 4: Bolt grades and hole geometry

Bolts are where unit conversion most often turns into a real technical question, because the two systems use different product standards.

| Item | Inch-pound practice | Metric practice | What to check |
|---|---|---|---|
| Structural bolt grade | ASTM A325 / A490 (now covered by ASTM F3125) | ISO 898-1 class 8.8 / 10.9 | Strength band may look similar; geometry, thread length and marking differ |
| Head and nut | Heavy hex, inch across corners | Metric hex | Wrenching tools, clearances, and whether the specified bolt is even available |
| Hole size | Governed by AISC (typically bolt diameter plus an allowance) | Governed by EN 1090-2 tolerances | The two allowances are not the same number, and neither is "close enough" |
| Threads in the shear plane | Controlled by the specification | Controlled by the specification | Where the thread sits relative to the shear plane can change capacity |
| Installation | Torque or tension-calibrated method per the governing spec | Same principle, different table | The method must follow the specified standard, not the shop's habit |

Two practical rules follow. First, a metric bolt of a similar strength class is not an automatic replacement for an imperial structural bolt: the buyer's engineer has to accept it, because the connection was designed around that bolt's geometry and slip behaviour. Second, hole size is not a workshop preference — it belongs to the governing fabrication standard.

## Part 5: Welding symbols and acceptance criteria

A weld symbol is a compact instruction, and the two symbol systems do not map one-to-one. AWS D1.1 symbols and ISO 2553 symbols use different arrow-side conventions, different supplementary symbols and different ways of stating size and length.

Behind the symbols sit different acceptance documents: AWS D1.1 on one side, EN 1090-2 with ISO 5817 quality levels on the other, and sometimes a project-specific specification on top of either. A shop certified to one system is not automatically working to the other.

What has to be agreed before fabrication:

- Which welding standard governs acceptance, regardless of the drawing's origin.
- Whether welder qualification and procedure qualification follow AWS or ISO routes.
- Which non-destructive testing standard and acceptance level apply.
- Whether visual acceptance criteria come from the drawing standard or the project specification.

## Part 6: Coating thickness, mils and microns

Coating specifications are commonly written in mils in inch-pound documents and in microns in metric ones. The conversion is exact — 1 mil equals 25.4 µm — and that is where the simplicity ends.

| Specification style | Typical expression | Conversion risk |
|---|---|---|
| DFT in mils | "2.5 mils DFT" | Converted to 63.5 µm and then rounded to 60 µm, which is outside the original tolerance |
| Surface preparation | SSPC-SP 10 | Metric documents use Sa 2½; similar intent, different inspection record |
| Coating system | Primer/topcoat by product standard | Product data sheets may be in either unit; the shop must not mix them |
| Holiday testing | Per specified voltage | Voltage depends on thickness, so the converted thickness drives the test setting |

The safe approach is to keep the specified value and its tolerance in the original unit in the inspection record, and to show the converted value beside it. A record that only carries the rounded metric number cannot demonstrate compliance with the original specification.

## Part 7: Tolerances do not convert by arithmetic

This is the point most often missed. AISC 303 and EN 1090-2 both define fabrication and erection tolerances, in their own units and with their own structure. A 1/16 in allowance is 1.59 mm; it is not the same instruction as "1.5 mm", and neither is it automatically the same as a 2 mm allowance in a different clause.

For a project built to imperial drawings, the practical question is which tolerance regime the contract names. If the contract names AISC, the shop measures and reports in the AISC framework, even if its tapes read millimetres. If it names EN 1090-2, the reverse applies. Mixing the two produces arguments at the site acceptance stage that nobody can win.

![Two engineers comparing two drawing sets on a table during a conversion review (illustrative concept image)](/images/blog/steel-structure-metric-vs-imperial-drawings/drawing-conversion-review.jpg)

## Part 8: The conversion control workflow

The workable pattern for a metric shop on an imperial project is a controlled conversion, not a silent one.

1. **Freeze the source drawing set.** Record revision, date and the exact sheets received, so a later revision cannot be confused with a conversion error.
2. **Build a conversion register.** Every converted dimension, its original value, the converted value, the stock actually used and the approver.
3. **Separate reference from controlling dimensions.** Do not convert reference dimensions into controlling ones by accident.
4. **Flag every stock substitution.** Plate thickness, section depth and bolt grade are the three that change engineering behaviour.
5. **Check the converted model against the original drawings.** Independent check, by someone who did not do the conversion.
6. **Submit the register with the shop drawings.** The buyer's engineer should be able to see what changed without opening two drawing sets side by side.
7. **Hold the approved register as the fabrication baseline.** Site queries are answered from it, not from memory.

This is unglamorous work. It is also the difference between a project that closes out cleanly and one that spends a month arguing about a 0.35 mm plate difference that was never approved.

## Part 9: Six mistakes that show up on site

| Mistake | What happens | How to avoid it |
|---|---|---|
| Rounding converted dimensions to "nice" metric values | Members do not fit, or connections need rework | Keep controlling dimensions exact; mark reference dimensions as reference |
| Substituting 6 mm for 1/4 in plate without approval | Reduced thickness and capacity, discovered at inspection | Treat stock substitution as a design change with a signature |
| Replacing imperial structural bolts with a "similar" metric class | Connection behaviour and inspection records no longer match the design | Engineer-approved substitution, with hole and thread checks |
| Converting hole sizes to the nearest metric drill | Hole allowance falls outside the governing standard | Follow AISC or EN 1090-2 as specified, not the drill rack |
| Using AWS symbols on an ISO-governed project | Welders read the wrong side, inspectors apply the wrong criteria | Agree the welding standard before the first drawing is issued |
| Reporting coating thickness only in rounded microns | Cannot demonstrate compliance with the mils specification | Keep original unit and converted value in the record |

## Part 10: Responsibility boundary

On an imperial-drawing project built in a metric shop, the split should be explicit in the contract.

| Stage | ZhongSai input | Buyer / local engineer input |
|---|---|---|
| Drawing receipt and review | Engineering coordination, drawing review, conversion register | Confirming the drawing set, revisions and governing standards |
| Conversion and substitution | Detailing, proposed substitutions with technical justification | Approving any change in thickness, section or bolt grade |
| Fabrication and inspection | Fabrication, QC, inspection records in the agreed units | Confirming acceptance criteria and witnessing inspection if required |
| Documents | Shop drawings, material certificates, coating and bolt records | Reviewing and approving documents before shipment |
| Site fit-up | Installation technical guidance | Site erection, local tolerances, authority requirements |

The line is simple: the shop may propose, the buyer's engineer approves. When a substitution is approved verbally and never recorded, the record that survives is the one that causes the argument.

## Part 11: Pre-fabrication checklist

- [ ] The governing standards are named: AISC or EN 1090-2, AWS D1.1 or ISO, ASTM or ISO bolts.
- [ ] The source drawing set is frozen with revision and date.
- [ ] A conversion register exists and has a named owner.
- [ ] Controlling dimensions are kept exact; reference dimensions are labelled.
- [ ] Every plate, section and bolt substitution has a written approval.
- [ ] Hole sizes follow the governing standard, not workshop habit.
- [ ] Weld symbols and acceptance criteria are agreed before drawing release.
- [ ] Coating thickness is recorded in the original unit, with the converted value beside it.
- [ ] The converted model has been checked by someone independent of the conversion.
- [ ] The approved register is the only baseline used to answer site queries.

## Part 12: FAQ

**Question: Can a Chinese fabricator build from inch-pound drawings?**
Yes, provided the conversion is controlled. The shop converts dimensions, flags stock substitutions and submits a register for approval. The engineering decisions stay with the buyer's engineer.

**Question: Is converting inches to millimetres just multiplying by 25.4?**
The arithmetic is exact, but rounding, stock availability, bolt geometry and tolerances all change once the unit system changes. Those are engineering decisions, not arithmetic ones.

**Question: Are A325 and 10.9 bolts interchangeable?**
No. They sit in a similar strength band but follow different product standards, with different geometry, thread length and marking. A substitution needs the designer's approval and a check on hole size and thread position.

**Question: Is 1/4 inch plate the same as 6 mm plate?**
No. 1/4 in is 6.35 mm. Using 6 mm changes thickness and capacity, and it is a design substitution, not a rounding choice.

**Question: How do you convert coating thickness in mils?**
1 mil equals 25.4 µm. Keep the specified value and tolerance in mils in the inspection record, and report the converted value alongside it.

**Question: Which tolerance standard applies if the drawing is imperial?**
Whichever standard the contract names. AISC and EN 1090-2 define tolerances differently; a shop should measure and report within the named framework rather than converting limits by arithmetic.

**Question: Who should sign off a metric substitution?**
The buyer's engineer or the responsible designer. The fabricator can propose and justify, but approval belongs to the party accountable for the design.

## Sending drawings in either unit system

If your drawing set is in inches and you are sourcing from a metric workshop, send the full set with the revisions and the standards it references. We review the drawings, list every dimension and stock item that has to be converted or substituted, and submit it for your engineer's approval before fabrication. Conversion control and detailing sit with us; design approval and site tolerances stay local.

[Send project drawings](/en/contact/#quote-form) — also useful: how [fabrication tolerances](/en/blog/steel-structure-fabrication-tolerances-guide/) are inspected, how a [material substitution gets approved](/en/blog/steel-material-substitution-equivalent-approval/), and what to check when [reading a steel drawing set](/en/blog/how-to-read-steel-structure-drawings/). Bolt installation practice is covered in the [bolt installation guide](/en/blog/steel-structure-bolt-installation-guide/).
