import {Node, Parent} from 'unist';
import {expectError, expectType} from 'tsd';
import between = require('.');

const n1: Node = {type: 'a', value: 'a'};
const n2: Node = {type: 'b', value: 'b'};
const parent: Parent = {type: 'root', children: [n1, n2]};

/**
 * Incorrect number of arguments
 */
expectError(between());
expectError(between(parent));
expectError(between(parent, n1));

/**
 * Incorrect types of arguments
 */
expectError(between(true));
expectError(between(parent, true));
expectError(between(parent, n1, true));

/**
 * Incorrect return type
 */
expectError(expectType<string>(between(parent, n1, n2)));

/**
 * Incorrect test type
 */
expectError(between(parent, n1, n2, true));

/**
 * Correct test type
 */
between(parent, n1, n2, {value: 'a'});

/**
 * Accept `Node` or index `number`
 */
between(parent, 0, 1);

/**
 * Correct return type
 */
expectType<Node[]>(between(parent, n1, n2, {value: 'a'}));
