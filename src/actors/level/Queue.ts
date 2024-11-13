export class Queue<T> {
  private head: QueueItem<T> | null = null;
  private tail: QueueItem<T> | null = null;
  private _length: number = 0;

  push(value: T): void {
    const item = new QueueItem(value);
    if (this.head === null) {
      this.head = item;
      this.tail = item;
    } else {
      item.prev = this.tail;
      this.tail!.next = item;
      this.tail = item;
    }
    this._length += 1;
  }

  pop(): T | null {
    if (this.head === null) {
      return null;
    }
    const value = this.head.value;
    this.head = this.head.next;
    if (this.head !== null) {
      this.head.prev = null;
    } else {
      this.tail = null;
    }
    this._length -= 1;
    return value;
  }

  peek(): T | null {
    return this.head?.value ?? null;
  }

  last(): T | null {
    return this.tail?.value ?? null;
  }

  get length(): number {
    return this._length;
  }

  [Symbol.iterator](): Iterator<T> {
    let current = this.head;
    return {
      next(): IteratorResult<T> {
        if (current === null) {
          return { done: true, value: null };
        }
        const value = current.value;
        current = current.next;
        return { done: false, value };
      }
    };
  }
}
class QueueItem<T> {
  value: T;
  next: QueueItem<T> | null = null;
  prev: QueueItem<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}
