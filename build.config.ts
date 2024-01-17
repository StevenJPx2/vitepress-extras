import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  rollup: { dts: { respectExternal: false } },
  failOnWarn: false,
});
