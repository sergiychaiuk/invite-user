<template>
  <div>
    <Accordion :precoroSelected="precoroSelected">
      <template #precoro>
        <div class="available-document-custom-fields">
          <div class="d-flex">
            <v-checkbox
              v-model="selectAll"
              class="checkbox mb-6"
              label="Select All Document Custom Fields"
              hide-details
              :indeterminate="indeterminateSelectAll"
              @change="selectAllDocumentCustomFields"
            ></v-checkbox>
          </div>

          <div class="available-document-custom-fields__title mb-2">
            Available Document Custom Fields
          </div>

          <div class="d-flex">
            <div class="available-document-custom-fields__item mr-12">
              <div class="available-document-custom-fields__subtitle">Classes</div>

              <v-treeview
                class="treeview"
                item-key="name"
                v-model="adcf.classes"
                :items="classes"
                selectable
                return-object
                expand-icon="$angleDown"
                selected-color="#415ada"
                open-all
                @input="changeClasses"
              ></v-treeview>
            </div>

            <div class="available-document-custom-fields__item mr-12">
              <div class="available-document-custom-fields__subtitle">Departments</div>

              <v-treeview
                class="treeview"
                item-key="name"
                v-model="adcf.departments"
                :items="departments"
                selectable
                return-object
                expand-icon="$angleDown"
                selected-color="#415ada"
                open-all
                @input="changeDepartments"
              ></v-treeview>
            </div>

            <div class="available-document-custom-fields__item mr-12">
              <div class="available-document-custom-fields__subtitle">DCF 3</div>

              <v-treeview
                class="treeview"
                item-key="name"
                v-model="adcf.dcf3"
                :items="dcf3"
                selectable
                return-object
                expand-icon="$angleDown"
                selected-color="#415ada"
                open-all
                @input="changeDCF3"
              ></v-treeview>
            </div>
          </div>
        </div>
      </template>
    </Accordion>

    <div class="d-flex justify-end px-6 invite-user__action" style="margin-top: 25px">
      <div style="margin-top: 25px">
        <button class="invite-user__button" @click="stepper(4)">Next Step</button>
      </div>
    </div>
  </div>
</template>

<script>
import Accordion from '@/components/Accordion'

