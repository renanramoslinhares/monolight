<template>
    <div style="height: auto;">
        <div class="wrapper">
            <div class="content-wrapper ml-0">
                <div>
                    <section class="content-header">
                        <div class="container-fluid">
                            <div class="row mb-2 mt-5">
                                <div class="col-sm-12 text-center">
                                    <img src="/images/favicon-192x192.png" width="80" />
                                    <footer class="font-weight-light mt-2">AnyWhere Press</footer>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section class="content">
                        <div class="container-fluid">
                            <div>
                                <div class ="row">
                                    <div class ="col-md-12">
                                        <div class ="col-md-3 mx-auto">
                                            <div class ="card card-primary pt-2">
                                                <form id="loginForm" >
                                                    <div class ="card-body">
                                                        <input-component
                                                          v-model="form.email.value"
                                                          placeholder="Insert your Email"
                                                          id="email"
                                                          type="email"
                                                          :rules="form.email.rules"
                                                          @isvalid="(event) => { form.email.isValid = event; }"
                                                        ></input-component>
                                                          <!-- @pressenter ="() => { submit() }" -->
                                                        <input-component
                                                          v-model="form.password.value"
                                                          placeholder="Insert your Password"
                                                          id="password"
                                                          type="password"
                                                          :rules="form.password.rules"
                                                          @isvalid="(event) => { form.password.isValid = event; }"
                                                        ></input-component>
                                                    </div>
                                                    <div class ="card-footer">
                                                        <div class ="row">
                                                            <div class ="col-md-6">
                                                                <div class ="custom-control custom-checkbox mt-2">
                                                                    <input type ="checkbox" name="terms" class ="custom-control-input" id="remember-me" disabled>
                                                                    <label class ="custom-control-label" for="remember-me">Remember-me</label>
                                                                </div>
                                                            </div>
                                                            <div class ="col-md-6">
                                                                <button @click.stop ="submit" type ="button" class ="btn btn-primary float-right">Submit</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                            <div class ="row">
                                                <div class ="col-md-12 pl-4">
                                                <a href="#"> Lost your password?</a>
                                            </div>
                                        </div>
                                        <div class ="row mt-3 pl-4">
                                            <div class ="col-md-12">
                                                <a href="http://localhost:3000/">
                                                    <i class ="fas fa-long-arrow-alt-left"></i>
                                                    Back to Website
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
module.exports = {
  data: () => ({
    form: {
      email: {
        rules: ["required", "email"],
        value: "",
        isValid: true,
      },
      password: {
        rules: ["required"],
        value: "",
        isValid: true,
      },
      rememberMe: false,
    },
  }),
  methods: {
    submit() {
      console.log('submit');
      requestService
        .getToken(this.form.email.value, this.form.password.value)
        .then((response) => {
          if (response.data) {
            requestService.showAlert("Successfully authenticated.");
            localStorage.awp_access = JSON.stringify(response.data);
            this.$emit("changecomponent", "admin-component");
          } else {
            requestService.showAlert(response.error.message, "error");
          }
        })
        .catch((error) => {
          requestService.showAlert(error.message, "error");
        });
    },
  },
  components: {
    "input-component": httpVueLoader("/vue/components/InputComponent.vue"),
  },
  created() {
    // check if authenticate
  }
};
</script>
