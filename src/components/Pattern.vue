<template>
    <div class="pattern">   
        <table>
            <thead>
                <tr>
                    <th scope="col">
                        <input disabled
                            :value="$store.state.doc.name"
                        type="text" placeholder="Pattern Name">
                    </th>
                    <th scope="col">
                        <input disabled
                            :value="$store.state.doc.id"
                         type="text" placeholder="Pattern ID">
                    </th>
                </tr>
            </thead>
        <tr>
            <th style="text-align: center;" >Key</th>
            <th style="text-align: center;">Value</th>
        </tr>       
            <Field
                v-for="field in $store.state.doc.fields"
                :field="field"
                :key="field.id"
            />
        </table>
    </div>
</template>

<script>
import Field from './Field.vue'
export default {
  name: 'Pattern',
  components: { Field },
  data(){
    return{
    }
  },
  created() {
    
  },
  mounted() {

  },
}
</script>

<style lang="scss" scoped>
.pattern {
  text-align: left;
  background-color:#f0ebeb6e;
  border-radius: 5px;
  border: 2px solid teal;
  height: 90vh; 
}

input{
    width: 80%;
    border: 2px solid teal;
    padding: 10px 15px;
    margin-top: 1em;
    font-size: 16px;
}
</style>