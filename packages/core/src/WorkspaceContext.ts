/*!
 * Copyright (c) 2018 Eric L Anderson (http://monorepo-lint.com). All Right Reserved.
 *
 * Licensed under the MIT license. See LICENSE file in the project root for details.
 *
 */

import { getWorkspacePackageDirs } from "@monorepo-lint/utils";
import { Context } from "./Context";
import { MonorepoLintConfig } from "./MonorepoLintConfig";
import { PackageContext } from "./PackageContext";

// Right now, this stuff is done serially so we are writing less code to support that. Later we may want to redo this.
export class WorkspaceContext extends PackageContext {
  constructor(packageDir: string, opts: MonorepoLintConfig, parent?: Context) {
    super(packageDir, opts, parent);
  }

  public getWorkspacePackageDirs() {
    return getWorkspacePackageDirs(this.packageDir);
  }

  public createChildContext(dir: string) {
    return new PackageContext(dir, this.opts, this);
  }
}
