

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
    },
    mutations:{
        setNameID(state, name, id) {
            state.name = name
            state.id   = id
        },
        setFieldRecord(state, fieldKey, fieldValue) {
            state.fields.push({ field: fieldKey, data: fieldValue })
        },
        setArtifact(state, artifact) {
            state.artifact = artifact
        }
    },
    actions: {
    },
    namespaced: true
}