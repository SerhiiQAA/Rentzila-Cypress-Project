class Map {
  elements = {
    multipleTendersBadgeOnMap: () => cy.get(".leaflet-interactive div span"),
    singleTendersBadgeOnMap: () =>
      cy.get("img.leaflet-zoom-animated"),
    zoomInBtn: () => cy.get(".leaflet-control-zoom-in"),
    zoomOutBtn: () => cy.get(".leaflet-control-zoom-out"),
        mylocationBtn: () => cy.get(".leaflet-control-zoom-out"),
        regionLocatorOnMap: () => cy.get(".leaflet-interactive"),
  };

  clickMultipleTendersBadgeOnMap() {
    this.elements.multipleTendersBadgeOnMap().click();
  }

  clickSingleTendersBadgeOnMap() {
    this.elements.singleTendersBadgeOnMap().click();
  }

  clickZoomInBtn() {
    this.elements.zoomInBtn().click();
  }

  clickZoomOutBtn() {
    this.elements.zoomOutBtn().click();
  }

  clickMylocationBtn() {
    this.elements.mylocationBtn().click();
  }
}

export default new Map();