<!-- sandbox/App.vue -->
<template>
  <main>
    <h1>Welcome to your your sandbox environment</h1>

    <Input
      label="firstname"
      :input-attributes="{
        placeholder: 'Enter your firstname...',
        type: 'text',
        autocomplete: 'given-name',
      }"
    >
      First-name
    </Input>
  </main>
</template>

<script lang="ts" setup>
import Input from '../src/Input.vue';
import { useList } from '../packages/composables/useList';
</script>

<style lang="scss" scoped></style>
