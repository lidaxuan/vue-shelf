<template >
  <div v-cloak class="multiple-select">
    <template v-if="search || $slots.search">
      <div class="select-search-main" :class="{ 'no-gutter': searchGutter === 0, preview: preview }">
        <div class="select-search-box" :style="`margin-bottom: ${searchGutter}px;`">
          <slot name="search">
            <el-autocomplete
              v-model="searchValue"
              :fetch-suggestions="searchQuery"
              :placeholder="placeholder"
              @select="handleCheckboxItem"
              :highlight-first-item="true"
            >
              <i slot="suffix" class="el-input__icon el-icon-search cursor"></i>
              <template slot-scope="scope">
                <div class="autocomplete-search">
                  <div class="name" v-html="scope.item.text"></div>
                  <div class="sub" v-show="scope.item.sub">{{ scope.item.sub }}</div>
                </div>
              </template>
            </el-autocomplete>
          </slot>
          <!-- //- 自定义右上角内容 -->
          <div class="search-right" v-if="preview">
            <slot name="searchRight"></slot>
          </div>
        </div>
      </div>
    </template>

    <div class="select-box">
      <!-- 左侧操作 -->
      <div class="select-controls">
        <!--顶部-->
        <div class="select-header" v-if="title || $slots.header">
          <slot name="header">
            <div class="select-title" v-if="title">{{ title }}</div>
          </slot>
        </div>
        <div class="select-columns">
          <div class="select-column" v-for="(id, index) in showSelect" :key="index">
            <div class="column-main">
              <!-- //- v-if="checkList[index]" -->
              <el-checkbox-group v-model="checkList[index]">
                <div class="item-content" v-for="item in getColumnList(id)" :key="item[primaryKey]">
                  <el-checkbox
                    v-if="!item.isNoCheckbox"
                    :value="checkList[item[primaryKey]]"
                    :indeterminate="indeterminate[item[primaryKey]]"
                    :disabled="item.disabled"
                    :label="item[primaryKey]"
                    @change="checkboxChange($event, item)"
                  >
                    <span></span>
                  </el-checkbox>
                  <template v-if="item.isHaveSon">
                    <div class="checkbox-text" @click="checkboxClick(item)">
                      <span>
                        <label>{{ item[labelKey] }}</label>
                      </span>
                      <i class="el-icon-arrow-right"></i>
                    </div>
                  </template>
                  <template v-else>
                    <div class="checkbox-text">
                      <span>
                        <label>{{ item[labelKey] }}</label>
                      </span>
                    </div>
                  </template>
                </div>
              </el-checkbox-group>
              <!-- //-
              <div class="el-checkbox-group" v-else>
                //-
                <div class="column-loading">//- <i class="el-icon-loading"></i> //-</div>
                //-
              </div> -->
            </div>
          </div>
        </div>
      </div>
      <!-- 右侧预览 -->
      <div class="select-preview" v-if="preview">
        <div>
          <i class="el-icon-d-arrow-right"></i>
        </div>
        <div class="select-controls">
          <div class="select-header" v-if="title || $slots.previewtitle">
            <slot name="previewtitle">
              <div class="select-title">{{ previewTitle }}</div>
            </slot>
          </div>
          <div class="select-columns">
            <div class="select-column">
              <div class="column-main">
                <div class="preview-box">
                  <slot name="preview"></slot>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@mixin ellipsis() {
  display: inline-block;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: middle;
}
.multiple-select {
  font-size: 14px;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  @import './style/controls.scss';
  @import './style/preview.scss';
  @import './style/header.scss';
  @import './style/search.scss';

  & > .select-box {
    width: 100%;
    height: 100%;
    display: flex;
    flex: 1;
    flex-basis: auto;
    .select-controls {
      flex: 1;
    }
  }
}
</style>

<style lang="scss">
.autocomplete-search {
  .name {
    b {
      color: #409eff;
    }
  }
}
</style>

<script>
import _ from 'lodash';
import DB from '@lijixuan/dblist';

