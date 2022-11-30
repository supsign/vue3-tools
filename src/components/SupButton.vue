<template>
  <component
    :is="_component"
    v-tippy="tippy"
    :href="link"
    v-bind="$attrs"
    :disabled="disabled"
    class="sup-btn"
    :type="type"
    :aria-disabled="disabled"
  >
      <span class="btn__content" :class="{ 'opacity-0': loading }">
      <i v-if="icon" :class="icon" aria-hidden />
      <span
        v-if="label"
        class="btn__label"
      >
        {{ label }}
      </span>
    </span>
      <span v-if="loading" class="btn__spinner">
        <i :class="opts.loadingIcon" class="btn__spinner-icon" aria-hidden />
      </span>
  </component>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { TippyOptions, Tippy as vTippy } from 'vue-tippy'
import './button.css'

type Props = {
  /**
    * Disable the Button
    * @default false
    * @type {boolean}
    */
  disabled?: boolean

  /**
    * Icon Class for display Icon on Button
    * @type {string}
    */
  icon?: string

  /**
    * Text which appears on Button
    * @type {string}
    */
  label?:string

  /**
    * An Link to an external Site
    * @type {string}
    */
  link?: string
  /**
    * Displays the Button in Loading State with Spinner
    * @default false
    * @type {boolean}
    */
  loading?: boolean

  options?: Options

   /**
    * Display a Text on a tooltip
    * ! Only works when the Button is not disabled
    * @type {string}
    */
  tooltip?: string,

  /**
    * Select a Button Type
    * @default button
    * @type {button | submit | reset}
    */
  type?: Type

    /**
    * Select a Button Variant
    * @default default
    * @type {default | block | plain}
    */
  variant?: Variant
}

const props = withDefaults(defineProps<Props>(), {
	disabled: false,
	loading: false,
	type: 'button',
	variant: 'default'
})

const _component = computed(() => {
	if(props.disabled && opts.tooltipWhenDisalbed) {
		return 'div'
	} else if(props.link) {
		return 'a'
	}
	return 'button'
})

const defaultOptions: Options = {
	hideLabelOnMobile: false,
	loadingIcon: 'fas fa-circle-notch',
	tooltipWhenDisalbed: false
}

const opts = { ...defaultOptions }

const tippy: TippyOptions = {
	allowHTML: true,
	arrow: true,
	content: props.tooltip,
	moveTransition: 'transform 0.2s ease-out',
	placement: 'top',
	theme: 'light',
	zIndex: 9999,
}
type Options = {
  loadingIcon?: string
  hideLabelOnMobile?: boolean
  tooltipWhenDisalbed?: boolean

}
type Type = 'button' | 'submit' | 'reset';
type Variant = 'default' | 'block' | 'plain';
</script>
