<template>
  <div>
    <h1>後台維護</h1>
    <div v-show="idRegistrations">
        <el-table :data="registrations" :default-sort="{prop: 'lastModified', order: 'descending'}" style="width: 100%" highlight-current-row border>
            <el-table-column min-width="50" prop="classDate" label="課程日期" sortable></el-table-column>
            <el-table-column min-width="50" prop="coach" label="教練" sortable></el-table-column>
            <el-table-column min-width="50" prop="registrationName" label="報名者" sortable></el-table-column>
            <el-table-column min-width="50" prop="registrationcreated" label="報名時間" sortable></el-table-column>
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
  import { mapActions } from 'vuex'
  import moment from 'moment'
  export default {
    data() {
      return {
        registrations: []
      }
    },
    created() {
      var vueInstance = this
      const axiosInstance = vueInstance.$buildAxiosInstance()
      vueInstance.toggleLoading(true)
      axiosInstance.get('/golf/getAll/').then(response => {
        response.data._embedded.golfClassResources.forEach(golfClass => {
          golfClass.registrations.forEach(registration => {
            var data = Object.assign({}, golfClass);
            data.registrationName = registration.name
            data.registrationUuid = registration.uuid
            data.registrationcreated = moment(registration.created).format("YYYY-MM-DD HH:mm:ss")
            vueInstance.registrations.push(data)
          })
        });
        vueInstance.toggleLoading(false)
      }).catch(error => {
        console.log(error)
        vueInstance.toggleLoading(false)
        vueInstance.$showErrorDialog(vueInstance, error.response.data.message)
      })
    },
    computed: {
      idRegistrations() {
        return this.registrations.length > 0
      }
    },
    methods: {
      ...mapActions([
          'toggleLoading'
      ]),
      deleteClass(index, row) {
        console.log(index)
        var vueInstance = this
        const axiosInstance = vueInstance.$buildAxiosInstance()
        vueInstance.toggleLoading(true)
        axiosInstance.delete('/golf/delete/registration/' + row.uuid + '/' + row.registrationUuid).then(response => {
          console.log(response)
          vueInstance.registrations.splice(index, 1); 
          vueInstance.toggleLoading(false)
        }).catch(error => {
          console.log(error)
          vueInstance.toggleLoading(false)
          vueInstance.$showErrorDialog(vueInstance, error.response.data.message)
        })
      }
    }
  }
</script>
