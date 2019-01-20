import { step, spawn } from '@tech_query/node-toolkit';

import { bootGit, setRoot } from './core';

import { join } from 'path';

import { ensureDirSync } from 'fs-extra';


/**
 * @param {String}     cwd         - Project path
 * @param {String|URL} [remote]    - URL of Git repository
 * @param {String[]}   [system=[]] - https://docs.npmjs.com/files/package.json#os
 */
export  async function boot(cwd,  remote,  system = []) {

    var meta,  child_option = {stdio: 'inherit', cwd};

    await step('Git repository & NPM package',  async () => {

        meta = await setRoot(cwd,  await bootGit(cwd, remote),  system);

        await spawn('npm',  ['init', '-y'],  child_option);
    });

    await step(
        'NPM dependency',  spawn.bind(null, 'npm', ['install'], child_option)
    );

    for (let key in meta.directories)
        ensureDirSync( join(cwd, meta.directories[key]) );
}
