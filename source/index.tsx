#! /usr/bin/env node

import { Command, createCommand } from 'commander-jsx';

import { meta } from './core';
import { boot } from './command';

Command.execute(
    <create-es-pack
        version={meta.version}
        parameters="[path] [options]"
        description={meta.description}
        options={{
            remote: {
                shortcut: 'r',
                parameters: '<URL>',
                pattern: /^(git|https?).+/,
                description: 'Git URL of a Remote repository'
            },
            system: {
                shortcut: 's',
                parameters: '<name>',
                description: 'Compatible operating systems (comma separated)'
            }
        }}
        executor={({ remote, system }, path = process.cwd()) =>
            boot(path, remote, system)
        }
    />,
    process.argv.slice(2)
);
