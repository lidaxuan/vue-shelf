<template>
    <el-drawer
          custom-class="eDrawer"
          v-bind="$attrs" v-on="$listeners"
          :class="mainClass"
          :append-to-body="appendToBody"
          :wrapperClosable="false"
    >
        <div slot="title" class="eDrawerTitle">
            <div :class="['eDrawerTitle_icon', 'icon','iconfont',titleIcon]" :style="{fontSize:titleIconSize,color:titleIconColor,background:titleIconBg}" align="center"/>
            <div class="eDrawerTitle_name">{{title}}</div>
        </div>
        <div :class="{
          'eDrawer__body': true,
          'e-drawer-sp-content': contentPadding
          }" :style="footerIsShow || isFooter ?'height:calc(100% - '+footerHeight+')':'height:100%'">
            <slot/>
        </div>
        <div class="eDrawer__footer" v-if="footerIsShow || isFooter" :style="{height:footerHeight,lineHeight:footerHeight}" :align="footerBtnPosition">
            <slot name="footer">
              <el-button size="default" min-width @click="$emit('cancel')">{{cancelButtonText}}</el-button>
              <el-button size="default" :loading="confirmLoading" type="primary" min-width @click="$emit('confirm')">{{confirmButtonText}}</el-button>
            </slot>
        </div>
    </el-drawer>
</template>

<script>
    // import Button from '../../../native/button/src/main.vue';
    export default {
        name: "e-drawer-sp",
        provide() {
          return {
            containerSize: 'default',
            containerType: 'default',
            containerMinWidth: true,
          };
        },
        components: {
          // Button,
        },
        data() {
            return {
                footerIsShow: false
            }
        },
        computed: {
            mainClass: function () {
                return {
                    'inner': this.inner
                }
            },
        },
        props: {
            // 是否在父级元素中打开
            inner: {
                type: Boolean,
                default: false,
            },
            // 内容 内边距
            contentPadding: {
                type: Boolean,
                default: true,
            },
            title: {
                type: String,
                default: "默认标题",
            },
            titleIconSize: {
                type: String,
                default: "40px",
            },
            titleIcon: {
                type: String,
                default: "icon-E-E1",//头部icon
            },
            titleIconColor: {
                type: String,
                default: "#fff",//图标样色
            },
            titleIconBg: {
                type: String,
                default: "#6359CA",//图标背景
            },
            footerBtnPosition: {
                type: String,
                default: "right",//底部确定 取消按钮的位置left center
            },
            footerHeight: {
                type: String,
                default: "80px",//底部确定 取消按钮的位置left center
            },
            appendToBody: {
                type: Boolean,
                default: () => true,
            },
            isFooter: {
                type: Boolean,
                default: true,
            },
            confirmButtonText: {
                type: String,
                default: '确认',
            },
            cancelButtonText: {
                type: String,
                default: '取消',
            },
            confirmLoading: {
                type: Boolean,
                default: false,
            },

        },
        mounted() {
            if (this.inner) {
                let box = this.$el.parentNode
                box.style.position = 'relative';
            }
            if (this.$scopedSlots.footer) {
                this.footerIsShow = true;
            }
        }

    }

</script>

<style lang="scss" scoped>
    ::v-deep .el-drawer__header {
        padding: 0;
        margin-bottom: 0;
        border-bottom: 1px solid #D8D8D8;
        height: 68px;
        padding: 0 24px;
    }
    /* 某个元素内部显示 */
     .inner {
        position: absolute;
    }
    .eDrawer {
        &Title {
            display: flex;
            align-items: center;
            &_icon {
                display: inline-block;
                width: 40px;
                height: 40px;
                line-height: 40px;
                border-radius: 14px;
                font-size: 25px;
                color: #ffffff;
            }

            &_name {
                margin-left: 10px;
            }
        }
        &__body{
            overflow-x: hidden;
        }
        &__footer {
            padding: 0 24px;
            background: #FFFFFF;
            box-shadow: 0px 0px 10px 0px #CDD3EC;
            border-radius: 1px;
            position: absolute;
            width: 100%;
            bottom: 0;
            display: flex;
            justify-content: flex-end;
            align-items: center;
        }

    }


    .e-drawer-sp-content {
      padding: 30px 24px;
      box-sizing: border-box;
      ::v-deep .el-form {
        .el-form-item {
          margin-bottom: 30px!important;
          .el-form-item__label {
            line-height: 14px;
            padding-bottom: 10px;
          }
        }
      }
    }
    .eDrawerTitle_name {
      font-weight: bold;
      font-size: 18px;
      color: #344563;
    }
</style>
