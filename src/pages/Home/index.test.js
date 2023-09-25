import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Home from "./index";

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );

      // Attendez que le texte "En cours" apparaisse
      await waitFor(() => {
        expect(screen.getByText("En cours")).toBeInTheDocument();
      });

      // Attendez que le texte "Message envoyé !" apparaisse
      await waitFor(() => {
        expect(screen.getByText("Message envoyé !")).toBeInTheDocument();
      });
    });
  });
});
