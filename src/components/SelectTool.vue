<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>3/1(一)中午12:00開放登記(每人至少2次、至多4次); 若欲下場超過4次者，如有餘額，可於第二階段登記,，第二階段開放登記時間為3/3(三)中午12:00</p>
    <p>*春季班費用已包含2次實戰課費用，登記超過2次者，每次費用為2600元(含大九洞果嶺費)。</p>
    
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
      courses_sun: []
    }
  },
  created() {
    var vueInstance = this
    const axiosInstance = vueInstance.$buildAxiosInstance()
    vueInstance.toggleLoading(true)
    axiosInstance.get('/golf/getAll/Sat/').then(response => {
      vueInstance.courses_sat = response.data._embedded.golfClassResources
      axiosInstance.get('/golf/getAll/Sun/').then(response => {
        vueInstance.courses_sun = response.data._embedded.golfClassResources
        vueInstance.toggleLoading(false)
      }).catch(error => {
          console.log(error)
          vueInstance.toggleLoading(false)
          vueInstance.$showErrorDialog(vueInstance, error.response.data.message)
      })
    }).catch(error => {
        console.log(error)
        vueInstance.toggleLoading(false)
        vueInstance.$showErrorDialog(vueInstance, error.response.data.message)
    })
  },
  computed: {
    confirm_disabled() {
      return this.checkList.length < 5
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

          const axiosInstance = vueInstance.$buildAxiosInstance()
          axiosInstance.get('/golf/getAll/Sat/').then(response => {
            vueInstance.courses_sat = response.data._embedded.golfClassResources
            axiosInstance.get('/golf/getAll/Sun/').then(response => {
              vueInstance.courses_sun = response.data._embedded.golfClassResources
            }).catch(error => {
                console.log(error)
                vueInstance.$showErrorDialog(vueInstance, error.response.data.message)
            })
          }).catch(error => {
              console.log(error)
              vueInstance.$showErrorDialog(vueInstance, error.response.data.message)
          })
          
        }).catch(error => {
          console.log(error)
          vueInstance.toggleLoading(false)
          vueInstance.$showErrorDialog(vueInstance, error.response.data.message)
        })
      }
    }
  }
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
