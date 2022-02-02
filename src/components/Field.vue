<template>
    <tr>
        <td>                        
            <input disabled
                :value="field.field.key"
            type="text" placeholder="Field Key">
        </td>
        <td>
            <input disabled
                :value="field.data.value"
            type="text" placeholder="Field Value">
        </td>
    </tr>
</template>

<script>
export default {
    props:{
        field:{
            type: Object,
            required: true
        }
    },
}
</script>

<style lang="scss" scoped>
input{
    width: 80%;
    border: 2px solid teal;
    padding: 10px 15px;
    //margin-top: 1em;
    font-size: 14px;
}
</style>