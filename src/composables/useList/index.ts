import { ref, unref, type Ref  } from 'vue';

export function useList<T = any>(data: T[]) {

  const list: Ref<T[]> = ref([]);

  list.value = unref(data);

  const selected: Ref<T|undefined> = ref();
  const selectedIndex: Ref<number|undefined> = ref();
  const show = ref(false);

  function add(value: T): void {
    list.value.push(value);
    show.value = false;
  }

  function update(value: T, index?: number): void {
    if(index) {
      list.value[index] = value;
    } else if(selectedIndex.value) {
      list.value[selectedIndex.value] = value;
      selectedIndex.value = undefined;
    }
    show.value = false;
    selected.value = undefined;
  }

  function remove(index: number): void {
    list.value.splice(index, 1);
  }

  function select(index: number): void {
    selected.value = list.value[index];
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
