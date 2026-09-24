/* =====================================================
   FORAGE AGRONOMY LAB
   FORAGE SPECIES SELECTION TOOL
===================================================== */

document.addEventListener("DOMContentLoaded", function () {


    /* =================================================
       CURRENT YEAR
    ================================================= */

    const year =
        document.getElementById("year");


    if (year) {

        year.textContent =
            new Date().getFullYear();

    }



    /* =================================================
       MOBILE NAVIGATION
    ================================================= */

    const menuToggle =
        document.querySelector(".menu-toggle");

    const mainNav =
        document.querySelector(".main-nav");


    if (menuToggle && mainNav) {

        menuToggle.addEventListener(
            "click",
            function () {

                const isOpen =
                    mainNav.classList.toggle(
                        "open"
                    );


                menuToggle.setAttribute(
                    "aria-expanded",
                    isOpen ? "true" : "false"
                );


                menuToggle.setAttribute(
                    "aria-label",
                    isOpen
                        ? "Close navigation"
                        : "Open navigation"
                );

            }
        );

    }


    /* =================================================
       CLOSE MOBILE MENU
    ================================================= */

    document
        .querySelectorAll(
            ".main-nav a"
        )
        .forEach(function (link) {

            link.addEventListener(
                "click",
                function () {

                    if (
                        window.innerWidth <= 700 &&
                        mainNav
                    ) {

                        mainNav.classList.remove(
                            "open"
                        );

                    }

                }
            );

        });


    document.addEventListener(
        "click",
        function (event) {

            if (
                !mainNav ||
                !menuToggle ||
                window.innerWidth > 700
            ) {

                return;

            }


            if (
                !mainNav.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {

                mainNav.classList.remove(
                    "open"
                );

            }

        }
    );



    /* =================================================
       WYOMING FORAGE SPECIES DATABASE
    =====================================================

       These are starter values for the decision tool.

       IMPORTANT:
       The values are deliberately kept in one database
       so they can be refined as Wyoming variety-trial
       and Extension information becomes available.

    ================================================== */

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
       STATE
    ================================================= */

    const selections = {

        water: null,

        drainage: null,

        texture: null,

        ph: null,

        salinity: null,

        drought: null,

        winter: null,

        use: null

    };


    let currentResults = [];



    /* =================================================
       OPTION BUTTONS
    ================================================= */

    document
        .querySelectorAll(
            ".option-grid"
        )
        .forEach(function (grid) {


            const group =
                grid.dataset.group;


            grid
                .querySelectorAll(
                    ".option-button"
                )
                .forEach(function (button) {


                    button.addEventListener(
                        "click",
                        function () {


                            grid
                                .querySelectorAll(
                                    ".option-button"
                                )
                                .forEach(
                                    function (item) {

                                        item.classList.remove(
                                            "selected"
                                        );

                                    }
                                );


                            button.classList.add(
                                "selected"
                            );


                            selections[group] =
                                button.dataset.value;

                        }
                    );

                });

        });



    /* =================================================
       FIND SPECIES
    ================================================= */

    const findButton =
        document.getElementById(
            "find-species"
        );


    findButton.addEventListener(
        "click",
        function () {


            const missing =
                Object.keys(selections)
                    .filter(function (key) {

                        return !selections[key];

                    });


            /*
               Require all conditions before generating
               recommendations.
            */

            if (
                missing.length > 0
            ) {

                showIncompleteMessage(
                    missing
                );

                return;

            }


            currentResults =
                getSpeciesResults();


            renderResults(
                currentResults
            );


            const resultsSection =
                document.getElementById(
                    "results-section"
                );


            resultsSection.scrollIntoView({

                behavior: "smooth",

                block: "start"

            });

        }
    );



    /* =================================================
       SPECIES MATCHING
    ================================================= */

    function getSpeciesResults() {


        return speciesData
            .map(function (species) {


                let matches = 0;

                let criteria = 0;


                /*
                   Water
                */

                criteria++;


                if (
                    species.water.includes(
                        selections.water
                    )
                ) {

                    matches++;

                }


                /*
                   Drainage
                */

                criteria++;


                if (
                    species.drainage.includes(
                        selections.drainage
                    )
                ) {

                    matches++;

                }


                /*
                   Texture
                */

                criteria++;


                if (
                    species.texture.includes(
                        selections.texture
                    )
                ) {

                    matches++;

                }


                /*
                   pH
                */

                criteria++;


                if (
                    species.ph.includes(
                        selections.ph
                    )
                ) {

                    matches++;

                }


                /*
                   Salinity
                */

                criteria++;


                if (
                    species.salinity.includes(
                        selections.salinity
                    )
                ) {

                    matches++;

                }


                /*
                   Drought
                */

                criteria++;


                if (
                    species.drought.includes(
                        selections.drought
                    )
                ) {

                    matches++;

                }


                /*
                   Winter
                */

                criteria++;


                if (
                    species.winter.includes(
                        selections.winter
                    )
                ) {

                    matches++;

                }


                /*
                   Intended use
                */

                criteria++;


                if (
                    species.use.includes(
                        selections.use
                    )
                ) {

                    matches++;

                }


                const percentage =
                    Math.round(
                        matches /
                        criteria *
                        100
                    );


                let label;


                if (
                    percentage >= 88
                ) {

                    label =
                        "Strong match";

                } else if (
                    percentage >= 75
                ) {

                    label =
                        "Good match";

                } else if (
                    percentage >= 60
                ) {

                    label =
                        "Possible";

                } else {

                    label =
                        "Review site fit";

                }


                return {

                    ...species,

                    matches,

                    criteria,

                    percentage,

                    label

                };

            })


            /*
               Keep only reasonably relevant species.
            */

            .filter(function (species) {

                return species.percentage >= 60;

            })


            /*
               Highest compatibility first.
            */

            .sort(
                function (a, b) {

                    return (
                        b.percentage -
                        a.percentage
                    );

                }
            );

    }



    /* =================================================
       INCOMPLETE MESSAGE
    ================================================= */

    function showIncompleteMessage(
        missing
    ) {


        const names = {

            water:
                "water availability",

            drainage:
                "soil drainage",

            texture:
                "soil texture",

            ph:
                "soil pH",

            salinity:
                "salinity",

            drought:
                "drought pressure",

            winter:
                "winter conditions",

            use:
                "intended use"

        };


        const readable =
            missing
                .map(function (key) {

                    return names[key];

                });


        const resultsContainer =
            document.getElementById(
                "results-container"
            );


        resultsContainer.innerHTML = `

            <div class="no-results">

                <strong>
                    Please complete all selections.
                </strong>

                <p>
                    Missing:
                    ${escapeHtml(
                        readable.join(", ")
                    )}.
                </p>

            </div>

        `;


        document
            .getElementById(
                "results-summary"
            )
            .textContent =
            "Complete the site and production selections before viewing species.";

    }



    /* =================================================
       RENDER RESULTS
    ================================================= */

    function renderResults(
        results
    ) {


        const container =
            document.getElementById(
                "results-container"
            );


        const summary =
            document.getElementById(
                "results-summary"
            );


        if (
            results.length === 0
        ) {


            summary.textContent =
                "No species met the current screening criteria. Try reviewing one or more site selections.";


            container.innerHTML = `

                <div class="no-results">

                    <strong>
                        No species matched the selected conditions.
                    </strong>

                    <p>
                        Consider changing one or more
                        site conditions or reviewing local
                        recommendations.
                    </p>

                </div>

            `;


            return;

        }


        summary.textContent =
            `${results.length} forage species matched or may be appropriate for the conditions selected.`;


        container.innerHTML =
            results
                .map(
                    function (species) {

                        return createSpeciesCard(
                            species
                        );

                    }
                )
                .join("");

    }



    /* =================================================
       SPECIES CARD
    ================================================= */

    function createSpeciesCard(
        species
    ) {


        const tags =
            species.tags
                .map(function (tag) {

                    return `

                        <span class="species-tag">
                            ${escapeHtml(tag)}
                        </span>

                    `;

                })
                .join("");


        return `

            <article class="species-result-card">


                <div class="species-top">

                    <div>

                        <p class="species-group">
                            ${escapeHtml(
                                species.group
                            )}
                        </p>

                        <h3>
                            ${escapeHtml(
                                species.name
                            )}
                        </h3>

                    </div>


                    <span class="match-label">

                        ${escapeHtml(
                            species.label
                        )}

                    </span>

                </div>


                <p class="species-description">

                    ${escapeHtml(
                        species.description
                    )}

                </p>


                <div class="species-tags">

                    ${tags}

                </div>


                <div class="species-details">


                    <div class="detail">

                        <span class="detail-label">
                            Site fit
                        </span>

                        <span class="detail-value">
                            ${species.matches}
                            /
                            ${species.criteria}
                            selected factors
                        </span>

                    </div>


                    <div class="detail">

                        <span class="detail-label">
                            Use
                        </span>

                        <span class="detail-value">
                            ${formatUse(
                                species.use
                            )}
                        </span>

                    </div>


                </div>


                <div class="species-details">


                    <div class="detail">

                        <span class="detail-label">
                            Management note
                        </span>

                        <span class="detail-value">
                            ${escapeHtml(
                                species.note
                            )}
                        </span>

                    </div>

                </div>


            </article>

        `;

    }



    /* =================================================
       SEARCH RESULTS
    ================================================= */

    const searchInput =
        document.getElementById(
            "result-search"
        );


    searchInput.addEventListener(
        "input",
        function () {


            const query =
                searchInput.value
                    .trim()
                    .toLowerCase();


            if (
                !currentResults.length
            ) {

                return;

            }


            const filtered =
                currentResults.filter(
                    function (species) {


                        const searchable =
                            (
                                species.name +
                                " " +
                                species.group +
                                " " +
                                species.description +
                                " " +
                                species.tags.join(" ")
                            )
                            .toLowerCase();


                        return searchable.includes(
                            query
                        );

                    }
                );


            renderResults(
                filtered
            );

        }
    );



    /* =================================================
       RESET
    ================================================= */

    const resetButton =
        document.getElementById(
            "reset-tool"
        );


    resetButton.addEventListener(
        "click",
        function () {


            Object.keys(
                selections
            )
            .forEach(function (key) {

                selections[key] =
                    null;

            });


            document
                .querySelectorAll(
                    ".option-button"
                )
                .forEach(function (button) {

                    button.classList.remove(
                        "selected"
                    );

                });


            currentResults = [];


            searchInput.value =
                "";


            document
                .getElementById(
                    "results-summary"
                )
                .textContent =
                "Select your field conditions and intended use to view forage species.";


            document
                .getElementById(
                    "results-container"
                )
                .innerHTML = `

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
    );



    /* =================================================
       FORMAT USE
    ================================================= */

    function formatUse(
        uses
    ) {

        return uses
            .map(function (use) {

                return use
                    .charAt(0)
                    .toUpperCase() +
                    use.slice(1);

            })
            .join(", ");

    }



    /* =================================================
       ESCAPE HTML
    ================================================= */

    function escapeHtml(
        value
    ) {

        return String(value)
            .replace(
                /&/g,
                "&amp;"
            )
            .replace(
                /</g,
                "&lt;"
            )
            .replace(
                />/g,
                "&gt;"
            )
            .replace(
                /"/g,
                "&quot;"
            )
            .replace(
                /'/g,
                "&#039;"
            );

    }

});
