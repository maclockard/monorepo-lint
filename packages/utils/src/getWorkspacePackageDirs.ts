import { existsSync } from "fs";
import glob from "glob";
import { join as pathJoin } from "path";
import { PackageJson } from "./PackageJson";
import { readJson } from "./readJson";

export function getWorkspacePackageDirs(workspaceDir: string) {
  const ret: string[] = [];

  const packageJson: PackageJson = readJson(
    pathJoin(workspaceDir, "package.json")
  );

  if (packageJson.workspaces === undefined) {
    throw new Error("Invalid workspaceDir: " + workspaceDir);
  }

  const packageGlobs = Array.isArray(packageJson.workspaces)
    ? packageJson.workspaces
    : packageJson.workspaces.packages || [];

  for (const pattern of packageGlobs) {
    for (const packagePath of glob.sync(pattern, { cwd: workspaceDir })) {
      const packageJsonPath = pathJoin(
        workspaceDir,
        packagePath,
        "package.json"
      );

      if (existsSync(packageJsonPath)) {
        ret.push(packagePath);
      }
    }
  }

  return ret;
}
