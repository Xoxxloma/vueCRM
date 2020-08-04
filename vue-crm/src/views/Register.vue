<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model.trim="email"
          :class="{
            invalid:
              ($v.email.$dirty && !$v.email.required) ||
              ($v.email.$dirty && !$v.email.email),
          }"
        />
        <label for="email">Email</label>
        <small
          class="helper-text invalid"
          v-if="$v.email.$dirty && !$v.email.required"
        >
          {{"LoginEmailEmpty" | localize}}
        </small>
        <small
          class="helper-text invalid"
          v-else-if="$v.email.$dirty && !$v.email.email"
        >
          {{"LoginEmailCorrect" | localize}}
        </small>
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          v-model.trim="password"
          :class="{
            invalid:
              ($v.password.$dirty && !$v.password.required) ||
              ($v.password.$dirty && !$v.password.minLength),
          }"
        />
        <label for="password">{{"LoginPassword" | localize}}</label>
        <small
          class="helper-text invalid"
          v-if="$v.password.$dirty && !$v.password.required"
        >
          Password is required
        </small>
        <small
          class="helper-text invalid"
          v-else-if="$v.password.$dirty && !$v.password.minLength"
        >
          Password must be min
          {{ this.$v.password.$params.minLength.min }} chars. Now it's
          {{ password.length }}
        </small>
      </div>
      <div class="input-field">
        <input
          id="name"
          type="text"
          v-model.trim="name"
          :class="{
            invalid:
              ($v.name.$dirty && !$v.name.required) ||
              ($v.name.$dirty && !$v.name.minLength),
          }"
        />
        <label for="name">{{"RegisterName" | localize}}</label>
        <small
          class="helper-text invalid"
          v-if="$v.name.$dirty && !$v.name.required"
        >
          Name is required
        </small>
        <small
          class="helper-text invalid"
          v-else-if="$v.name.$dirty && !$v.name.minLength"
        >
          Name must be min
          {{ this.$v.name.$params.minLength.min }} chars. Now it's
          {{ name.length }}
        </small>
      </div>
      <p>
        <label>
          <input type="checkbox" v-model="agree" />
          <span>{{"RegisterRules" | localize}}</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          {{"SignUp" | localize}}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        {{"RegisterAccount" | localize}}
        <router-link to="/login">{{"RegisterEnter" | localize}}</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { email, required, minLength } from "vuelidate/lib/validators";
export default {
  name: "register",
    metaInfo() {
    return {
      title: this.$title('SignUp')
    }
  },
  data: () => ({
    email: "",
    password: "",
    name: "",
    agree: false,
  }),
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6) },
    name: { required, minLength: minLength(3) },
    agree: { checked: (v) => v },
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      const formData = {
        email: this.email,
        password: this.password,
        name: this.name,
      };
      try {
        await this.$store.dispatch("register", formData);
        this.$router.push("/");
      } catch (e) {}
    },
  },
};
</script>
