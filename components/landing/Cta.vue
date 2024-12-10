<template>
  <div
    class="bg-black px-20 py-20 mt-20 mx-auto max-w-5xl rounded-lg flex flex-col items-center text-center"
  >
    <h2 class="text-white text-3xl md:text-6xl">引进门、扶上马、送一程</h2>
    <p class="text-slate-500 mt-4 text-lg md:text-xl">
      课程正如其标题所言，希望帮助所有希望自主 Web 开发的朋友摸到门道，通过循序渐进的学习，达成能独立开发并发布 Web App 的目标
    </p>
    <div class="flex mt-5">
      <LandingLink
        href="https://buy.stripe.com/fZe9AW506dnr3IY6oq?prefilled_promo_code=XMAS2024"
        size="lg"
        :block="false"
        styleName="inverted"
        target="_blank"
        rel="noopener"
      >立即加入</LandingLink>
    </div>
  </div>
</template>
