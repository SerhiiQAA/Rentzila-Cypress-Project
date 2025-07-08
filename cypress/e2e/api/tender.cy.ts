describe("Tender API Endpoints - Status 200 & Keys Presence", () => {
  context("GET /tender/attachment-file/", () => {
    it("should successfully retrieve a list of attachment files (Status 200) and ensure all expected keys are present", () => {
      cy.request({
        method: "GET",
        url: `${Cypress.env("API_BASE_URL")}tender/attachment-file/`,
        headers: {
          Accept: "application/json",
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an("array");
        if (response.body.length > 0) {
          response.body.forEach((item) => {
            expect(item).to.have.all.keys(
              "id",
              "name",
              "tender",
              "propose",
              "attachment_file",
              "date_created"
            );
          });
        }
      });
    });
  });

  context("GET /tender/attachment-file/{id}/", () => {
    const TEST_ATTACHMENT_FILE_ID = 510;
    it("should successfully retrieve a single attachment file by ID (Status 200) and ensure all expected keys are present", () => {
      cy.request({
        method: "GET",
        url: `${Cypress.env(
          "API_BASE_URL"
        )}tender/attachment-file/${TEST_ATTACHMENT_FILE_ID}/`,
        headers: {
          Accept: "application/json",
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an("object");
        expect(response.body).to.have.all.keys(
          "id",
          "name",
          "tender",
          "propose",
          "attachment_file",
          "date_created"
        );
        expect(response.body.id).to.eq(TEST_ATTACHMENT_FILE_ID);
      });
    });
  });

  context("GET /tender/attachment-file/{id}/download/", () => {
    const TEST_ATTACHMENT_FILE_ID_FOR_DOWNLOAD = 516;
    it("should successfully download the attachment file (Status 200) and validate headers", () => {
      cy.request({
        method: "GET",
        url: `${Cypress.env(
          "API_BASE_URL"
        )}tender/attachment-file/${TEST_ATTACHMENT_FILE_ID_FOR_DOWNLOAD}/download/`,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.headers["content-type"]).to.include("application/jpeg");
        expect(response.headers["content-disposition"]).to.include(
          "filename=patron.jpg"
        );
        expect(response.body).to.not.be.empty;
      });
    });
  });

  context("GET /tender/closed/", () => {
    it("should successfully retrieve a list of closed tenders (Status 200)", () => {
      cy.request({
        method: "GET",
        url: `${Cypress.env("API_BASE_URL")}tender/closed/`,
        headers: {
          Accept: "application/json",
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an("array");
        if (response.body.length > 0) {
          response.body.forEach((tender) => {
            expect(tender).to.have.all.keys(
              "id",
              "name",
              "description",
              "slug",
              "lat",
              "lng",
              "city",
              "state",
              "country",
              "amount_of_work",
              "start_price",
              "currency",
              "payment_method",
              "type_of_work",
              "time_of_work",
              "amount_of_props",
              "close_request",
              "close_reason",
              "start_propose_date",
              "end_propose_date",
              "start_tender_date",
              "end_tender_date",
              "date_created",
              "date_updated",
              "date_closed",
              "is_closed_successfully",
              "first_name",
              "last_name",
              "middle_name",
              "phone",
              "is_moderated",
              "is_closed",
              "is_disput",
              "customer",
              "executor",
              "category",
              "services"
            );
          });
        }
      });
    });
  });

  context("GET /tender/history/", () => {
    it("should successfully retrieve a list of authenticated user`s closed tenders (Status 200)", () => {
      cy.request({
        method: "GET",
        url: `${Cypress.env("API_BASE_URL")}tender/history/`,
        headers: {
          Accept: "application/json",
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an("array");
        if (response.body.length > 0) {
          response.body.forEach((tender) => {
            expect(tender).to.have.all.keys(
              "id",
              "name",
              "description",
              "slug",
              "lat",
              "lng",
              "city",
              "state",
              "country",
              "amount_of_work",
              "start_price",
              "currency",
              "payment_method",
              "type_of_work",
              "time_of_work",
              "amount_of_props",
              "close_request",
              "close_reason",
              "start_propose_date",
              "end_propose_date",
              "start_tender_date",
              "end_tender_date",
              "date_created",
              "date_updated",
              "date_closed",
              "is_closed_successfully",
              "first_name",
              "last_name",
              "middle_name",
              "phone",
              "is_moderated",
              "is_closed",
              "is_disput",
              "customer",
              "executor",
              "category",
              "services"
            );
          });
        }
      });
    });
  });

  context("GET /tender/{id}/", () => {
    const EXISTING_TENDER_ID = 550;
    it("should successfully retrieve a single tender by existing ID (Status 200)", () => {
      cy.request({
        method: "GET",
        url: `${Cypress.env("API_BASE_URL")}tender/${EXISTING_TENDER_ID}/`,
        headers: {
          Accept: "application/json",
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an("object");
        expect(response.body.id).to.eq(EXISTING_TENDER_ID);
        expect(response.body).to.have.keys(
          "id",
          "name",
          "slug",
          "description",
          "customer",
          "executor",
          "city",
          "state",
          "country",
          "category",
          "services",
          "amount_of_work",
          "start_price",
          "currency",
          "payment_method",
          "type_of_work",
          "time_of_work",
          "amount_of_props",
          "lat",
          "lng",
          "start_propose_date",
          "end_propose_date",
          "start_tender_date",
          "end_tender_date",
          "date_created",
          "date_updated",
          "date_closed",
          "is_closed_successfully",
          "close_request",
          "close_reason",
          "first_name",
          "last_name",
          "phone",
          "is_moderated",
          "is_closed",
          "is_disput",
          "tender_file"
        );
        expect(response.body.customer).to.be.an("object");
        expect(response.body.customer).to.have.keys(
          "id",
          "avatar",
          "first_name",
          "last_name",
          "middle_name",
          "phone",
          "email",
          "telegram",
          "viber",
          "country",
          "city",
          "street",
          "region",
          "house",
          "edrpou",
          "inn",
          "company_name",
          "rating",
          "type_of",
          "type_legal",
          "telegram_chat_id",
          "is_phone_verified",
          "postcode",
          "is_email_verified",
          "coins",
          "amount_reviews"
        );
        expect(response.body.category).to.be.an("object");
        expect(response.body.category).to.have.keys("id", "name");
        expect(response.body.services).to.be.an("array");
        if (response.body.services.length > 0) {
          expect(response.body.services[0]).to.have.keys(
            "id",
            "name",
            "image",
            "category"
          );
          expect(response.body.services[0].category).to.be.an("array");
          expect(response.body.services[0].category[0]).to.be.a("number");
        }
      });
    });
  });
});
