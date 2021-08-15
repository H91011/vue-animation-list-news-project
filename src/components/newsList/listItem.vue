<template lang="html">
  <li
    :class="{
      'select-news': select,
      'li-animation-up': animUp,
      'li-animation-down': animDown
    }"
    @click="click"
    @animationend="animationEnd"
  >
    <p class="title">
      <a>{{ title }}</a>
    </p>
    <p class="count">{{ count }}</p>
  </li>
</template>

<script>
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";

export default {
  props: ["title", "count", "url", "index", "animUp", "animDown", "swaped"],
  data: function() {
    return {
      select: false,
      clicked: false,
      upAnimation: false,
      isAnimEnd: this.getAnimationEnd()
    };
  },
  computed: {
    ...mapGetters(["getData", "getFilteredData", "getAnimationEnd"])
  },
  methods: {
    ...mapMutations(["update", "swap"]),

    click() {
      const c = this.$parent.$refs["list"].children;
      for (const i of c) {
        i.classList.remove("select-news");
      }
      this.select = !this.select;
      this.clicked = !this.clicked;

      this.updateCount();
      this.clickAnimate();
    },

    updateCount() {
      const { index } = this.$props;
      const { count } = this.getData(index);
      this.update({ index, selectedData: { count: parseInt(count) + 1 } });
    },

    updateAnim(anim, index) {
      this.update({ index, selectedData: { ...anim } });
    },

    clickAnimate() {
      const { index } = this.$props;
      if (index) {
        const dataUp = this.getFilteredData()[index - 1];
        if (this.count >= dataUp.count) {
          this.updateAnim({ animationUp: true }, index);
          this.updateAnim({ animationDown: true }, index - 1);
        }
      }
    },

    animationEnd() {
      const { index } = this.$props;
      this.update({ index, selectedData: { swaped: true } });
      if (this.select || this.clicked) {
        this.swap({ indexA: index, indexB: index - 1 });
        this.clicked = false;
      }
    }
  },
  beforeUpdate() {
    if (this.swaped) {
      const { index } = this.$props;
      const c = this.$parent.$refs["list"].children;
      c[index].classList.remove("li-animation-up");
      c[index].classList.remove("li-animation-down");
      this.update({ index, selectedData: { swaped: false } });
    }
  },
  watch: {
    // whenever question changes, this function will run
    isAnimEnd() {
      console.log("asdfg");
    }
  }
};
</script>

<style lang="css" scoped>
@keyframes clickDown {
  from {
    top: 0px;
  }

  to {
    top: 36px;
  }
}

@keyframes clickUp {
  from {
    top: 0px;
  }

  to {
    top: -36px;
  }
}

.li-animation-down {
  position: relative;
  animation-duration: 1s;
  animation-name: clickDown;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}

.li-animation-up {
  position: relative;
  animation-duration: 1s;
  animation-name: clickUp;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}

.z-top {
  z-index: 20;
}

.title {
  width: 95%;
  margin-left: 15px;
}

.count {
  width: 5%;
  min-width: 25px;
}

li {
  display: flex;
  text-align: start;
  height: 24px;
  align-items: center;
  padding: 6px;
}

li:hover {
  box-shadow: inset 0px 0px 0px 2px blue;
}

.select-news {
  box-shadow: inset 0px 0px 0px 2px blue;
}
</style>
