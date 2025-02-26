import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Announcement from "./Announcement";
import "@testing-library/jest-dom";
import fetchMock from "jest-fetch-mock";

// Enable fetch mocking before each test
beforeEach(() => {
  fetchMock.resetMocks();
});

describe("Announcement Component", () => {
  test("renders loading message before data loads", () => {
    fetchMock.mockResponseOnce(JSON.stringify([])); // Mock API response
    render(<Announcement />);
    expect(screen.getByText("Loading announcements...")).toBeInTheDocument();
  });

  test("renders fetched announcements", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify([
        {
          title: "Water Supply Maintenance",
          description: "Scheduled maintenance on 25th Feb.",
          date: "2024-02-25T00:00:00.000Z",
          type: "alert",
        },
      ])
    );

    render(<Announcement />);

    await waitFor(() => {
      expect(screen.getByText("🔔 City Announcements")).toBeInTheDocument();
      expect(screen.getByText("Water Supply Maintenance")).toBeInTheDocument();
      expect(
        screen.getByText(/Scheduled maintenance on 25th Feb/i)
      ).toBeInTheDocument();
      expect(screen.getByText(/📅 2\/25\/2024/)).toBeInTheDocument();
    });
  });

  test("renders no announcements message if API returns empty array", async () => {
    fetchMock.mockResponseOnce(JSON.stringify([]));

    render(<Announcement />);

    await waitFor(() => {
      expect(
        screen.getByText("No announcements available.")
      ).toBeInTheDocument();
    });
  });

  test("handles fetch error gracefully", async () => {
    fetchMock.mockReject(new Error("API Error"));

    render(<Announcement />);

    await waitFor(() => {
      expect(
        screen.getByText("No announcements available.")
      ).toBeInTheDocument();
    });
  });
});
