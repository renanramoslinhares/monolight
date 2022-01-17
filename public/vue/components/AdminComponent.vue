<template>
  <div>
    <navbar-component></navbar-component>
    <sidebar-component></sidebar-component>
    <div class="content-wrapper">
      <div class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1 class="m-0 mb-3">
                All Pages
                <a href="/admin/page/create" class="btn btn-sm btn-info ml-2">Add new</a>
              </h1>
            </div>
            <div class="col-sm-6">
              <breadcrumb-component></breadcrumb-component>
            </div>
          </div>
          <!-- {{> contentComponent }} -->
          <component
            :is ="activeComponent"
            @changecomponent ="(event) => { activeComponent = event }"
          />
        </div>
      </div>
    <div>
  </div>
</template>
<script>
module.exports = {
  data: () => ({
    activeComponent: 'all-pages-component'
  }),
  methods: {
  },
  components: {
    "breadcrumb-component": httpVueLoader("/vue/components/BreadcrumbComponent.vue"),
    "sidebar-component": httpVueLoader("/vue/components/SidebarComponent.vue"),
    "navbar-component": httpVueLoader("/vue/components/NavbarComponent.vue"),
    "all-pages-component": httpVueLoader("/vue/components/AllPagesComponent.vue"),
  },
};
</script>
