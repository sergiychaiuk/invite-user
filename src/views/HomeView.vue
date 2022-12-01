<template>
  <v-card class="overflow-hidden">
    <div class="invite-user">
      <div class="invite-user__title">Invite User</div>

      <img class="invite-user__close" :src="require(`@/assets/close.svg`)" alt="close" />

      <v-stepper v-model="step" elevation="0">
        <v-stepper-header>
          <div
            class="invite-user__step"
            v-for="(item, index) in stepTitles"
            ref="titles"
            :key="index"
          >
            <v-stepper-step
              color="rgba(94, 106, 117, 0.05)"
              :complete="step > index + 1 || disabled"
              :step="index + 1"
              @click="stepper(index + 1)"
            >
              {{ item }}
            </v-stepper-step>
          </div>
        </v-stepper-header>

        <div class="invite-user__indicator" ref="indicator"></div>

        <v-stepper-items>
          <v-stepper-content step="1">
            <MainInfo
              :disabled="disabled"
              :mainInfo="inviteUser.mainInfo"
              @stepper="stepper"
              @change="mainInfoChange"
            />
          </v-stepper-content>

          <v-stepper-content step="2">
            <AvailableLocations
              :disabled="disabled"
              :availableLocations="inviteUser.availableLocations"
              @stepper="stepper"
              @change="availableLocationsChange"
            />
          </v-stepper-content>

          <v-stepper-content step="3">
            <AvailableDocumentsCustomFields
              :disabled="disabled"
              :availableDocumentsCustomFields="inviteUser.availableDocumentsCustomFields"
              @stepper="stepper"
              @change="availableDocumentsCustomFieldsChange"
            />
          </v-stepper-content>

          <v-stepper-content step="4">
            <Roles
              :disabled="disabled"
              :roles="inviteUser.roles"
              @stepper="stepper"
              @change="rolesChange"
            />
          </v-stepper-content>

          <v-stepper-content step="Invite User">
            <div class="pa-5">
              User data is stored in the "inviteUser" object, all input fields "disabled". You can
              switch between steps to view the input data!
            </div>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </div>
  </v-card>
</template>

<script>
import MainInfo from '../components/MainInfo.vue'
import AvailableLocations from '../components/AvailableLocations.vue'
import AvailableDocumentsCustomFields from '../components/AvailableDocumentsCustomFields.vue'
import Roles from '../components/Roles.vue'

export default {
  name: 'Home',
  components: {
    MainInfo,
    AvailableLocations,
    AvailableDocumentsCustomFields,
    Roles
  },
  data() {
    return {
      disabled: false,
      step: 1,
      stepTitles: [
        'Main Info',
        'Available Locations',
        'Available Documents Custom Fields',
        'Roles'
      ],
      inviteUser: {
        mainInfo: {
          firstName: '',
          lastName: '',
          emailAddress: '',
          phoneNumber: '',
          position: '',
          availableCompanies: [],
          activeInAllCompanies: true
        },
        availableLocations: {
          mainLocation: '',
          availableLocations: []
        },
        availableDocumentsCustomFields: {
          classes: [],
          departments: [],
          dcf3: []
        },
        roles: {
          accessTo: {
            viewOnly: [],
            create: [],
            approve: [],
            pay: []
          },
          management: []
        }
      }
    }
  },
  mounted() {
    this.$refs.indicator.style.width = `${this.$refs.titles[0].offsetWidth}px`
  },
  methods: {
    indicator(step) {
      if (this.step === 'Invite User') {
        this.$refs.indicator.style.display = 'none'
        return
      } else {
        this.$refs.indicator.style.display = 'block'
      }

      let left = 0
      for (let i = 0; i < step - 1; i++) {
        left += this.$refs.titles[i].offsetWidth
      }
      this.$refs.indicator.style.left = `calc(1.5rem * ${step} + ${left}px)`
      this.$refs.indicator.style.width = `${this.$refs.titles[step - 1].offsetWidth}px`
    },
    stepper(step) {
      if (step === undefined) return
      this.step = step

      if (this.step === 'Invite User') {
        this.disabled = true
      }

      this.indicator(step)
    },
    mainInfoChange(mainInfo) {
      this.inviteUser.mainInfo = mainInfo
    },
    availableLocationsChange(availableLocations) {
      this.inviteUser.availableLocations = availableLocations
    },
    availableDocumentsCustomFieldsChange(availableDocumentsCustomFields) {
      this.inviteUser.availableLocations = availableDocumentsCustomFields
    },
    rolesChange(roles) {
      this.inviteUser.roles = roles
    }
  }
}
</script>
