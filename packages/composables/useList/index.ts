import { ref, type Ref } from 'vue';

export function useList<T = unknown>(data: T[]): UseListReturn {

  const list: Ref<T[]> = ref(data);

  const selected: Ref<T|undefined> = ref();
  const show = ref(false);

  function add(value: T): void {
    list.value.push(value);
    show.value = false;
  }

  function update(index: number, value: T): void {
    list.value[index] = value;
    show.value = false;
    selected.value = undefined;
  }

  function remove(index: number): void {
    list.value.splice(index, 1);
  }

  function select(index: number): void {
    selected.value = list.value[index];
    show.value = true;
  }

  function deselect(): void {
    selected.value = undefined;
    show.value = false;
  }

  function open() {
    show.value = true;
  }
	
  function close() {
    show.value = false;
  }

  return { list, selected, show, add, update, remove, select, deselect, open, close };
}

type T = unknown

export interface UseListReturn {
  list: Ref<unknown[]>
  selected: Ref<unknown|undefined>
  show: Ref<boolean>
  add: (value: T) => void
	update: (index: number, value: T) => void
	remove: (index: number) => void
	select: (index: number) => void
	deselect: () => void
	open: () => void
	close: () => void
}
