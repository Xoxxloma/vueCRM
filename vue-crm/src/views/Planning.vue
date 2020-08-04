<template>
  <div>
    <div class="page-title">
      <h3>{{'Planning' | localize}}</h3>
      <h4>{{ info.bill | currency("RUB") }}</h4>
    </div>

    <Loader v-if="loading" />
    <p class="center" v-else-if="!categories.length">
      No Categories yet.
      <router-link to="/categories">{{"PlanningNewCategory" | localize}}</router-link>
    </p>
    <section v-else>
      <div v-for="categ of categories" :key="categ.id">
        <p>
          <strong>{{ categ.title }}</strong>
          {{ categ.spend | currency }} из {{ categ.limit | currency}}
        </p>
        <div class="progress" v-tooltip="categ.tooltip">
          <div
            class="determinate"
            :class="[categ.progressColor]"
            :style="{width: categ.progressPercent + '%'}"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import currencyFilter from '../filters/currency.filter'
export default {
  name: "planning",
    metaInfo() {
    return {
      title: this.$title('MenuPlanning')
    }
  },
  data: () => ({
    loading: true,
    categories: [],
  }),
  computed: {
    ...mapGetters(["info"]),
  },
  async mounted() {
    const records = await this.$store.dispatch("fetchRecords");
    const categories = await this.$store.dispatch("fetchCategories");
    this.categories = categories.map((categ) => {
      const spend = records
        .filter((rec) => rec.categoryId === categ.id)
        .filter((rec) => rec.type === "outcome")
        .reduce((total, value) => {
          return (total += +value.amount);
        }, 0);

      const percent = (100 * spend) / categ.limit;
      const progressPercent = percent > 100 ? 100 : percent;
      const progressColor =
        percent < 60 ? "green" : percent < 100 ? "yellow" : "red";

        const tooltipValue = categ.limit - spend
        const tooltip = `${tooltipValue < 0 ? 'Превышение на' : 'Осталось'} ${currencyFilter(Math.abs(tooltipValue))}`

      return {
        ...categ,
        progressPercent,
        progressColor,
        spend,
        tooltip
      };
    });
    this.loading = false;
  },
};
</script>
