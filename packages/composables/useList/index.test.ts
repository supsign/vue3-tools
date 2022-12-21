import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useList } from './index';
import data from './data.json';

describe('useList', () => {

  it('init list with data', () => {
    const { list } = useList(data);
    expect(list.value).toMatchObject(data);
  });

  it('add item to list', () => {
    const { add, list } = useList(data);
    const item = { id: 6, name: 'Cucumber' };
    expect(list.value.length).toEqual(5);
    add(item);
    expect(list.value.length).toEqual(6);
    expect(list.value[list.value.length - 1]).toEqual(item);
  });

  it('update item in list', () => {
    const { open, show, update, list } = useList(data);
    const item = { id: 6, name: 'Vinnegar Cucumbers' };
    expect(show.value).toBe(false);
    open();
    expect(show.value).toBe(true);
    expect(list.value.length).toEqual(6);
    expect(list.value[list.value.length - 1]).not.toEqual(item);
    update(list.value.length - 1, item);
    expect(show.value).toBe(false);
    expect(list.value.length).toEqual(6);
    expect(list.value[list.value.length - 1]).toEqual(item);
  });

  it('remove item from list', () => {
    const { remove, list } = useList(data);
    const item = { id: 6, name: 'Vinnegar Cucumbers' };
    expect(list.value.length).toEqual(6);
    expect(list.value[list.value.length - 1]).toEqual(item);
    remove(list.value.length - 1);
    expect(list.value[list.value.length - 1]).not.toEqual(item);
    expect(list.value.length).toEqual(5);
  });

  it('select and deselect item from list', () => {
    const { select, selected, deselect, list } = useList(data);
    const item = { id: 5, name: 'Orange' };
    expect(selected.value).toBe(undefined);
    select(list.value.length - 1);
    expect(selected.value).toEqual(item);
    deselect();
    expect(selected.value).toBe(undefined);
  });

  it('select and deselect item from list', () => {
    const { open, close, show } = useList(data);
    expect(show.value).toBe(false);
    open();
    expect(show.value).toBe(true);
    close();
    expect(show.value).toBe(false);
  });
});