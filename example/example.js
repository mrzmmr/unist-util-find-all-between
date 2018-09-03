const stringify = require('remark-stringify')
const find = require('unist-util-find')
const parse = require('remark-parse')
const unified = require('unified')
const between = require('../')

const markdown = (`
# Example

**List one:**
- 1
- 2

**List two:**
- 3
- 4
- 5

# End

**List three:**
- 6
- 7
`)

/**
 * Create a plugin for unified
 */
const printlists = () => (tree, file) => {
  const children = tree.children

    /**
     * Getting the index for nodes is easier with find.
     * It uses _.iteratee for comparison of objects and
     * can acdept a fragment of an object for comparison.
     */
  const start = children.indexOf(find(tree, {
    type: 'heading',
    children: [{
      value: 'Example'
    }]
  }))

  const end = children.indexOf(find(tree, {
    type: 'heading',
    children: [{
      value: 'End'
    }]
  }))

  /**
   * Test for list types and paragraph types
   */
  const test = node => node.type === 'list' || node.type === 'paragraph'

  const lists = between(tree, start, end, test)

  /**
   * Only return the lists and their label
   */
  tree.children = lists
  return tree
}

unified()
  .use(parse)
  .use(stringify)
  .use(printlists)
  .process(markdown)
  .then(r => console.log(String(r)))
  .catch(console.error)

/**
 * Outputs:
 *
 * **List one:**
 *
 * - 1
 * - 2
 *
 * **List two:**
 *
 * - 3
 * - 4
 * - 5
 *
 */
