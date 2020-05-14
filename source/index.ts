#! /usr/bin/env node

import Commander from 'commander';

import { meta } from './core';
import { boot } from './command';

Commander.name(meta.name)
    .version(meta.version)
    .description(meta.description)
    .usage('[path] [options]')
    .option(
        '-r, --remote <URL>',
        'Git URL of a Remote repository',
        /^(git|https?).+/
    )
    .option(
        '-s, --system <name>',
        'Compatible operating systems (comma separated)'
    )
    .parse(process.argv);

boot(
    process.argv[2] || process.cwd(),
    Commander.remote,
    (Commander.system as string)?.split(',') as NodeJS.Platform[]
);
