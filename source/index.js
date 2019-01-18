#! /usr/bin/env node

import '@babel/polyfill';

import { creator_meta, setRoot } from './core';

import Commander from 'commander';

import { bootGit, spawnSync } from './core';


const { meta } = creator_meta;


Commander
    .name( meta.name ).version( meta.version ).description( meta.description )
    .option(
        '-r, --remote <URL>',
        'Git URL of a Remote repository',
        /^(git|https?).+/
    )
    .parse( process.argv );


const cwd = process.argv[2] || process.cwd();

(async () => {

    await setRoot(cwd,  await bootGit(cwd, Commander.remote));

    spawnSync('npm',  ['init', '-y'],  {stdio: 'inherit', cwd});
})();
