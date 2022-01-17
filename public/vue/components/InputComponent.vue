<template>
  <div class="form-group">
    <div class="input-group">
      <input
        :id="this.id"
        :name="this.id"
        :type="this.inputType"
        :placeholder="this.placeholder"
        :value="this.value"
        @input="(e) => { this.change(e.target.value) }"
        :class="`form-control ${this.errorMessage ? 'is-invalid' : ''}`"
      >
        <!-- @keyup.enter.prevent ="(event) => {  $emit('pressenter');
        event.stopPropagation()  }" -->
      <div v-if="this.type === 'password'" class="input-group-append">
        <button class="btn input-group-text" type="button" @click="showHidePassword()">
          <i class="fas fa-eye"></i>
        </button>
      </div>
    </div>
    <div :class="`invalid-feedback ${this.errorMessage ? 'd-block' : ''}`">
      {{ this.errorMessage }}
    </div>
  </div>
</template>
<script>
module.exports = {
  data: () => ({
    errorMessage: '',
    inputType: ''
  }),
  methods: {
    showHidePassword() {
      this.inputType = this.inputType == 'password' ? 'text' : 'password';
    },
    getErrorRequired(value) {
      if (!Boolean(value)) return 'This field is required!';
      else return false;
    },
    getErrorEmail(email) {
      const isValid = (email) => {
        const hasAtSign = email.indexOf('@') >= 0 && email.indexOf('.') >= 0; 
        if(!hasAtSign) return false;

        const split = email.split('@');
        const split2 = split[1].split('.');

        const hasUsername = split[0].length;
        const hasDomain = split2[0].length;
        const hasSuffix = split2[1].length;
        return Boolean(hasUsername && hasDomain && hasSuffix);
      };

      if (!isValid(email)) return 'Please enter a valid email!';
      else return false;
    },
    validate(value) {
      this.rules.forEach(rule => {
        const message = {
          required: this.getErrorRequired(value),
          email: this.getErrorEmail(value),
        }[rule];

        if(message) {
          this.errorMessage = message;
          this.$emit('isvalid', false);
        } else {
          this.errorMessage = '';
          this.$emit('isvalid', true);
        }
      });
    },
    change(value) {
      this.validate(value);
      this.$emit('input', value)
    }
  },
  created() {
    this.inputType = this.type;
  },
  props: {
    placeholder: String,
    id: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'text',
    },
    rules: Array,
    value: String
  }
};
</script>
