<!--
 * @Description: 
 * @Author: 李大玄
 * @Date: 2022-12-27 10:11:25
 * @FilePath: /vue-shelf/src/views/test/testswiper.vue
 * @LastEditors: 李大玄
 * @LastEditTime: 2023-01-04 10:25:16
-->
<template>
  <div class="">
    <div aos="fade-left" aos-duration="600">
      <!--大写英语字母-->
      <div class="info info_show w">PRODUCT.</div>
      <div class="keyword_content1 show_pro w">产品展示</div>
      <div class="pro_all">
        <div class="show_bg"></div>
        <div class="show_icon_t" onclick="nextProduct()"></div>
        <div class="show_icon_b" onclick="lastProduct()"></div>
        <div class="show_page">
          <div class="show_page_num"><span class="current-pro-index">01</span>/{if count($data.product) <10}0{/if}{:count($data.product)}</div>
          <div class="show_page_change">
            <span class="progress" style="width: {php} echo 1/count($data['product'])*100{/php}%"></span>
          </div>

          <div class="show_page_text"></div>
        </div>
        <!-- Swiper -->
        <div class="swiper-container swiper-container-h show_content_r">
          <div class="swiper-wrapper">
            {foreach $data.product as $k=>$v}
            <div class="swiper-slide" data-name="{$k}">
              <div class="swiper-container swiper-container-v show_con">
                <div class="swiper-wrapper">
                  {foreach $v as $key=>$item}
                  <a class="swiper-slide swiper_slide0" href="/productDetail?id={$item.id}">
                    <div class="product-box">
                      <div class="product-img">
                        <div class="pro_img"><img src="{$item.img | get_file_path}" alt="" /></div>
                      </div>
                      <ul>
                        <li>{$item.en_title}</li>
                        <li>{$item.title}</li>
                      </ul>
                    </div>
                  </a>
                  {/foreach}
                </div>
                <div class="swiper-pagination swiper-pagination-v"></div>
              </div>
            </div>
            {/foreach}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "", // Pascal命名
  mixins: [],
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {
    // temObj: {
    //   handler(newVal, oldVal) {},
    //   deep: true, // 深度
    //   immediate: true, // 立即执行
    // },
  },
  beforeCreate() {},
  created() {
    // .$emit
  },
  beforeMount() {},
  mounted() {
    var swiperH = new Swiper(".swiper-container-h", {
      spaceBetween: 10,
      on: {
        init() {
          var name = $(".swiper-container-h>div>div.swiper-slide").eq(this.activeIndex).attr("data-name");
          $(".show_page_text").text(name);
        },
        slideChangeTransitionEnd: function () {
          var current = this.activeIndex + 1;
          $(".current-pro-index").text("0" + current);
          var name = $(".swiper-container-h>div>div.swiper-slide").eq(this.activeIndex).attr("data-name");
          $(".show_page_text").text(name);
          var length = $(".swiper-container-h>div>div").length;
          var width = (current / length) * 100 + "%";
          $(".progress").css({
            width: width
          });
        }
      }
    });
    var swiperV = new Swiper(".swiper-container-v", {
      // direction: 'vertical',
      spaceBetween: 10,
      slidesPerView: 4,
      nested: true,
      resistanceRatio: 0
    });
  },
  methods: {},
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类

.swiper-container {
  //  100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;
  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  /*display: flex;*/
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  /*-webkit-align-items: center;
align-items: center;*/
}
.swiper-pagination {
  top: 0;
  height: 3rem;
  //  100%;
  background-color: #386bdb;
  text-align: left;
}
.swiper-pagination-bullet {
  //  12%;
  height: 3rem;
  text-align: center;
  border-radius: 0;
  font-size: 1rem;
  line-height: 3rem;
  color: #fff;
  opacity: 0.6;
  background-color: transparent;
}
.swiper-pagination-bullet-active {
  opacity: 1;
}
.swiper-pagination-bullet:nth-child(1):before {
  /*在元素的内容之前插入新内容;*/
  content: "热门"; /*所插入的内容*/
}
.swiper-pagination-bullet:nth-child(2):before {
  content: "关注";
}
.swiper-pagination-bullet:nth-child(3):before {
  content: "话题";
}
.swiper-pagination-bullet:nth-child(4):before {
  content: "问答";
}

/*第一个swiper里的小swiper*/
.swiper-container-h {
  //  100%;
  height: 19rem;
  margin-top: 3.5rem;
  background-color: pink;
  overflow: hidden;
}
.swiper-container-h > .swiper-wrapper {
  margin: 30px 15px;
  height: 15rem;
}
.swiper-container-h > .swiper-wrapper > .swiper-slide {
  background-color: #ccc;
  height: 15rem;
  line-height: 15rem;
}

/*第二屏*/
.one {
  height: 100%;
  //  100%;
  /*background-color: #ccc;*/
  margin-top: 3.5rem;
  line-height: 10rem;
}
.one1,
.one2,
.one3 {
  height: 10rem;
  //  100%;
  background-color: pink;
  margin-top: 0.1em;
  line-height: 10rem;
}
/*第三屏*/
.two {
  height: 100%;
  //  100%;
  background-color: pink;
  margin-top: 3.5rem;
}
</style>
