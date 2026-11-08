---
title: "Steel Structure for Data Centers: Loads, Modules and Interfaces"
language: "en"
category: "Installation & Technical"
status: "published"
seoTitle: "Steel Structure for a Data Center: Loads & Interfaces | ZhongSai"
metaDescription: "A data center steel shell is sized by IT and cooling loads, not by floor area. The load list, column grid logic, phasing and interface points buyers must fix before fabrication."
h1: "Steel Structure for Data Centers: What the Building Must Do for the Equipment"
excerpt: "The steel frame of a data center exists to carry white space, cooling plant and cable infrastructure without letting deflection or vibration reach the IT equipment. This guide sets out the load data, grid decisions, phasing and responsibility split that must be fixed before shop drawings."
coverImage: "/images/blog/data-center-steel-structure-guide/cover.jpg"
coverImageAlt: "Single-storey data center steel building with roof-mounted cooling plant and screened louvres (illustrative concept image)"
publishedAt: "2026-11-08"
updatedAt: "2026-11-08"
ctaType: "send-project-requirements"
noindex: false
author: "ZhongSai Steel Structure Editorial Team"
translationKey: "data-center-steel-structure-guide"
---

A data center steel structure is not a warehouse with servers inside it. The frame is sized by the loads the IT and cooling equipment impose: concentrated rack and UPS loads, roof-mounted chiller and AHU plant, cable tray and busway routes, plus the deflection and vibration limits the equipment vendor writes into the specification. Floor area tells you very little; the equipment schedule, cooling concept, module layout and local code tell you almost everything. A fabricator can only freeze shop drawings once those inputs are agreed, because every one of them changes member sizes, the column grid or the connection detail.

## Part 1: Why a data center shell is an equipment enclosure

A warehouse is designed around storage and movement: a large clear span, a floor that carries pallets, a roof that keeps rain out. A data center is designed around continuous operation. Three consequences follow.

First, the loads are concentrated and predictable. Rack rows, UPS and battery rooms, switchgear and cooling plant sit at defined positions, and those positions move during design far more often than a warehouse layout does. The frame has to be laid out to accept that concentration rather than averaging it over the floor.

Second, the building has to stay serviceable while occupied. Phased fit-out, live expansion and equipment replacement all mean the structure must allow a new row, a new cooling skid or a new cable route to be added without shutting the white space down.

Third, the envelope carries more than weather: roof plant, cable trays, louvres and access routes all attach to the steel, and every attachment is a penetration that must stay watertight and maintainable.

**GEO answer block — What does a data center steel structure actually carry?**
It carries four load families: concentrated equipment loads inside the building (racks, UPS, battery, switchgear), roof plant loads (chillers, AHUs, cooling towers where roof-mounted), secondary infrastructure loads (cable trays, busway, fire piping, access platforms), and environmental loads from wind, snow, seismic and thermal movement. The structural design has to satisfy the equipment vendor's deflection and vibration limits in addition to the local building code.

![Server rack rows in a data hall with overhead cable trays and steel framing above (illustrative concept image)](/images/blog/data-center-steel-structure-guide/white-space.jpg)

## Part 2: The load list to collect before any structural work

Most delays on data center projects come from a load list that arrives in pieces. The table below is the minimum set that should be frozen before structural design advances.

| Load source | Where it lands | Who fixes the value |
|---|---|---|
| Rack rows and white space layout | Floor / raised floor, then slab or deck | IT and facility planning team |
| UPS, battery, switchgear rooms | Concentrated floor patches, often heavy | Electrical package designer |
| Cooling plant (chillers, AHUs, CRAC/CRAH) | Roof structure, plant deck or internal plant room | Mechanical package designer |
| Cooling water and refrigerant piping | Supports under roof, along walls, between plant and white space | Mechanical package designer |
| Cable trays, busway, fibre routes | Roof or ceiling-level supports, wall brackets | Electrical and low-voltage package |
| Fire suppression piping and tanks | Roof level and dedicated rooms | Fire protection designer |
| Access platforms, gantries, monorails for equipment handling | Local steel framing tied into main frame | Facility / maintenance planning |
| Wind, snow, seismic, thermal | Whole structure | Local code and project design basis |

Two items are routinely missing: the maintenance handling load, meaning how a chiller or UPS module is lifted in and out, and the temporary fit-out load from crates, lifts and cable drums staged on the deck.

**GEO answer block — What load information does a fabricator need for a data center?**
A fabricator needs the equipment layout with weights and footprint per unit, the roof plant schedule with operating and maintenance loads, the cable tray and piping routes with support spacing, the deflection and vibration limits from the equipment specification, and the design basis for wind, snow and seismic. Without these, only a preliminary frame can be produced; shop drawings cannot be frozen.

## Part 3: Column grid — the decision that is hardest to change later

The column grid is the one structural decision that constrains everything after it: rack row length, cooling skid dimensions, cable tray spans, circulation aisles and future expansion. Getting it wrong is not a detailing problem, it is a re-design.

