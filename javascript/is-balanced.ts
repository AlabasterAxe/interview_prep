class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

interface BalanceResult {
  height: number;
  isBalanced: boolean;
}

function isBalancedHelper(root: TreeNode | null): BalanceResult {
  if (root === null || root === undefined) {
    return { height: 0, isBalanced: true };
  }

  const leftResult: BalanceResult = isBalancedHelper(root.left);
  const rightResult: BalanceResult = isBalancedHelper(root.right);

  return {
    height: Math.max(leftResult.height, rightResult.height) + 1,
    isBalanced:
      Math.abs(leftResult.height - rightResult.height) <= 1 &&
      leftResult.isBalanced &&
      rightResult.isBalanced,
  };
}

function isBalanced(root: TreeNode | null): boolean {
  return isBalancedHelper(root).isBalanced;
}
