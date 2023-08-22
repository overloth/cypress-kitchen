const navbarText = Cypress.env("navbarText");
const token = "abcd12345";
context("My first test", () => {
  beforeEach(() => {
    cy.visit("/commands/actions");
  });

  it("triggers a popover on click", () => {
    cy.get(".action-btn").click();
    cy.findByText("This popover shows up on click").should("be.visible");
  });

  it("can click on diferent section of action canvas", () => {
    cy.get("#action-canvas").click("top");
    cy.get("#action-canvas").click("bottomRight");
    cy.get("#action-canvas").click(80, 100);
  });

  it("can double click to edit", () => {
    cy.get(".action-div").dblclick().should("not.be.visible");
    cy.get(".action-input-hidden").should("be.visible");
  });

  it("can right click to edit", () => {
    cy.get(".rightclick-action-div").rightclick().should("not.be.visible");
    cy.get(".rightclick-action-input-hidden").should("be.visible");
  });

  it("shows the nav links on hover", () => {
    cy.get(".dropdown-toggle").trigger("mouseover");
    cy.get(".dropdown-menu").should("be.visible");
  });

  it("sets and gets token from local storage", () => {
    cy.setLocalStorage("token", token);
    cy.getLocalStorage("token").should("eq", token);
  });

  it("overloads the type command by using sensitive characters", () => {
    cy.visit("/commands/actions");
    cy.findByPlaceholderText("Email").type("email@test.com");
    cy.findByPlaceholderText("Email").type("email@test.com", {
      sensitive: true,
    });
  });

  it("uses fixture data in network request", function () {
    cy.visit("/commands/network-requests");
    cy.intercept("GET", "**/comments/*", this.data).as("getComment");
    cy.get(".network-btn").click();
    cy.wait("@getComment").then((res) => {
      cy.log("response: ", res);
    });
  });

  it("pulls data from the fixture", () => {
    cy.fixture("example").then((data) => {
      cy.log(data);
    });
  });

  it("updates fixure data inline", () => {
    cy.fixture("example").then((data) => {
      data.email = "updated@mail.com";
      cy.log("updated: ", data);
    });
  });
  before(() => {
    cy.request("https://api.spacexdata.com/v3/missions")
      .its("body")
      .should("have.length", 10);
  });

  afterEach(() => {
    cy.log("after each hook is here");
  });

  after(() => {
    cy.log("the final after hook runs once");
  });

  it("has an h1 on the page", () => {
    cy.get("h1").should("exist");
  });

  it("renders the correct h1 text", () => {
    cy.get("h1").should("contain.text", "Actions");
  });

  it("has an h1 on page", () => {
    cy.get("h1").should("exist");
  });

  it("renders correct h1 text", () => {
    cy.get("h1").should("contain.text", "Actions");
  });

  it("renders a paragraph under the h1", () => {
    cy.get(".container").eq(1).find("p").should("exist");
  });

  it("renders a section with correct elemnts", () => {
    cy.get(".container")
      .eq(2)
      .within(() => {
        cy.get("h4").should("exist");
        cy.get("p").should("exist");
      });
  });

  it("correctly renders the cypress website link", () => {
    cy.findByText(navbarText).should("exist");
  });

  it("types into email fields", () => {
    cy.visit("/commands/actions");
    cy.findByPlaceholderText("Email").type("email@test.com");
    /* eslint-disable cypress/no-unnecessary-waiting */
    cy.wait(2000).then(() => {
      console.log("e ovo je posle testa");
      fetch("https://api.spacexdata.com/v3/missions")
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
    });
    /* eslint-enable cypress/no-unnecessary-waiting */
  });

  it("shows an active class for the current page", () => {
    cy.visit("/commands/actions");
    cy.get(".dropdown-menu").find("li").eq(2).should("have.class", "active");
  });

  it("should not have active clas on inactive pages", () => {
    cy.visit("/commands/actions");
    cy.get(".dropdown-menu")
      .find("li")
      .first()
      .should("not.have.class", "active")
      .find("a")
      .should("have.attr", "href", "/commands/querying");
  });

  it("links to the actions page correctly", () => {
    cy.visit("/");
    cy.findAllByText("Actions").first().click({ force: true });
    cy.url().should("include", "commands/actions");
  });

  it("lets you type in a input field", () => {
    cy.visit("/commands/actions");
    cy.findByPlaceholderText("Email").type("Test").should("have.value", "Test");
  });

  it("lets you clear the input field", () => {
    cy.visit("/commands/actions");
    cy.findByLabelText("Describe:")
      .type("Test description")
      .should("have.value", "Test description")
      .clear()
      .should("have.value", "");
  });

  it("lets check a checkbox", () => {
    cy.visit("/commands/actions");
    cy.get('.action-checkboxes [type="checkbox"]')
      .eq(1)
      .check({ force: true })
      .should("be.checked");
  });
});
