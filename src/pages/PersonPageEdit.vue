<template>
  <div style="margin-left: 300px; margin-right: 300px;">
    <div class="field">
      <label class="label">Name</label>
      <div class="control">
        <input v-model="person.name" class="input" type="text" placeholder="Name">
      </div>
    </div>
    <div class="field">
      <label class="label">Age</label>
      <div class="control">
        <input v-model="person.age" class="input" type="text" placeholder="Age">
      </div>
    </div>
    <div class="field">
      <label class="label">Address</label>
      <div class="control">
        <input v-model="person.address" class="input" type="text" placeholder="Address">
      </div>
    </div>
    <a @click="putPerson(person.id)" class="button is-primary">SUBMIT PERSON</a>
  </div>
</template>

<script>
    import router from '../router'
    import axios from 'axios'
    export default {
      name: 'person-page-edit',
      data () {
        return {
          id: ''
        }
      },
      computed: {
        person: function () {
          return this.$store.getters.getOnePerson
        }
      },
      created () {
        this.id = this.$route.params.id
      },
      mounted () {
        this.getOnePerson(this.id)
      },
      methods: {
        getOnePerson: function (id) {
          this.$store.dispatch('doGetOnePerson', id)
        },
        putPerson: function (personId) {
          axios.put('/api/person/' + personId, {
            name: this.person.name,
            age: this.person.age,
            address: this.person.address
          }, {
            headers: {
              'Content-type': 'application/json'
            }
          })
            .then(response => {
              router.go(-1)
            })
            .catch(error => {
              console.log('Error : ' + error)
            })
        }
      }
    }
</script>

<style scoped>

</style>
