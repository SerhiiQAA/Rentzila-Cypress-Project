class Map {
  elements = {
    multipleTendersBadgeOnMap: () => cy.get(".leaflet-interactive div span"),
    singleTendersBadgeOnMap: () =>
      cy.get("div.leaflet-marker-pane .leaflet-interactive").eq(1),
  };

  clickMultipleTendersBadgeOnMap() {
    this.elements.multipleTendersBadgeOnMap().click();
  }

  clickSingleTendersBadgeOnMap() {
    this.elements.singleTendersBadgeOnMap().click();
  }
}

export default new Map();