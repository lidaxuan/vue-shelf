<template>
  <div class="wmax hmax">
    <!--    <div id="x-integry-container"></div>-->
<!--    {{ percentage }}
    <div class="progress-outbox" @click="progressClick">
      <el-progress type="circle" :percentage="percentage" :stroke-width="10" :width="50" :format="formatProgress"
                   :define-back-color="percentage ? '#ebeef5' : '#f56c6c'" class="mr5"
                   :color="colors" v-loading="true"></el-progress>
      <div class="text">
        <span> {{ percentage ? "days until trial ends" : "Trial Ended" }} </span>
      </div>
    </div>

    <el-button-group>
      <el-button icon="el-icon-minus" @click="decrease"></el-button>
      <el-button icon="el-icon-plus" @click="increase"></el-button>
    </el-button-group>-->

    <pre>{{getData(["2", "003"])}}</pre>

    <el-dialog :visible.sync="dialogVisible" title=" " width="30%" center
               :close-on-click-modal="false" :close-on-press-escape="false"
               :show-close="Boolean(freeDay)" append-to-body custom-class="dialog-custom-class"
               style="border-radius: 6px"
    >
      <span>这是一段信息</span>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" class="next-btn" @click="dialogVisible = false">Get started</el-button>
      </div>
    </el-dialog>
    <!--    <iframe src="http://192.168.160.92:4101" width="100%" height="100%" id="myframe" frameborder="0"></iframe>-->
  </div>
</template>

<script>
import DB from "@lijixuan/dblist";
function getTodayAndYesterday() {
  let yesterday = new Date(Date.now() - 86400000);
  return {
    today: new Date().toLocaleDateString("en-US", {year: "numeric", month: "2-digit", day: "2-digit"}),
    yesterday: yesterday.toLocaleDateString("en-US", {year: "numeric", month: "2-digit", day: "2-digit"})
  };
}
const treeData = [
  {
    "id": 1,
    "name": "分贝儿",
    "parentid": 0,
    "order": 100000000,
    "department_leader": [],
    "choice": 0,
    "children": [
      {
        "id": 2,
        "name": "待实名",
        "parentid": 1,
        "order": 100000000,
        "department_leader": [],
        "choice": 1,
        "key": "2",
        "title": "待实名",
        "disabled": false
      },
      {
        "id": 3,
        "name": "研发部",
        "parentid": 1,
        "order": 99999000,
        "department_leader": [],
        "choice": 1,
        "key": "3",
        "title": "研发部",
        "disabled": false,
        "children": [
          {
            "name": "郑宏生",
            "userid": "ZhengHongSheng",
            "key": "003",
            "title": "郑宏生",
            "parentid": 3
          }
        ]
      },
      {
        "id": 4,
        "name": "客服部",
        "parentid": 1,
        "order": 99998000,
        "department_leader": [],
        "choice": 1,
        "key": "4",
        "title": "客服部",
        "disabled": false
      },
      {
        "id": 5,
        "name": "运维实施部",
        "parentid": 1,
        "order": 99997000,
        "department_leader": [],
        "choice": 0,
        "children": [
          {
            "id": 6,
            "name": "交付一部",
            "parentid": 5,
            "order": 100000000,
            "department_leader": [],
            "choice": 0,
            "children": [
              {
                "id": 8,
                "name": "交付一部（1）",
                "parentid": 6,
                "order": 100000000,
                "department_leader": [],
                "choice": 1,
                "key": "8",
                "title": "交付一部（1）",
                "disabled": false
              },
              {
                "id": 9,
                "name": "交付一部（2）",
                "parentid": 6,
                "order": 99999000,
                "department_leader": [],
                "choice": 1,
                "key": "9",
                "title": "交付一部（2）",
                "disabled": false
              },
              {
                "id": 10,
                "name": "交付一部（3）",
                "parentid": 6,
                "order": 99998000,
                "department_leader": [],
                "choice": 1,
                "key": "10",
                "title": "交付一部（3）",
                "disabled": false
              }
            ],
            "key": "6",
            "title": "交付一部",
            "disabled": false
          },
          {
            "id": 7,
            "name": "交付二部",
            "parentid": 5,
            "order": 99999000,
            "department_leader": [],
            "choice": 1,
            "key": "7",
            "title": "交付二部",
            "disabled": false
          }
        ],
        "key": "5",
        "title": "运维实施部",
        "disabled": false
      }
    ],
    "key": "1",
    "title": "分贝儿",
    "disabled": false
  }
];

