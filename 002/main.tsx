// Edit this file.
type TreeData = {
  id: string;
  children: TreeData[];
}

const tree = (id: string, children: TreeData[] = []) => {
  return {
    id,
    children
  }
}

const treeData = tree('root', [
  tree('a', [
    tree('aa', [
      tree('aaa'),
      tree('aab'),
      tree('aac'),
      tree('aad'),
    ]),
  ]),
  tree('b', [
    tree('baa'),
    tree('bab'),
    tree('bac'),
    tree('bad'),
  ]),
  tree('c', [
    tree('d', [
      tree('e', [
        tree('f', [])
      ])
    ])
  ]),
]);

// Edit below.
import React, { useCallback, useState } from "react";
import ReactDOMClient from 'react-dom/client';

const app = document.getElementById('app')!;
const root = ReactDOMClient.createRoot(app);

function Tree(props: { tree: TreeData, depth: number }) {
  const [counter, setCounter] = useState(0);
  const onClick = useCallback(() => setCounter(n => n + 1), []);
  return <>
    <div id={props.tree.id}>
      { '-'.repeat(props.depth)}
      { '*'.repeat(counter)}
      <button onClick={onClick}>
        {props.tree.id}
      </button>
    </div>
    {props.tree.children.map((child, idx) => <Tree key={idx} tree={child} depth={props.depth + 1} />)}
  </>
}

root.render(<Tree tree={treeData} depth={0}/>);