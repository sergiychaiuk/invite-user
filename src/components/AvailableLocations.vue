<template>
  <div>
    <v-expansion-panels class="accordion px-6" accordion>
      <v-expansion-panel class="accordion__item">
        <v-expansion-panel-header class="accordion__header">
          <div class="d-flex justify-space-between align-center">
            <div class="accordion__header-title">Precoro</div>
            <div class="accordion__header-select">{{ precoroSelected }} selected</div>
          </div>

          <template v-slot:actions>
            <v-icon class="accordion__header-icon mr-3"> $angleUp </v-icon>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content class="accordion__content">
          <div class="invite-user__input mb-5">
            <div class="invite-user__label">Main Location <span class="red--text">*</span></div>
            <v-select
              v-model="al.mainLocation"
              class="accordion__input"
              :items="mainLocations"
              dense
              outlined
              hide-details="auto"
              color="#415ADA"
              @change="availableLocationsChange"
            >
              <template v-slot:item="{ item }">
                {{ item }}
              </template>
            </v-select>
          </div>

          <v-checkbox
            v-model="selectAll"
            class="accordion__checkbox mb-4"
            label="Select All Locations"
            hide-details
            @change="allLocations"
          ></v-checkbox>

          <div class="invite-user__subtitle">Available Locations</div>

          <div class="d-flex flex-column flex-wrap available-locations">
            <div
              v-for="(location, index) in locations"
              :key="index"
              class="available-locations__checkbox"
            >
              <v-checkbox
                v-model="al.availableLocations"
                class="accordion__checkbox"
                :label="location"
                :value="location"
                hide-details
                @change="changeCheckbox"
              ></v-checkbox>
            </div>
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel class="accordion__item">
        <v-expansion-panel-header class="accordion__header">
          <div class="d-flex justify-space-between align-center">
            <div class="accordion__header-title">Precoro Development</div>
            <div class="accordion__header-select">5 selected</div>
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
            <div class="accordion__header-select">2 selected</div>
          </div>

          <template v-slot:actions>
            <v-icon class="accordion__header-icon mr-3"> $angleUp </v-icon>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content></v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <div class="d-flex justify-end px-6 invite-user__action" style="margin-top: 25px">
      <div style="margin-top: 25px">
        <button class="invite-user__button" @click="stepper(3)">Next Step</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AvailableLocations',
  props: ['availableLocations'],
  data() {
    return {
      al: {
        mainLocation: '',
        availableLocations: []
      },
      mainLocations: ['Main Precoro US'],
      selectAll: false,
      locations: [
        'Berlin',
        'Venice Office',
        'USA Office',
        'Canada',
        'Poland Office',
        'Mexico',
        'Ukraine Kiyv Lukivska 7 Main Office'
      ]
    }
  },
  mounted() {
    this.al = this.availableLocations
  },
  computed: {
    precoroSelected() {
      return this.al.availableLocations.length || 'Not'
    }
  },
  methods: {
    stepper(step) {
      this.$emit('stepper', step)
    },
    allLocations() {
      if (this.selectAll) {
        this.al.availableLocations = this.locations
        this.availableLocationsChange()
      }
    },
    changeCheckbox() {
      this.selectAll = false
      this.availableLocationsChange()
    },
    availableLocationsChange() {
      this.$emit('change', this.al)
    }
  }
}
</script>
