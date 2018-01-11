<template>
  <div style="margin-left: 200px; margin-right: 200px">
    <div class="field">
      <label class="label">Name</label>
      <div class="control">
        <input v-model="personName" class="input" type="text" placeholder="Name">
      </div>
    </div>
    <div class="field">
      <label class="label">Age</label>
      <div class="control">
        <input v-model="personAge" class="input" type="text" placeholder="Age">
      </div>
    </div>
    <div class="field">
      <label class="label">Address</label>
      <div class="control">
        <input v-model="personAddress" class="input" type="text" placeholder="Address">
      </div>
    </div>
    <a @click="postPerson" class="button is-primary">SUBMIT PERSON</a>
    <br>
    <br>
    <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
      <thead>
        <th>Name</th>
        <th>Age</th>
        <th>Address</th>
        <th>Edit</th>
        <th>Delete</th>
        <th>Add Vehicle</th>
      </thead>
      <tbody>
        <tr v-for="item in person" :key="item.id">
          <td>{{ item.name }}</td>
          <td>{{ item.age }}</td>
          <td>{{ item.address }}</td>
          <td><router-link :to="{ name: 'PersonPageEdit', params: { id: item.id } }">Edit</router-link></td>
          <td><a href="#" @click="deletePerson(item.id)">Delete</a></td>
          <td>
            <div class="dropdown is-hoverable">
            <div class="dropdown-trigger">
              <button class="button is-primary" aria-haspopup="true" aria-controls="dropdown-menu4">
                <span>Add Vehicle</span>
                <span class="icon is-small">
        <i class="fas fa-angle-down" aria-hidden="true"></i>
      </span>
              </button>
            </div>
            <div class="dropdown-menu" id="dropdown-menu4" role="menu">
              <div class="dropdown-content">
                <div class="dropdown-item">
                  <input v-model="vehicle" class="input" type="text" placeholder="Vehicle">
                  <a @click="addVehicle(item.id)" class="button is-primary">ADD</a>
                </div>
              </div>
            </div>
          </div>
            <div>
              <a href="#" @click="getVehicle(item.id)">LOAD VEHICLE</a>
              <ul>
                <li v-for="itemVehicle in vehicles">
                  {{ itemVehicle.vehicleType }}
                </li>
              </ul>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
    import axios from 'axios'
    export default {
      name: 'customer-page',
      data () {
        return {
          personId: '',
          personName: '',
          personAge: '',
          personAddress: '',
          vehicle: ''
        }
      },
      mounted () {
        this.getPerson()
      },
      computed: {
        person: function () {
          return this.$store.getters.getPerson
        },
        vehicles: function () {
          return this.$store.getters.getVehicle
        }
      },
      methods: {
        getPerson: function () {
          this.$store.dispatch('doGetPerson')
        },
        postPerson: function () {
          axios.post('/api/person', {
            name: this.personName,
            age: this.personAge,
            address: this.personAddress
          }, {
            headers: {
              'Content-type': 'application/json'
            }
          })
            .then(response => {
              this.getPerson()
              this.personName = ''
              this.personAge = ''
              this.personAddress = ''
            })
            .catch(error => {
              console.log('Error : ' + error)
            })
        },
        deletePerson: function (personId) {
          axios.delete('/api/person/' + personId, {
          })
            .then(response => {
              this.getPerson()
            })
            .catch(error => {
              console.log('Error : ' + error)
            })
        },
        addVehicle: function (personId) {
          axios.post('/api/person/' + personId + '/vehicle', {
            vehicleType: this.vehicle
          }, {
            headers: {
              'Content-type': 'application/json'
            }
          })
            .then(response => {
              this.getPerson()
              this.vehicle = ''
            })
            .catch(error => {
              console.log('Error : ' + error)
            })
        },
        getVehicle: function (personId) {
          return this.$store.dispatch('doGetVehicle', personId)
        }
      }
    }
</script>

<style scoped>

</style>
