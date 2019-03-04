#! /usr/bin/env node

import '@babel/polyfill';

import { _meta_ } from './core';

import Commander from 'commander';

import { boot } from './command';


Commander
    .name( _meta_.name )
    .version( _meta_.version )
    .description( _meta_.description )
    .usage('[path] [options]')
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
