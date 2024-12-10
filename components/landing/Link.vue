<script setup lang="ts">
interface Props {
  href: string;
  size: "md" | "lg";
  block?: boolean;
  styleName: "outline" | "primary" | "inverted" | "muted";
  className?: string;
  [x: string]: any;
}

const props = withDefaults(defineProps<Props>(), {
  size: "lg",
  styleName: "primary",
});

const sizes = {
  lg: "px-5 py-2.5",
  md: "px-4 py-2",
} as const;

const styles = {
  outline: "bg-white border-2 border-black hover:bg-gray-100 text-black",
  primary: "bg-black text-white hover:opacity-80 border-2 border-transparent transition-opacity duration-200",
  inverted: "bg-white text-black border-2 border-transparent",
  muted: "bg-gray-100 hover:bg-gray-200 border-2 border-transparent",
} as const;
</script>

<template>
  <NuxtLink
    :href="href"
    :class="[
      'rounded text-center transition focus-visible:ring-2 ring-offset-2 ring-gray-200',
      block && 'w-full',
      sizes[props.size],
      styles[props.styleName],
    ]"
    ><slot />
  </NuxtLink>
</template>
