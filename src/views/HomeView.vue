<template>
  <v-card>
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
              :complete="step > index + 1"
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
            <v-btn color="primary" @click="stepper(2)">Next Step</v-btn>
          </v-stepper-content>

          <v-stepper-content step="2">
            <v-btn color="primary" @click="stepper(3)">Next Step</v-btn>
          </v-stepper-content>

          <v-stepper-content step="3">
            <v-btn color="primary" @click="stepper(4)">Next Step</v-btn>
          </v-stepper-content>

          <v-stepper-content step="4">
            <v-btn color="primary" @click="stepper()">Invite User</v-btn>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </div>
  </v-card>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      step: 1,
      stepTitles: ['Main Info', 'Available Locations', 'Available Documents Custom Fields', 'Roles']
    }
  },
  mounted() {
    this.$refs.indicator.style.width = `${this.$refs.titles[0].offsetWidth}px`
  },
  methods: {
    indicator(step) {
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

      this.indicator(step)
    }
  }
}
</script>

<style lang="scss">
.v-card {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 867px;
  width: 100%;
  box-shadow: 0 0.5rem 1rem rgba(54, 62, 113, 0.24) !important;
  border-radius: 1rem !important;
}

.invite-user {
  position: relative;

  &__title {
    padding: 1.5rem 0 0 1.5rem;
    font-size: 1.5rem;
    font-weight: 600;
    line-height: 2rem;
    letter-spacing: 0;
  }

  &__close {
    position: absolute;
    top: 1.4375rem;
    right: 1.6875rem;
    width: 1.625rem;
    height: 1.625rem;
  }

  &__indicator {
    position: relative;
    height: 2px;
    background-color: #415ada;
    left: 1.5rem;

    margin-top: -2px;

    transition: all 0.3s ease-in-out;
  }

  &__step {
    margin-right: 1.5rem;
  }
  &__step:last-child {
    margin-right: 0;
  }
}

.v-stepper {
  &__header {
    height: auto !important;
    justify-content: left !important;
    padding: 0.875rem 1.5rem 1rem 1.5rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: none !important;
  }

  &__step {
    padding: 0 !important;

    &__step {
      height: 1.875rem;
      min-width: 1.875rem;
      width: 1.875rem;

      font-size: 0.875rem;
      font-weight: 600;
      line-height: 1.0625rem;
      letter-spacing: 0;

      margin-right: 0.5rem !important;

      color: #5e6a75 !important;
      background-color: rgba(94, 106, 117, 0.05) !important;
    }
    &__step .v-icon__component {
      height: 0.75rem !important;
      width: 0.75rem !important;
      color: #fff;
    }
  }

  &__label {
    display: block !important;

    font-size: 1rem;
    font-weight: 500;
    line-height: 1.4375rem;
    letter-spacing: 0;

    color: rgba(29, 36, 82, 0.5) !important;
  }

  &__step:hover > &__label,
  &__step:hover > &__step__step {
    cursor: pointer;
  }
  &__step--complete > &__step__step {
    background-color: #415ada !important;
  }
  &__step:hover > &__label,
  &__step:hover > &__step__step,
  &__step--active > &__label,
  &__step--active > &__step__step {
    text-shadow: none !important;
    color: #415ada !important;
  }
}
.v-btn {
  text-transform: none !important;
}
</style>
