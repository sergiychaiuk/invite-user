<template>
  <div>
    <Accordion
      precoro="View only"
      precoroDevelopment="Create, Approve"
      procurement="Admin (Full Access)"
    >
      <template #precoro>
        <div class="roles">
          <div class="d-flex">
            <div class="access-to">
              <table style="border-spacing: 0">
                <thead>
                  <tr>
                    <th class="access-to__title text-start">Access to:</th>
                    <th class="access-to__title">View only</th>
                    <th class="access-to__title">Create</th>
                    <th class="access-to__title">Approve</th>
                    <th class="access-to__title">Pay</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="access-to__item-title access-to__all-bellow">All bellow</td>
                    <td class="access-to__item">
                      <v-checkbox
                        :disabled="disabled"
                        v-model="isAllViewOnly"
                        class="checkbox access-to__checkbox"
                        hide-details
                        :indeterminate="indeterminateAllViewOnly"
                        @change="selectAllViewOnly"
                      ></v-checkbox>
                    </td>
                    <td class="access-to__item">
                      <v-checkbox
                        :disabled="disabled"
                        v-model="isAllCreate"
                        class="checkbox access-to__checkbox"
                        hide-details
                        :indeterminate="indeterminateAllCreate"
                        @change="selectAllCreate"
                      ></v-checkbox>
                    </td>
                    <td class="access-to__item">
                      <v-checkbox
                        :disabled="disabled"
                        v-model="isAllApprove"
                        class="checkbox access-to__checkbox"
                        hide-details
                        :indeterminate="indeterminateAllApprove"
                        @change="selectAllApprove"
                      ></v-checkbox>
                    </td>
                    <td class="access-to__item">
                      <v-checkbox
                        :disabled="disabled"
                        v-model="isAllPay"
                        class="checkbox access-to__checkbox"
                        hide-details
                        :indeterminate="indeterminateAllPay"
                        @change="selectAllPay"
                      ></v-checkbox>
                    </td>
                  </tr>
                  <tr v-for="(item, index) in accessTo" :key="index">
                    <td class="access-to__item-title">{{ item }}</td>
                    <td class="access-to__item">
                      <v-checkbox
                        :disabled="disabled"
                        v-model="r.accessTo.viewOnly"
                        class="checkbox access-to__checkbox"
                        :value="item"
                        hide-details
                        @change="changeViewOnly"
                      ></v-checkbox>
                    </td>
                    <td class="access-to__item">
                      <v-checkbox
                        :disabled="disabled"
                        v-model="r.accessTo.create"
                        class="checkbox access-to__checkbox"
                        :value="item"
                        hide-details
                        @change="changeCreate"
                      ></v-checkbox>
                    </td>
                    <td class="access-to__item">
                      <v-checkbox
                        :disabled="disabled"
                        v-model="r.accessTo.approve"
                        class="checkbox access-to__checkbox"
                        :value="item"
                        hide-details
                        @change="changeApprove"
                      ></v-checkbox>
                    </td>
                    <td class="access-to__item">
                      <v-checkbox
                        :disabled="disabled"
                        v-model="r.accessTo.pay"
                        class="checkbox access-to__checkbox"
                        :value="item"
                        hide-details
                        @change="changePay"
                      ></v-checkbox>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <v-divider class="roles__divider" inset vertical></v-divider>

            <div class="management d-flex flex-column">
              <div class="d-flex align-center mb-4">
                <div class="management__title">Management:</div>
                <div class="management__info-icon">
                  <img :src="require(`@/assets/info.svg`)" alt="info" />
                </div>
              </div>

              <div class="d-flex">
                <v-checkbox
                  :disabled="disabled"
                  v-model="isAllManagement"
                  class="checkbox management__checkbox management__checkbox--weight-600 mb-4"
                  label="All bellow"
                  hide-details
                  :indeterminate="indeterminateAllManagement"
                  @change="selectAllManagement"
                ></v-checkbox>
              </div>

              <div class="management__items">
                <div class="management__item" v-for="(item, index) in management" :key="index">
                  <v-checkbox
                    :disabled="disabled"
                    v-model="r.management"
                    class="checkbox management__checkbox mb-4"
                    :label="item"
                    :value="item"
                    hide-details
                    @change="changeManagement"
                  ></v-checkbox>
                </div>
              </div>

              <v-spacer></v-spacer>

              <div class="d-flex align-center">
                <v-checkbox
                  :disabled="disabled"
                  v-model="isFullAccess"
                  class="checkbox management__checkbox management__checkbox--weight-600"
                  label="Admin (Full access)"
                  hide-details
                  :indeterminate="indeterminateFullAccess"
                  @change="selectFullAccess"
                ></v-checkbox>
                <div class="management__warning-icon">
                  <img :src="require(`@/assets/warning.svg`)" alt="warning" />
                </div>
              </div>
            </div>
          </div>

          <div class="alter roles__alter">
            <div class="alter__icon">
              <img :src="require(`@/assets/info.svg`)" alt="info" />
            </div>
            <div class="alter__text">
              The user becomes a <span class="roles__alter-span">Power user</span> if at least ONE
              of the following roles is selected: Approve, View only, Configuration, Suppliers and
              Items, Budgets, Warehouse manager.
            </div>
          </div>
        </div>
      </template>
    </Accordion>

    <div class="d-flex justify-end px-6 invite-user__action" style="margin-top: 25px">
      <div style="margin-top: 25px">
        <button class="invite-user__button" @click="stepper('Invite User')">Invite User</button>
      </div>
    </div>
  </div>
