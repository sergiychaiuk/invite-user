<template>
  <v-expansion-panels class="accordion px-6" accordion>
    <v-expansion-panel class="accordion__item">
      <v-expansion-panel-header class="accordion__header">
        <div class="d-flex justify-space-between align-center">
          <div class="accordion__header-title">Precoro</div>
          <div class="accordion__header-select">{{ precoro }}</div>
        </div>

        <template v-slot:actions>
          <v-icon class="accordion__header-icon mr-3"> $angleUp </v-icon>
        </template>
      </v-expansion-panel-header>
      <v-expansion-panel-content class="accordion__content">
        <slot name="precoro"></slot>
      </v-expansion-panel-content>
    </v-expansion-panel>

    <v-expansion-panel class="accordion__item">
      <v-expansion-panel-header class="accordion__header">
        <div class="d-flex justify-space-between align-center">
          <div class="accordion__header-title">Precoro Development</div>
          <div class="accordion__header-select">{{ precoroDevelopment }}</div>
        </div>

        <template v-slot:actions>
          <v-icon class="accordion__header-icon mr-3"> $angleUp </v-icon>
        </template>
      </v-expansion-panel-header>
      <v-expansion-panel-content></v-expansion-panel-content>
    </v-expansion-panel>

    <v-expansion-panel class="accordion__item">
      <v-expansion-panel-header class="accordion__header">
        <div class="d-flex justify-space-between align-center">
          <div class="accordion__header-title">Procurement</div>
          <div class="accordion__header-select">{{ procurement }}</div>
        </div>

        <template v-slot:actions>
          <v-icon class="accordion__header-icon mr-3"> $angleUp </v-icon>
        </template>
      </v-expansion-panel-header>
      <v-expansion-panel-content></v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
export default {
  name: 'Accordion',
  props: ['precoro', 'precoroDevelopment', 'procurement']
}
</script>
