describe("Remove Background", () => {
  it("should read Files", async () => {
    cy.visit("https://onlinepngtools.com/create-transparent-png");
    //cy.task("files");
    cy.fixture("/imgs/files.json").then((json) => {
      console.log(json);
      json.map((obj) => {
        console.log(obj);
        cy.contains(" drag and drop").attachFile(`/imgs/${obj.file}`, {
          subjectType: "drag-n-drop",
        });
        cy.get(
          '.output > .side-box > .side-widgets > .side-widgets-wrapper > [data-toggle="toggle-save-as"]'
        ).click();
        cy.get(
          ".output > .side-box > .side-widgets > .side-widgets-toggle > .toggle-wrapper > .toggle-save-as > .widget-save-as"
        ).click();
        cy.wait(9000);
        cy.task("fileRename", {
          oldName: "output-onlinepngtools.png",
          newName: obj.file,
        });
      });
    });

    // cy.fixture("/imgs/files.json").then((json) => {
    //   console.log(json);
    //   json.map((obj) => {
    //     console.log(obj);
    //     cy.visit("https://www.remove.bg/");
    //     cy.contains("Upload Image").attachFile(`/imgs/${obj.file}`, {
    //       subjectType: "drag-n-drop",
    //     });
    //     cy.wait(5000);
    //   });
    // });
  });
});
