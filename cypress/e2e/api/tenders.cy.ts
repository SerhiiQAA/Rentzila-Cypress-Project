describe("Public Tenders List API Endpoints", () => {
  context("GET /tenders/ - Retrieve list of all Tenders", () => {
    it("should successfully retrieve a list of all tenders (Status 200) without filters", () => {
      cy.request({
        method: "GET",
        url: `${Cypress.env("API_BASE_URL")}tenders/`,
        headers: {
          Accept: "application/json",
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an("object");
        expect(response.body).to.have.property("tenders");
        expect(response.body.tenders).to.be.an("array");
        const tendersList = response.body.tenders;
        if (tendersList.length > 0) {
          tendersList.forEach((tender) => {
            expect(tender).to.be.an("object");
            expect(tender).to.have.all.keys(
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
              "tender_file",
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
              "is_disput"
            );
          });
        }
      });
    });

    it("should retrieve tenders filtered by category", () => {
      const categoryName = "Сільськогосподарські";
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
        expect(response.body).to.have.property("tenders");
        expect(response.body.tenders).to.be.an("array");
        const tendersList = response.body.tenders;
        tendersList.forEach((tender) => {
          expect(tender.category.name).to.eq(categoryName);
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
          const mapTendersList = response.body.results;
          if (mapTendersList.length > 0) {
            mapTendersList.forEach((tender) => {
              expect(tender).to.be.an("object");
              expect(tender).to.have.all.keys(
                "id",
                "lat",
                "lng",
                "city",
                "state",
                "country",
                "name",
                "services",
                "start_price",
                "start_propose_date",
                "start_tender_date",
                "type_of_work",
                "end_tender_date",
                "end_propose_date",
                "currency",
                "amount_of_props",
                "category",
                "customer"
              );
            });
          }
        });
      });
    });
  });
});