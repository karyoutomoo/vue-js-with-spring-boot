import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    person: [],
    onePerson: {},
    vehicle: []
  },
  mutations: {
    assignPerson: (state, response) => {
      state.person = response
    },
    assignOnePerson: (state, response) => {
      state.onePerson = response
    },
    assignVehicle: (state, response) => {
      state.vehicle = response
    }
  },
  getters: {
    getPerson: (state) => {
      return state.person
    },
    getOnePerson: (state) => {
      return state.onePerson
    },
    getVehicle: (state) => {
      return state.vehicle
    }
  },
  actions: {
    doGetPerson: ({commit}) => {
      axios.get('/api/person')
        .then(response => {
          commit('assignPerson', response.data)
        })
        .catch(error => {
          console.log('Error : ' + error)
        })
    },
    doGetOnePerson: ({commit}, personId) => {
      axios.get('/api/person/' + personId)
        .then(response => {
          commit('assignOnePerson', response.data)
        })
        .catch(error => {
          console.log('Error : ' + error)
        })
    },
    doGetVehicle: ({commit}, personId) => {
      axios.get('/api/person/' + personId + '/vehicle')
        .then(response => {
          commit('assignVehicle', response.data)
        })
        .catch(error => {
          console.log('Error : ' + error)
        })
    }
  }
})

export default store
