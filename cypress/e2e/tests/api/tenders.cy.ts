import Ajv from "ajv";
import addFormats from "ajv-formats";
const tenderUpdateSchema = require("../../../schemas/tenderUpdate.schema.json");
const tenderMapSchema = require("../../../schemas/tenderMap.schema.json");

const ajv = new Ajv({ allErrors: true, strict:false });
addFormats(ajv);


describe("Tender API Endpoints", () => {
    context("GET /tenders/", () => {
        it("should return all of the tenders", () => {
            cy.request({
                method: "GET",
                url: `${Cypress.env("API_BASE_URL")}tenders/`,
                headers: { Accept: "application/json" },
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.be.an("object");
                expect(response.body).to.have.property("tenders").that.is.an("array");

                const validate = ajv.compile(tenderUpdateSchema);

                for (const item of response.body.tenders) {
                    const valid = validate(item);
                    if (!valid) {
                        assert.fail(
                            "Schema validation error: " +
                            JSON.stringify(validate.errors, null, 2)
                        );
                    }
                }
            });
        });

        it("should retrieve tenders filtered by category", () => {
            const categoryName = "Сільськогосподарські";
            const SHOW_ALL_MISMATCHES = false;  // Set to true to see all mismatches, false to fail on the first mismatch

            cy.request({
                method: "GET",
                url: `${Cypress.env("API_BASE_URL")}tenders/`,
                qs: { category: categoryName },
                headers: {
                    Accept: "application/json",
                },
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.be.an("object");
                expect(response.body).to.have.property("tenders").that.is.an("array");

                const tendersList = response.body.tenders;
                const validate = ajv.compile(tenderUpdateSchema);

                if (SHOW_ALL_MISMATCHES) {
                    const mismatches: string[] = [];
                    tendersList.forEach((tender, idx) => {
                        const valid = validate(tender);
                        if (!valid) {
                            mismatches.push(
                                `Schema validation failed for tender at index ${idx}:\n` +
                                JSON.stringify(validate.errors, null, 2)
                            );
                        }
                        if (tender?.category?.name !== categoryName) {
                            mismatches.push(
                                `Tender at index ${idx} has category '${tender?.category?.name}', expected '${categoryName}'`
                            );
                        }
                    });
                    if (mismatches.length > 0) {
                        throw new Error(mismatches.join("\n"));
                    }
                } else {
                    tendersList.forEach((tender, idx) => {
                        const valid = validate(tender);
                        expect(valid, `Schema validation failed for tender at index ${idx}:\n${JSON.stringify(validate.errors, null, 2)}`).to.be.true;
                        expect(tender?.category?.name, `Tender at index ${idx} has category '${tender?.category?.name}', expected '${categoryName}'`).to.eq(categoryName);
                    });
                }
            });
        });
    });

    context("GET /tenders/map/ - Retrieve Tenders for Map", () => {
        it("should successfully retrieve a list of tenders for map (Status 200)", () => {
            cy.request({
                method: "GET",
                url: `${Cypress.env("API_BASE_URL")}tenders/map/`,
                headers: {
                    Accept: "application/json",
                },
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.be.an("object");
                expect(response.body).to.have.property("results").that.is.an("array");

                const mapTendersList = response.body.results;
                const validate = ajv.compile(tenderMapSchema);

                if (mapTendersList.length > 0) {
                    mapTendersList.forEach((tender, idx) => {
                        const valid = validate(tender);
                        expect(valid, `Schema validation failed for tender at index ${idx}:\n${JSON.stringify(validate.errors, null, 2)}`).to.be.true;
                    });
                }
            });
        });
    });
});