function exl(tempArr) {
  let result = [];
  let obj = {};
  for (let i = 0; i < tempArr.length; i++) {
    if (!obj[tempArr[i].id]) {
      result.push(tempArr[i]);
      obj[tempArr[i].id] = true;
    };
  };
  return result;
};
function buildTree(data, idKey, parentKey) {
  let idMap = {};
  let tree = [];
  data.forEach(item => {
    idMap[item[idKey]] = item;
    item.children = [];
  });
  data.forEach(item => {
    if (item[parentKey] !== undefined && idMap[item[parentKey]]) {
      idMap[item[parentKey]].children.push(item);
    } else {
      tree.push(item);
    }
  });
  return tree;
}

function flattenTree(data) {
  let result = [];

  function flatten(node) {
    result.push(node);
    if (node.children && node.children.length > 0) {
      node.children.forEach(child => {
        flatten(child);
      });
      // delete node.children;
    }
  }
  data.forEach(item => {flatten(item);});

  console.log(result)
  return result;
}

export default {
  name: '', // Pascal命名
  mixins: [],
  components: {},
  props: {},
  computed: {},
  data() {
    return {
      percentage: 0,
      colors: [
        {color: '#f56c6c', percentage: 27},
        {color: '#338AFF', percentage: 28},
      ],
      dialogVisible: !true,
      freeDay: 0,
    };
  },
  watch: {},
  beforeCreate() {
  },
  created() {
  },
  beforeMount() {
  },
  mounted() {
    this.freeDay = 12;
    this.percentage = this.freeDay * 100 / 14;
    const localDay = JSON.parse(localStorage.getItem('localDay') || JSON.stringify({}));
    const today = getTodayAndYesterday();
    if (this.freeDay <= 3) {
      if (!localDay.today) { // 没有 直接弹
        this.dialogVisible = true;
        localStorage.setItem('localDay', JSON.stringify(today));
        return;
      }
      if (today.today != localDay.today) { // 获取的今天 不等于 本地存储的今天 说明存储是昨天存的  今天直接弹
        this.dialogVisible = true;
        localStorage.setItem('localDay', JSON.stringify(today));
        return;
      }
    }
  },
  methods: {
    getData(ids) {
      const db = new DB([], "key", );
      const list = flattenTree(treeData);
      // const listdb = new DB(list, "key", 'pid');
      // const ptreelist = listdb.parentDeep({key: ids}, "parent" );
      // const plist = db.flatten(ptreelist, "parent")
      return list;
      return buildTree(exl(plist),'id', 'parentid');
    },
    progressClick() {
      this.dialogVisible = true;
    },
    formatProgress(val) {
      return parseInt(val * 14 / 100) || '0';
    },
    increase() {
      this.percentage += parseInt(100 / 14);
      if (this.percentage > 100) {
        this.percentage = 100;
      }
    },
    decrease() {
      this.percentage -= parseInt(100 / 14);
      if (this.percentage < 7) {
        this.percentage = 0;
      }
    },
    async init() {
      const appKey = "534b5846-443e-4272-8b04-03d1de466362"; /* Disclaimer: App key added just for prototype use. Don’t add it to your production code.” */
      const appSecret = "2a072f64-0182-47ab-9548-c51279cb8773"; /* Disclaimer: App secret added just for prototype use. Don’t add it to your production code.” */
      const userId = "victor@easychator.com";
      const hash = await IntegryJS.Helpers.getAuthHash(userId, appSecret);
      const integryHandle = new IntegryJS({
        appKey,
        hash,
        userId,
        xIntegryConfig: {
          appAuth: {
            apiKey: "", /* Add your App API key here. It will be use to authenticate user */
          }
        },
        options: {
          title: "Flows",  /* Add title here E.g. "Flows" */
          tags: [], /* What Flows do you want to show? Pass tag names in array E.g. ["Production","Beta"] */

          // All objects, that can be used, are passed in, as shown below
          objects: {
            "Message": {
              "id": 1,
              "sender_id": "",
              "receiver_id": "",
              "subject": "Sample Subject",
              "body": "This is a sample message body",
              "status": "Unread",
              "created_at": "2023-05-25T19:00:00Z",
              "updated_at": "2023-05-25T19:05:00Z"
            },
            "Meeting": {
              "id": 1,
              "title": "Sample Meeting",
              "description": "This is a sample meeting",
              "start_time": "2023-05-26T09:00:00Z",
              "end_time": "2023-05-26T10:00:00Z",
              "location": "Online",
              "URL": "",
              "attendees": [
                {
                  "email": "attendee1@example.com",
                  "status": "Accepted"
                },
                {
                  "email": "attendee2@example.com",
                  "status": "Pending"
                }
              ],
              "created_at": "2023-05-25T19:00:00Z",
              "updated_at": "2023-05-25T19:05:00Z"
            },
            "Lead": {
              "id": "1234567890",
              "owner": "John Doe",
              "lead_source": "Website Advertisement",
              "title": "Marketing Manager",
              "company": "ABC Corporation",
              "first_name": "Jane",
              "last_name": "Smith",
              "addresses": [
                {
                  "street_1": "123 Main Street",
                  "street_2": "Apt 4B",
                  "city": "New York",
                  "state": "NY",
                  "postal_code": "10001",
                  "country": "USA",
                  "address_type": "Billing"
                }
              ],
              "email_addresses": [
                {
                  "email_address": "jane.smith@example.com",
                  "email_address_type": "Personal"
                }
              ],
              "phone_numbers": [
                {
                  "phone_number": "+15555555555",
                  "phone_number_type": "Work"
                }
              ],
              "updated_at": "2023-04-15T09:30:00Z",
              "created_at": "2023-01-20T14:45:00Z",
              "converted_date": "2023-03-25T18:20:00Z",
              "converted_contact": "John Brown",
              "converted_account": "ABC Corporation"
            },
            "Client": {
              "id": 1,
              "name": "Sample Client",
              "address": "123 Sample Street, Sample City, Sample State, Sample Country",
              "email": "sample.client@example.com",
              "phone": "+1 1234567890",
              "billing_info": {
                "credit_card": "**** **** **** 1234",
                "expiry_date": "2025-12"
              },
              "created_at": "2023-05-25T16:00:00Z",
              "updated_at": "2023-05-25T16:05:00Z"
            },
            "Contact": {
              "id": 1,
              "firstName": "Alice",
              "lastName": "Johnson",
              "gender": "female",
              "age": 33,
              "dateOfBirth": "1990-01-01",
              "email": "alice@example.com",
              "phone": "555-555-1234",
              "address": {
                "street": "123 Main St",
                "city": "New York",
                "state": "NY",
                "postalCode": "10001",
                "country": "USA"
              },
              "lastContacted": "2023-01-15",
              "twitter": "@alicejohnson",
              "website": "https://www.example.com",
              "linkedIn": "https://www.linkedin.com/in/example",
              "bio": "Alice Johnson is a software engineer with over 10 years of experience.",
              "relationship": "professional",
              "tags": [
                "tech",
                "conference",
                "networking"
              ],
              "jobTitle": "Software Engineer",
              "company": "Example Corp.",
              "dateCreated": "2023-04-14T12:00:00Z",
              "dateUpdated": "2023-04-14T12:00:00Z",
              "nextMeeting": {
                "date": "2023-05-01",
                "topic": "Project Planning",
                "location": "New York"
              },
              "notes": "Met at the 2022 Tech Conference in San Francisco."
            }
          },
        },
      });
      integryHandle.init({
        containerId: "x-integry-container", /* Add the dom container id where you want to render sdk */
        renderFlowsMode: IntegryJS.RenderModes.MODAL, /* View Flow listing in a modal or inline? Pass IntegryJS.RenderModes.MODAL or IntegryJS.RenderModes.INLINE */
        renderMode: IntegryJS.RenderModes.MODAL, /* View Flow setup form in a modal or inline? Pass IntegryJS.RenderModes.MODAL or IntegryJS.RenderModes.INLINE.*/
        viewStyle: IntegryJS.ViewStyles.COMFORTABLE,
      });
      integryHandle.eventEmitter.on('did-save-integration', (data) => {
        console.log("Callback URL: " + data.callbackUrl);
      });
    },
  },
  beforeUpdate() {
  }, //生命周期 - 更新之前
  updated() {
  }, //生命周期 - 更新之后
  beforeDestroy() {
  }, //生命周期 - 销毁之前
  destroyed() {
  }, //生命周期 - 销毁完成
  activated() {
  }, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>

<style lang='scss'>
.dialog-custom-class {
  border-radius: 10px !important;
}
</style>

<style lang='scss' scoped>
.next-btn {
  width: 382px;
  height: 56px;
  border-radius: 25px;
  border: 1px;
  font-family: Nunito;
  font-size: 20px;
  font-weight: 900;
  line-height: 27px;
}

.dialog-custom-class {
  border-radius: 6px !important;
}

::v-deep .el-progress__text {
  font-size: 20px !important;
}

.progress-outbox {
  display: inline-flex;
  align-items: center;
  position: relative;
  .text {
    width: 100px;
    font-size: 18px;
    font-weight: bold;
  }
  //&::after {
  //  content: " ";
  //  position: absolute;
  //  width: 100%;
  //  height: 100%;
  //  left: 0;
  //  background: rgba(0, 0, 0, 1);
  //  z-index: 1;
  //}
}

#x-integry-container {
  font-family: "Inter";
  height: 100%;
}
</style>