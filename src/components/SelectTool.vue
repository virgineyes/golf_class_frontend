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
          <label><font-awesome-icon icon="golf-ball" /> {{course.date}} ({{course.weekDate}}) - {{course.coach}}</label>
          <input type="checkbox" v-model="checked" :value="course"/>
        </div>
      </div>
      <div id="box">
        <div v-for="course in courses_sun" :key="course.id">
          <label><font-awesome-icon icon="golf-ball" /> {{course.date}} ({{course.weekDate}}) - {{course.coach}}</label>
          <input type="checkbox" v-model="checked" :value="course"/>
        </div>
      </div>
    </div>
    <h6>
      <el-button type="success" plain>報名送出</el-button>
    </h6>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: '無尾熊＆老鷹球場報名表',
      name: '',
      checked: [],
      courses_sat: [
        {
          id: '1',
          date: '3月6日',
          weekDate: '六',
          coach: 'Peter'
        },
        {
          id: '3',
          date: '3月20日',
          weekDate: '六',
          coach: 'Peter'
        },
        {
          id: '5',
          date: '3月27日',
          weekDate: '六',
          coach: 'Peter'
        },
        {
          id: '7',
          date: '4月10日',
          weekDate: '六',
          coach: 'Peter'
        },
        {
          id: '9',
          date: '4月24日',
          weekDate: '六',
          coach: 'Peter'
        },
        {
          id: '11',
          date: '5月1日',
          weekDate: '六',
          coach: 'Peter'
        },
        {
          id: '13',
          date: '5月22日',
          weekDate: '六',
          coach: 'Peter'
        },
      ],
      courses_sun: [
        {
          id: '2',
          date: '3月7日',
          weekDate: '日',
          coach: 'Max'
        },
        {
          id: '4',
          date: '3月21日',
          weekDate: '日',
          coach: 'Max'
        },
        {
          id: '6',
          date: '3月28日',
          weekDate: '日',
          coach: 'Max'
        },
        {
          id: '8',
          date: '4月11日',
          weekDate: '日',
          coach: 'Max'
        },
        {
          id: '10',
          date: '4月25日',
          weekDate: '日',
          coach: 'Max'
        },
        {
          id: '12',
          date: '5月2日',
          weekDate: '日',
          coach: 'Max'
        },
        {
          id: '14',
          date: '5月23日',
          weekDate: '日',
          coach: 'Max'
        },
      ]
    }
  },
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
    width: 180px;
    margin: 15px;
  }

  .el-input {
    width: 180px;
  }
</style>
