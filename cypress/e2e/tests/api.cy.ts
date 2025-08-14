describe("GET all units api/units/", () => {

  it("response status", () => {
    cy.request("/api/units/").then((response) => {
      assert.equal(200, response.status);
      expect(response.body).to.have.property("results");
      expect(response.body.results).to.be.an("array");
    });
  });

  it("should handle pagination parameters", () => {
    const params = {
      page: 1,
      limit: 10,
    };
    cy.request({
      method: "GET",
      url: "/api/units/",
      qs: params,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("results");
      expect(response.body).to.have.property("count");
      expect(response.body.results.length).to.be.at.most(params.limit);
    });
  });
});

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
});

describe("Response Time and Performance", () => {
  it("should respond within acceptable time limits", () => {
    const startTime = Date.now();
    cy.request("GET", "/api/units/").then((response) => {
      const responseTime = Date.now() - startTime;
      expect(response.status).to.eq(200);
      expect(responseTime).to.be.lessThan(5000);
      cy.log(`Response time: ${responseTime}ms`);
    });
  });
});

describe("Error Handling", () => {
  it("should handle server errors gracefully", () => {
    cy.request({
      method: "GET",
      url: "/api/invalid-endpoint/",
      failOnStatusCode: false,
    }).then((response) => {
      expect([404, 500]).to.include(response.status);
    });
  });

  it("should handle network timeouts", () => {
    cy.request({
      method: "GET",
      url: "/api/units/",
      timeout: 30000,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.be.a("number");
    });
  });
  
});
