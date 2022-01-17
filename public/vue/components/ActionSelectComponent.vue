<template>
  <h3 class="card-title">
    <input
      class="form-control col-12"
      list="actionOptions"
      id="action"
      placeholder="Action"
    />
    <datalist id="actionOptions">
      <option value="San Francisco"></option>
      <option value="New York"></option>
      <option value="Seattle"></option>
      <option value="Los Angeles"></option>
      <option value="Chicago"></option>
    </datalist>
  </h3>
</template>
<script>
module.exports = {
  data: () => ({}),
  methods: {},
  created() {},
  props: {},
};
</script>
