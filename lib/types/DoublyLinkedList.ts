class DoublyLinkedList<T> {
  public value: T;
  public next: DoublyLinkedList<T> | null;
  public prev: DoublyLinkedList<T> | null

  constructor(
    value: T, 
    prev: DoublyLinkedList<T> | null = null, 
    next: DoublyLinkedList<T> | null = null
  ) {
    this.value = value;
    this.prev = prev;
    this.next = next;
  }

  /**
   * Replace this node's `next` node with a newly-created node. The newly-
   * created node will have a `prev` value that points to this node, but
   * the `next` value will point to `null`.
   * 
   * @param newValue the value to be given to the new node.
   * @returns a reference to the new node.
   */
  overwriteNext(newValue: T): DoublyLinkedList<T> {
    this.next = new DoublyLinkedList<T>(newValue, this, null);
    return this.next;
  }

  /**
   * Traverses to the end of the list, and appends a new node to it.
   * 
   * @param newValue the new value to append to the list
   * @returns a pointer to the new tail of the list
   */
  append(newValue: T): DoublyLinkedList<T> {
    if (!this.next) {
      return this.overwriteNext(newValue);
    }
    // typescript doesn't let me set `current = this` (?)
    let current = this.next;
    while (current.next) {
      current = current.next;
    }
    return current.overwriteNext(newValue);
  }
}

export default DoublyLinkedList;