</template>

<script>
import Accordion from '@/components/Accordion'

export default {
  name: 'Roles',
  components: {
    Accordion
  },

  props: ['roles', 'disabled'],
  data() {
    return {
      r: {
        accessTo: {
          viewOnly: [],
          create: [],
          approve: [],
          pay: []
        },
        management: []
      },

      isAllViewOnly: false,
      isAllCreate: false,
      isAllApprove: false,
      isAllPay: false,

      isAllManagement: false,

      isFullAccess: false,

      management: [
        'Configuration',
        'Suppliers and items',
        'Budgets',
        'Warehouse manager',
        'Reports'
      ],
      accessTo: [
        'Warehouse requests',
        'Purchase requests',
        'Request for proposals',
        'Purchase orders',
        'Receipts',
        'Invoices',
        'Expenses'
      ]
    }
  },
  computed: {
    indeterminateAllManagement() {
      return this.r.management.length > 0 && !this.selectedAllManagement()
    },
    indeterminateAllViewOnly() {
      return this.r.accessTo.viewOnly.length > 0 && !this.selectedAllViewOnly()
    },
    indeterminateAllCreate() {
      return this.r.accessTo.create.length > 0 && !this.selectedAllCreate()
    },
    indeterminateAllApprove() {
      return this.r.accessTo.approve.length > 0 && !this.selectedAllApprove()
    },
    indeterminateAllPay() {
      return this.r.accessTo.pay.length > 0 && !this.selectedAllPay()
    },
    indeterminateFullAccess() {
      return (
        (this.isAllViewOnly || this.isAllCreate || this.isAllApprove || this.isAllPay) &&
        !this.selectedFullAccess()
      )
    }
  },
  mounted() {
    this.r = this.roles
    this.isAllManagement = this.selectedAllManagement()
    this.isAllViewOnly = this.selectedAllViewOnly()
    this.isAllCreate = this.selectedAllCreate()
    this.isAllApprove = this.selectedAllApprove()
    this.isAllPay = this.selectedAllPay()
    this.isFullAccess = this.selectedFullAccess()
  },
  methods: {
    stepper(step) {
      this.$emit('stepper', step)
    },

    selectedAllManagement() {
      return this.management.length === this.r.management.length
    },
    selectAllManagement() {
      this.isAllManagement ? (this.r.management = this.management) : (this.r.management = [])

      this.change()
    },
    changeManagement() {
      this.change()

      this.isAllManagement = this.selectedAllManagement()
    },

    selectedAllViewOnly() {
      return this.accessTo.length === this.r.accessTo.viewOnly.length
    },
    selectAllViewOnly() {
      this.isAllViewOnly
        ? (this.r.accessTo.viewOnly = this.accessTo)
        : (this.r.accessTo.viewOnly = [])

      this.changeViewOnly()
    },
    changeViewOnly() {
      this.change()

      this.isFullAccess = this.selectedFullAccess()
      this.isAllViewOnly = this.selectedAllViewOnly()
    },

    selectedAllCreate() {
      return this.accessTo.length === this.r.accessTo.create.length
    },
    selectAllCreate() {
      this.isAllCreate ? (this.r.accessTo.create = this.accessTo) : (this.r.accessTo.create = [])

      this.changeCreate()
    },
    changeCreate() {
      this.change()

      this.isFullAccess = this.selectedFullAccess()
      this.isAllCreate = this.selectedAllCreate()
    },

    selectedAllApprove() {
      return this.accessTo.length === this.r.accessTo.approve.length
    },
    selectAllApprove() {
      this.isAllApprove ? (this.r.accessTo.approve = this.accessTo) : (this.r.accessTo.approve = [])

      this.changeApprove()
    },
    changeApprove() {
      this.change()

      this.isFullAccess = this.selectedFullAccess()
      this.isAllApprove = this.selectedAllApprove()
    },

    selectedAllPay() {
      return this.accessTo.length === this.r.accessTo.pay.length
    },
    selectAllPay() {
      this.isAllPay ? (this.r.accessTo.pay = this.accessTo) : (this.r.accessTo.pay = [])

      this.changePay()
    },
    changePay() {
      this.change()

      this.isFullAccess = this.selectedFullAccess()
      this.isAllPay = this.selectedAllPay()
    },

    selectedFullAccess() {
      return (
        this.selectedAllViewOnly() &&
        this.selectedAllCreate() &&
        this.selectedAllApprove() &&
        this.selectedAllPay()
      )
    },
    selectFullAccess() {
      if (this.isFullAccess) {
        this.isAllViewOnly = true
        this.isAllCreate = true
        this.isAllApprove = true
        this.isAllPay = true
      } else {
        this.isAllViewOnly = false
        this.isAllCreate = false
        this.isAllApprove = false
        this.isAllPay = false
      }

      this.selectAllViewOnly()
      this.selectAllCreate()
      this.selectAllApprove()
      this.selectAllPay()
    },

    change() {
      this.$emit('change', this.r)
    }
  }
}
</script>
