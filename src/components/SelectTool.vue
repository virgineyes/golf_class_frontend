<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div id="box">
      <div v-for="course in courses" :key="course.id">
        <label><font-awesome-icon icon="golf-ball" /> {{course.date}} ({{course.weekDate}}) - {{course.coach}}</label>
        <input type="checkbox" v-model="checked" :value="course"/>
      </div>
    </div>
    <el-button type="success" plain>報名送出</el-button>
  </div>
</template>

<script>
export default {
  data() {
  return {
      msg: '無尾熊＆老鷹球場報名表',
      checked: [],
      courses: [
        {
          id: '1',
          date: '3月6日',
          weekDate: '六',
          coach: 'Peter'
        },
        {
          id: '2',
          date: '3月7日',
          weekDate: '日',
          coach: 'Max'
        },
        {
          id: '3',
          date: '3月20日',
          weekDate: '六',
          coach: 'Peter'
        },
        {
          id: '4',
          date: '3月21日',
          weekDate: '日',
          coach: 'Max'
        },
        {
          id: '5',
          date: '3月27日',
          weekDate: '六',
          coach: 'Peter'
        },
        {
          id: '6',
          date: '3月28日',
          weekDate: '日',
          coach: 'Max'
        },
      ]
    }
  },
}
</script>

<style scoped>
  #box {
    text-align: left;
    /* padding: 0 0 0 100px; */
    width: 180px;
    margin:0px auto;
  }
</style>
