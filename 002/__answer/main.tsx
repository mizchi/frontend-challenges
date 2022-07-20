/** @jsx h */
import {treeData, TreeData} from "../data";

// Edit below.
import { render, h, Fragment } from "preact";
import { useState, useCallback } from "preact/hooks";

function Tree(props: { tree: TreeData, depth: number }) {
  const [counter, setCounter] = useState(0);
  const onClick = useCallback(() => setCounter(n => n + 1), []);
  return <Fragment>
    <div id={props.tree.id}>
      { '-'.repeat(props.depth)}
      { '*'.repeat(counter)}
      <button onClick={onClick}>
        {props.tree.id}
      </button>
    </div>
    {props.tree.children.map((child, idx) => <Tree key={idx} tree={child} depth={props.depth + 1} />)}
  </Fragment>
}

const app = document.getElementById('app')!;
render(<Tree tree={treeData} depth={0}/>, app);