<template>
  <div class="form-inline mt-3">
    <div class="input-group" data-widget="sidebar-search">
      <input
        class="form-control form-control-sidebar"
        type="search"
        placeholder="Buscar"
        aria-label="Buscar"
        disabled
      />
      <div class="input-group-append">
        <button class="btn btn-sidebar" disabled>
          <i class="fas fa-search fa-fw"></i>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
module.exports = {
  data: () => ({}),
  methods: {},
  created() {},
  props: {},
};
</script>
