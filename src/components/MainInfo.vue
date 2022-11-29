<template>
  <div>
    <div class="d-flex pb-5 px-6">
      <div class="invite-user__input pr-5">
        <div class="invite-user__label">First Name</div>
        <v-text-field
          v-model="mi.firstName"
          dense
          outlined
          multiple
          hide-details="auto"
          color="#415ADA"
          @change="mainInfoChange"
        >
        </v-text-field>
      </div>

      <div class="invite-user__input">
        <div class="invite-user__label">Last Name</div>
        <v-text-field
          v-model="mi.lastName"
          dense
          outlined
          multiple
          hide-details="auto"
          color="#415ADA"
          @change="mainInfoChange"
        >
        </v-text-field>
      </div>
    </div>

    <div class="d-flex pb-5 px-6">
      <div class="invite-user__input pr-5">
        <div class="invite-user__label">Email Address</div>
        <v-text-field
          v-model="mi.emailAddress"
          dense
          outlined
          multiple
          hide-details="auto"
          color="#415ADA"
          @change="mainInfoChange"
        >
        </v-text-field>
      </div>

      <div class="invite-user__input">
        <div class="invite-user__label">Phone Number</div>
        <v-text-field
          v-model="mi.phoneNumber"
          dense
          outlined
          multiple
          hide-details="auto"
          color="#415ADA"
          @change="mainInfoChange"
        >
        </v-text-field>
      </div>
    </div>

    <div class="d-flex px-6" style="margin-bottom: 1.875rem">
      <div class="invite-user__input pr-5">
        <div class="invite-user__label">Position</div>
        <v-text-field
          v-model="mi.position"
          dense
          outlined
          multiple
          hide-details="auto"
          color="#415ADA"
          @change="mainInfoChange"
        >
        </v-text-field>
      </div>

      <div class="invite-user__input">
        <div class="invite-user__label">Available Companies</div>
        <v-select
          v-model="mi.availableCompanies"
          :items="availableCompanies"
          dense
          outlined
          multiple
          hide-details="auto"
          color="#415ADA"
          @change="mainInfoChange"
        >
          <template v-slot:selection="{ index, item, parent }">
            <v-chip class="invite-user__chip" v-if="index < 2" label small>
              <span class="invite-user__chip-text">
                {{ item }}
              </span>
              <v-icon class="invite-user__chip-icon" @click="parent.selectItem(item)">
                $xmark
              </v-icon>
            </v-chip>

            <v-chip class="invite-user__chip" v-if="index === 2" label small>
              <span class="invite-user__chip-text pr-0">
                +{{ mi.availableCompanies.length - 2 }}
              </span>
            </v-chip>
          </template>

          <template v-slot:item="{ item }">
            {{ item }}
          </template>
        </v-select>
      </div>
    </div>

    <div class="d-flex justify-space-between px-6 invite-user__action">
      <div class="d-flex align-center" style="margin: 30px 0 0 3px">
        <div class="invite-user__switch pr-2">
          <v-switch
            v-model="mi.activeInAllCompanies"
            inset
            label="Active in all companies"
            color="#415ADA"
            hide-details
            dense
            @change="mainInfoChange"
          ></v-switch>
        </div>
        <div>
          <img class="invite-user__info" :src="require(`@/assets/info.svg`)" alt="info" />
        </div>
      </div>

      <div style="margin-top: 25px">
        <button class="invite-user__button" @click="stepper(2)">Next Step</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainInfo',
  props: ['mainInfo'],
  data() {
    return {
      mi: {},
      availableCompanies: ['Precoro', 'Precoro Development', 'Procurement']
    }
  },
  mounted() {
    this.mi = this.mainInfo
  },
  methods: {
    stepper(step) {
      this.$emit('stepper', step)
    },
    mainInfoChange() {
      this.$emit('change', this.mi)
    }
  }
}
</script>