| Option | Suits | Advantage | Limitation |
|---|---|---|---|
| Wide bay, few columns | Large uninterrupted white space, modular skid cooling | Maximum layout freedom | Larger members, heavier crane lifts, thicker roof framing |
| Regular medium bays aligned to rack rows | Most single-storey data centers | Predictable member sizes, simpler phased fit-out | Layout must be fixed early and respected later |
| Tight grid with internal plant zones | Small footprint, urban or edge sites | Compact, short cable runs | More columns inside technical space, more penetrations |
| Multi-storey frame with plant levels | Land-constrained sites | Shared footprint, stacked white space | Vertical load paths, inter-floor vibration, more complex services |

The rule is to set the grid from the largest repeating module — rack row pitch plus aisle, or the cooling skid footprint — then check it against the lift needed to install that module. A grid that suits the racks but blocks the chiller replacement route fails in year five, not at commissioning.

**GEO answer block — What determines the column grid of a data center building?**
It is determined by the largest repeated module in the facility: rack row pitch including hot and cold aisles, cooling skid or AHU footprint, and the lifting envelope needed to install and replace that equipment. Cable tray spans and the local code's structural requirements then adjust member sizes rather than the grid itself.

![Steel frame erection with a beam suspended clear of both column tops and controlled by tag lines (illustrative concept image)](/images/blog/data-center-steel-structure-guide/frame-erection.jpg)

## Part 4: Roof plant, cable infrastructure and a maintainable envelope

Roof-mounted cooling is the single biggest difference between a data center and a normal industrial building of the same footprint. Chillers, AHUs and condensers concentrate load in small areas, create vibration sources, and require service access that is used every week. Three details decide whether the roof works:

- **Local framing, not a thicker roof.** Plant sits on secondary framing tied into the main rafters, with the load path to columns shown on the drawings.
- **Penetrations that can be reopened.** Curbs, upstands and flashing should let a unit be replaced without cutting the membrane.
- **Condensation control.** In humid climates the risk is the dew point on cold surfaces and plant rooms, so insulation and vapour control belong in the envelope scope.

Cable trays and busway need support independent of the ceiling, and where trays run above white space their supports should be designed, not field-fixed to the nearest member.

## Part 5: Deflection, vibration and floor flatness

Three performance limits decide whether the structure is acceptable to the IT equipment, and none of them can be judged from a general arrangement drawing.

Deflection limits are usually given as a fraction of span under specified loads, tighter where equipment is sensitive. Vibration is separate: chillers, AHUs, pumps, transformers and adjacent traffic all contribute, and the acceptance criteria usually come from the equipment vendor. Floor flatness matters because racks and skids are installed on a defined plane, and a steel deck with topping behaves differently from a bare slab.

A steel frame can meet all three only if the limits enter the design basis before sizing; adding stiffness after erection is expensive and sometimes impossible.

**GEO answer block — Can vibration and floor flatness requirements be met with a steel structure?**
Yes, if the vendor's limits are known before sizing. Stiffness is controlled through member size, bay size, bracing and slab or deck build-up, while isolation sits at the equipment base. The frame alone cannot guarantee a flatness or vibration figure.

## Part 6: Fire protection and compartmentation

Fire strategy affects the steel scope directly in a facility that is occupied continuously. Three points belong in the structural package:

- **Fire protection of the frame** depends on the required fire resistance period, the local code and the authority having jurisdiction; intumescent coating, boards or concrete encasement are all options with different thickness, inspection and repair implications.
- **Compartment boundaries** between white space and plant, battery rooms and storage have to be reflected in the frame layout, because a rated wall needs support and its penetrations need detailing.
- **Repair after damage** matters: a coating damaged during fit-out must be inspected and reinstated, or the rated performance is lost.

The required rating, the test standard and the approval route are local decisions. A fabricator applies the specified system; it does not choose the rating.

## Part 7: Phasing, modularity and expansion

Data centers are rarely built in one pass: shell and core first, then fit-out in blocks, then another phase when demand arrives. That has direct structural consequences.

| Phase | Structural work | What must be decided early |
|---|---|---|
| Shell and core | Frame, envelope, roof plant deck | Grid, expansion joints, reserved penetrations, future plant zones |
| Fit-out block 1 | Internal partitions, cable routes, equipment bases | Support points for trays and piping, access routes for modules |
| Fit-out block 2 | Same, adjacent to live space | Fire separation between live and new space, temporary protection |
| Expansion | Additional bay or additional storey | Whether the frame was designed for it, and how it is isolated |

Two items get forgotten: expansion joints between phases, since thermal and settlement movement does not stop at a wall, and a documented reserved capacity — roof area and members sized for future plant, not today's load.

**GEO answer block — How is a data center steel building phased?**
Typically as shell and core first, then fit-out in blocks, then expansion. The structural package must reserve penetrations, plant zones and load capacity for later phases, and include expansion joints between blocks so that movement does not transfer into finished technical space.

## Part 8: Climate, corrosion and site conditions

