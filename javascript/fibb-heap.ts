interface Heap<T> {
  peek(): T;
  push(e: T): void;
  pop(): T;
}

interface HeapTreeNode<T> {
  left: HeapTreeNode<T>;
  right: HeapTreeNode<T>;
  parent: HeapTreeNode<T>;
  val: T;
}

// handles negative numbers?
// what does it do when you feed it the same numbers?
// reverse order items

class BinaryHeap<T> implements Heap<T> {
  root: HeapTreeNode<T> = null;

  peek(): T {
    return this.root.val;
  }

  push(e: T) {
    const newNode: HeapTreeNode<T> = {
      left: null,
      right: null,
      parent: null,
      val: e,
    };

    if (this.root === null) {
      this.root = newNode;
      return;
    }

    let parent = this.getLeftMostUnsaturatedNode();

    if (parent.left === null) {
      parent.left = newNode;
    } else {
      parent.right = newNode;
    }
    newNode.parent = parent;
    this.heapifyUp(newNode);
  }

  private getLeftMostUnsaturatedNode(): HeapTreeNode<T> {
    if (this.root === null) {
      return null;
    }
    return this.getLeftMostUnsaturatedNodeHelper(this.root).node;
  }

  private getLeftMostUnsaturatedNodeHelper(node): {
    depth: number;
    node: HeapTreeNode<T>;
  } {
    if (node === null) {
      return { depth: 0, node: null };
    }

    if (node.left === null || node.right === null) {
      return { node, depth: 1 };
    }

    const leftResult = this.getLeftMostUnsaturatedNodeHelper(node.left);
    const rightResult = this.getLeftMostUnsaturatedNodeHelper(node.right);

    if (rightResult.depth < leftResult.depth) {
      return { depth: rightResult.depth + 1, node: rightResult.node };
    }
    return { depth: leftResult.depth + 1, node: leftResult.node };
  }

  private getLastNode(): HeapTreeNode<T> {
    if (this.root === null) {
      return null;
    }
    return this.getLastNodeHelper(this.root).node;
  }

  private getLastNodeHelper(node): {
    depth: number;
    node: HeapTreeNode<T>;
  } {
    if (node === null) {
      return { depth: 0, node: null };
    }

    if (node.left === null && node.right === null) {
      return { node, depth: 1 };
    }

    const leftResult = this.getLastNodeHelper(node.left);
    const rightResult = this.getLastNodeHelper(node.right);

    if (leftResult.depth > rightResult.depth) {
      return { depth: leftResult.depth + 1, node: leftResult.node };
    }
    return { depth: rightResult.depth + 1, node: rightResult.node };
  }

  private heapifyUp(node: HeapTreeNode<T>) {
    let currNode = node;
    while (currNode.val < currNode?.parent?.val) {
      this.swap(node, node.parent);
      currNode = currNode.parent;
    }
  }

  private heapifyDown(node: HeapTreeNode<T>) {
    if (node === null) {
      return;
    }
    let currNode = node;
    while (
      currNode?.val > currNode?.left?.val ||
      currNode?.val > currNode?.right?.val
    ) {
      if (
        currNode.val > currNode?.left?.val &&
        (currNode?.right == null || currNode?.left?.val < currNode?.right?.val)
      ) {
        this.swap(currNode, node.left);
        currNode = currNode.left;
      } else {
        this.swap(currNode, node.right);
        currNode = currNode.right;
      }
    }
  }

  private swap(node1: HeapTreeNode<T>, node2: HeapTreeNode<T>) {
    const tmp: T = node1.val;
    node1.val = node2.val;
    node2.val = tmp;
  }

  pop(): T {
    if (this.root === null) {
      return null;
    }

    const result: T = this.root.val;

    const node = this.getLastNode();
    this.swap(node, this.root);

    if (node.parent !== null) {
      const parentNode = node.parent;

      if (node === parentNode.left) {
        parentNode.left = null;
      } else {
        parentNode.right = null;
      }
    } else {
      this.root = null;
    }

    this.heapifyDown(this.root);

    return result;
  }
}

const heap = new BinaryHeap<number>();

heap.push(5);

heap.push(2);
heap.push(7);
heap.push(30);
heap.push(690);
heap.push(2);

while (heap.root !== null) {
  console.log(heap.pop());
}
