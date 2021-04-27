interface Dll<T> {
  head: DllNode<T>;
  tail: DllNode<T>;
}

interface DllNode<T> {
  value: T;
  prev: DllNode<T>;
  next: DllNode<T>;
}
