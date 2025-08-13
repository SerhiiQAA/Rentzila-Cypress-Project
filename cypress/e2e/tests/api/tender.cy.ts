import Ajv from "ajv";
import addFormats from "ajv-formats";
const tenderAttachmentSchema = require("../../../schemas/tenderAttachmentFile.schema.json");
const tenderUpdateSchema = require("../../../schemas/tenderUpdate.schema.json");
const tenderSingleSchema = require("../../../schemas/tenderSingle.schema.json");

const ajv = new Ajv({ allErrors: true, strict:false });
addFormats(ajv);

describe("Tender API Endpoints", () => {
    context("GET /tender/attachment-file/", () => {
        it("should return a valid list of attachment files", () => {
            cy.request({
                method: "GET",
                url: `${Cypress.env("API_BASE_URL")}tender/attachment-file/`,
                headers: { Accept: "application/json" },
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.be.an("array");

                const validate = ajv.compile(tenderAttachmentSchema);
                
                response.body.forEach((item) => {
                    const valid = validate(item);
                    if (!valid) {
                        throw new Error("Schema validation error: " + JSON.stringify(validate.errors, null, 2));
                    }
                });
            });
        });
    })

    context("GET /tender/attachment-file/{id}/", () => {
        const TEST_ATTACHMENT_FILE_ID = 510;
        it("should successfully retrieve a single attachment file by ID and validate schema", () => {
            cy.request({
                method: "GET",
                url: `${Cypress.env("API_BASE_URL")}tender/attachment-file/${TEST_ATTACHMENT_FILE_ID}/`,
                headers: { Accept: "application/json" },
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.be.an("object");

                const validate = ajv.compile(tenderAttachmentSchema);

                const valid = validate(response.body);
                if (!valid) {
                    throw new Error("Schema validation error: " + JSON.stringify(validate.errors, null, 2));
                }

                expect(response.body.id).to.eq(TEST_ATTACHMENT_FILE_ID);
            });
        });
    });

    context("GET /tender/attachment-file/{id}/download/", () => {
        const TEST_ATTACHMENT_FILE_ID_FOR_DOWNLOAD = 516;
        it("should successfully download the attachment file and validate response headers", () => {
            cy.request({
                method: "GET",
                url: `${Cypress.env("API_BASE_URL")}tender/attachment-file/${TEST_ATTACHMENT_FILE_ID_FOR_DOWNLOAD}/download/`,
                encoding: "binary",
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status, "Status code").to.eq(200);
                expect(response.headers["content-type"], "Content-Type header").to.include("application/jpeg");
                expect(
                    response.headers["content-disposition"],
                    "Content-Disposition header"
                ).to.include("filename=patron.jpg");

                expect(response.body.length, "Response body length").to.be.greaterThan(0);
            });
        });
    });

    context("GET /tender/closed/", () => {
        it("should successfully retrieve a list of closed tenders (Status 200)", () => {
            cy.request({
                method: "GET",
                url: `${Cypress.env("API_BASE_URL")}tender/closed/`,
                headers: { Accept: "application/json" },
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.be.an("array");

                if (response.body.length > 0) {
                    const validate = ajv.compile(tenderUpdateSchema);

                    response.body.forEach((tender, index) => {
                        const valid = validate(tender);

                        if (!valid) {
                            throw new Error(
                            `Schema validation failed for tender at index ${index}:\n${ajv.errorsText(validate.errors, { separator: "\n" })}`
                            );
                        }
                    });
                }
            });
        });
    });

    context("GET /tender/history/", () => {
        it("should successfully retrieve a list of authenticated user's closed tenders", () => {
            cy.request({
                method: "GET",
                url: `${Cypress.env("API_BASE_URL")}tender/history/`,
                headers: { Accept: "application/json" },
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.be.an("array");

                if (response.body.length > 0) {
                    const validate = ajv.compile(tenderUpdateSchema);
                    response.body.forEach((tender, index) => {
                        const valid = validate(tender);
                        if (!valid) {
                            throw new Error(
                            `Schema validation failed for tender at index ${index}:\n${ajv.errorsText(validate.errors, { separator: "\n" })}`
                            );
                        }
                    });
                }
            });
        });
    });

    context("GET /tender/{id}/", () => {
        const EXISTING_TENDER_ID = 550;
        it("should successfully retrieve a single tender by ID", () => {
            cy.request({
                method: "GET",
                url: `${Cypress.env("API_BASE_URL")}tender/${EXISTING_TENDER_ID}/`,
                headers: { Accept: "application/json" },
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.be.an("object");
                expect(response.body.id).to.eq(EXISTING_TENDER_ID);

                const validateTenderSingle = ajv.compile(tenderSingleSchema);
                const valid = validateTenderSingle(response.body);
                if (!valid) {
                    throw new Error(
                    `Schema validation failed:\n${ajv.errorsText(validateTenderSingle.errors, { separator: "\n" })}`
                    );
                }
            });
        });
    });
})