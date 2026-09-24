/* =====================================================
   FORAGE AGRONOMY LAB
   FORAGE SPECIES SELECTION TOOL
   Page-specific JavaScript only
===================================================== */

document.addEventListener("DOMContentLoaded", function () {


    /* =================================================
       WYOMING FORAGE SPECIES DATABASE
    =================================================

       Starter values for the decision-support tool.

       Keep the species information in this database so
       it can be refined as Wyoming variety-trial and
       Extension information becomes available.

    ================================================= */

    const speciesData = [

        {
            name: "Alfalfa",
            group: "Legume",
            water: ["dryland", "irrigated"],
            drainage: ["well"],
            texture: ["sandy", "loam", "clay"],
            ph: ["neutral", "alkaline"],
            salinity: ["low", "moderate"],
            drought: ["moderate"],
            winter: ["cold", "severe"],
            use: ["hay", "grazing", "haylage", "seed"],
            tags: [
                "Perennial",
                "Legume",
                "High-quality forage"
            ],
            description:
                "A major Wyoming forage legume suited to well-drained soils. Variety selection is important where drought, salinity, or winter stress is a concern.",
            note:
                "Strong candidate for hay and mixed forage systems; avoid prolonged waterlogged conditions."
        },

        {
            name: "Sainfoin",
            group: "Legume",
            water: ["dryland", "irrigated"],
            drainage: ["well", "moderate"],
            texture: ["sandy", "loam"],
            ph: ["neutral", "alkaline"],
            salinity: ["low", "moderate"],
            drought: ["moderate", "high"],
            winter: ["cold", "severe"],
            use: ["hay", "grazing", "haylage", "seed"],
            tags: [
                "Perennial",
                "Legume",
                "Non-bloating"
            ],
            description:
                "A perennial forage legume with potential for dryland and irrigated production in Wyoming.",
            note:
                "Particularly relevant for forage diversification and mixed grass-legume systems."
        },

        {
            name: "Meadow Bromegrass",
            group: "Cool-season grass",
            water: ["irrigated"],
            drainage: ["well", "moderate"],
            texture: ["loam", "clay"],
            ph: ["neutral"],
            salinity: ["low", "moderate"],
            drought: ["low", "moderate"],
            winter: ["cold"],
            use: ["hay", "grazing", "haylage"],
            tags: [
                "Perennial",
                "Cool-season",
                "Grass"
            ],
            description:
                "A productive perennial cool-season grass frequently used in Wyoming grass-legume forage mixtures.",
            note:
                "Best suited to productive sites with adequate moisture."
        },

        {
            name: "Smooth Bromegrass",
            group: "Cool-season grass",
            water: ["dryland", "irrigated"],
            drainage: ["well", "moderate"],
            texture: ["loam", "clay"],
            ph: ["neutral", "alkaline"],
            salinity: ["low", "moderate"],
            drought: ["moderate"],
            winter: ["cold", "severe"],
            use: ["hay", "grazing", "haylage", "seed"],
            tags: [
                "Perennial",
                "Rhizomatous",
                "Grass"
            ],
            description:
                "A persistent perennial cool-season grass used for hay, pasture, and mixtures.",
            note:
                "Can be persistent once established; management and site conditions strongly influence performance."
        },

        {
            name: "Orchardgrass",
            group: "Cool-season grass",
            water: ["irrigated"],
            drainage: ["well", "moderate"],
            texture: ["loam", "clay"],
            ph: ["neutral"],
            salinity: ["low", "moderate"],
            drought: ["low", "moderate"],
            winter: ["cold"],
            use: ["hay", "grazing", "haylage", "seed"],
            tags: [
                "Perennial",
                "Cool-season",
                "Grass"
            ],
            description:
                "A productive cool-season grass generally suited to higher-moisture production environments.",
            note:
                "Select adapted varieties where winter survival is a concern."
        },

        {
            name: "Timothy",
            group: "Cool-season grass",
            water: ["irrigated"],
            drainage: ["well", "moderate"],
            texture: ["loam", "clay"],
            ph: ["neutral"],
            salinity: ["low"],
            drought: ["low"],
            winter: ["cold"],
            use: ["hay", "haylage", "seed"],
            tags: [
                "Perennial",
                "Cool-season",
                "Grass"
            ],
            description:
                "A cool-season grass commonly used for hay and seed production under adequate moisture.",
            note:
                "Performance is strongly affected by moisture availability and production environment."
        },

        {
            name: "Tall Fescue",
            group: "Cool-season grass",
            water: ["irrigated"],
            drainage: ["well", "moderate", "poor"],
            texture: ["loam", "clay"],
            ph: ["neutral", "alkaline"],
            salinity: ["low", "moderate"],
            drought: ["moderate"],
            winter: ["cold"],
            use: ["hay", "grazing", "haylage", "seed"],
            tags: [
                "Perennial",
                "Cool-season",
                "Grass"
            ],
            description:
                "A persistent cool-season grass that can tolerate a broader range of soil conditions than some other forage grasses.",
            note:
                "Use forage-safe, endophyte-free material where livestock feeding is intended."
        },

        {
            name: "Intermediate Wheatgrass",
            group: "Cool-season grass",
            water: ["dryland", "irrigated"],
            drainage: ["well", "moderate"],
            texture: ["loam", "clay"],
            ph: ["neutral", "alkaline"],
            salinity: ["low", "moderate"],
            drought: ["moderate"],
            winter: ["cold", "severe"],
            use: ["hay", "grazing", "haylage", "seed"],
            tags: [
                "Perennial",
                "Grass",
                "Dryland"
            ],
            description:
                "A perennial wheatgrass that can be useful in dryland and forage production systems.",
            note:
                "A potential option where winter hardiness and moderate drought adaptation are important."
        },

        {
            name: "Crested Wheatgrass",
            group: "Cool-season grass",
            water: ["dryland"],
            drainage: ["well", "moderate"],
            texture: ["sandy", "loam", "clay"],
            ph: ["neutral", "alkaline"],
            salinity: ["low", "moderate"],
            drought: ["high"],
            winter: ["severe"],
            use: ["hay", "grazing", "seed"],
            tags: [
                "Perennial",
                "Dryland",
                "Grass"
            ],
            description:
                "A drought-adapted perennial grass widely used in dryland and range-oriented systems.",
            note:
                "Often considered where low moisture and winter survival are important objectives."
        },

        {
            name: "Western Wheatgrass",
            group: "Native / perennial grass",
            water: ["dryland", "irrigated"],
            drainage: ["well", "moderate"],
            texture: ["loam", "clay"],
            ph: ["neutral", "alkaline"],
            salinity: ["moderate", "high"],
            drought: ["high"],
            winter: ["severe"],
            use: ["hay", "grazing", "seed"],
            tags: [
                "Native",
                "Rhizomatous",
                "Dryland"
            ],
            description:
                "A native perennial grass with good drought and winter adaptation and usefulness on a range of Wyoming sites.",
            note:
                "Can be especially useful where persistence and adaptation to dry conditions are priorities."
        },

        {
            name: "Tall Wheatgrass",
            group: "Cool-season grass",
            water: ["dryland", "irrigated"],
            drainage: ["well", "moderate", "poor"],
            texture: ["loam", "clay"],
            ph: ["neutral", "alkaline"],
            salinity: ["moderate", "high"],
            drought: ["moderate"],
            winter: ["cold", "severe"],
            use: ["hay", "grazing", "haylage", "seed"],
            tags: [
                "Perennial",
                "Salt tolerant",
                "Grass"
            ],
            description:
                "A tall perennial grass that can be considered for saline or difficult soil environments.",
            note:
                "Potentially useful where salinity tolerance is more important than maximizing yield on high-quality sites."
        },

        {
            name: "Creeping Foxtail",
            group: "Cool-season grass",
            water: ["irrigated"],
            drainage: ["moderate", "poor"],
            texture: ["loam", "clay"],
            ph: ["neutral", "alkaline"],
            salinity: ["low", "moderate"],
            drought: ["low"],
            winter: ["cold"],
            use: ["hay", "grazing", "haylage", "seed"],
            tags: [
                "Perennial",
                "Wet-site",
                "Grass"
            ],
            description:
                "A cool-season perennial grass suited to moist environments where drainage may limit other forage species.",
            note:
                "A candidate for wetter sites rather than drought-prone fields."
        },

        {
            name: "Cicer Milkvetch",
            group: "Legume",
            water: ["dryland", "irrigated"],
            drainage: ["well", "moderate"],
            texture: ["loam", "clay"],
            ph: ["neutral", "alkaline"],
            salinity: ["low", "moderate"],
            drought: ["moderate"],
            winter: ["cold", "severe"],
            use: ["grazing", "hay", "haylage", "seed"],
            tags: [
                "Perennial",
                "Legume",
                "Non-bloating"
            ],
            description:
                "A perennial forage legume with potential for adapted grazing and mixed forage systems.",
            note:
                "Establishment and long-term persistence depend strongly on site and management."
        }

    ];
