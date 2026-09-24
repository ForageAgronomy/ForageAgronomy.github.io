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
    /* =================================================
       USER SELECTIONS
    ================================================= */

    const selections = {};


    /* =================================================
       SELECTABLE OPTIONS
    ================================================= */

    const optionButtons =
        document.querySelectorAll(".option-button");

    optionButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const group =
                button.closest(".option-grid").dataset.group;

            const value =
                button.dataset.value;

            /* Remove selection from other options
               in the same group */

            const groupButtons =
                button
                    .closest(".option-grid")
                    .querySelectorAll(".option-button");

            groupButtons.forEach(function (otherButton) {

                otherButton.classList.remove("selected");

                otherButton.setAttribute(
                    "aria-pressed",
                    "false"
                );

            });

            /* Select clicked option */

            button.classList.add("selected");

            button.setAttribute(
                "aria-pressed",
                "true"
            );

            /* Store selection */

            selections[group] = value;

        });

        /* Accessibility */

        button.setAttribute(
            "aria-pressed",
            "false"
        );

    });


    /* =================================================
       FIND SPECIES
    ================================================= */

    const findButton =
        document.getElementById("find-species");

    const resultsContainer =
        document.getElementById("results-container");

    const resultsSummary =
        document.getElementById("results-summary");


    if (findButton) {

        findButton.addEventListener("click", function () {

            const requiredGroups = [
                "water",
                "drainage",
                "texture",
                "ph",
                "salinity",
                "drought",
                "winter",
                "use"
            ];

            const missingGroups =
                requiredGroups.filter(function (group) {

                    return !selections[group];

                });


            /* Make sure all questions are answered */

            if (missingGroups.length > 0) {

                resultsSummary.textContent =
                    "Please select an option for each field condition and intended use.";

                resultsContainer.innerHTML = `
                    <div class="no-results">
                        <p>
                            Please complete all selections above
                            before finding suitable forage species.
                        </p>
                    </div>
                `;

                return;

            }


            /* =================================================
               SCORE SPECIES
            ================================================= */

            const scoredSpecies =
                speciesData.map(function (species) {

                    let score = 0;
                    let matches = 0;

                    requiredGroups.forEach(function (group) {

                        if (
                            species[group] &&
                            species[group].includes(
                                selections[group]
                            )
                        ) {

                            score++;
                            matches++;

                        }

                    });

                    return {
                        species: species,
                        score: score,
                        matches: matches
                    };

                });


            /* Sort by number of matching characteristics */

            scoredSpecies.sort(function (a, b) {

                return b.score - a.score;

            });


            /* Only show species with at least one match */

            const results =
                scoredSpecies.filter(function (item) {

                    return item.score > 0;

                });


            /* =================================================
               DISPLAY RESULTS
            ================================================= */

            if (results.length === 0) {

                resultsSummary.textContent =
                    "No species matched the selected conditions.";

                resultsContainer.innerHTML = `
                    <div class="no-results">
                        <p>
                            No forage species in the current database
                            matched your selected conditions.
                        </p>
                    </div>
                `;

                return;

            }


            resultsSummary.textContent =
                "Species are listed according to how many of your selected conditions they match.";


            resultsContainer.innerHTML =
                results.map(function (item) {

                    const species =
                        item.species;

                    const matchPercent =
                        Math.round(
                            (item.matches /
                            requiredGroups.length) * 100
                        );


                    return `

                        <article class="species-result-card">

                            <div class="species-top">

                                <div>

                                    <p class="match-label">
                                        ${item.matches} of
                                        ${requiredGroups.length}
                                        conditions matched
                                    </p>

                                    <h3>
                                        ${species.name}
                                    </h3>

                                    <p class="species-group">
                                        ${species.group}
                                    </p>

                                </div>

                                <div class="match-score">
                                    ${matchPercent}%
                                </div>

                            </div>


                            <p class="species-description">
                                ${species.description}
                            </p>


                            <div class="species-tags">

                                ${species.tags.map(function (tag) {

                                    return `
                                        <span>
                                            ${tag}
                                        </span>
                                    `;

                                }).join("")}

                            </div>


                            <div class="species-details">

                                <div class="detail">

                                    <strong>
                                        Why it may fit
                                    </strong>

                                    <span>
                                        ${species.note}
                                    </span>

                                </div>

                            </div>

                        </article>

                    `;

                }).join("");

        });

    }


    /* =================================================
       RESET TOOL
    ================================================= */

    const resetButton =
        document.getElementById("reset-tool");


    if (resetButton) {

        resetButton.addEventListener("click", function () {

            /* Clear selections */

            Object.keys(selections).forEach(function (key) {

                delete selections[key];

            });


            /* Remove selected appearance */

            optionButtons.forEach(function (button) {

                button.classList.remove("selected");

                button.setAttribute(
                    "aria-pressed",
                    "false"
                );

            });


            /* Restore results */

            if (resultsSummary) {

                resultsSummary.textContent =
                    "Select your field conditions and intended use to view forage species.";

            }


            if (resultsContainer) {

                resultsContainer.innerHTML = `

                    <div class="initial-result">

                        <p>
                            Select your conditions above and click
                            <strong>
                                Find Suitable Forage Species
                            </strong>
                            to view results.
                        </p>

                    </div>

                `;

            }


            /* Clear search */

            const searchInput =
                document.getElementById("result-search");

            if (searchInput) {

                searchInput.value = "";

            }

        });

    }


    /* =================================================
       SEARCH RESULTS
    ================================================= */

    const searchInput =
        document.getElementById("result-search");


    if (searchInput) {

        searchInput.addEventListener("input", function () {

            const searchTerm =
                searchInput.value
                    .trim()
                    .toLowerCase();


            const resultCards =
                document.querySelectorAll(
                    ".species-result-card"
                );


            resultCards.forEach(function (card) {

                const text =
                    card.textContent.toLowerCase();

                card.style.display =
                    text.includes(searchTerm)
                        ? ""
                        : "none";

            });

        });

    }

});
