/* eslint-disable @typescript-eslint/no-explicit-any */
import { ref, type Ref } from 'vue'

export async function useList<T extends Record<string, any>>({ data }: { data: T[] }) {

	const list: Ref<T[]> = ref(data)
	const editable: Ref<T|undefined> = ref()
	const open = ref(false)

	function add(value: T) {
		list.value.push(value)
		open.value = false
	}

	function update(value: T, index?: number) {
		list.value[index ? index : getIndex(list.value, value)] = value
		open.value = false
		editable.value = undefined
	}

	function remove(value: T, index?: number) {
		list.value.splice(index ? index : getIndex(list.value, value), 1)
	}

	function edit(value: T, index?: number) {
		editable.value = index
			? list.value[index]
			: list.value[getIndex(list.value, value)]
		open.value = true
	}

	function resetEdit() {
		editable.value = undefined
	}

	return { list, editable, open, add, update, remove, edit, resetEdit }
}

function getIndex(array: Record<string, any>[], object: Record<string, any>) {
	const i = array.findIndex((el) => el.id === object.id)
	return i
}