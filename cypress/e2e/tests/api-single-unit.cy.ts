describe("GET /api/units/{id} - Get Single Unit", () => {

  it("should successfully fetch a single unit by ID", () => {
    let id = 16524;
    cy.request("GET", `api/units/${id}/`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("id", id);
    });
  });

  it("response for non-existent unit", () => {
    let id = 999999;
    cy.request({
      method: "GET",
      url: `api/units/${id}/`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.eq("The unit with this id does not exist");
    });
  });

  it("should return 400 for invalid unit ID format", () => {
    let id = "invalid-id";
    cy.request({
      method: "GET",
      url: `api/units/${id}/`,
      failOnStatusCode: false,
    }).then((response) => {
      expect([400, 404]).to.include(response.status);
    });
  });

  it("should handle server errors gracefully", () => {
    cy.request({
      method: "GET",
      url: "/api/invalid-endpoint/",
      failOnStatusCode: false,
    }).then((response) => {
      expect([404, 500]).to.include(response.status);
    });
  });
  
});

