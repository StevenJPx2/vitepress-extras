import { expect, it, describe } from "vitest";
import { generateSidebar } from "../src";

describe("vitepress-extras", () => {
  it("no options", () => {
    expect(generateSidebar({ rootPath: "test" })).toStrictEqual([
      {
        text: "docs-test",
        link: "docs-test/",
        items: [
          {
            text: "guide",
            items: [
              {
                text: "get-started",
                link: "docs-test/guide/get-started",
              },
              {
                text: "development",
                link: "docs-test/guide/development",
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
    expect(
      generateSidebar({ rootPath: "test", leafFile: "README" }),
    ).toStrictEqual([
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
                link: "docs-test/guide/get-started",
              },
              {
                text: "development",
                link: "docs-test/guide/development",
              },
            ],
          },
        ],
      },
    ]);
  });

  it("leading path", () => {
    expect(
      generateSidebar({ rootPath: "test", leadingPath: "root/" }),
    ).toStrictEqual([
      {
        text: "docs-test",
        link: "root/docs-test/",
        items: [
          {
            text: "guide",
            items: [
              {
                text: "get-started",
                link: "root/docs-test/guide/get-started",
              },
              {
                text: "development",
                link: "root/docs-test/guide/development",
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

  it("content path", () => {
    expect(
      generateSidebar({
        rootPath: "test/docs-test",
        contentPath: "/guide",
        leadingPath: "docs-test/",
      }),
    ).toStrictEqual([
      {
        text: "guide",
        items: [
          {
            text: "get-started",
            link: "docs-test/guide/get-started",
          },
          {
            text: "development",
            link: "docs-test/guide/development",
          },
          {
            text: "README",
            link: "docs-test/guide/README",
          },
        ],
      },
    ]);
  });

  it("depth to be 2", () => {
    expect(generateSidebar({ rootPath: "test", depth: 2 })).toStrictEqual([
      {
        text: "docs-test",
        link: "docs-test/",
        items: [],
      },
    ]);
  });

  it("no ignore list", () => {
    expect(generateSidebar({ rootPath: "test", ignore: [] })).toStrictEqual([
      {
        text: "docs-test",
        link: "docs-test/",
        items: [
          { link: "docs-test/_ignore", text: "_ignore" },
          {
            text: "guide",
            items: [
              {
                text: "get-started",
                link: "docs-test/guide/get-started",
              },
              {
                text: "development",
                link: "docs-test/guide/development",
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
});