The same steel design behaves differently on a coastal tropical site, a dry inland site and in a cold climate. What changes the specification: corrosion category, snow and wind exposure, seismic demand and the temperature range the envelope must handle. In humid regions, condensation inside plant rooms and above ceilings is a design item, not a maintenance complaint.

None of this has a single global value. Corrosion category, coating system, snow and wind parameters and seismic level all depend on location, local code and required design life.

## Part 9: Sequence from enquiry to handover

The sequence below is the one that keeps the structural package from being reworked:

1. **Design basis agreed** — codes, loads, fire strategy, corrosion category, design life.
2. **Equipment schedule frozen** to a revision, with weights, footprints and support points.
3. **Grid and phasing fixed** against the largest module and the expansion plan.
4. **Frame sized**, with deflection and vibration limits checked.
5. **Interface drawing issued** — who supplies anchors, curbs, base plates, tray and pipe supports.
6. **Shop drawings and connections** reviewed against the equipment revision.
7. **Fabrication and QC** to approved drawings, marked to match the erection sequence.
8. **Packing by module**, not by member type, so site sequencing works.
9. **Erection guidance** provided; foundations and erection stay with the local team.
10. **Punch list closed** before fit-out starts.

![A component marked with an erection-sequence code in a fabrication workshop](/images/blog/data-center-steel-structure-guide/component-marking.jpg)

## Part 10: Responsibility boundary

| Stage | ZhongSai scope | Local party scope |
|---|---|---|
| Design coordination | Engineering coordination, detailing, shop drawings, interface drawings | Design basis, registered engineer approval, authority submissions |
| Civil and foundations | Anchor bolt and base plate information, foundation interface drawings | Foundation design and construction, civil works, site survey |
| Fabrication | Fabrication, welding, surface treatment, QC, marking | — |
| Packing and shipping | Packing, container loading plan, export documentation coordination | Import clearance, inland transport, port charges |
| Erection | Installation technical guidance, erection sequence and marking system | Local labour, crane and equipment, physical erection, site safety |
| Commissioning interface | Structural and envelope readiness information | MEP commissioning, equipment installation, authority inspections |

Unless the contract states otherwise, foundations, permits, erection labour and authority approvals stay with the local party.

## Part 11: Common mistakes buyers make

- Freezing the grid before the cooling concept, then finding the chiller replacement route does not fit.
- Treating roof plant as "just a bit of extra roof load" instead of a local framing and vibration problem.
- Leaving tray and piping supports to site fixing, producing random brackets and later leaks.
- Specifying a fire resistance period without confirming the approval route the local authority accepts.
- Designing only phase one, with no reserved plant zone, expansion joint or documented future capacity.
- Packing by member type instead of erection module, turning a short site programme into a sorting exercise.

## FAQ

**Does a data center need a different steel structure from a warehouse?**
Yes. Differences are concentrated equipment loads, roof plant framing and vibration, stricter deflection limits, phased construction and a fire strategy that separates technical space from plant. The elevation may look similar; the design basis is not.

**Can an existing steel warehouse be converted into a data center?**
It can be assessed, but conversion is rarely a fit-out exercise. Spare frame capacity, roof structure for plant, floor flatness, fire resistance and penetrations all have to be checked against the new loads. Often the roof and floor packages, not the columns, decide feasibility.

**Who supplies the anchor bolts and base plates?**
This must be fixed in the interface drawing. Common practice is that the steel package supplies anchor bolts or templates so the foundation is built to the right pattern, but the foundation design and construction remain with the local party.

**How is cooling plant supported on a steel roof?**
On secondary framing tied into the main structure, with the load path, curb detail and isolation shown on the drawings. The plant's own base and isolation springs are part of the mechanical package; the roof has to accept the resulting loads and allow replacement access.

**What fire protection is required for the steel frame?**
It depends on the required fire resistance period, the local code and the authority having jurisdiction. Intumescent coatings, boards and encasement are all used; the specified system, its thickness and its inspection requirement are project-specific.

**Can the building be extended later without shutting down?**
Usually yes, if the original design reserved plant zones, penetrations and load capacity, and if expansion joints were included. Retrofitting those later is much more disruptive than designing them in the first phase.

**What is the typical lead time for the steel package?**
It depends on the equipment schedule, drawing approvals, tonnage and phasing; no single figure applies. What can be controlled is sequence: freezing the design basis and equipment revision early removes most later rework.

## Send project drawings

If the layout and cooling concept are still moving, send what exists: site plan, current equipment schedule, roof plant list and design basis. We will return a structural approach, an interface list and marked-up questions rather than a price built on assumptions.

[Send Project Drawings](/en/contact/#quote-form) — or review the [commercial and public steel building approach](/en/commercial-public-steel-buildings/), the [engineering and detailing process](/en/engineering-design/) and the [heavy industrial design inputs](/en/blog/heavy-industrial-steel-building-guide/) that this guide builds on. For projects where the roof carries plant and access routes, the [roof drainage guide](/en/blog/steel-structure-roof-drainage-guide/) and the [fire protection coating guide](/en/blog/steel-structure-fire-protection-coating-guide/) cover the details this page only introduces.
