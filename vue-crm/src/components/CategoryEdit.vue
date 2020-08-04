<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{"Edit" | localize}}</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <select ref="select" v-model="current">
            <option
              v-for="c of categories"
              :key="c.id"
              :value="c.id"
            >{{c.title}}
            </option>
          </select>
          <label>{{"ChooseCategory" | localize}}</label>
        </div>

        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model.trim="title"
            :class="{ invalid: $v.title.$dirty && !$v.title.required }"
          />
          <label for="name">{{"RegisterName" | localize}}</label>
          <span
            v-if="$v.title.$dirty && !$v.title.required"
            class="helper-text invalid"
          >
            Title cant be blank
          </span>
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model.number="limit"
            :class="{ invalid: $v.limit.$dirty && !$v.limit.minValue }"
          />
          <label for="limit">{{"Limit" | localize}}</label>
          <span
            v-if="$v.limit.$dirty && !$v.limit.minValue"
            class="helper-text invalid"
          >
            Limit cant be lower than {{ $v.limit.$params.minValue.min }}
          </span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          {{"Update" | localize}}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minValue } from "vuelidate/lib/validators";
export default {
  data: () => ({
    select: null,
    current: null,
    title: "",
    limit: 100,
  }),
  validations: {
    title: { required },
    limit: { required, minValue: minValue(100) },
  },
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  watch: {
    current(catId) {
      const {title, limit} = this.categories.find(c => c.id === catId)
      this.title = title
      this.limit = limit
    }
  },
  created() {
    const {title, limit, id} = this.categories[0]
    this.title = title
    this.limit = limit
    this.current = id
  },
  mounted() {
    this.select = M.FormSelect.init(this.$refs.select)
    M.updateTextFields();
  },
  destroyed() {
    if (this.select && this.select.destroy)
    this.select.destroy()
  }, 
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      try {
        const categoryData = {
          id: this.current,
          title: this.title,
          limit: this.limit
        }
        await this.$store.dispatch('updateCategory', categoryData)
        this.$message('Category has been updated successfully')
        this.$emit('updated', categoryData)
      } catch (e) {}
    }
  }
}
</script>
