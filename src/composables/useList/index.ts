import { reactive, ref, type Ref, unref  } from 'vue';

export function useList<T = any>(data: T[]) {

  const list: T[] = data;
  const selected: Ref<T|undefined> = ref();
  const selectedIndex: Ref<number|undefined> = ref();
  const show = ref(false);

  function add(value: T): void {
    list.push(value);
    show.value = false;
  }

  function update(value: T): void {
    if(selectedIndex.value) {
      list[selectedIndex.value] = value;
      selectedIndex.value = undefined;
    }
    show.value = false;
    selected.value = undefined;
  }

  function remove(index: number): void {
    list.splice(index, 1);
  }

  function select(index: number): void {
    selected.value = list[index];
    selectedIndex.value = index;
    show.value = true;
  }

  function deselect(): void {
    selected.value = undefined;
    selectedIndex.value = undefined;
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
