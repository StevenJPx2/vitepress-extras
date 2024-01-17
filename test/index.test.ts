import { expect, it, describe } from "vitest";
import { generateSidebar } from "../src";

describe("vitepress-extras", () => {
  it("no options", () => {
    expect(generateSidebar("test")).toStrictEqual([
      {
        text: "docs-test",
        link: "docs-test/",
        items: [
          {
            text: "guide",
            items: [
              {
                text: "get-started",
                link: "docs-test/guide/1.get-started",
              },
              {
                text: "development",
                link: "docs-test/guide/2.development",
              },
              {
                text: "README",
                link: "docs-test/guide/README",
              },
            ],
          },
        ],
      },
    ]);
  });

  it("README as leaf", () => {
    expect(generateSidebar("test", { leafFile: "README" })).toStrictEqual([
      {
        text: "docs-test",
        items: [
          { text: "index", link: "docs-test/index" },
          {
            text: "guide",
            link: "docs-test/guide/",
            items: [
              {
                text: "get-started",
                link: "docs-test/guide/1.get-started",
              },
              {
                text: "development",
                link: "docs-test/guide/2.development",
              },
            ],
          },
        ],
      },
    ]);
  });

  it("leading path", () => {
    expect(generateSidebar("test", { leadingPath: "root/" })).toStrictEqual([
      {
        text: "docs-test",
        link: "root/docs-test/",
        items: [
          {
            text: "guide",
            items: [
              {
                text: "get-started",
                link: "root/docs-test/guide/1.get-started",
              },
              {
                text: "development",
                link: "root/docs-test/guide/2.development",
              },
              {
                text: "README",
                link: "root/docs-test/guide/README",
              },
            ],
          },
        ],
      },
    ]);
  });

  it("depth to be 2", () => {
    expect(generateSidebar("test", { depth: 2 })).toStrictEqual([
      {
        text: "docs-test",
        link: "docs-test/",
        items: [],
      },
    ]);
  });
});
