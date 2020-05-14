import { SpawnOptions } from 'child_process';
import { step, spawn } from '@tech_query/node-toolkit';
import { join } from 'path';
import { ensureDirSync } from 'fs-extra';

import { bootGit, setRoot } from './core';

export async function boot(
    project_path: string,
    remote?: string | URL,
    system: NodeJS.Platform[] = []
) {
    let meta: Record<string, any>;
    const child_option: SpawnOptions = { stdio: 'inherit', cwd: project_path };

    await step('Git repository & NPM package', async () => {
        meta = await setRoot(
            project_path,
            await bootGit(project_path, remote),
            system
        );
        await spawn('npm', ['init', '-y'], child_option);
    });

    await step('NPM dependency', () => spawn('npm', ['install'], child_option));

    for (const key in meta.directories)
        ensureDirSync(join(project_path, meta.directories[key]));
}
