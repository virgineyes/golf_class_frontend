<template>
  <div>
    <h1>後台維護</h1>
    <h1>
      <el-button type="primary" @click="router">前往報表</el-button>
    </h1>
    <div id="title">
      <span>主標題：</span>
      <el-input v-model="title" placeholder="請輸入標題" style="width:800px;" type="textarea"></el-input>
    </div>
    <div id="title">
      <span>副標題：</span>
      <el-input v-model="subTitle" placeholder="請輸入副標題" style="width:800px" type="textarea"></el-input>
    </div>
    <div id="title">
      <el-button type="success" @click="addTitle">更新標題</el-button>
    </div>
    <div class="flex-container">
      <div id="box">
        <span>日期：</span>
        <el-date-picker
          @change="selectClassDate"
          v-model="classDate"
          format="yyyy-MM-dd" 
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="請選擇日期"
        >
        </el-date-picker>
      </div>
      <div id="box">
        <span>教練：</span>
        <el-input v-model="coach" placeholder="請輸入教練姓名"></el-input>
      </div>
      <div id="box">
        <span>數量：</span>
        <el-input v-model="remindAccount" placeholder="請輸入數量"></el-input>
      </div>
    </div>
    <h6>
      <el-button type="success" @click="submit">新增</el-button>
    </h6>
    <div v-show="isClasses">
      <el-table :data="classes" :default-sort="{prop: 'lastModified', order: 'descending'}" style="width: 100%" highlight-current-row border>
          <el-table-column min-width="50" prop="classDate" label="課程日期" sortable></el-table-column>
          <el-table-column min-width="50" prop="coach" label="教練" sortable></el-table-column>
          <el-table-column min-width="50" prop="remindAccount" label="數量" sortable></el-table-column>
          <el-table-column min-width="50" prop="weekDate" label="星期幾" sortable></el-table-column>
          <el-table-column min-width="20">
              <template slot-scope="scope">
                  <el-button type="primary" 
                  @click="deleteClass(scope.$index, scope.row)">刪除</el-button>
              </template>
          </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      classDate: "",
      coach: "",
      remindAccount: "",
      weekDate: "",
      classes: [],
      title: '',
      subTitle: ''
    };
  },
  created() {
    getAllClass(this)
    getTitle(this)
  },
  computed: {
    isClasses() {
      return this.classes.length >= 1
    }
  },
  methods: {
    ...mapActions(["toggleLoading"]),
    selectClassDate(classDate){
      this.classDate = classDate
      this.weekDate = new Date(classDate).getDay()
    },
    submit() {
      console.log(this.weekDate)
      if (this.classDate == "") {
        this.$showErrorDialog(this, "請選擇日期")
      } else if (this.coach == "") {
        this.$showErrorDialog(this, "請輸入教練姓名")
      } else if (this.remindAccount == "") {
        this.$showErrorDialog(this, "請輸入數量")
      }  else if (this.weekDate != 6 && this.weekDate != 0) {
        this.$showErrorDialog(this, "日期只能選周六與周日")
      } else {
        var vueInstance = this
        const axiosInstance = vueInstance.$buildAxiosInstance()
        vueInstance.toggleLoading(true)
        axiosInstance.post('/golf/add/', JSON.stringify({
          classDate: this.classDate,
          coach: this.coach,
          remindAccount: this.remindAccount,
          weekDate: this.weekDate,
          additional: true,
        })).then(response => {
          var golfClass = response.data
          if (golfClass.weekDate == 6) {
            golfClass.weekDate = "六"
          } else if (golfClass.weekDate == 0) {
            golfClass.weekDate = "日"
          } 
          vueInstance.classes.push(golfClass)
          vueInstance.toggleLoading(false)
          console.log(response)
        }).catch(error => {
            console.log(error)
            vueInstance.toggleLoading(false)
            vueInstance.$showErrorDialog(vueInstance, error.response.data.message)
        })
      }
    },
    addTitle() {
      var vueInstance = this
        const axiosInstance = vueInstance.$buildAxiosInstance()
        vueInstance.toggleLoading(true)
        axiosInstance.post('title/add', JSON.stringify({
          pageName: "selectTool",
          title: this.title,
          subTitle: this.subTitle
        })).then(response => {
          vueInstance.toggleLoading(false)
          console.log(response)
        }).catch(error => {
            console.log(error)
            vueInstance.toggleLoading(false)
            vueInstance.$showErrorDialog(vueInstance, error.response.data.message)
        })
    },
    deleteClass(index, row) {
      var vueInstance = this
      if (row.registrations.length > 0) {
        this.$showErrorDialog(this, "此課程已經被家長選取，請勿隨意刪除")
      } else {
        const axiosInstance = vueInstance.$buildAxiosInstance()
        vueInstance.toggleLoading(true)
        axiosInstance.delete('/golf/delete/' + row.uuid).then(response => {
          console.log(response)
          vueInstance.toggleLoading(false)
          vueInstance.classes.splice(index, 1)
        }).catch(error => {
            console.log(error)
            vueInstance.toggleLoading(false)
            vueInstance.$showErrorDialog(vueInstance, error.response.data.message)
        })
      }
    },
    router() {
      this.$router.push('report')
    }
  },
  
};

// eslint-disable-next-line no-unused-vars
function getAllClass(vueInstance) {
  const axiosInstance = vueInstance.$buildAxiosInstance()
  vueInstance.toggleLoading(true)
  axiosInstance.get('/golf/getAll/').then(response => {
    vueInstance.toggleLoading(false)
    response.data._embedded.golfClassResources.forEach(golfClass => {
      if (golfClass.weekDate == 6) {
        golfClass.weekDate = "六"
      } else if (golfClass.weekDate == 0) {
        golfClass.weekDate = "日"
      }
      vueInstance.classes.push(golfClass) 
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
    console.log(response)
    vueInstance.title = response.data.title
    vueInstance.subTitle = response.data.subTitle
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
  margin: 15px;
}

#title {
  margin: 15px;
}

.el-input {
  width: 180px;
}
</style>
