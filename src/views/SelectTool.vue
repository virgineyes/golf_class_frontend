<template>
  <div class="hello">
    <img id="logo" alt="logo" src="../assets/logo.png">
    <h1>{{ msg }}</h1>
    <p style="color:red">{{ title }}</p>
    <p>{{ subTitle }}</p>
    
    <div >
      <span>姓名：</span>
      <el-input class="flex-container" v-model="name" placeholder="請輸入姓名"></el-input>
    </div>
    
    <div class="flex-container">
      <div id="box">
        <div v-for="course in courses_sat" :key="course.id">
          <label><font-awesome-icon icon="golf-ball" /> {{course.classDate}} ({{course.weekDate}}) - {{course.coach}} (剩餘：{{course.remindAccount}}）</label>
          <input type="checkbox" v-model="checkList" :value="course" @change="check()"/>
        </div>
      </div>
      <div id="box">
        <div v-for="course in courses_sun" :key="course.id">
          <label><font-awesome-icon icon="golf-ball" /> {{course.classDate}} ({{course.weekDate}}) - {{course.coach}} (剩餘：{{course.remindAccount}}）</label>
          <input type="checkbox" v-model="checkList" :value="course" @change="check()">
        </div>
      </div>
    </div>
    <h6>
      <el-button type="success" @click="submit" :disabled="!confirm_disabled">報名送出</el-button>
    </h6>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      msg: '無尾熊＆老鷹球場報名表',
      name: '',
      checkList: [],
      checked: [],
      courses_sat: [],
      courses_sun: [],
      title: '',
      subTitle: ''
    }
  },
  created() {
    getClass(this)
    getTitle(this)
  },
  computed: {
    confirm_disabled() {
      return this.checkList.length >= 1 && this.checkList.length < 5
    }
  },
  methods: {
    ...mapActions([
        'toggleLoading'
    ]),
    check() {
      if (this.checkList.length > 4) {
        this.$showErrorDialog(this, "<b>至多選取4次</b>")
      }
    },
    submit() {
      var vueInstance = this
      const axiosInstance = vueInstance.$buildAxiosInstance()
      if (vueInstance.name == "" || this.name == undefined) {
        vueInstance.$showErrorDialog(vueInstance, "<b>請輸入姓名</b>")
      } else {
        var data = []
        vueInstance.checkList.forEach(temp => {
          data.push(temp.uuid)
        })
        vueInstance.checkList = []
        vueInstance.toggleLoading(true)
        axiosInstance.put('/golf/update/' + vueInstance.name, JSON.stringify(data)).then(response => {
          vueInstance.toggleLoading(false)
          vueInstance.$showDialog(vueInstance, response.data.content)
          getClass(vueInstance)
        }).catch(error => {
          console.log(error)
          vueInstance.toggleLoading(false)
          vueInstance.$showErrorDialog(vueInstance, "選課失敗，請重新選取")
        })
      }
    }
  }
}

// eslint-disable-next-line no-unused-vars
function getClass(vueInstance) {
  vueInstance.courses_sat = []
  vueInstance.courses_sun = []
  const axiosInstance = vueInstance.$buildAxiosInstance()
  vueInstance.toggleLoading(true)
  axiosInstance.get('/golf/getAll/6/true').then(response => {
    vueInstance.toggleLoading(false)
    response.data._embedded.golfClassResources.forEach(c => {
      c.weekDate = "六"
      vueInstance.courses_sat.push(c)
    })
    vueInstance.courses_sat = vueInstance.courses_sat.sort(function (a, b) {
      return new Date(a.classDate) > new Date(b.classDate) ? 1 : -1;
    });
  }).catch(error => {
      console.log(error)
      vueInstance.toggleLoading(false)
      vueInstance.$showErrorDialog(vueInstance, error.response.data.message)
  })

  axiosInstance.get('/golf/getAll/0/true').then(response => {
    vueInstance.toggleLoading(false)
    response.data._embedded.golfClassResources.forEach(c => {
      c.weekDate = "日"
      vueInstance.courses_sun.push(c)
    })
    vueInstance.courses_sun = vueInstance.courses_sun.sort(function (a, b) {
      return new Date(a.classDate) > new Date(b.classDate) ? 1 : -1;
    });
  }).catch(error => {
    console.log(error)
    vueInstance.toggleLoading(false)
    vueInstance.$showErrorDialog(vueInstance, error.response.data.message)
  })
}

function getTitle(vueInstance) {
  const axiosInstance = vueInstance.$buildAxiosInstance()
  vueInstance.toggleLoading(true)
  axiosInstance.get('/title/selectTool').then(response => {
    vueInstance.toggleLoading(false)
    vueInstance.title = response.data._embedded.titleResources.title
    vueInstance.subTitle = response.data._embedded.titleResources.subTitle
  }).catch(error => {
      console.log(error)
      vueInstance.toggleLoading(false)
      vueInstance.$showErrorDialog(vueInstance, error.response.data.message)
  })
}
</script>

<style scoped>
  .flex-container {
    display: inline-flex;
    flex-wrap: wrap;
  }

  #box {
    text-align: left;
    padding: 0 0 0 50px;
    width: 300px;
    margin: 15px;
  }

  .el-input {
    width: 180px;
  }
</style>

