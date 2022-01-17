<template>
  <div class="row">
    <div class="col-12">
      <div class="card card-outline card-info">
        <!-- <div class="card-header">
          <action-select-component></action-select-component>
          <pagination-component></pagination-component>
        </div> -->
        <div class="card-body p-0">
          <table-component :pages="pages"></table-component>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
module.exports = {
  data: () => ({
    pages: [],
  }),
  methods: {
    loadPageList() {
      const getColor = status => ({
        Draft: "primary",
        Publish: "success",
        Trash: "danger",
      }[status]);

      requestService.getAllPages().then((resp) => {
        this.pages = resp.data.map((element) => ({
          id: element.id,
          title: element.title,
          author: element.user_name,
          status: {
            name: element.status,
            color: getColor(element.status),
          },
          date: element.updatedAt//moment(element.updatedAt).format("L H:mm"),
          // an hour ago ...
          // under development
        }));
      });
    },
  },
  created() {
    this.loadPageList();
  },
  components: {
    "table-component": httpVueLoader("/vue/components/TableComponent.vue"),
    "pagination-component": httpVueLoader("/vue/components/PaginationComponent.vue"),
    "action-select-component": httpVueLoader("/vue/components/ActionSelectComponent.vue"),
    
  },
  props: {},
};
</script>
