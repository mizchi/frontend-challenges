export type TreeData = {
  id: string;
  children: TreeData[];
}

function genTree(depth: number, id: string): TreeData {
  return {
    id,
    children: Array.from({ length: depth }, (_, i) => {
      return genTree(depth - 1, id + "_" + i)
    })
  }
}

export const treeData = genTree(5, 'r');