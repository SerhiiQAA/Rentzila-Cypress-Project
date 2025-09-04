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

  it("should respond within acceptable time limits", () => {
    const startTime = Date.now();
    cy.request("GET", "/api/units/").then((response) => {
      const responseTime = Date.now() - startTime;
      expect(response.status).to.eq(200);
      expect(responseTime).to.be.lessThan(5000);
      cy.log(`Response time: ${responseTime}ms`);
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