export default {
  data() {
    const db = new DB('select', [], this.primaryKey, this.foreignKey, this.topLevel);
    return {
      list: db, // 所有数据,
      showSelect: [].concat(this.topLevel),
      // 选中的数据
      checkList: [],
      // 半选状态
      indeterminate: {},
      // 搜索框内容
      searchValue: '',
    };
  },
  props: {
    labelKey: {
      type: String,
      default: () => 'name',
    },
    // 主键
    primaryKey: {
      type: String,
      default: () => 'id',
    },
    foreignKey: {
      type: String,
      default: () => 'pid',
    },
    topLevel: {
      type: [String, Number],
      default: () => 0,
    },
    title: {
      type: String,
    },
    preview: {
      type: Boolean,
      default: () => false,
    },
    previewTitle: {
      type: String,
    },
    childrenKey: {
      type: String,
      default: () => 'children',
    },
    /** 是否支持搜索 */
    search: {
      type: Boolean,
      default: () => false,
    },
    /** 搜索框占位提示语 */
    placeholder: {
      type: String,
      default: () => '请输入需要搜索的内容',
    },
    /**
     * 是否单选
     */
    readio: {
      type: Boolean,
      default: () => false,
    },
    /**
     * 搜索框与内容是否有间隔
     * @param 0 默认无间隔
     */
    searchGutter: {
      type: Number,
      default: () => 0,
      validator(value) {
        return value >= 0 ? true : false;
      },
    },
    /**
     * 获取搜索数据
     */
    getSearchServer: {
      type: Function,
      default() {
        return function () {
          return [];
        };
      },
    },
    /**
     * 获取列表数据
     */
    getColumnServer: {
      type: Function,
      default() {
        return function () {
          return [];
        };
      },
    },
  },
  async mounted() {
    const insert = '_insertData';
    const result = await this.getColumnData(this.topLevel);
    const array = this.setLevels(result, this.topLevel, 0);
    this[insert](array);
    this.$emit('load');
  },
  methods: {
    // 取消某些数据选中状态
    cancelChecked(keys) {
      keys = _.flattenDeep([].concat(keys));
      if (keys.length === 0) {
        const checkList = _.map(this.checkList, () => []);
        this.checkList = [].concat(checkList);
        this.indeterminate = {};
        this.onInput();
      } else {
        for (let i = 0, len = keys.length; i < len; i++) {
          const item = {};
          item[this.primaryKey] = keys[i];
          this.checkboxChange(false, item);
        }
      }
    },
    // 设置默认选中
    setAutoChecked(keys) {
      // 需要选中的元素
      keys = _.flattenDeep([].concat(keys));
      if (keys.length === 0) {
        return this.cancelChecked([]);
      }
      const db = this.list;
      const indeterminate = Object.assign({}, this.indeterminate);
      const checkList = _.map(this.checkList, (value) => [].concat(value));
      const app = (foreignKey) => {
        const where = this.getForeignKeyWhere(foreignKey);
        const list = db.select(where);
        for (let i = 0, len = list.length; i < len; i++) {
          const item = list[i];
          const key = item[this.primaryKey];
          // 当前元素是否为需要选中的元素
          if (_.includes(keys, key)) {
            // 将其所有子元素设置为选中元素
            _.each(db.childrenDeep(this.getPrimaryKeyWhere(key)), (data) => {
              const level = data.level;
              const id = data[this.primaryKey];
              // 将所有父元素设置为半选状态
              _.each(db.parentDeep(this.getPrimaryKeyWhere(id)), (parent) => {
                indeterminate[parent[this.primaryKey]] = true;
              });
              indeterminate[id] = false;
              checkList[level].push(id);
            });
          } else {
            app(key);
          }
        }
      };
      //正序处理
      app(this.topLevel);
      // 倒序处理
      for (let i = checkList.length - 1; i >= 0; i--) {
        for (let index = 0, size = checkList[i].length; index < size; index++) {
          const key = checkList[i][index];
          const item = db.selectOne(this.getPrimaryKeyWhere(key));
          const siblings = _.map(db.select(this.getForeignKeyWhere(item[this.foreignKey])), (data) => data[this.primaryKey]);
          const intersection = _.intersection(siblings, checkList[i]);
          // 如果当前层级的数据已全部选中
          if (intersection.length === siblings.length) {
            // 则设置父元素为选中状态
            const parent = db.selectOne(this.getPrimaryKeyWhere(item[this.foreignKey]));
            if (parent) {
              const level = parent.level;
              const id = parent[this.primaryKey];
              checkList[level].push(id);
              indeterminate[id] = false;
            }
          }
        }
      }
      this.checkList = checkList;
      this.indeterminate = indeterminate;
    },
    // 搜索时异步请求数据
    async searchQuery(queryString, cb) {
      let array = [];
      queryString = _.trim(queryString || '');
      if (!queryString) {
        return cb(array);
      }
      const db = this.list;
      const where = {};
      where[this.labelKey] = queryString;

      let queryList = [];
      try {
        queryList = await this.getSearchServer(where);
      } catch (error) {
        // todo
      }
      if (queryList.length === 0) {
        queryList = db.like(where);
      }
      _.each(queryList, (item) => {
        let data = [];
        // 减少不必要循环
        if (item[this.foreignKey] === this.topLevel) {
          data.push(item);
        } else {
          data = db.parentDeep(this.getPrimaryKeyWhere(item[this.primaryKey]));
        }
        let name = [];
        _.each(data, (temp) => {
          name.push(_.trim(temp[this.labelKey]));
        });
        name = name.reverse().join(' > ');
        let indexOf = name.lastIndexOf(queryString);
        const value = Object.assign(item, {
          value: item.name,
          text: name.slice(0, indexOf) + `<b>${queryString}</b>` + name.slice(indexOf + queryString.length),
        });
        array.push(value);
      });
      cb(array);
    },
    /** 选中搜索提示内容 */
    handleCheckboxItem(item) {
      if (item[this.primaryKey]) {
        // 将选中的元素在内容去显示
        this.amendShowSelect(item);
        // 设置该元素为选中状态
        this.checkboxChange(true, item);
      }
    },
    /**
     * 设置 level 级别
     */
    setLevels(list, foreignKey, level = 0) {
      const array = [];
      const db = new DB('leve', [], this.primaryKey, this.foreignKey, this.topLevel);
      db.insert(db.flatten(list, this.childrenKey));
      const app = (key, levelValue) => {
        const where = this.getForeignKeyWhere(key);
        const arr = db.select(where);
        for (let i = 0, len = arr.length; i < len; i++) {
          const item = Object.assign({}, arr[i], { level: levelValue });
          array.push(item);
          app(item[this.primaryKey], levelValue + 1);
        }
      };
      app(foreignKey, level);
      return array;
    },
    _insertData(array) {
      const checkList = [].concat(this.checkList);
      const db = this.list;
      const levels = new Set();
      for (let i = 0, len = array.length; i < len; i++) {
        const item = array[i];
        const level = item.level || 0;
        levels.add(level);
      }
      for (const index of levels) {
        const value = checkList[index];
        if (value) {
          continue;
        }
        checkList[index] = [];
      }
      this.checkList = checkList;
      db.insert(array);
    },
    // 查询外键列表数据
    getForeignKeyWhere(value) {
      const where = {};
      where[this.foreignKey] = value;
      return where;
    },
    // 查询主键列表数据
    getPrimaryKeyWhere(value) {
      const where = {};
      where[this.primaryKey] = value;
      return where;
    },
    // 查询当前列数据
    getColumnList(value) {
      const db = this.list;
      const where = this.getForeignKeyWhere(value);
      const list = db.select(where);
      return list;
    },
    // 判断是否有子集
    isHaveSon(item) {
      const db = this.list;
      const where = this.getForeignKeyWhere(item[this.primaryKey]);
      const list = db.select(where);
      return list.length > 0 ? true : false;
    },
    // 维护展示的列表数据
    amendShowSelect(item, showNext) {
      const db = this.list;
      const primaryKey = item[this.primaryKey];
      // 从数据中获取最正确的数据
      item = db.selectOne(this.getPrimaryKeyWhere(primaryKey));
      // 获取数据链条
      const parentDeep = db.parentDeep(this.getPrimaryKeyWhere(primaryKey));
      const array = [].concat(
        parentDeep.map((data) => data[this.primaryKey]),
        this.topLevel
      );
      // 设置每一栏的键值
      if (showNext) {
        this.showSelect = array.reverse();
      } else {
        this.showSelect = array.slice(1).reverse();
      }
    },
    // 点击元素文字
    async checkboxClick(item) {
      this.amendShowSelect(item, true);
      const primaryKey = item[this.primaryKey];
      // 处理子级数据
      const haveSon = this.isHaveSon(item);
      if (!haveSon) {
        const level = item.level;
        const list = await this.getColumnData(primaryKey);
        if (list) {
          // 设置 level 级别
          const arr = this.setLevels(list, primaryKey, level + 1);
          const insert = '_insertData';
          this[insert](arr);
        }
        const checkeds = this.checkList[level];
        if (_.includes(checkeds, primaryKey)) {
          this.checkboxChange(true, item);
        } else {
          this.checkboxChange(false, item);
        }
      }
    },
    // 复选框选中与取消
    checkboxChange(status, data) {
      const db = this.list;
      data = db.selectOne(this.getPrimaryKeyWhere(data[this.primaryKey]));
      // 半选数据
      let indeterminate = Object.assign({}, this.indeterminate);
      const checkList = [];
      // 取消自身半选状态
      indeterminate[data[this.primaryKey]] = false;
      // 设置子元素选中状态
      const childrenDeep = db.childrenDeep(this.getPrimaryKeyWhere(data[this.primaryKey]));
      _.each(childrenDeep, (item) => {
        const level = item.level;
        const value = item[this.primaryKey];
        indeterminate[value] = false;
        checkList[level] = [].concat(checkList[level], value);
      });
      // 判断是否为多选
      if (!this.readio) {
        // 选中
        if (status) {
          _.each(this.checkList, (column, index) => {
            const arr = [].concat(column || [], checkList[index] || []);
            checkList[index] = _.compact(_.uniq(arr));
          });
        } else {
          _.each(this.checkList, (column, index) => {
            const arr = _.difference(column || [], checkList[index] || []);
            checkList[index] = _.compact(arr);
          });
        }
      } else {
        // 单选处理逻辑
        _.each(this.checkList, (column, index) => {
          const arr = [].concat([], checkList[index] || []);
          checkList[index] = _.compact(_.uniq(arr));
        });
      }
      // 修正父级元素选中状态
      const prev = (id) => {
        const where = this.getPrimaryKeyWhere(id);
        const item = db.selectOne(where);
        if (!item) {
          return false;
        }
        const level = _.toInteger(item.level);
        if (level < 0 || level - 1 < 0) {
          return false;
        }
        // 查询当前列数据
        const foreignKey = item[this.foreignKey];
        const childrenlist = this.getColumnList(foreignKey);
        // 临时db
        const tempDb = new DB('temp', childrenlist, this.primaryKey, this.foreignKey, this.topLevel);
        // 查询当前列已选中的数据
        const selectCheckboxValues = _.compact([].concat(checkList[level] || []));
        const childrenCheckendList = tempDb.select(this.getPrimaryKeyWhere(selectCheckboxValues));
        // 上一级 checkend 下标
        const prevIndex = level - 1;
        if (childrenCheckendList.length === childrenlist.length && childrenlist.length > 0) {
          // 如果当前列数据的个数与已选数据的个数相同
          indeterminate[foreignKey] = false;
          // 向父级数据添加一个数据
          const arr = [].concat(checkList[prevIndex] || [], foreignKey);
          // 去重去空
          checkList[prevIndex] = _.compact(_.uniq(arr));
        } else {
          // 获取父级数据
          let arr = [].concat(checkList[prevIndex] || []);
          // 从数组中删除某元素
          arr = _.difference(arr, [foreignKey]);
          // 去空
          checkList[prevIndex] = _.compact(arr);
          // 判断是否需要半选
          if (childrenCheckendList.length === 0) {
            // 已选数据等于0
            let flag = false;
            for (const temp of childrenlist) {
              const key = temp[this.primaryKey];
              if (indeterminate[key]) {
                flag = true;
                break;
              }
            }
            indeterminate[foreignKey] = flag;
          } else {
            indeterminate[foreignKey] = true;
          }
        }
        prev(foreignKey);
      };
      prev(data[this.primaryKey]);
      this.checkList = checkList;
      this.indeterminate = indeterminate;
      this.onInput();
    },
    onInput() {
      const db = this.list;
      // 所有已选中的数据
      const checkList = _.map(this.checkList, (item) => [].concat(item));
      // 需要删除的数据
      let difference = [];
      let keys = _.flattenDeep(checkList);
      for (let i = 0, len = checkList.length; i < len - 1; i++) {
        const checkends = checkList[i];
        for (let j = 0, size = checkends.length; j < size; j++) {
          const key = checkends[j];
          if (_.includes(difference, key)) {
            break;
          }
          const where = this.getForeignKeyWhere(key);
          const list = db.childrenDeep(where);
          const children = list.map((item) => item[this.primaryKey]);
          difference = [].concat(difference, children);
        }
      }
      keys = _.difference(keys, difference);
      const result = _.map(keys, (key) => {
        const list = db.parentDeep(this.getPrimaryKeyWhere(key));
        const text = _.map(list, (item) => item[this.labelKey]);
        const obj = {};
        obj[this.primaryKey] = key;
        obj[this.labelKey] = text.reverse();
        return obj;
      });
      this.$emit('change', result);
    },
    // 请求数据
    async getColumnData(id) {
      try {
        const queyr = { id };
        // 获取数据
        let arr = [];
      for (let i = 0; i < 100; i++) {
        arr.push({
          pid: i,
          id: `lidaxuan${i}`,
          name: '李大玄',
          isHaveSon: false,
        });
      }
        const result = arr;
        // 整合数据格式
        const db = new DB('column', [], this.primaryKey, this.foreignKey, this.topLevel);
        const list = db.flatten([].concat(result), this.childrenKey);
        // 处理数据
        if (id && id !== 0) {
          db.insert(list);
          // 维护返回数据中的第一层数据中的 foreignKey 关系
          const where = this.getForeignKeyWhere(0);
          const newData = this.getForeignKeyWhere(id);
          db.update(where, newData);
          return db.select();
        }
        return list;
      } catch (error) {
        return [];
      }
    },
  },
};
</script>