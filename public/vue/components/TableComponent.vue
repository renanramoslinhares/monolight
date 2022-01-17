<template>
  <table class="table table-striped">
    <thead>
      <tr>
        <!-- <th style="width: 10px">
        <div class="custom-control custom-checkbox">
          <input class="custom-control-input custom-control-input-primary" type="checkbox" id="customCheckbox0" checked>
          <label for="customCheckbox0" class="custom-control-label"></label>
        </div>
      </th> -->
        <th><a class="text-dark" href="/admin/page/all/title">Title</a></th>
        <th><a class="text-dark" href="/admin/page/all/author">Author</a></th>
        <th class="text-center" style="width: 40px">
          <a class="text-dark" href="/admin/page/all/status">Status</a> /<br />
          <a class="text-dark" href="/admin/page/all/date">Date</a>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="page in pages" :key="page.id">
        <!--
      <td>
        <div class="custom-control custom-checkbox">
          <input class="custom-control-input custom-control-input-primary" type="checkbox" id="customCheckbox{{ id }}">
          <label for="customCheckbox{{ id }}" class="custom-control-label"></label>
        </div>
      </td>
      -->
        <td class="align-middle">
          <a href="/admin/page/edit/{{ page.id }}">{{ page.title }}</a>
        </td>
        <td class="align-middle">{{ page.author }}</td>
        <td class="align-middle text-center">
          <span :class="`badge bg-${page.status.color}`">{{ page.status.name }}</span>
          <div class="mt-1">{{ page.date }}</div>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
module.exports = {
  data: () => ({}),
  methods: {},
  created() {},
  props: { pages: Array },
};
</script>
