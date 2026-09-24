/* =====================================================
   FORAGE AGRONOMY LAB — SEEDING RATE CALCULATOR
===================================================== */

document.addEventListener("DOMContentLoaded", function () {


    /* =================================================
       CONSTANTS
    ================================================= */

    const SQFT_PER_ACRE = 43560;

    const GRAMS_PER_POUND = 453.59237;

    const KG_PER_HECTARE_PER_LB_PER_ACRE =
        1.120851156;

    const LB_PER_ACRE_PER_KG_PER_HECTARE =
        0.892179845;


    /*
       Excel file expected here:

       data/1000-seed-weight.xlsx

       The parser attempts to identify columns such as:

       Species
       Variety
       1000 Seed Weight
       TKW
       Thousand Seed Weight

       Once you upload your actual Excel file, this can be
       adjusted to its exact column names if necessary.
    */

    const EXCEL_FILE =
        "data/1000-seed-weight.xlsx";


    /* =================================================
       DOM REFERENCES
    ================================================= */

    const speciesContainer =
        document.getElementById(
            "species-container"
        );

    const addForageButton =
        document.getElementById(
            "add-forage"
        );

    const dataStatus =
        document.getElementById(
            "data-status"
        );

    const regionInput =
        document.getElementById(
            "growing-region"
        );

    const targetDensityInput =
        document.getElementById(
            "target-density"
        );

    const overageInput =
        document.getElementById(
            "overage"
        );

    const totalPercentage =
        document.getElementById(
            "total-percentage"
        );

    const totalRate =
        document.getElementById(
            "total-rate"
        );

    const totalCost =
        document.getElementById(
            "total-cost"
        );

    const summaryBody =
        document.getElementById(
            "summary-body"
        );

    const summaryTotalPercent =
        document.getElementById(
            "summary-total-percent"
        );

    const summaryTotalRate =
        document.getElementById(
            "summary-total-rate"
        );

    const summaryTotalCost =
        document.getElementById(
            "summary-total-cost"
        );

    const year =
        document.getElementById(
            "year"
        );


    /* =================================================
       STATE
    ================================================= */

    let unit = "lb-ac";

    let speciesData = [];

    let cardCounter = 0;


    /*
       Default target densities.

       These are starting values only and remain editable
       by the user.

       The specific target values can be changed later
       to match your Wyoming recommendations.
    */

    const targetDensities = {

        dryland: 20,

        moderate: 25,

        irrigated: 30,

        custom: 20

    };


    /* =================================================
       CURRENT YEAR
    ================================================= */

    if (year) {

        year.textContent =
            new Date().getFullYear();

    }


    /* =================================================
       MOBILE NAVIGATION
    ================================================= */

    const menuToggle =
        document.querySelector(
            ".menu-toggle"
        );

    const mainNav =
        document.querySelector(
            ".main-nav"
        );


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
                    isOpen
                        ? "true"
                        : "false"
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
       CLOSE MENU
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
       LOAD EXCEL DATA
    ================================================= */

    loadSeedWeightData();


    async function loadSeedWeightData() {

        try {

            if (
                typeof XLSX ===
                "undefined"
            ) {

                throw new Error(
                    "Excel library did not load."
                );

            }


            const response =
                await fetch(
                    EXCEL_FILE
                );


            if (!response.ok) {

                throw new Error(
                    `Could not load ${EXCEL_FILE}`
                );

            }


            const arrayBuffer =
                await response.arrayBuffer();


            const workbook =
                XLSX.read(
                    arrayBuffer,
                    {
                        type: "array"
                    }
                );


            const firstSheetName =
                workbook.SheetNames[0];


            const worksheet =
                workbook.Sheets[
                    firstSheetName
                ];


            const rows =
                XLSX.utils.sheet_to_json(
                    worksheet,
                    {
                        defval: ""
                    }
                );


            speciesData =
                parseSeedData(rows);


            if (
                speciesData.length === 0
            ) {

                throw new Error(
                    "No usable species and 1000-seed-weight data were found in the spreadsheet."
                );

            }


            dataStatus.textContent =
                `${speciesData.length} forage species loaded from the seed-weight spreadsheet.`;

            dataStatus.classList.remove(
                "warning"
            );


            addSpeciesCard();

        } catch (error) {

            console.error(error);


            dataStatus.textContent =
                "Seed-weight data could not be loaded. Upload the Excel file to data/1000-seed-weight.xlsx.";

            dataStatus.classList.add(
                "warning"
            );


            /*
               Keep one empty card so the interface
               remains visible while the spreadsheet
               is being prepared.
            */

            speciesData = [];

            addSpeciesCard();

        }

    }


    /* =================================================
       PARSE EXCEL DATA
    ================================================= */

    function parseSeedData(rows) {

        const output = [];


        rows.forEach(function (row) {

            const keys =
                Object.keys(row);


            let speciesKey =
                findColumn(
                    keys,
                    [
                        "species",
                        "forage",
                        "name",
                        "commonname",
                        "foragespecies"
                    ]
                );


            let weightKey =
                findColumn(
                    keys,
                    [
                        "1000seedweight",
                        "1000seedweightg",
                        "thousandseedweight",
                        "thousandseedweightg",
                        "tkw",
                        "thousandkernelweight"
                    ]
                );


            if (
                !speciesKey ||
                !weightKey
            ) {

                return;

            }


            const species =
                String(
                    row[speciesKey]
                ).trim();


            const weight =
                Number(
                    String(
                        row[weightKey]
                    )
                    .replace(
                        /[^0-9.-]/g,
                        ""
                    )
                );


            if (
                species &&
                Number.isFinite(weight) &&
                weight > 0
            ) {

                output.push({

                    species: species,

                    oneThousandSeedWeightG:
                        weight

                });

            }

        });


        return output;

    }


    /* =================================================
       FIND EXCEL COLUMN
    ================================================= */

    function findColumn(
        keys,
        candidates
    ) {

        const normalized =
            keys.map(function (key) {

                return {

                    original: key,

                    normalized:
                        normalizeHeader(key)

                };

            });


        for (
            const candidate of candidates
        ) {

            const match =
                normalized.find(
                    function (item) {

                        return (
                            item.normalized ===
                            candidate
                        );

                    }
                );


            if (match) {

                return match.original;

            }

        }


        /*
           Partial match fallback.
        */

        for (
            const candidate of candidates
        ) {

            const match =
                normalized.find(
                    function (item) {

                        return (
                            item.normalized
                                .includes(
                                    candidate
                                )
                        );

                    }
                );


            if (match) {

                return match.original;

            }

        }


        return null;

    }


    /* =================================================
       NORMALIZE EXCEL HEADER
    ================================================= */

    function normalizeHeader(value) {

        return String(value)
            .toLowerCase()
            .replace(
                /[^a-z0-9]/g,
                ""
            );

    }


    /* =================================================
       ADD SPECIES CARD
    ================================================= */

    function addSpeciesCard() {

        cardCounter++;


        const card =
            document.createElement(
                "article"
            );


        card.className =
            "species-card";


        card.dataset.cardId =
            cardCounter;


        card.innerHTML = `

            <div class="species-header">

                <div>

                    <span class="species-number">
                        FORAGE ${cardCounter}
                    </span>

                </div>

                <button
                    type="button"
                    class="remove-species">

                    Remove

                </button>

            </div>


            <div class="species-body">


                <div class="species-form-grid">


                    <div class="species-field">

                        <label class="field-label">
                            Select Forage
                        </label>

                        <select class="species-select">

                            <option value="">
                                Select a forage
                            </option>

                        </select>

                    </div>


                    <div class="species-field">

                        <label class="field-label">
                            % in Stand
                        </label>

                        <input
                            type="number"
                            class="stand-percentage"
                            min="0"
                            max="100"
                            step="1"
                            value="100">

                    </div>


                    <div class="species-field">

                        <label class="field-label">
                            1,000 Seed Weight (g)
                        </label>

                        <input
                            type="number"
                            class="seed-weight"
                            min="0"
                            step="0.01"
                            readonly>

                    </div>


                    <div class="species-field">

                        <label class="field-label">
                            Coating Weight Increase
                        </label>

                        <div class="input-with-unit">

                            <input
                                type="number"
                                class="coating"
                                min="0"
                                max="100"
                                step="1"
                                value="0">

                            <span>%</span>

                        </div>

                    </div>

                </div>



                <div class="species-form-grid secondary">


                    <div class="species-field">

                        <label class="field-label">
                            PLS
                        </label>

                        <input
                            type="number"
                            class="pls"
                            min="1"
                            max="100"
                            step="0.1"
                            value="90">

                    </div>


                    <div class="species-field">

                        <label class="field-label">
                            Purity (%)
                        </label>

                        <input
                            type="number"
                            class="purity"
                            min="1"
                            max="100"
                            step="0.1"
                            value="98">

                    </div>


                    <div class="species-field">

                        <label class="field-label">
                            Germination (%)
                        </label>

                        <input
                            type="number"
                            class="germination"
                            min="1"
                            max="100"
                            step="0.1"
                            value="92">

                    </div>


                    <div class="species-field">

                        <label class="field-label">
                            Cost ($ / lb)
                        </label>

                        <input
                            type="number"
                            class="cost"
                            min="0"
                            step="0.01"
                            value="0">

                    </div>

                </div>



                <div class="species-result">


                    <div class="result-box">

                        <span>
                            Seeds / lb
                        </span>

                        <strong class="seeds-per-pound">
                            —
                        </strong>

                    </div>


                    <div class="result-box">

                        <span>
                            Seeding Rate
                        </span>

                        <strong class="species-rate">
                            —
                        </strong>

                    </div>


                    <div class="result-box">

                        <span>
                            Cost / Acre
                        </span>

                        <strong class="species-cost">
                            —
                        </strong>

                    </div>


                </div>

            </div>
        `;


        speciesContainer.appendChild(
            card
        );


        populateSpeciesSelect(
            card
        );


        attachCardListeners(
            card
        );


        calculateAll();

    }


    /* =================================================
       POPULATE SPECIES SELECT
    ================================================= */

    function populateSpeciesSelect(
        card
    ) {

        const select =
            card.querySelector(
                ".species-select"
            );


        speciesData.forEach(
            function (item) {

                const option =
                    document.createElement(
                        "option"
                    );


                option.value =
                    item.species;


                option.textContent =
                    item.species;


                option.dataset.weight =
                    item
                        .oneThousandSeedWeightG;


                select.appendChild(
                    option
                );

            }
        );

    }


    /* =================================================
       SPECIES CARD EVENT LISTENERS
    ================================================= */

    function attachCardListeners(
        card
    ) {

        const select =
            card.querySelector(
                ".species-select"
            );


        const standPercentage =
            card.querySelector(
                ".stand-percentage"
            );


        const weightInput =
            card.querySelector(
                ".seed-weight"
            );


        const coating =
            card.querySelector(
                ".coating"
            );


        const pls =
            card.querySelector(
                ".pls"
            );


        const purity =
            card.querySelector(
                ".purity"
            );


        const germination =
            card.querySelector(
                ".germination"
            );


        const cost =
            card.querySelector(
                ".cost"
            );


        select.addEventListener(
            "change",
            function () {

                const option =
                    select.options[
                        select.selectedIndex
                    ];


                const weight =
                    Number(
                        option.dataset.weight
                    );


                if (
                    Number.isFinite(weight)
                ) {

                    weightInput.value =
                        weight;

                } else {

                    weightInput.value =
                        "";

                }


                calculateAll();

            }
        );


        [
            standPercentage,
            coating,
            pls,
            purity,
            germination,
            cost
        ]
        .forEach(function (input) {

            input.addEventListener(
                "input",
                function () {

                    /*
                       Keep PLS calculation synchronized
                       with purity × germination.
                    */

                    const purityValue =
                        Number(
                            purity.value
                        );

                    const germinationValue =
                        Number(
                            germination.value
                        );


                    if (
                        Number.isFinite(
                            purityValue
                        ) &&
                        Number.isFinite(
                            germinationValue
                        ) &&
                        purityValue > 0 &&
                        germinationValue > 0
                    ) {

                        pls.value =
                            (
                                purityValue *
                                germinationValue /
                                100
                            )
                            .toFixed(1);

                    }


                    calculateAll();

                }
            );

        });


        card.querySelector(
            ".remove-species"
        ).addEventListener(
            "click",
            function () {

                card.remove();

                renumberSpeciesCards();

                calculateAll();

            }
        );

    }


    /* =================================================
       RENUMBER CARDS
    ================================================= */

    function renumberSpeciesCards() {

        const cards =
            document.querySelectorAll(
                ".species-card"
            );


        cards.forEach(
            function (card, index) {

                const number =
                    card.querySelector(
                        ".species-number"
                    );


                number.textContent =
                    `FORAGE ${index + 1}`;

            }
        );

    }


    /* =================================================
       CALCULATE ALL
    ================================================= */

    function calculateAll() {

        const cards =
            document.querySelectorAll(
                ".species-card"
            );


        const targetSeedsPerFt2 =
            Number(
                targetDensityInput.value
            );


        const overage =
            Number(
                overageInput.value
            ) || 0;


        let percentageSum = 0;

        let totalRateLbAc = 0;

        let totalCostAc = 0;


        const rows = [];


        cards.forEach(
            function (card) {

                const species =
                    card.querySelector(
                        ".species-select"
                    ).value;


                const standPercentage =
                    Number(
                        card.querySelector(
                            ".stand-percentage"
                        ).value
                    ) || 0;


                const weight =
                    Number(
                        card.querySelector(
                            ".seed-weight"
                        ).value
                    );


                const coating =
                    Number(
                        card.querySelector(
                            ".coating"
                        ).value
                    ) || 0;


                const pls =
                    Number(
                        card.querySelector(
                            ".pls"
                        ).value
                    );


                const cost =
                    Number(
                        card.querySelector(
                            ".cost"
                        ).value
                    ) || 0;


                percentageSum +=
                    standPercentage;


                if (
                    !species ||
                    !Number.isFinite(weight) ||
                    weight <= 0 ||
                    !Number.isFinite(pls) ||
                    pls <= 0
                ) {

                    updateSpeciesResult(
                        card,
                        null
                    );

                    return;

                }


                /*
                   Base seeds/lb from 1,000-seed weight.

                   seeds/lb =
                   453,592.37 / 1,000-seed weight (g)

                   A coating that increases seed weight
                   reduces seeds/lb accordingly.
                */

                const baseSeedsPerLb =
                    GRAMS_PER_POUND *
                    1000 /
                    weight;


                const adjustedSeedsPerLb =
                    baseSeedsPerLb /
                    (
                        1 +
                        coating / 100
                    );


                /*
                   Fraction of total stand occupied
                   by this species.
                */

                const speciesFraction =
                    standPercentage /
                    100;


                /*
                   PLS is entered as a percentage.
                */

                const plsFraction =
                    pls /
                    100;


                /*
                   Live seed density allocated to species.
                */

                const speciesTargetSeeds =
                    targetSeedsPerFt2 *
                    speciesFraction;


                /*
                   Bulk seeding rate before overage.

                   lbs/ac =
                   target seeds/ft2 ×
                   43,560 /
                   seeds/lb /
                   PLS
                */

                const baseRateLbAc =
                    speciesTargetSeeds *
                    SQFT_PER_ACRE /
                    adjustedSeedsPerLb /
                    plsFraction;


                /*
                   Establishment adjustment.
                */

                const adjustedRateLbAc =
                    baseRateLbAc *
                    (
                        1 +
                        overage / 100
                    );


                const speciesCost =
                    adjustedRateLbAc *
                    cost;


                const adjustedRateKgHa =
                    adjustedRateLbAc *
                    KG_PER_HECTARE_PER_LB_PER_ACRE;


                percentageSum =
                    percentageSum || 0;


                totalRateLbAc +=
                    adjustedRateLbAc;


                totalCostAc +=
                    speciesCost;


                updateSpeciesResult(
                    card,
                    {
                        baseSeedsPerLb:
                            baseSeedsPerLb,

                        adjustedSeedsPerLb:
                            adjustedSeedsPerLb,

                        rateLbAc:
                            adjustedRateLbAc,

                        rateKgHa:
                            adjustedRateKgHa,

                        costAc:
                            speciesCost
                    }
                );


                rows.push({

                    species:
                        species,

                    percentage:
                        standPercentage,

                    seedWeight:
                        weight,

                    pls:
                        pls,

                    rateLbAc:
                        adjustedRateLbAc,

                    rateKgHa:
                        adjustedRateKgHa,

                    costAc:
                        speciesCost

                });

            }
        );


        totalPercentage.textContent =
            `${formatNumber(
                percentageSum,
                1
            )}%`;


        const displayRate =
            unit === "lb-ac"
                ? `${formatNumber(
                    totalRateLbAc,
                    2
                )} lb/ac`
                : `${formatNumber(
                    totalRateLbAc *
                    KG_PER_HECTARE_PER_LB_PER_ACRE,
                    2
                )} kg/ha`;


        totalRate.textContent =
            displayRate;


        totalCost.textContent =
            totalCostAc > 0
                ? `$${formatNumber(
                    totalCostAc,
                    2
                )}/ac`
                : "—";


        renderSummary(
            rows,
            percentageSum,
            totalRateLbAc,
            totalCostAc
        );

    }


    /* =================================================
       UPDATE SPECIES RESULT
    ================================================= */

    function updateSpeciesResult(
        card,
        result
    ) {

        const seedsPerLb =
            card.querySelector(
                ".seeds-per-pound"
            );


        const rate =
            card.querySelector(
                ".species-rate"
            );


        const cost =
            card.querySelector(
                ".species-cost"
            );


        if (!result) {

            seedsPerLb.textContent =
                "—";

            rate.textContent =
                "—";

            cost.textContent =
                "—";

            return;

        }


        seedsPerLb.textContent =
            formatNumber(
                result.adjustedSeedsPerLb,
                0
            );


        rate.textContent =
            unit === "lb-ac"
                ? `${formatNumber(
                    result.rateLbAc,
                    2
                )} lb/ac`
                : `${formatNumber(
                    result.rateKgHa,
                    2
                )} kg/ha`;


        cost.textContent =
            result.costAc > 0
                ? `$${formatNumber(
                    result.costAc,
                    2
                )}/ac`
                : "—";

    }


    /* =================================================
       RENDER SUMMARY
    ================================================= */

    function renderSummary(
        rows,
        percentageSum,
        totalRateLbAc,
        totalCostAc
    ) {

        summaryBody.innerHTML = "";


        if (
            rows.length === 0
        ) {

            summaryBody.innerHTML = `

                <tr>

                    <td colspan="6"
                        class="empty-summary">

                        Add a forage species and select
                        a valid seed-weight value.

                    </td>

                </tr>
            `;

        } else {

            rows.forEach(
                function (row) {

                    const tr =
                        document.createElement(
                            "tr"
                        );


                    const rate =
                        unit === "lb-ac"
                            ? `${formatNumber(
                                row.rateLbAc,
                                2
                            )} lb/ac`
                            : `${formatNumber(
                                row.rateKgHa,
                                2
                            )} kg/ha`;


                    const cost =
                        row.costAc > 0
                            ? `$${formatNumber(
                                row.costAc,
                                2
                            )}`
                            : "—";


                    tr.innerHTML = `

                        <td>
                            ${escapeHtml(
                                row.species
                            )}
                        </td>

                        <td>
                            ${formatNumber(
                                row.percentage,
                                1
                            )}%
                        </td>

                        <td>
                            ${formatNumber(
                                row.seedWeight,
                                2
                            )} g
                        </td>

                        <td>
                            ${formatNumber(
                                row.pls,
                                1
                            )}%
                        </td>

                        <td>
                            ${rate}
                        </td>

                        <td>
                            ${cost}
                        </td>

                    `;


                    summaryBody.appendChild(
                        tr
                    );

                }
            );

        }


        summaryTotalPercent.textContent =
            `${formatNumber(
                percentageSum,
                1
            )}%`;


        summaryTotalRate.textContent =
            unit === "lb-ac"
                ? `${formatNumber(
                    totalRateLbAc,
                    2
                )} lb/ac`
                : `${formatNumber(
                    totalRateLbAc *
                    KG_PER_HECTARE_PER_LB_PER_ACRE,
                    2
                )} kg/ha`;


        summaryTotalCost.textContent =
            totalCostAc > 0
                ? `$${formatNumber(
                    totalCostAc,
                    2
                )}/ac`
                : "—";

    }


    /* =================================================
       ADD FORAGE BUTTON
    ================================================= */

    addForageButton.addEventListener(
        "click",
        function () {

            addSpeciesCard();

        }
    );


    /* =================================================
       TARGET DENSITY / REGION
    ================================================= */

    regionInput.addEventListener(
        "change",
        function () {

            const value =
                regionInput.value;


            if (
                targetDensities[
                    value
                ] !== undefined
            ) {

                targetDensityInput.value =
                    targetDensities[
                        value
                    ];

            }


            calculateAll();

        }
    );


    targetDensityInput.addEventListener(
        "input",
        calculateAll
    );


    overageInput.addEventListener(
        "input",
        calculateAll
    );


    /* =================================================
       UNIT SWITCH
    ================================================= */

    document
        .querySelectorAll(
            ".unit-button"
        )
        .forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    unit =
                        button.dataset.unit;


                    document
                        .querySelectorAll(
                            ".unit-button"
                        )
                        .forEach(
                            function (item) {

                                item.classList.remove(
                                    "active"
                                );

                            }
                        );


                    button.classList.add(
                        "active"
                    );


                    calculateAll();

                }
            );

        });


    /* =================================================
       NUMBER FORMATTING
    ================================================= */

    function formatNumber(
        value,
        decimals
    ) {

        if (
            !Number.isFinite(value)
        ) {

            return "—";

        }


        return value.toLocaleString(
            "en-US",
            {
                minimumFractionDigits:
                    decimals,

                maximumFractionDigits:
                    decimals

            }
        );

    }


    /* =================================================
       HTML ESCAPE
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


    /* =================================================
       INITIAL CALCULATION
    ================================================= */

    /*
       If Excel data is not yet available, the card is still
       displayed. Once the Excel file loads, species options
       are populated automatically.
    */

});
