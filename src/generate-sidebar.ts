import fs from "fast-glob";
import { join, resolve, sep } from "pathe";
import { capitalize } from "string-ts";
import { withoutLeadingSlash, withoutTrailingSlash } from "ufo";
import { type DefaultTheme } from "vitepress";

const withoutLeadingAndTrailingSlash = (path: string) =>
  withoutLeadingSlash(withoutTrailingSlash(path));

/**
 * Generates a sidebar for vitepress based on the files in the rootPath
 */
export const generateSidebar = (options: {
  /**
   * The path to the folder containing the files
   */
  rootPath: string;
  /**
   * The path to generate the sidebar for
   * @default "."
   */
  contentPath?: string;
  /**
   * The path to prepend for the url
   * @default ""
   */
  leadingPath?: string;
  /**
   * The name of the file you want to end it at
   * @default "index"
   */
  leafFile?: string;
  /**
   * A function to transform the name of the file
   * @default (val) => val
   */
  transformName?: (fileName: string, filePath: string) => string;
  /**
   * A function to transform the path of the file
   * @default (path, name) => join(path, name)
   */
  transformPath?: (filePath: string, fileName: string) => string;
  /**
   * The depth to search for files
   * @default Number.POSITIVE_INFINITY
   */
  depth?: number;
}): DefaultTheme.SidebarItem[] => {
  const {
    rootPath,
    contentPath = ".",
    leadingPath = "",
    transformName = (val) => val,
    transformPath = (path, name) => join(path, name),
    leafFile = "index",
    depth = Number.POSITIVE_INFINITY,
  } = options;

  const normalizedContentPath = withoutLeadingAndTrailingSlash(contentPath);

  const sidebar: DefaultTheme.SidebarItem[] = [];
  const files = fs
    .globSync(`${normalizedContentPath}/**/*.md`, {
      cwd: resolve(rootPath),
      deep: depth,
      objectMode: true,
      baseNameMatch: true,
    })
    .map((val) => ({
      name: val.name.replace(".md", ""),
      path: withoutLeadingAndTrailingSlash(val.path)
        .split(sep)
        .slice(0, -1)
        .join(sep),
    }))
    .sort((a, b) => a.name.localeCompare(b.name))
    .sort(
      (a, b) => a.path.length - b.path.length - (a.name === leafFile ? 1 : 0),
      // sort by path length (shorter first), but put the leaf file at the start
    );

  const filesRemap: DefaultTheme.SidebarItem[] = files.map(({ name, path }) => {
    const parentPath = path.split(sep);
    const parentName =
      parentPath.at(-1) ||
      capitalize(withoutLeadingAndTrailingSlash(leadingPath));

    const transformNormalizedName = (name: string) => {
      const normalizedName = name.replace(/^\d+\./g, "").trim();
      return transformName(normalizedName, path);
    };

    // TODO: refactor this to use a for loop
    // eslint-disable-next-line unicorn/no-array-reduce
    return parentPath.reduceRight((acc, curr, index, arr) => {
      if (index === arr.length - 1) {
        if (name === leafFile) {
          return {
            text: transformNormalizedName(parentName),
            link: join(leadingPath, transformPath(path, ""), sep),
            items: [],
          };
        }
        return {
          text: transformNormalizedName(parentName),
          items: [
            {
              text: transformNormalizedName(name),
              link: join(leadingPath, transformPath(path, name)),
            },
          ],
        };
      }

      return { text: transformNormalizedName(curr), items: [acc] };
    }, {} as DefaultTheme.SidebarItem);
  });

  for (const file of filesRemap) {
    let tmpFile = file;
    let current = sidebar;
    while (current.length > 0) {
      const items = current.find((val) => val.text === tmpFile.text)?.items;

      if (!items) {
        break;
      }

      current = items;

      if (
        "items" in tmpFile &&
        Array.isArray(tmpFile.items) &&
        tmpFile.items.length > 0
      ) {
        tmpFile = tmpFile.items[0];
      }
    }

    if (current) {
      current.push(tmpFile);
    } else {
      sidebar.push(tmpFile);
    }
  }

  return sidebar;
};
