import Vue from 'vue'
import Vuex from 'vuex'
import task from './modules/task.js'
import { timestampToDate  } from '@js/utils/utils'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    task
  },
  state: {
    userInfo: {},
    userToken: {},
    coachInfo: {}
  },
  mutations: {
    saveCoachInfo(state, info) {
      state.coachInfo = info
    },
    saveUserInfo(state, info) {
      state.userInfo = info;
    },
    saveUserToken(state, info) {
      state.userToken = info;
    }
  },
  actions: {
    logout({ commit }) {
      tools.clearLocalStorage('userInfo');
      tools.clearLocalStorage('userToken');
      tools.clearLocalStorage('coachInfo');

      location.reload();
    },
    initInfo({ commit, state }) {
      
      return new Promise((resolve, reject) => {
        const userInfo = tools.getLocalStorage('userInfo');
        const userToken = tools.getLocalStorage('userToken');
        const coachInfo = tools.getLocalStorage('coachInfo');
        let tasksList = tools.getLocalStorage('tasksList');
        const currentTask = tools.getLocalStorage('currentTask') || {};
        
        tasksList = tasksList && tasksList.length ? tasksList : [{
            name: '每天',
            resource: 1,
            resourceStr: '每天',
            time: ['19:00', '20:00'],
            robTime: ['20:00', '22:00'],
            taskStatus: 0,
            date: timestampToDate('yyyy-MM-DD', +new Date() + (1000 * 60 * 60 * 24)),
            id: '1111'
        }]
        
        if(Object.keys(state.userInfo).length) {
          resolve();
        } else if(Object.keys(userToken).length && Object.keys(userInfo).length) {
          commit('saveUserInfo', userInfo)
          commit('saveUserToken', userToken)
          commit('saveCoachInfo', coachInfo)
          commit('task/addTask', tasksList);
          commit('task/chageCurrentTask', currentTask);

          // store.dispatch('task/initTask')
          resolve();
        } else {
          reject();
        }
      })
      
    },
    
  }
})
