<template>
  <h1>Hello World!</h1>
  <p><strong>Current route path:</strong> {{ $route.fullPath }}</p>
  <nav :style="{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '12px' }">
    <RouterLink to="/">Go to Home</RouterLink>
    <RouterLink to="/about">Go to About</RouterLink>
  </nav>
  <main>
    <RouterView />
  </main>
</template>
