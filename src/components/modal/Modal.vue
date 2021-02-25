<template>
    <div>
        <div class="modal fade show" id="modal" tabindex="-1" role="dialog" aria-labelledby="modalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title text-center" id="modalLabel">{{modal.title}}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        {{modal.body}}
                        <span>{{id}}</span>                    
                    </div>
                    <div class="modal-footer">
                        <div class="left-side">
                            <button type="button" class="btn btn-success btn-link" data-dismiss="modal" @click="confirm">確認</button>
                        </div>
                        <div class="divider"></div>
                        <div class="right-side">
                            <button type="button" class="btn btn-danger btn-link" data-dismiss="modal" @click="close">取消</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        modal: Object        
    },
    methods: { 
        close: function () { 
            this.$emit('close');  
        },
        confirm: function () {
            this.$emit('confirm');  
        }
    }
}
</script>
<style scoped>
.modal {
    display: block;
}
</style>

