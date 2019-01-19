#! /usr/bin/env node

import '@babel/polyfill';

import { creator_meta } from './core';

import Commander from 'commander';

import { boot } from './command';


const { meta } = creator_meta;


Commander
    .name( meta.name ).version( meta.version ).description( meta.description )
    .option(
        '-r, --remote <URL>',
        'Git URL of a Remote repository',
        /^(git|https?).+/
    )
    .option(
        '-s, --system <name>',  'Compatible operating systems (comma separated)'
    )
    .parse( process.argv );


boot(
    process.argv[2] || process.cwd(),
    Commander.remote,
    (Commander.system || '').split(',')
);
