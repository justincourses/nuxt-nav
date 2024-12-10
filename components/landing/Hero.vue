<script setup>
import { ref, onMounted } from 'vue';

const hasInteracted = ref(false);
const shouldAutoplay = ref(false);
const videoRef = ref(null);

onMounted(() => {
  setTimeout(() => {
    if (!hasInteracted.value) {
      shouldAutoplay.value = true;
      if (videoRef.value) {
        videoRef.value.currentTime = 0;
        videoRef.value.play();
      }
    }
  }, 3000);
});

const handleVideoEnded = () => {
  if (!hasInteracted.value) {
    shouldAutoplay.value = false;
  }
};
</script>

<template>
  <main class="grid lg:grid-cols-2 place-items-center pt-16 pb-8 md:pt-8">
    <div class="p-24 md:order-1 hidden md:block relative group">
      <div class="w-[384px] h-[384px] hover:scale-125 relative transition-transform"
        @mouseover="hasInteracted = true; shouldAutoplay = true; videoRef.currentTime = 0; videoRef.play()"
        @mouseleave="hasInteracted = false">
        <img class="rounded-full absolute inset-0 w-full h-full object-cover" :class="{ 'opacity-0': shouldAutoplay }"
          src="/assets/img/hero.webp" alt="Starship starts the engine" loading="eager" width="384" height="384" />
        <video ref="videoRef" class="rounded-full w-[384px] h-[384px] object-cover absolute inset-0"
          :class="{ 'opacity-100': shouldAutoplay, 'opacity-0': !shouldAutoplay }"
          src="https://pictures.zhaikr.com/The_cat_wizard_fly_pass_through_.mp4" muted :loop="hasInteracted" autoplay
          playsinline poster="/assets/img/hero.webp" @ended="handleVideoEnded"></video>
      </div>
    </div>

    <div>
      <h1 class="text-5xl lg:text-6xl xl:text-7xl font-bold lg:tracking-tight">
        Web 开发从入门到上线
      </h1>
      <p class="text-lg mt-4 text-slate-600 max-w-xl">
        ✨ 课程大纲，请
        <a class="text-primary-500 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 hover:underline decoration-2 underline-offset-2" href="/intro">点此查看</a>
      </p>
      <div class="mt-6 flex flex-col sm:flex-row gap-3">
        <LandingLink href="https://buy.stripe.com/fZe9AW506dnr3IY6oq?prefilled_promo_code=XMAS2024" size="lg"
          styleName="primary" :block="false" target="_blank" rel="noopener">立即加入</LandingLink>
        <LandingLink href="https://s.zhaikr.com/web-course-1" size="lg" styleName="link" :block="false" target="_blank"
          rel="noopener">进入课程</LandingLink>
      </div>
    </div>
  </main>
</template>