export default {
  name: 'AvailableDocumentsCustomFields',
  components: {
    Accordion
  },

  props: ['availableDocumentsCustomFields'],
  data() {
    return {
      adcf: {
        classes: [],
        departments: [],
        dcf3: []
      },
      classes: [
        {
          name: 'Select All',
          children: [
            {
              name: 'Class 1',
              children: []
            },
            {
              name: 'Class 2',
              children: []
            },
            {
              name: 'Class 3',
              children: []
            },
            {
              name: 'Class 4',
              children: []
            }
          ]
        }
      ],
      departments: [
        {
          name: 'Select All',
          children: [
            {
              name: 'Developers',
              children: [
                {
                  name: '2nd Sub-Developers',
                  children: [
                    {
                      name: '3d Sub-Developers',
                      children: [
                        {
                          name: 'iOS & Android Devs',
                          children: []
                        },
                        {
                          name: '4th Sub-Developers',
                          children: []
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              name: 'Class 3',
              children: []
            },
            {
              name: 'Class 4',
              children: []
            }
          ]
        }
      ],
      dcf3: [
        {
          name: 'Select All',
          children: [
            {
              name: 'Class 1',
              children: []
            },
            {
              name: 'Class 2',
              children: []
            },
            {
              name: 'Class 3',
              children: []
            },
            {
              name: 'Class 4',
              children: []
            }
          ]
        }
      ],
      allParentNodes: true,
      selectAll: false
    }
  },
  mounted() {
    this.adcf = this.availableDocumentsCustomFields
    this.selectAll = this.allDocumentCustomFields()
  },
  computed: {
    indeterminateSelectAll() {
      return (
        (this.adcf.classes.length > 0 ||
          this.adcf.departments.length > 0 ||
          this.adcf.dcf3.length > 0) &&
        !this.allDocumentCustomFields()
      )
    },

    precoroSelected() {
      return (
        this.adcf.classes.length + this.adcf.departments.length + this.adcf.dcf3.length || 'Not'
      )
    },

    _classes() {
      const replaceChildren = (obj, parent) => {
        const clone = Object.assign({}, obj)
        delete clone.children
        if (parent) clone.parent = parent
        return clone
      }

      const addItems = (arr, parent) => {
        const items = arr.reduce((acc, x) => {
          acc.push(replaceChildren(x, parent))

          if (x.children) {
            acc.push(addItems(x.children, x.name))
          }
          return acc
        }, [])

        return items.flat()
      }

      return addItems(this.classes).reduce((acc, x) => {
        acc[x.name] = x
        return acc
      }, {})
    },
    _selectionClasses() {
      const proxy = {}
      const addParents = (x, all) => {
        const parentName = this._classes[x.name].parent
        if (parentName) {
          if (all) addParents(this._classes[parentName], this.allParentNodes)
          proxy[parentName] = this._classes[parentName]
        }
      }
      this.adcf.classes.forEach(x => {
        addParents(x, this.allParentNodes)
        proxy[x.name] = x
      })
      return Object.values(proxy)
    },

    _departments() {
      const replaceChildren = (obj, parent) => {
        const clone = Object.assign({}, obj)
        delete clone.children
        if (parent) clone.parent = parent
        return clone
      }

      const addItems = (arr, parent) => {
        const items = arr.reduce((acc, x) => {
          acc.push(replaceChildren(x, parent))

          if (x.children) {
            acc.push(addItems(x.children, x.name))
          }
          return acc
        }, [])

        return items.flat()
      }

      return addItems(this.departments).reduce((acc, x) => {
        acc[x.name] = x
        return acc
      }, {})
    },
    _selectionDepartments() {
      const proxy = {}
      const addParents = (x, all) => {
        const parentName = this._departments[x.name].parent
        if (parentName) {
          if (all) addParents(this._departments[parentName], this.allParentNodes)
          proxy[parentName] = this._departments[parentName]
        }
      }
      this.adcf.departments.forEach(x => {
        addParents(x, this.allParentNodes)
        proxy[x.name] = x
      })
      return Object.values(proxy)
    },

    _dcf3() {
      const replaceChildren = (obj, parent) => {
        const clone = Object.assign({}, obj)
        delete clone.children
        if (parent) clone.parent = parent
        return clone
      }

      const addItems = (arr, parent) => {
        const items = arr.reduce((acc, x) => {
          acc.push(replaceChildren(x, parent))

          if (x.children) {
            acc.push(addItems(x.children, x.name))
          }
          return acc
        }, [])

        return items.flat()
      }

      return addItems(this.dcf3).reduce((acc, x) => {
        acc[x.name] = x
        return acc
      }, {})
    },
    _selectiondcf3() {
      const proxy = {}
      const addParents = (x, all) => {
        const parentName = this._dcf3[x.name].parent
        if (parentName) {
          if (all) addParents(this._dcf3[parentName], this.allParentNodes)
          proxy[parentName] = this._dcf3[parentName]
        }
      }
      this.adcf.dcf3.forEach(x => {
        addParents(x, this.allParentNodes)
        proxy[x.name] = x
      })
      return Object.values(proxy)
    }
  },
  methods: {
    allDocumentCustomFields() {
      return (
        this.allSelect(this._classes, this._selectionClasses) &&
        this.allSelect(this._departments, this._selectionDepartments) &&
        this.allSelect(this._dcf3, this._selectiondcf3)
      )
    },
    selectAllDocumentCustomFields() {
      if (this.selectAll) {
        this.adcf.classes.push({ name: 'Select All' })
        this.adcf.departments.push({ name: 'Select All' })
        this.adcf.dcf3.push({ name: 'Select All' })
      } else {
        this.adcf.classes = []
        this.adcf.departments = []
        this.adcf.dcf3 = []
      }

      this.availableDocumentsCustomFieldsChange()
    },
    allSelect(items, selections) {
      return Object.keys(items).length === selections.length
    },
    changeClasses() {
      this.availableDocumentsCustomFieldsChange()

      this.selectAll = this.allDocumentCustomFields()
    },
    changeDepartments() {
      this.availableDocumentsCustomFieldsChange()

      this.selectAll = this.allDocumentCustomFields()
    },
    changeDCF3() {
      this.availableDocumentsCustomFieldsChange()

      this.selectAll = this.allDocumentCustomFields()
    },
    stepper(step) {
      this.$emit('stepper', step)
    },
    availableDocumentsCustomFieldsChange() {
      this.$emit('change', this.adcf)
    }
  }
}
</script>
