<template>
  <div>
    <Accordion :precoroSelected="precoroSelected">
      <template #precoro>
        <div class="available-locations">
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

          <div class="d-flex">
            <v-checkbox
              v-model="selectAll"
              class="checkbox mb-4"
              label="Select All Locations"
              hide-details
              :indeterminate="indeterminateSelectAll"
              @change="selectAllLocations"
            ></v-checkbox>
          </div>

          <div class="available-locations__title">Available Locations</div>

          <div class="d-flex flex-column flex-wrap available-locations__items">
            <div
              v-for="(location, index) in locations"
              :key="index"
              class="available-locations__item"
            >
              <div class="d-flex">
                <v-checkbox
                  v-model="al.availableLocations"
                  class="checkbox"
                  :label="location"
                  :value="location"
                  hide-details
                  @change="changeCheckbox"
                ></v-checkbox>
              </div>
            </div>
          </div>
        </div>
      </template>
    </Accordion>

    <div class="d-flex justify-end px-6 invite-user__action" style="margin-top: 25px">
      <div style="margin-top: 25px">
        <button class="invite-user__button" @click="stepper(3)">Next Step</button>
      </div>
    </div>
  </div>
</template>

<script>
import Accordion from '@/components/Accordion'

export default {
  name: 'AvailableLocations',
  components: {
    Accordion
  },

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
    this.selectAll = this.allLocations()
  },
  computed: {
    indeterminateSelectAll() {
      return this.al.availableLocations.length > 0 && !this.allLocations()
    },
    precoroSelected() {
      return this.al.availableLocations.length || 'Not'
    }
  },
  methods: {
    stepper(step) {
      this.$emit('stepper', step)
    },
    allLocations() {
      // return this.locations.every(el => this.al.availableLocations > 0 && this.al.availableLocations.find(e => e === el))
      return this.locations.length === this.al.availableLocations.length
    },
    selectAllLocations() {
      this.selectAll
        ? (this.al.availableLocations = this.locations)
        : (this.al.availableLocations = [])

      this.availableLocationsChange()
    },
    changeCheckbox() {
      this.availableLocationsChange()

      this.selectAll = this.allLocations()
    },
    availableLocationsChange() {
      this.$emit('change', this.al)
    }
  }
}
</script>
