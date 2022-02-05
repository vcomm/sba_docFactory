

export const docModule = {
    state: ()=>({
        id: '',
        idextract: { left: 0, top: 0, width: 0, height: 0 },
        name: '',
        namextract: { left: 0, top: 0, width: 0, height: 0 },
        artifact: {
            image:  '',
            format: '',
            width:  0,
            height: 0,
            size:   0            
        },
        fields: []
    }),
    getters:{
        lastFieldIndex(state) {
            return state.fields.length - 1
        },
        jsonPattern(state) {
            return state
        }
    },
    mutations:{
        initState(state) {
            state.id = ''
            state.name = ''
            state.idextract = { left: 0, top: 0, width: 0, height: 0 }
            state.namextract = { left: 0, top: 0, width: 0, height: 0 }
            state.fields = []
        },
        setName(state, param) {
            state.name = param.name
            state.namextract = Object.assign({}, param.extract)
        },
        setID(state, param) {
            state.id = param.id
            state.idextract = Object.assign({}, param.extract)
        },
        addFieldRecord(state) {
            state.fields.push({ 
                field: { extract: { left: 0, top: 0, width: 0, height: 0 }, key: '' },  
                data: { extract: { left: 0, top: 0, width: 0, height: 0 }, value: '' }
            })
        },
        setFieldRecordKey(state, param) {
            const index = state.fields.length - 1
            state.fields[index].field.key = param.key
            state.fields[index].field.extract = Object.assign({}, param.extract)
        },
        setFieldRecordValue(state, param) {
            const index = state.fields.length - 1
            state.fields[index].data.value = param.value
            state.fields[index].data.extract = Object.assign({}, param.extract)
        },
        setArtifact(state, artifact) {
            state.artifact = Object.assign({}, artifact)
        }
    },
    actions: {
        initNewDoc({ commit }) {
            commit('initState')
        },
        newFieldDB({ commit }) {
            commit('addFieldRecord')
        },
        newFieldKey({ state, commit }, field) {
            commit('setFieldRecordKey', {key: field.key, extract: field.extract})
        },
        newFieldValue({ state, commit }, data) {
            commit('setFieldRecordValue', {value: data.value, extract: data.extract})
        }
    },
    namespaced: true
}