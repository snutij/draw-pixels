import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vite-plus/test";
import App from "./App";

afterEach(cleanup);

function getButton(name: string) {
  return screen.getByRole("button", { name: new RegExp(name, "i") });
}

function isActive(button: HTMLElement) {
  return button.classList.contains("active");
}

describe("keyboard mode switching", () => {
  describe("pressing 'e' toggles erase mode", () => {
    it("activates erase mode", async () => {
      const user = userEvent.setup();
      render(<App />);

      await user.keyboard("e");

      expect(isActive(getButton("erase"))).toBe(true);
      expect(isActive(getButton("normal"))).toBe(false);
    });

    it("deactivates erase mode when pressed again", async () => {
      const user = userEvent.setup();
      render(<App />);

      await user.keyboard("e");
      await user.keyboard("e");

      expect(isActive(getButton("erase"))).toBe(false);
      expect(isActive(getButton("normal"))).toBe(true);
    });

    it("deactivates random mode when activating erase", async () => {
      const user = userEvent.setup();
      render(<App />);

      await user.keyboard("r");
      await user.keyboard("e");

      expect(isActive(getButton("erase"))).toBe(true);
      expect(isActive(getButton("random"))).toBe(false);
    });
  });

  describe("pressing 'r' toggles random mode", () => {
    it("activates random mode", async () => {
      const user = userEvent.setup();
      render(<App />);

      await user.keyboard("r");

      expect(isActive(getButton("random"))).toBe(true);
      expect(isActive(getButton("normal"))).toBe(false);
    });

    it("deactivates random mode when pressed again", async () => {
      const user = userEvent.setup();
      render(<App />);

      await user.keyboard("r");
      await user.keyboard("r");

      expect(isActive(getButton("random"))).toBe(false);
      expect(isActive(getButton("normal"))).toBe(true);
    });

    it("deactivates erase mode when activating random", async () => {
      const user = userEvent.setup();
      render(<App />);

      await user.keyboard("e");
      await user.keyboard("r");

      expect(isActive(getButton("random"))).toBe(true);
      expect(isActive(getButton("erase"))).toBe(false);
    });
  });

  describe("pressing 'n' switches to normal mode", () => {
    it("deactivates erase mode", async () => {
      const user = userEvent.setup();
      render(<App />);

      await user.keyboard("e");
      await user.keyboard("n");

      expect(isActive(getButton("erase"))).toBe(false);
      expect(isActive(getButton("normal"))).toBe(true);
    });

    it("deactivates random mode", async () => {
      const user = userEvent.setup();
      render(<App />);

      await user.keyboard("r");
      await user.keyboard("n");

      expect(isActive(getButton("random"))).toBe(false);
      expect(isActive(getButton("normal"))).toBe(true);
    });

    it("stays in normal mode when already normal", async () => {
      const user = userEvent.setup();
      render(<App />);

      await user.keyboard("n");

      expect(isActive(getButton("normal"))).toBe(true);
      expect(isActive(getButton("erase"))).toBe(false);
      expect(isActive(getButton("random"))).toBe(false);
    });
  });

  describe("ignores shortcuts with modifier keys", () => {
    it("ignores Ctrl+e", async () => {
      const user = userEvent.setup();
      render(<App />);

      await user.keyboard("{Control>}e{/Control}");

      expect(isActive(getButton("erase"))).toBe(false);
    });

    it("ignores Alt+r", async () => {
      const user = userEvent.setup();
      render(<App />);

      await user.keyboard("{Alt>}r{/Alt}");

      expect(isActive(getButton("random"))).toBe(false);
    });

    it("ignores Meta+n while in erase mode", async () => {
      const user = userEvent.setup();
      render(<App />);

      await user.keyboard("e");
      await user.keyboard("{Meta>}n{/Meta}");

      expect(isActive(getButton("erase"))).toBe(true);
    });
  });

  describe("ignores shortcuts when input is focused", () => {
    it("does not toggle erase when range slider is focused", async () => {
      const user = userEvent.setup();
      render(<App />);

      screen.getByRole("slider").focus();
      await user.keyboard("e");

      expect(isActive(getButton("erase"))).toBe(false);
    });
  });

  describe("keyboard hints are displayed", () => {
    it("shows kbd elements on mode buttons", () => {
      render(<App />);

      const kbds = document.querySelectorAll(".btn kbd");
      const keys = Array.from(kbds).map((kbd) => kbd.textContent);

      expect(keys).toEqual(["n", "e", "r"]);
    });
  });

  describe("button clicks remain functional", () => {
    it("erase button toggles erase mode", async () => {
      const user = userEvent.setup();
      render(<App />);

      await user.click(getButton("erase"));

      expect(isActive(getButton("erase"))).toBe(true);
      expect(isActive(getButton("normal"))).toBe(false);
    });

    it("random button toggles random mode", async () => {
      const user = userEvent.setup();
      render(<App />);

      await user.click(getButton("random"));

      expect(isActive(getButton("random"))).toBe(true);
      expect(isActive(getButton("normal"))).toBe(false);
    });

    it("normal button returns to normal mode", async () => {
      const user = userEvent.setup();
      render(<App />);

      await user.click(getButton("erase"));
      await user.click(getButton("normal"));

      expect(isActive(getButton("normal"))).toBe(true);
      expect(isActive(getButton("erase"))).toBe(false);
    });
  });
});
